import React, { Component } from 'react'
import { AutoComplete, Card, Button, Form, Icon, Col, Row, DatePicker, TimePicker, Input, Select, Popover,Switch } from 'antd'
import { connect } from 'dva'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import {ImageComponent} from '../../axios/tools'
import FooterToolbar from '../../components/FooterToolbar'
import styles from './BorrowingHistory.createform.less'
import {mapBackToImageValues, mapFromImageValues} from '../../axios/tools'
import GlobalComponents from '../../custcomponents';
import BorrowingHistoryBase from './BorrowingHistory.base'

const { Option } = Select
const { RangePicker } = DatePicker
const { TextArea } = Input

const testValues = {};
/*
const testValues = {
<<<<<<< HEAD:src/bizcomponents/servicevehiclemovementm2m/ServiceVehicleMovementM2m.createform.js
  serviceStatus: '待验收',
  serviceSummary: '请在 {日期} {时间} 前到 {地点} 联系 {姓名+电话}取车。{备注}',
  startTime: '2017-03-15 20:47:03',
  longitude: '103.25979732983662',
  latitude: '30.32638200294129',
  transferVerifyCode: 'O12345',
  movementPurpose: 'VEHICLE_M2M_PICK_IN_STORE',
  notifyDatetime: '2017-01-25 05:21:02',
  notifyAddress: '',
  handoverResult: '',
  responsibleWorkerId: 'VSCE000001',
  mainOrderId: 'VIO000001',
  driverId: 'VSCE000001',
  receiverId: 'VSCE000001',
  merchantId: 'VSC000001',
  notifyComment: '',
  handoverResultComment: '<div>\
	<h1>一级会员服务</h1>\
	<ul>\
		<li>可以借阅图书</li>\
		<li>可以购买</li>\
		<li>可以报名参加活动</li>\
	</ul>\
</div>',
=======
  lendingDatetime: '2016-11-11 06:21:52',
  bookName: '飘',
  borrowerMemberLevel: '普通会员',
  borrowerMemberServiceExpiredDatetime: '2016-03-11 00:38:01',
  bookCopySharingType: '共享',
  lendingStoreType: '社区',
  freeLendingDays: '6',
  freeLendingExpiredDatetime: '2017-02-05 06:41:51',
  overduePay: '0.81',
  returnDatetime: '2018-03-04 22:31:34',
  lendingDays: '14',
  borrowingStatus: '已归还',
  borrowerId: 'C000001',
  bookId: 'B000001',
  bookCopyId: 'BC000001',
  lendingStoreId: 'S000001',
  returnStoreId: 'S000001',
>>>>>>> 69fce8703114b35fde9082e9f806d4b3dd160efb:src/bizcomponents/borrowinghistory/BorrowingHistory.createform.js
}
*/
const imageURLPrefix = '//localhost:2090'


const imageKeys = [
]


class BorrowingHistoryCreateForm extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    convertedImagesValues: {},
  }

  componentDidMount() {
    // const { getFieldDecorator,setFieldsValue } = this.props.form
    const { setFieldsValue } = this.props.form
    //setFieldsValue(testValues)
      
    this.executeCandidateBorrowerSearch("")
    
    
    this.executeCandidateBookSearch("")
    
    
    this.executeCandidateBookCopySearch("")
    
    
    this.executeCandidateLendingStoreSearch("")
    
    
    this.executeCandidateReturnStoreSearch("")
    
 
    
    
    
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

  
  executeCandidateBorrowerSearch = (filterKey) =>{

    const {BorrowingHistoryService} = GlobalComponents;
    
    const id = "";//not used for now
    const pageNo = 1;
    const future = BorrowingHistoryService.requestCandidateBorrower("customer", id, filterKey, pageNo);
    console.log(future);
    

    future.then(candidateBorrowerList=>{
      this.setState({
        candidateBorrowerList
      })

    })

  }	 
  handleCandidateBorrowerSearch = (value) => {
    this.executeCandidateBorrowerSearch(value)
  }

  executeCandidateBookSearch = (filterKey) =>{

    const {BorrowingHistoryService} = GlobalComponents;
    
    const id = "";//not used for now
    const pageNo = 1;
    const future = BorrowingHistoryService.requestCandidateBook("book", id, filterKey, pageNo);
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

  executeCandidateBookCopySearch = (filterKey) =>{

    const {BorrowingHistoryService} = GlobalComponents;
    
    const id = "";//not used for now
    const pageNo = 1;
    const future = BorrowingHistoryService.requestCandidateBookCopy("bookCopy", id, filterKey, pageNo);
    console.log(future);
    

    future.then(candidateBookCopyList=>{
      this.setState({
        candidateBookCopyList
      })

    })

  }	 
  handleCandidateBookCopySearch = (value) => {
    this.executeCandidateBookCopySearch(value)
  }

  executeCandidateLendingStoreSearch = (filterKey) =>{

    const {BorrowingHistoryService} = GlobalComponents;
    
    const id = "";//not used for now
    const pageNo = 1;
    const future = BorrowingHistoryService.requestCandidateLendingStore("store", id, filterKey, pageNo);
    console.log(future);
    

    future.then(candidateLendingStoreList=>{
      this.setState({
        candidateLendingStoreList
      })

    })

  }	 
  handleCandidateLendingStoreSearch = (value) => {
    this.executeCandidateLendingStoreSearch(value)
  }

  executeCandidateReturnStoreSearch = (filterKey) =>{

    const {BorrowingHistoryService} = GlobalComponents;
    
    const id = "";//not used for now
    const pageNo = 1;
    const future = BorrowingHistoryService.requestCandidateReturnStore("store", id, filterKey, pageNo);
    console.log(future);
    

    future.then(candidateReturnStoreList=>{
      this.setState({
        candidateReturnStoreList
      })

    })

  }	 
  handleCandidateReturnStoreSearch = (value) => {
    this.executeCandidateReturnStoreSearch(value)
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
    const {fieldLabels} = BorrowingHistoryBase
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
          type: `${owner.type}/addBorrowingHistory`,
          payload: { id: owner.id, type: 'borrowingHistory', parameters },
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
          type: `${owner.type}/addBorrowingHistory`,
          payload: { id: owner.id, type: 'borrowingHistory', parameters, continueNext: true },
        })
      })
    }
    
    const goback = () => {
      const { owner } = this.props
      dispatch({
        type: `${owner.type}/goback`,
        payload: { id: owner.id, type: 'borrowingHistory',listName:'图书借还历史列表' },
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
    

    
    const {candidateBorrowerList} = this.state
    if(!candidateBorrowerList){
      return (<div>等等</div>)
    }
    if(!candidateBorrowerList.candidates){
      return (<div>等等</div>)
    }   
    
    
    const {candidateBookList} = this.state
    if(!candidateBookList){
      return (<div>等等</div>)
    }
    if(!candidateBookList.candidates){
      return (<div>等等</div>)
    }   
    
    
    const {candidateBookCopyList} = this.state
    if(!candidateBookCopyList){
      return (<div>等等</div>)
    }
    if(!candidateBookCopyList.candidates){
      return (<div>等等</div>)
    }   
    
    
    const {candidateLendingStoreList} = this.state
    if(!candidateLendingStoreList){
      return (<div>等等</div>)
    }
    if(!candidateLendingStoreList.candidates){
      return (<div>等等</div>)
    }   
    
    
    const {candidateReturnStoreList} = this.state
    if(!candidateReturnStoreList){
      return (<div>等等</div>)
    }
    if(!candidateReturnStoreList.candidates){
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
        title="新建一个图书借还历史"
        content="新建一个图书借还历史"
        wrapperClassName={styles.advancedForm}
      >
        <Card title="基础信息" className={styles.card} bordered={false}>
          <Form >
            <Row gutter={16}>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.lendingDatetime} {...formItemLayout}>
                  {getFieldDecorator('lendingDatetime', {
                    rules: [{ required: true, message: '请输入借出日期' }],
                  })(
                    <DatePicker showTime format="YYYY-MM-DD HH:mm" minuteStep={5} placeholder="请输入借出日期" />
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.bookName} {...formItemLayout}>
                  {getFieldDecorator('bookName', {
                    rules: [{ required: true, message: '请输入书名' }],
                  })(
                    <Input placeholder="请输入书名" />
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.borrowerMemberLevel} {...formItemLayout}>
                  {getFieldDecorator('borrowerMemberLevel', {
                    rules: [{ required: true, message: '请输入借书人会员等级' }],
                  })(
                    <Input placeholder="请输入借书人会员等级" />
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.borrowerMemberServiceExpiredDatetime} {...formItemLayout}>
                  {getFieldDecorator('borrowerMemberServiceExpiredDatetime', {
                    rules: [{ required: true, message: '请输入借书人会员服务过期日期' }],
                  })(
                    <DatePicker showTime format="YYYY-MM-DD HH:mm" minuteStep={5} placeholder="请输入借书人会员服务过期日期" />
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.bookCopySharingType} {...formItemLayout}>
                  {getFieldDecorator('bookCopySharingType', {
                    rules: [{ required: true, message: '请输入书籍副本共享类型' }],
                  })(
                    <Input placeholder="请输入书籍副本共享类型" />
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.lendingStoreType} {...formItemLayout}>
                  {getFieldDecorator('lendingStoreType', {
                    rules: [{ required: true, message: '请输入借出网点类型' }],
                  })(
                    <Input placeholder="请输入借出网点类型" />
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.freeLendingDays} {...formItemLayout}>
                  {getFieldDecorator('freeLendingDays', {
                    rules: [{ required: true, message: '请输入免费借阅天数' }],
                  })(
                    <Input placeholder="请输入免费借阅天数" />
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.freeLendingExpiredDatetime} {...formItemLayout}>
                  {getFieldDecorator('freeLendingExpiredDatetime', {
                    rules: [{ required: true, message: '请输入免费借阅到期时间' }],
                  })(
                    <DatePicker showTime format="YYYY-MM-DD HH:mm" minuteStep={5} placeholder="请输入免费借阅到期时间" />
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.overduePay} {...formItemLayout}>
                  {getFieldDecorator('overduePay', {
                    rules: [{ required: true, message: '请输入超期天数' }],
                  })(
                    <Input placeholder="请输入超期天数" />
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.returnDatetime} {...formItemLayout}>
                  {getFieldDecorator('returnDatetime', {
                    rules: [{ required: true, message: '请输入还书日期' }],
                  })(
                    <DatePicker showTime format="YYYY-MM-DD HH:mm" minuteStep={5} placeholder="请输入还书日期" />
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.lendingDays} {...formItemLayout}>
                  {getFieldDecorator('lendingDays', {
                    rules: [{ required: true, message: '请输入实际借书天数' }],
                  })(
                    <Input placeholder="请输入实际借书天数" />
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.borrowingStatus} {...formItemLayout}>
                  {getFieldDecorator('borrowingStatus', {
                    rules: [{ required: true, message: '请输入借书状态' }],
                  })(
                    <Input placeholder="请输入借书状态" />
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
                <Form.Item label={fieldLabels.freeLendingExpired}  {...switchFormItemLayout}>
                  {getFieldDecorator('freeLendingExpired', {
                    initialValue: false,
                    rules: [{ required: true, message: '请输入是否超期' }],
                    valuePropName: 'checked'
                  })(
                    <Switch checkedChildren="是" unCheckedChildren="否"  placeholder="请输入是否超期bool" />
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
                <Form.Item label={fieldLabels.borrower} {...formItemLayout}>
                  {getFieldDecorator('borrowerId', {
                  	initialValue: tryinit('borrower'),
                    rules: [{ required: true, message: '请输入借书人' }],
                  })(
                  
                  <AutoComplete
                    dataSource={candidateBorrowerList.candidates}
                    
                    
                    onSearch={this.handleCandidateBorrowerSearch}
                    placeholder="请输入借书人"
                    
                    disabled={!availableForEdit('borrower')}
                  >
                  {candidateBorrowerList.candidates.map(item=>{
                return (<Option key={item.id}>{`${item.nickName}(${item.id})`}</Option>);
            })}
                  
                  </AutoComplete>
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.book} {...formItemLayout}>
                  {getFieldDecorator('bookId', {
                  	initialValue: tryinit('book'),
                    rules: [{ required: true, message: '请输入书' }],
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
                <Form.Item label={fieldLabels.bookCopy} {...formItemLayout}>
                  {getFieldDecorator('bookCopyId', {
                  	initialValue: tryinit('bookCopy'),
                    rules: [{ required: true, message: '请输入书籍副本' }],
                  })(
                  
                  <AutoComplete
                    dataSource={candidateBookCopyList.candidates}
                    
                    
                    onSearch={this.handleCandidateBookCopySearch}
                    placeholder="请输入书籍副本"
                    
                    disabled={!availableForEdit('bookCopy')}
                  >
                  {candidateBookCopyList.candidates.map(item=>{
                return (<Option key={item.id}>{`${item.bookCopySharingType}(${item.id})`}</Option>);
            })}
                  
                  </AutoComplete>
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.lendingStore} {...formItemLayout}>
                  {getFieldDecorator('lendingStoreId', {
                  	initialValue: tryinit('lendingStore'),
                    rules: [{ required: true, message: '请输入借出网点' }],
                  })(
                  
                  <AutoComplete
                    dataSource={candidateLendingStoreList.candidates}
                    
                    
                    onSearch={this.handleCandidateLendingStoreSearch}
                    placeholder="请输入借出网点"
                    
                    disabled={!availableForEdit('lendingStore')}
                  >
                  {candidateLendingStoreList.candidates.map(item=>{
                return (<Option key={item.id}>{`${item.storeName}(${item.id})`}</Option>);
            })}
                  
                  </AutoComplete>
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.returnStore} {...formItemLayout}>
                  {getFieldDecorator('returnStoreId', {
                  	initialValue: tryinit('returnStore'),
                    rules: [{ required: true, message: '请输入还书网点' }],
                  })(
                  
                  <AutoComplete
                    dataSource={candidateReturnStoreList.candidates}
                    
                    
                    onSearch={this.handleCandidateReturnStoreSearch}
                    placeholder="请输入还书网点"
                    
                    disabled={!availableForEdit('returnStore')}
                  >
                  {candidateReturnStoreList.candidates.map(item=>{
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
}))(Form.create()(BorrowingHistoryCreateForm))




