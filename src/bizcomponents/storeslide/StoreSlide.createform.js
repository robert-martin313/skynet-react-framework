import React, { Component } from 'react'
import { AutoComplete, Card, Button, Form, Icon, Col, Row, DatePicker, TimePicker, Input, Select, Popover,Switch } from 'antd'
import { connect } from 'dva'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import {ImageComponent} from '../../axios/tools'
import FooterToolbar from '../../components/FooterToolbar'
import styles from './StoreSlide.createform.less'
import {mapBackToImageValues, mapFromImageValues} from '../../axios/tools'
import GlobalComponents from '../../custcomponents';
import StoreSlideBase from './StoreSlide.base'

const { Option } = Select
const { RangePicker } = DatePicker
const { TextArea } = Input

const testValues = {};
/*
const testValues = {
  tips: '新书推荐：《神们自己》',
  wxaLinkUrl: '/wxaService/viewObject/book/B000001/',
  antdLinkUrl: './bookManager/B00001/',
  slideTypeId: 'ST000001',
  bookId: 'B000001',
  campaignId: 'C000001',
  memberServiceProductId: 'MSP000001',
  storeId: 'S000001',
}
*/
const imageURLPrefix = '//localhost:2090'


const imageKeys = [
  'bannerImage',
]


class StoreSlideCreateForm extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    convertedImagesValues: {},
  }

  componentDidMount() {
    // const { getFieldDecorator,setFieldsValue } = this.props.form
    const { setFieldsValue } = this.props.form
    //setFieldsValue(testValues)
      
    this.executeCandidateSlideTypeSearch("")
    
    
    this.executeCandidateBookSearch("")
    
    
    this.executeCandidateCampaignSearch("")
    
    
    this.executeCandidateMemberServiceProductSearch("")
    
    
    this.executeCandidateStoreSearch("")
    
 
    
    
    
  }
  shouldComponentUpdate() {
    return true
  }
  handlePreview = (file) => {
    console.log('preview file', file)
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  
  executeCandidateSlideTypeSearch = (filterKey) =>{

    const {StoreSlideService} = GlobalComponents;
    
    const id = "";//not used for now
    const pageNo = 1;
    const future = StoreSlideService.requestCandidateSlideType("slideType", id, filterKey, pageNo);
    console.log(future);
    

    future.then(candidateSlideTypeList=>{
      this.setState({
        candidateSlideTypeList
      })

    })

  }	 
  handleCandidateSlideTypeSearch = (value) => {
    this.executeCandidateSlideTypeSearch(value)
  }

  executeCandidateBookSearch = (filterKey) =>{

    const {StoreSlideService} = GlobalComponents;
    
    const id = "";//not used for now
    const pageNo = 1;
    const future = StoreSlideService.requestCandidateBook("book", id, filterKey, pageNo);
    console.log(future);
    

    future.then(candidateBookList=>{
      this.setState({
        candidateBookList
      })

    })

  }	 
  handleCandidateBookSearch = (value) => {
    this.executeCandidateBookSearch(value)
  }

  executeCandidateCampaignSearch = (filterKey) =>{

    const {StoreSlideService} = GlobalComponents;
    
    const id = "";//not used for now
    const pageNo = 1;
    const future = StoreSlideService.requestCandidateCampaign("campaign", id, filterKey, pageNo);
    console.log(future);
    

    future.then(candidateCampaignList=>{
      this.setState({
        candidateCampaignList
      })

    })

  }	 
  handleCandidateCampaignSearch = (value) => {
    this.executeCandidateCampaignSearch(value)
  }

  executeCandidateMemberServiceProductSearch = (filterKey) =>{

    const {StoreSlideService} = GlobalComponents;
    
    const id = "";//not used for now
    const pageNo = 1;
    const future = StoreSlideService.requestCandidateMemberServiceProduct("memberServiceProduct", id, filterKey, pageNo);
    console.log(future);
    

    future.then(candidateMemberServiceProductList=>{
      this.setState({
        candidateMemberServiceProductList
      })

    })

  }	 
  handleCandidateMemberServiceProductSearch = (value) => {
    this.executeCandidateMemberServiceProductSearch(value)
  }

  executeCandidateStoreSearch = (filterKey) =>{

    const {StoreSlideService} = GlobalComponents;
    
    const id = "";//not used for now
    const pageNo = 1;
    const future = StoreSlideService.requestCandidateStore("store", id, filterKey, pageNo);
    console.log(future);
    

    future.then(candidateStoreList=>{
      this.setState({
        candidateStoreList
      })

    })

  }	 
  handleCandidateStoreSearch = (value) => {
    this.executeCandidateStoreSearch(value)
  }
 



  handleChange = (event, source) => {
    console.log('get file list from change in update change:', source)

    const { fileList } = event
    const { convertedImagesValues } = this.state

    convertedImagesValues[source] = fileList
    this.setState({ convertedImagesValues })
    console.log('/get file list from change in update change:', source)
  }


  render() {
    const { form, dispatch, submitting } = this.props
    const { convertedImagesValues } = this.state

    const { getFieldDecorator, validateFieldsAndScroll, getFieldsError } = form
    const {fieldLabels} = StoreSlideBase
    const submitCreateForm = () => {
      validateFieldsAndScroll((error, values) => {
        if (error) {
          console.log('code go here', error)
          return
        }

        const { owner } = this.props
        const imagesValues = mapBackToImageValues(convertedImagesValues)

        const parameters = { ...values, ...imagesValues }
        dispatch({
          type: `${owner.type}/addStoreSlide`,
          payload: { id: owner.id, type: 'storeSlide', parameters },
        })
      })
    }
    const submitCreateFormAndContinue = () => {
      validateFieldsAndScroll((error, values) => {
        if (error) {
          console.log('code go here', error)
          return
        }
        
        const { owner } = this.props
        const imagesValues = mapBackToImageValues(convertedImagesValues)
        
        const parameters = { ...values, ...imagesValues }
        dispatch({
          type: `${owner.type}/addStoreSlide`,
          payload: { id: owner.id, type: 'storeSlide', parameters, continueNext: true },
        })
      })
    }
    
    const goback = () => {
      const { owner } = this.props
      dispatch({
        type: `${owner.type}/goback`,
        payload: { id: owner.id, type: 'storeSlide',listName:'网点海报列表' },
      })
    }
    const errors = getFieldsError()
    const getErrorInfo = () => {
      const errorCount = Object.keys(errors).filter(key => errors[key]).length
      if (!errors || errorCount === 0) {
        return null
      }
      // eslint-disable-next-line no-unused-vars
      const scrollToField = (fieldKey) => {
        const labelNode = document.querySelector('label[for="${fieldKey}"]')
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
    

    
    const {candidateSlideTypeList} = this.state
    if(!candidateSlideTypeList){
      return (<div>等等</div>)
    }
    if(!candidateSlideTypeList.candidates){
      return (<div>等等</div>)
    }   
    
    
    const {candidateBookList} = this.state
    if(!candidateBookList){
      return (<div>等等</div>)
    }
    if(!candidateBookList.candidates){
      return (<div>等等</div>)
    }   
    
    
    const {candidateCampaignList} = this.state
    if(!candidateCampaignList){
      return (<div>等等</div>)
    }
    if(!candidateCampaignList.candidates){
      return (<div>等等</div>)
    }   
    
    
    const {candidateMemberServiceProductList} = this.state
    if(!candidateMemberServiceProductList){
      return (<div>等等</div>)
    }
    if(!candidateMemberServiceProductList.candidates){
      return (<div>等等</div>)
    }   
    
    
    const {candidateStoreList} = this.state
    if(!candidateStoreList){
      return (<div>等等</div>)
    }
    if(!candidateStoreList.candidates){
      return (<div>等等</div>)
    }   
    
    
    
    const tryinit  = (fieldName) => {
      const { owner } = this.props
      const { referenceName } = owner
      if(referenceName!=fieldName){
        return null
      }
      return owner.id
    }
    
    const availableForEdit= (fieldName) =>{
      const { owner } = this.props
      const { referenceName } = owner
      if(referenceName!=fieldName){
        return true
      }
      return false
    
    }
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
        title="新建一个网点海报"
        content="新建一个网点海报"
        wrapperClassName={styles.advancedForm}
      >
        <Card title="基础信息" className={styles.card} bordered={false}>
          <Form >
            <Row gutter={16}>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.tips} {...formItemLayout}>
                  {getFieldDecorator('tips', {
                    rules: [{ required: true, message: '请输入提示' }],
                  })(
                    <Input placeholder="请输入提示" />
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.wxaLinkUrl} {...formItemLayout}>
                  {getFieldDecorator('wxaLinkUrl', {
                    rules: [{ required: true, message: '请输入小程序链接' }],
                  })(
                    <Input placeholder="请输入小程序链接" />
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.antdLinkUrl} {...formItemLayout}>
                  {getFieldDecorator('antdLinkUrl', {
                    rules: [{ required: true, message: '请输入管理界面链接' }],
                  })(
                    <Input placeholder="请输入管理界面链接" />
                  )}
                </Form.Item>
              </Col>

            </Row>
          </Form>
        </Card>



       
        







        <Card title="附件" className={styles.card} bordered={false}>
          <Form >
            <Row gutter={16}>

              <Col lg={6} md={12} sm={24}>
                <ImageComponent
                  buttonTitle="横幅图像"
                  handlePreview={this.handlePreview}
                  handleChange={event => this.handleChange(event, 'bannerImage')}
                  fileList={convertedImagesValues.bannerImage}
                />
              </Col>

            </Row>
          </Form>
        </Card>



        <Card title="关联" className={styles.card} bordered={false}>
          <Form >
            <Row gutter={16}>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.slideType} {...formItemLayout}>
                  {getFieldDecorator('slideTypeId', {
                  	initialValue: tryinit('slideType'),
                    rules: [{ required: true, message: '请输入海报类型' }],
                  })(
                  
                  <AutoComplete
                    dataSource={candidateSlideTypeList.candidates}
                    
                    
                    onSearch={this.handleCandidateSlideTypeSearch}
                    placeholder="请输入海报类型"
                    
                    disabled={!availableForEdit('slideType')}
                  >
                  {candidateSlideTypeList.candidates.map(item=>{
                return (<Option key={item.id}>{`${item.name}(${item.id})`}</Option>);
            })}
                  
                  </AutoComplete>
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.book} {...formItemLayout}>
                  {getFieldDecorator('bookId', {
                  	initialValue: tryinit('book'),
                    rules: [{ required: false, message: '请输入书' }],
                  })(
                  
                  <AutoComplete
                    dataSource={candidateBookList.candidates}
                    
                    
                    onSearch={this.handleCandidateBookSearch}
                    placeholder="请输入书"
                    
                    disabled={!availableForEdit('book')}
                  >
                  {candidateBookList.candidates.map(item=>{
                return (<Option key={item.id}>{`${item.bookName}(${item.id})`}</Option>);
            })}
                  
                  </AutoComplete>
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.campaign} {...formItemLayout}>
                  {getFieldDecorator('campaignId', {
                  	initialValue: tryinit('campaign'),
                    rules: [{ required: false, message: '请输入活动' }],
                  })(
                  
                  <AutoComplete
                    dataSource={candidateCampaignList.candidates}
                    
                    
                    onSearch={this.handleCandidateCampaignSearch}
                    placeholder="请输入活动"
                    
                    disabled={!availableForEdit('campaign')}
                  >
                  {candidateCampaignList.candidates.map(item=>{
                return (<Option key={item.id}>{`${item.campaignName}(${item.id})`}</Option>);
            })}
                  
                  </AutoComplete>
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.memberServiceProduct} {...formItemLayout}>
                  {getFieldDecorator('memberServiceProductId', {
                  	initialValue: tryinit('memberServiceProduct'),
                    rules: [{ required: false, message: '请输入会员服务产品' }],
                  })(
                  
                  <AutoComplete
                    dataSource={candidateMemberServiceProductList.candidates}
                    
                    
                    onSearch={this.handleCandidateMemberServiceProductSearch}
                    placeholder="请输入会员服务产品"
                    
                    disabled={!availableForEdit('memberServiceProduct')}
                  >
                  {candidateMemberServiceProductList.candidates.map(item=>{
                return (<Option key={item.id}>{`${item.productName}(${item.id})`}</Option>);
            })}
                  
                  </AutoComplete>
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.store} {...formItemLayout}>
                  {getFieldDecorator('storeId', {
                  	initialValue: tryinit('store'),
                    rules: [{ required: true, message: '请输入服务网点' }],
                  })(
                  
                  <AutoComplete
                    dataSource={candidateStoreList.candidates}
                    
                    
                    onSearch={this.handleCandidateStoreSearch}
                    placeholder="请输入服务网点"
                    
                    disabled={!availableForEdit('store')}
                  >
                  {candidateStoreList.candidates.map(item=>{
                return (<Option key={item.id}>{`${item.storeName}(${item.id})`}</Option>);
            })}
                  
                  </AutoComplete>
                  )}
                </Form.Item>
              </Col>

            </Row>
          </Form>  
        </Card>

        <FooterToolbar>
          {getErrorInfo()}
          <Button type="primary" onClick={submitCreateForm} loading={submitting} htmlType="submit">
            提交
          </Button>
          <Button type="primary" onClick={submitCreateFormAndContinue} loading={submitting}>
            提交并建下一个
          </Button>
          <Button type="danger" onClick={goback} loading={submitting}>
            放弃
          </Button>
        </FooterToolbar>
      </PageHeaderLayout>
    )
  }
}

export default connect(state => ({
  collapsed: state.global.collapsed,
}))(Form.create()(StoreSlideCreateForm))



