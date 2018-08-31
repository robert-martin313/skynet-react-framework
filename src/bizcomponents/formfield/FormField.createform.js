import React, { Component } from 'react'
import { AutoComplete, Card, Button, Form, Icon, Col, Row, DatePicker, TimePicker, Input, Select, Popover,Switch } from 'antd'
import { connect } from 'dva'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import {ImageComponent} from '../../axios/tools'
import FooterToolbar from '../../components/FooterToolbar'
import styles from './FormField.createform.less'
import {mapBackToImageValues, mapFromImageValues} from '../../axios/tools'
import GlobalComponents from '../../custcomponents';
import FormFieldBase from './FormField.base'

const { Option } = Select
const { RangePicker } = DatePicker
const { TextArea } = Input

const testValues = {};
/*
const testValues = {
  label: '姓名',
  localeKey: 'name',
  parameterName: 'name',
  type: 'text',
  placeholder: '姓名就是你身份证上的名字',
  defaultValue: '李中文',
  description: '姓名就是你身份证上的名字',
  fieldGroup: '基础信息',
  minimumValue: 'maybe any value',
  maximumValue: 'a value expression',
  candidateValues: '',
  suggestValues: '',
  formId: 'GF000001',
}
*/
const imageURLPrefix = '//localhost:2090'


const imageKeys = [
]


class FormFieldCreateForm extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    convertedImagesValues: {},
  }

  componentDidMount() {
    // const { getFieldDecorator,setFieldsValue } = this.props.form
    const { setFieldsValue } = this.props.form
    //setFieldsValue(testValues)
      
    this.executeCandidateFormSearch("")
    
 
    
    
    
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

  
  executeCandidateFormSearch = (filterKey) =>{

    const {FormFieldService} = GlobalComponents;
    
    const id = "";//not used for now
    const pageNo = 1;
    const future = FormFieldService.requestCandidateForm("genericForm", id, filterKey, pageNo);
    console.log(future);
    

    future.then(candidateFormList=>{
      this.setState({
        candidateFormList
      })

    })

  }	 
  handleCandidateFormSearch = (value) => {
    this.executeCandidateFormSearch(value)
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
    const {fieldLabels} = FormFieldBase
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
          type: `${owner.type}/addFormField`,
          payload: { id: owner.id, type: 'formField', parameters },
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
          type: `${owner.type}/addFormField`,
          payload: { id: owner.id, type: 'formField', parameters, continueNext: true },
        })
      })
    }
    
    const goback = () => {
      const { owner } = this.props
      dispatch({
        type: `${owner.type}/goback`,
        payload: { id: owner.id, type: 'formField',listName:'表单字段列表' },
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
    

    
    const {candidateFormList} = this.state
    if(!candidateFormList){
      return (<div>等等</div>)
    }
    if(!candidateFormList.candidates){
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
        title="新建一个表单字段"
        content="新建一个表单字段"
        wrapperClassName={styles.advancedForm}
      >
        <Card title="基础信息" className={styles.card} bordered={false}>
          <Form >
            <Row gutter={16}>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.label} {...formItemLayout}>
                  {getFieldDecorator('label', {
                    rules: [{ required: true, message: '请输入标签' }],
                  })(
                    <Input placeholder="请输入标签" />
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.localeKey} {...formItemLayout}>
                  {getFieldDecorator('localeKey', {
                    rules: [{ required: true, message: '请输入语言环境的关键' }],
                  })(
                    <Input placeholder="请输入语言环境的关键" />
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.parameterName} {...formItemLayout}>
                  {getFieldDecorator('parameterName', {
                    rules: [{ required: true, message: '请输入参数名称' }],
                  })(
                    <Input placeholder="请输入参数名称" />
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.type} {...formItemLayout}>
                  {getFieldDecorator('type', {
                    rules: [{ required: true, message: '请输入类型' }],
                  })(
                    <Input placeholder="请输入类型" />
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.placeholder} {...formItemLayout}>
                  {getFieldDecorator('placeholder', {
                    rules: [{ required: true, message: '请输入占位符' }],
                  })(
                    <Input placeholder="请输入占位符" />
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.defaultValue} {...formItemLayout}>
                  {getFieldDecorator('defaultValue', {
                    rules: [{ required: true, message: '请输入默认值' }],
                  })(
                    <Input placeholder="请输入默认值" />
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.description} {...formItemLayout}>
                  {getFieldDecorator('description', {
                    rules: [{ required: true, message: '请输入描述' }],
                  })(
                    <Input placeholder="请输入描述" />
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.fieldGroup} {...formItemLayout}>
                  {getFieldDecorator('fieldGroup', {
                    rules: [{ required: true, message: '请输入字段组' }],
                  })(
                    <Input placeholder="请输入字段组" />
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.minimumValue} {...formItemLayout}>
                  {getFieldDecorator('minimumValue', {
                    rules: [{ required: true, message: '请输入最小值' }],
                  })(
                    <Input placeholder="请输入最小值" />
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.maximumValue} {...formItemLayout}>
                  {getFieldDecorator('maximumValue', {
                    rules: [{ required: true, message: '请输入最大值' }],
                  })(
                    <Input placeholder="请输入最大值" />
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.candidateValues} {...formItemLayout}>
                  {getFieldDecorator('candidateValues', {
                    rules: [{ required: false, message: '请输入候选人的价值观' }],
                  })(
                    <Input placeholder="请输入候选人的价值观" />
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.suggestValues} {...formItemLayout}>
                  {getFieldDecorator('suggestValues', {
                    rules: [{ required: false, message: '请输入建议值' }],
                  })(
                    <Input placeholder="请输入建议值" />
                  )}
                </Form.Item>
              </Col>

            </Row>
          </Form>
        </Card>



        
        <Card title="设置" className={styles.card} bordered={false}>
          <Form >
            <Row gutter={16}>
            

              <Col lg={8} md={12} sm={24}>
                <Form.Item label={fieldLabels.required}  {...switchFormItemLayout}>
                  {getFieldDecorator('required', {
                    initialValue: false,
                    rules: [{ required: true, message: '请输入要求' }],
                    valuePropName: 'checked'
                  })(
                    <Switch checkedChildren="是" unCheckedChildren="否"  placeholder="请输入要求bool" />
                  )}
                </Form.Item>
              </Col>

              <Col lg={8} md={12} sm={24}>
                <Form.Item label={fieldLabels.disabled}  {...switchFormItemLayout}>
                  {getFieldDecorator('disabled', {
                    initialValue: false,
                    rules: [{ required: true, message: '请输入禁用' }],
                    valuePropName: 'checked'
                  })(
                    <Switch checkedChildren="是" unCheckedChildren="否"  placeholder="请输入禁用bool" />
                  )}
                </Form.Item>
              </Col>

              <Col lg={8} md={12} sm={24}>
                <Form.Item label={fieldLabels.customRendering}  {...switchFormItemLayout}>
                  {getFieldDecorator('customRendering', {
                    initialValue: false,
                    rules: [{ required: true, message: '请输入自定义渲染' }],
                    valuePropName: 'checked'
                  })(
                    <Switch checkedChildren="是" unCheckedChildren="否"  placeholder="请输入自定义渲染bool" />
                  )}
                </Form.Item>
              </Col>

            </Row>
          </Form>  
        </Card>        
        
        









        <Card title="关联" className={styles.card} bordered={false}>
          <Form >
            <Row gutter={16}>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.form} {...formItemLayout}>
                  {getFieldDecorator('formId', {
                  	initialValue: tryinit('form'),
                    rules: [{ required: true, message: '请输入形式' }],
                  })(
                  
                  <AutoComplete
                    dataSource={candidateFormList.candidates}
                    
                    
                    onSearch={this.handleCandidateFormSearch}
                    placeholder="请输入形式"
                    
                    disabled={!availableForEdit('form')}
                  >
                  {candidateFormList.candidates.map(item=>{
                return (<Option key={item.id}>{`${item.title}(${item.id})`}</Option>);
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
}))(Form.create()(FormFieldCreateForm))




