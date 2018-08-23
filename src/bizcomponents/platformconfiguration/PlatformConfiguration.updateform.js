import React, { Component } from 'react'
import { Card, Button, Form, Icon, Col, Row, DatePicker, TimePicker, Input, Select, Popover, Switch } from 'antd'
import moment from 'moment'
import { connect } from 'dva'
import {mapBackToImageValues, mapFromImageValues} from '../../axios/tools'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import {ImageComponent} from '../../axios/tools'

import FooterToolbar from '../../components/FooterToolbar'

import styles from './PlatformConfiguration.updateform.less'
import PlatformConfigurationBase from './PlatformConfiguration.base'

const { Option } = Select
const { RangePicker } = DatePicker
const { TextArea } = Input

const imageURLPrefix = '//localhost:2090'

const imageKeys = [
]


class PlatformConfigurationUpdateForm extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    convertedImagesValues: {},
  }

  componentWillMount() {
    const selectedRow = this.getSelectedRow()
    if (!selectedRow) {
      return
    }
    this.setState({
      convertedImagesValues: mapFromImageValues(selectedRow,imageKeys)
    })
  }

  componentDidMount() {

  }

  shouldComponentUpdate() {
    return true
  }

  getSelectedRow() {
    // const { form, dispatch, submitting, selectedRows, currentUpdateIndex } = this.props
    const { selectedRows, currentUpdateIndex } = this.props
    if (!selectedRows) {
      return
    }
    if (currentUpdateIndex >= selectedRows.length) {
      return
    }
    const convertiedValues = selectedRows.map((item) => {
      return {
        ...item,

      }
    })
    const selectedRow = convertiedValues[currentUpdateIndex]
    return selectedRow
  }

  handleChange = (event, source) => {
    console.log('get file list from change in update change: ', source)
    const { fileList } = event
    const { convertedImagesValues } = this.state
    convertedImagesValues[source] = fileList
    this.setState({ convertedImagesValues })
    console.log('/get file list from change in update change: ', source)
  }


  handlePreview = (file) => {
    console.log('preview file', file)
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  render() {
    const { form, dispatch, submitting, selectedRows, currentUpdateIndex } = this.props
    const { getFieldDecorator, validateFieldsAndScroll, getFieldsError } = form
    const { convertedImagesValues } = this.state
    const { setFieldsValue } = this.props.form
    const {fieldLabels} = PlatformConfigurationBase
    
    const submitUpdateForm = () => {
      validateFieldsAndScroll((error, values) => {
        if (error) {
          console.log('code go here', error)
          return
        }

        const { owner } = this.props
        const platformConfigurationId = values.id
        const imagesValues = mapBackToImageValues(convertedImagesValues)
        const parameters = { ...values, platformConfigurationId, ...imagesValues }

        // const newIndex= currentUpdateIndex + 1
        dispatch({
          type: `${owner.type}/updatePlatformConfiguration`,
          payload: {
            id: owner.id,
            type: 'platformConfiguration',
            parameters,
            selectedRows,
            currentUpdateIndex: 0,
            continueNext: false,
          },
        })
      })
    }
    
    const submitUpdateFormAndContinue = () => {
      validateFieldsAndScroll((error, values) => {
        if (error) {
          console.log('code go here', error)
          return
        }

        const { owner } = this.props
        const platformConfigurationId = values.id
        const imagesValues = mapBackToImageValues(convertedImagesValues)
        const parameters = { ...values, platformConfigurationId, ...imagesValues }

        // TODO
        const { currentUpdateIndex } = this.props
        
        if (currentUpdateIndex >= selectedRows.length - 1) {
          return
        }
        this.setState({
          currentUpdateIndex: currentUpdateIndex + 1,
        })
        //setFieldsValue(selectedRows[currentUpdateIndex + 1])
        const newIndex = currentUpdateIndex + 1
        dispatch({
          type: `${owner.type}/updatePlatformConfiguration`,
          payload: {
            id: owner.id,
            type: 'platformConfiguration',
            parameters,
            selectedRows,
            currentUpdateIndex: newIndex,
            continueNext: true,
          },
        })
      })
    }
    
    const skipToNext = () => {
      const { currentUpdateIndex } = this.props
      const { owner } = this.props
        
      const newIndex = currentUpdateIndex + 1
      dispatch({
        type: `${owner.type}/gotoNextPlatformConfigurationUpdateRow`,
        payload: {
          id: owner.id,
          type: 'platformConfiguration',
          selectedRows,
          currentUpdateIndex: newIndex,
          continueNext: true,
          update: false,
        },
      })
    }
    
    const goback = () => {
      const { owner } = this.props
      dispatch({
        type: `${owner.type}/goback`,
        payload: {
          id: owner.id,
          type: 'platformConfiguration',
          listName:'平台配置列表' 
        },
      })
    }
    const errors = getFieldsError()
    const getErrorInfo = () => {
      const errorCount = Object.keys(errors).filter(key => errors[key]).length
      if (!errors || errorCount === 0) {
        return null
      }
      const scrollToField = (fieldKey) => {
        const labelNode = document.querySelector(`label[for='${fieldKey}']`)
        if (labelNode) {
          labelNode.scrollIntoView(true)
        }
      }
      const errorList = Object.keys(errors).map((key) => {
        if (!errors[key]) {
          return null
        }
        return (
          <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
            <Icon type="cross-circle-o" className={styles.errorIcon} />
            <div className={styles.errorMessage}>{errors[key][0]}</div>
            <div className={styles.errorField}>{fieldLabels[key]}</div>
          </li>
        )
      })
      return (
        <span className={styles.errorIcon}>
          <Popover
            title="表单校验信息"
            content={errorList}
            overlayClassName={styles.errorPopover}
            trigger="click"
            getPopupContainer={trigger => trigger.parentNode}
          >
            <Icon type="exclamation-circle" />
          </Popover>
          {errorCount}
        </span>
      )
    }
    
    if (!selectedRows) {
      return (<div>缺少被更新的对象</div>)
    }
	const selectedRow = this.getSelectedRow()

	const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 },
    }
    const switchFormItemLayout = {
      labelCol: { span: 14 },
      wrapperCol: { span: 4 },
    }

    return (
      <PageHeaderLayout
        title={"更新平台配置"+(currentUpdateIndex+1)+"/"+selectedRows.length}
        content="更新平台配置"
        wrapperClassName={styles.advancedForm}
      >
        <Card title="基础信息" className={styles.card} bordered={false}>
          <Form >
            <Row gutter={16}>
            

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.id} {...formItemLayout}>
                  {getFieldDecorator('id', {
                    initialValue: selectedRow.id,
                    rules: [{ required: true, message: '请输入ID' }],
                  })(
                    <Input placeholder="请输入ID" disabled/>
                    
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.myRightsTitle} {...formItemLayout}>
                  {getFieldDecorator('myRightsTitle', {
                    initialValue: selectedRow.myRightsTitle,
                    rules: [{ required: true, message: '请输入我的权益的功能的显示名称' }],
                  })(
                    <Input placeholder="请输入我的权益的功能的显示名称" />
                    
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.myBorrowingTitle} {...formItemLayout}>
                  {getFieldDecorator('myBorrowingTitle', {
                    initialValue: selectedRow.myBorrowingTitle,
                    rules: [{ required: true, message: '请输入我的借阅记录的功能的显示名称' }],
                  })(
                    <Input placeholder="请输入我的借阅记录的功能的显示名称" />
                    
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.myCampaignTitle} {...formItemLayout}>
                  {getFieldDecorator('myCampaignTitle', {
                    initialValue: selectedRow.myCampaignTitle,
                    rules: [{ required: true, message: '请输入我的活动的功能的显示名称' }],
                  })(
                    <Input placeholder="请输入我的活动的功能的显示名称" />
                    
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.myBalanceTitle} {...formItemLayout}>
                  {getFieldDecorator('myBalanceTitle', {
                    initialValue: selectedRow.myBalanceTitle,
                    rules: [{ required: true, message: '请输入我的余额的功能的显示名称' }],
                  })(
                    <Input placeholder="请输入我的余额的功能的显示名称" />
                    
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.myBookReviewTitle} {...formItemLayout}>
                  {getFieldDecorator('myBookReviewTitle', {
                    initialValue: selectedRow.myBookReviewTitle,
                    rules: [{ required: true, message: '请输入我的书评的功能的显示名称' }],
                  })(
                    <Input placeholder="请输入我的书评的功能的显示名称" />
                    
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.myOrderTitle} {...formItemLayout}>
                  {getFieldDecorator('myOrderTitle', {
                    initialValue: selectedRow.myOrderTitle,
                    rules: [{ required: true, message: '请输入我的订单的功能的显示名称' }],
                  })(
                    <Input placeholder="请输入我的订单的功能的显示名称" />
                    
                  )}
                </Form.Item>
              </Col>

            </Row>
          </Form>  
        </Card>
       
        
        
        

        <Card title="会员服务协议" className={styles.card} bordered={false}>
          <Form >
            <Row gutter={16}>
              <Col lg={24} md={24} sm={24}>
                <Form.Item>
                  {getFieldDecorator('memberServiceAgreement', {
                  	initialValue: selectedRow.memberServiceAgreement,
                    rules: [{  required: true, message: '请输入会员服务协议' }],
                  })(
                    <TextArea rows={4} placeholder="请输入请输入会员服务协议" />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>

        <Card title="图书共享协议" className={styles.card} bordered={false}>
          <Form >
            <Row gutter={16}>
              <Col lg={24} md={24} sm={24}>
                <Form.Item>
                  {getFieldDecorator('bookSharingAgreement', {
                  	initialValue: selectedRow.bookSharingAgreement,
                    rules: [{  required: true, message: '请输入图书共享协议' }],
                  })(
                    <TextArea rows={4} placeholder="请输入请输入图书共享协议" />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>

        <Card title="账户充值协议" className={styles.card} bordered={false}>
          <Form >
            <Row gutter={16}>
              <Col lg={24} md={24} sm={24}>
                <Form.Item>
                  {getFieldDecorator('accountRechargeAgreement', {
                  	initialValue: selectedRow.accountRechargeAgreement,
                    rules: [{  required: true, message: '请输入账户充值协议' }],
                  })(
                    <TextArea rows={4} placeholder="请输入请输入账户充值协议" />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>

        <Card title="存储列表页中的消息" className={styles.card} bordered={false}>
          <Form >
            <Row gutter={16}>
              <Col lg={24} md={24} sm={24}>
                <Form.Item>
                  {getFieldDecorator('messageInStoreListPage', {
                  	initialValue: selectedRow.messageInStoreListPage,
                    rules: [{  required: true, message: '请输入存储列表页中的消息' }],
                  })(
                    <TextArea rows={4} placeholder="请输入请输入存储列表页中的消息" />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>

        <Card title="反馈联系信息" className={styles.card} bordered={false}>
          <Form >
            <Row gutter={16}>
              <Col lg={24} md={24} sm={24}>
                <Form.Item>
                  {getFieldDecorator('feedbackContactInfo', {
                  	initialValue: selectedRow.feedbackContactInfo,
                    rules: [{  required: true, message: '请输入反馈联系信息' }],
                  })(
                    <TextArea rows={4} placeholder="请输入请输入反馈联系信息" />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>


        <FooterToolbar>
          {getErrorInfo()}
          <Button type="primary" onClick={submitUpdateForm} loading={submitting} htmlType="submit">
            更新
          </Button>
          <Button type="primary" onClick={submitUpdateFormAndContinue} loading={submitting} disabled={currentUpdateIndex + 1 >= selectedRows.length}>
            更新并装载下一个
          </Button>
          <Button type="info" onClick={skipToNext} loading={submitting} disabled={currentUpdateIndex + 1 >= selectedRows.length}>
            略过
          </Button>
          <Button type="info" onClick={goback} loading={submitting}>
            取消
          </Button>
        </FooterToolbar>
      </PageHeaderLayout>
    )
  }
}

export default connect(state => ({
  collapsed: state.global.collapsed,
}))(Form.create()(PlatformConfigurationUpdateForm))



