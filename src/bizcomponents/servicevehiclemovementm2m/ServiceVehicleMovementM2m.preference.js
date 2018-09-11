

import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome';
import { connect } from 'dva'
import moment from 'moment'
import BooleanOption from 'components/BooleanOption';
import { Row, Col, Icon, Card, Tabs, Table, Radio, DatePicker, Tooltip, Menu, Dropdown,Badge, Switch,Select,Form,AutoComplete,Modal } from 'antd'
import { Link, Route, Redirect} from 'dva/router'
import numeral from 'numeral'
import {
  ChartCard, yuan, MiniArea, MiniBar, MiniProgress, Field, Bar, Pie, TimelineChart,
} from '../../components/Charts'
import Trend from '../../components/Trend'
import NumberInfo from '../../components/NumberInfo'
import { getTimeDistance } from '../../utils/utils'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './ServiceVehicleMovementM2m.preference.less'
import DescriptionList from '../../components/DescriptionList';
import ImagePreview from '../../components/ImagePreview';
import GlobalComponents from '../../custcomponents';
const { Description } = DescriptionList;
const { TabPane } = Tabs
const { RangePicker } = DatePicker
const { Option } = Select

const topColResponsiveProps = {
  xs: 8,
  sm: 6,
  md: 6,
  lg: 4,
  xl: 4,
  style: { marginBottom: 24 },
}


const internalImageListOf = (serviceVehicleMovementM2m) =>{

  const imageList = [
	 ]
  const filteredList = imageList.filter((item)=>item.imageLocation!=null)
  if(filteredList.length===0){
    return null
  }

  return(<Card title='图片列表' className={styles.card}><Row type="flex" justify="start" align="bottom">
  {
      filteredList.map((item,index)=>(<Col span={4} key={index}><ImagePreview imageTitle ={item.title} showTitleUnderImage={true} imageLocation={item.imageLocation} >{item.title}</ImagePreview></Col>))
  }</Row></Card> )

}

const internalSettingListOf = (serviceVehicleMovementM2m) =>{

	const optionList = [ 
	]
	
  if(optionList.length===0){
    return null
  }
  return(<Card title='状态集合' className={styles.card}>
  	
  	{
  	  optionList.map((item)=><Col key={item.parameterName} span={6} style={{"height":"60px"}}>
       <Switch  title={item.title} checked={item.value} type={item.value?"success":"error"} checkedChildren="是" unCheckedChildren="否" />
       <span style={{"margin":"10px"}}>{item.title}</span>
       </Col>)
  	}


</Card> )
	


}

const internalLargeTextOf = (serviceVehicleMovementM2m) =>{

	return(<div> 
   <Card title={`备注`} ><pre>{serviceVehicleMovementM2m.notifyComment}</pre></Card>
   <Card title={`交接检查备注`} ><pre>{serviceVehicleMovementM2m.handoverResultComment}</pre></Card>
</div>)

	

}

/////////////////////////////////////// BUILD FOR TRANSFERRING TO ANOTHER OBJECT////////////////////////////////////////////////

const handleTransferSearch =(targetComponent,filterKey,newRequest)=>{
  const {ServiceVehicleMovementM2mService} = GlobalComponents;

  const parameters = newRequest||targetComponent.state

  const {
 
    candidateServiceName,
    candidateObjectType,
    targetLocalName,
 
  } = parameters

  console.log("current state", parameters)

  const id = "";//not used for now
  const pageNo = 1;
  const candidateReferenceService = ServiceVehicleMovementM2mService[candidateServiceName] 
  if(!candidateReferenceService){
    console.log("current state", parameters)
    return;
  }
  //get a function for fetching the candidate reference list
  const future = candidateReferenceService(candidateObjectType, id, filterKey, pageNo);
  console.log(future);
  future.then(candidateReferenceList=>{
    targetComponent.setState({
     ...parameters,
      candidateReferenceList,
      transferModalVisiable:true,transferModalTitle:"重新分配<"+targetLocalName+">"
     
    })

  })

}
//  onClick={()=>showTransferModel(targetComponent,"城市","city","requestCandidateDistrict","transferToAnotherDistrict")} 

const showTransferModel = (targetComponent,targetLocalName,
  candidateObjectType,candidateServiceName, transferServiceName, transferTargetParameterName,currentValue) => {

  const filterKey = ""

  const newRequest = {targetLocalName,candidateObjectType,candidateServiceName,transferServiceName,transferTargetParameterName,currentValue}
  console.log("showTransferModel  new state", newRequest)
  //targetComponent.setState(newState);
  handleTransferSearch(targetComponent,filterKey,newRequest)
}

const hideCloseTrans = (targetComponent) =>{
  targetComponent.setState({transferModalVisiable:false})

}

const executeTrans = (serviceVehicleMovementM2m,targetComponent) =>{
  const { getFieldDecorator, validateFieldsAndScroll, getFieldsError } = targetComponent.props.form
  const {
   
    candidateServiceName,
    candidateObjectType,
    targetLocalName,
    transferServiceName
  } = targetComponent.state

  const {dispatch} = targetComponent.props

  validateFieldsAndScroll((error, values) => {
    console.log("error", values)

    const parameters  = {...values}
    const id=serviceVehicleMovementM2m.id;
    const serviceNameToCall = transferServiceName;

    const payload = {parameters,id,serviceNameToCall}
    
    //targetComponent.setState({transferModalVisiable:false})
    dispatch({type:"_serviceVehicleMovementM2m/doJob",payload: payload})

    targetComponent.setState({transferModalVisiable:false})

  })
 

}


const buildTransferModal = (serviceVehicleMovementM2m,targetComponent) => {


  const {transferModalVisiable,targetLocalName,transferModalTitle,
    candidateReferenceList,transferTargetParameterName,currentValue} = targetComponent.state
  const { getFieldDecorator, validateFieldsAndScroll, getFieldsError } = targetComponent.props.form


  if(!candidateReferenceList||!candidateReferenceList.candidates){
    return null;
  }


  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }

  return(

<Modal title={transferModalTitle}
          visible={transferModalVisiable}
          onOk={()=>executeTrans(serviceVehicleMovementM2m,targetComponent)}
          onCancel={()=>hideCloseTrans(targetComponent)}
          
        >

  <Form >
            <Row gutter={16}>

              <Col lg={24} md={24} sm={24}>
                <Form.Item label={`请选择新的${targetLocalName}`} {...formItemLayout}>
                  {getFieldDecorator(transferTargetParameterName, {
                    rules: [{ required: true, message: '请搜索' }],
                    initialValue: currentValue
                  })(
                    <AutoComplete
                    dataSource={candidateReferenceList.candidates}
                    onSearch={(value)=>handleTransferSearch(targetComponent,value)}
                    >
                   {candidateReferenceList.candidates.map(item=>{
                return (<Option key={item.id}>{`${item.displayName}(${item.id})`}</Option>);
            })}
                    
                    </AutoComplete>
                  )}
                </Form.Item>
              </Col></Row>
              </Form>

          
        </Modal>)


}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////



const internalRenderExtraHeader = (serviceVehicleMovementM2m) =>{
	return null
}
const internalRenderExtraFooter = (serviceVehicleMovementM2m) =>{
	return null
}
const internalSubListsOf = (cardsData) =>{
	const {id} = cardsData.cardsSource;
	return (<Row gutter={24}>

           {cardsData.subItems.sort((x,y)=>x.displayName.localeCompare(y.displayName, 'zh-CN')).map((item)=>(<Col {...topColResponsiveProps} key={item.name}>   
           <Badge count={item.count} style={{ backgroundColor: '#52c41a' }} overflowCount={9999999999}>        
            <Card title={`${item.displayName}(${numeral(item.count).format('0,0')})`}  style={{ width: 180 }}>             
              <p><Link to={`/${cardsData.cardsFor}/${id}/list/${item.name}/${item.displayName}列表`}><FontAwesome name="gear"  />&nbsp;管理</Link></p>
              <p><Link to={`/${cardsData.cardsFor}/${id}/list/${item.type}CreateForm`}><FontAwesome name="plus"  />&nbsp;新增</Link></p>              
          </Card> </Badge>
            </Col>))}
          </Row>)
}

const internalSummaryOf = (serviceVehicleMovementM2m,targetComponent) =>{

	return (
	<DescriptionList className={styles.headerList} size="small" col="4">
<Description term="ID">{serviceVehicleMovementM2m.id}</Description> 
<Description term="服务状态">{serviceVehicleMovementM2m.serviceStatus}</Description> 
<Description term="服务人员">{serviceVehicleMovementM2m.responsibleWorker==null?"未分配":serviceVehicleMovementM2m.responsibleWorker.displayName}
 <Icon type="swap" onClick={()=>
  showTransferModel(targetComponent,"服务人员","vehicleServiceCompanyEmployee","requestCandidateResponsibleWorker",
	      "transferToAnotherResponsibleWorker","anotherResponsibleWorkerId",serviceVehicleMovementM2m.responsibleWorker?serviceVehicleMovementM2m.responsibleWorker.id:"")} 
  style={{fontSize: 20,color:"red"}} />
</Description>
<Description term="服务概述">{serviceVehicleMovementM2m.serviceSummary}</Description> 
<Description term="开始时间">{ moment(serviceVehicleMovementM2m.startTime).format('YYYY-MM-DD')}</Description> 
<Description term="经度">{serviceVehicleMovementM2m.longitude}</Description> 
<Description term="纬度">{serviceVehicleMovementM2m.latitude}</Description> 
<Description term="最后更新时间">{ moment(serviceVehicleMovementM2m.lastUpdateTime).format('YYYY-MM-DD')}</Description> 
<Description term="交接检查码">{serviceVehicleMovementM2m.transferVerifyCode}</Description> 
<Description term="年检订单">{serviceVehicleMovementM2m.mainOrder==null?"未分配":serviceVehicleMovementM2m.mainOrder.displayName}
 <Icon type="swap" onClick={()=>
  showTransferModel(targetComponent,"年检订单","vehicleInspectionOrder","requestCandidateMainOrder",
	      "transferToAnotherMainOrder","anotherMainOrderId",serviceVehicleMovementM2m.mainOrder?serviceVehicleMovementM2m.mainOrder.id:"")} 
  style={{fontSize: 20,color:"red"}} />
</Description>
<Description term="服务类型">{serviceVehicleMovementM2m.movementPurpose}</Description> 
<Description term="发送方">{serviceVehicleMovementM2m.driver==null?"未分配":serviceVehicleMovementM2m.driver.displayName}
 <Icon type="swap" onClick={()=>
  showTransferModel(targetComponent,"发送方","vehicleServiceCompanyEmployee","requestCandidateDriver",
	      "transferToAnotherDriver","anotherDriverId",serviceVehicleMovementM2m.driver?serviceVehicleMovementM2m.driver.id:"")} 
  style={{fontSize: 20,color:"red"}} />
</Description>
<Description term="接收方">{serviceVehicleMovementM2m.receiver==null?"未分配":serviceVehicleMovementM2m.receiver.displayName}
 <Icon type="swap" onClick={()=>
  showTransferModel(targetComponent,"接收方","vehicleServiceCompanyEmployee","requestCandidateReceiver",
	      "transferToAnotherReceiver","anotherReceiverId",serviceVehicleMovementM2m.receiver?serviceVehicleMovementM2m.receiver.id:"")} 
  style={{fontSize: 20,color:"red"}} />
</Description>
<Description term="通知日期时间">{ moment(serviceVehicleMovementM2m.notifyDatetime).format('YYYY-MM-DD')}</Description> 
<Description term="通知地址">{serviceVehicleMovementM2m.notifyAddress}</Description> 
<Description term="交接检查结果">{serviceVehicleMovementM2m.handoverResult}</Description> 
<Description term="商户">{serviceVehicleMovementM2m.merchant==null?"未分配":serviceVehicleMovementM2m.merchant.displayName}
 <Icon type="swap" onClick={()=>
  showTransferModel(targetComponent,"商户","vehicleServiceCompany","requestCandidateMerchant",
	      "transferToAnotherMerchant","anotherMerchantId",serviceVehicleMovementM2m.merchant?serviceVehicleMovementM2m.merchant.id:"")} 
  style={{fontSize: 20,color:"red"}} />
</Description>
	
        {buildTransferModal(serviceVehicleMovementM2m,targetComponent)}
      </DescriptionList>
	)

}


class ServiceVehicleMovementM2mPreference extends Component {

  state = {
    transferModalVisiable: false,
    candidateReferenceList: {},
    candidateServiceName:"",
    candidateObjectType:"city",
    targetLocalName:"城市",
    transferServiceName:"",
    currentValue:"",
    transferTargetParameterName:""


  }
  componentDidMount() {

  }
  

  render() {
    // eslint-disable-next-line max-len
    const { id,displayName, handOverChecklistResultCount } = this.props.serviceVehicleMovementM2m
    const cardsData = {cardsName:"移车服务",cardsFor: "serviceVehicleMovementM2m",cardsSource: this.props.serviceVehicleMovementM2m,
  		subItems: [
    
      	],
  	};
    //下面各个渲染方法都可以定制，只要在每个模型的里面的_features="custom"就可以得到定制的例子
    
    const renderExtraHeader = this.props.renderExtraHeader || internalRenderExtraHeader
    const settingListOf = this.props.settingListOf || internalSettingListOf
    const imageListOf = this.props.imageListOf || internalImageListOf
    const subListsOf = this.props.subListsOf || internalSubListsOf
    const largeTextOf = this.props.largeTextOf ||internalLargeTextOf
    const summaryOf = this.props.summaryOf || internalSummaryOf
    const renderExtraFooter = this.props.renderExtraFooter || internalRenderExtraFooter
    return (

      <PageHeaderLayout
        title={`${cardsData.cardsName}: ${displayName}`}
        content={summaryOf(cardsData.cardsSource,this)}
        wrapperClassName={styles.advancedForm}
      >
      {renderExtraHeader(cardsData.cardsSource)}
        <div>
        {settingListOf(cardsData.cardsSource)}
        {imageListOf(cardsData.cardsSource)}
        {subListsOf(cardsData)} 
        {largeTextOf(cardsData.cardsSource)}
          
        </div>
      </PageHeaderLayout>
    )
  }
}

export default connect(state => ({
  serviceVehicleMovementM2m: state._serviceVehicleMovementM2m,
}))(Form.create()(ServiceVehicleMovementM2mPreference))
