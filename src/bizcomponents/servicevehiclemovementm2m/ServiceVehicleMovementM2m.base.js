
import ImagePreview from '../../components/ImagePreview'
import { Link } from 'dva/router'
import moment from 'moment'
const menuData = {menuName:"移车服务", menuFor: "serviceVehicleMovementM2m",
  		subItems: [
  {name: 'handOverChecklistResultList', displayName:'交接检查结果', icon:'check'},
  
  		],
}



const displayColumns = [
  { title: 'ID', debugtype: 'string', dataIndex: 'id', width: '20', render: (text, record)=>(<Link to={`/serviceVehicleMovementM2m/${text}/dashboard`}>{text}</Link>) },
  { title: '服务状态', debugtype: 'string', dataIndex: 'serviceStatus', width: '7' },
  { title: '服务人员', dataIndex: 'responsibleWorker', render: (text, record) => (record.responsibleWorker ? record.responsibleWorker.displayName : '暂无') },
  { title: '服务概述', debugtype: 'string', dataIndex: 'serviceSummary', width: '42' },
  { title: '开始时间', dataIndex: 'startTime', render: (text, record) => moment(record.startTime).format('YYYY-MM-DD HH:mm:ss') },
  { title: '经度', debugtype: 'double', dataIndex: 'longitude', width: '12' },
  { title: '纬度', debugtype: 'double', dataIndex: 'latitude', width: '11' },
  { title: '最后更新时间', dataIndex: 'lastUpdateTime', render: (text, record) => moment(record.lastUpdateTime).format('YYYY-MM-DD HH:mm:ss') },
  { title: '交接检查码', debugtype: 'string', dataIndex: 'transferVerifyCode', width: '10' },
  { title: '年检订单', dataIndex: 'mainOrder', render: (text, record) => (record.mainOrder ? record.mainOrder.displayName : '暂无') },
  { title: '服务类型', debugtype: 'string', dataIndex: 'movementPurpose', width: '30' },
  { title: '发送方', dataIndex: 'driver', render: (text, record) => (record.driver ? record.driver.displayName : '暂无') },
  { title: '接收方', dataIndex: 'receiver', render: (text, record) => (record.receiver ? record.receiver.displayName : '暂无') },
  { title: '通知日期时间', dataIndex: 'notifyDatetime', render: (text, record) => moment(record.notifyDatetime).format('YYYY-MM-DD HH:mm:ss') },
  { title: '通知地址', debugtype: 'string', dataIndex: 'notifyAddress', width: '18' },
  { title: '备注', debugtype: 'string', dataIndex: 'notifyComment', width: '95' },
  { title: '交接检查结果', debugtype: 'string', dataIndex: 'handoverResult', width: '6' },
  { title: '交接检查备注', debugtype: 'string_longtext', dataIndex: 'handoverResultComment', width: '10' },
  { title: '商户', dataIndex: 'merchant', render: (text, record) => (record.merchant ? record.merchant.displayName : '暂无') },

]

const fieldLabels = {
  id: 'ID',
  serviceStatus: '服务状态',
  responsibleWorker: '服务人员',
  serviceSummary: '服务概述',
  startTime: '开始时间',
  longitude: '经度',
  latitude: '纬度',
  lastUpdateTime: '最后更新时间',
  transferVerifyCode: '交接检查码',
  mainOrder: '年检订单',
  movementPurpose: '服务类型',
  driver: '发送方',
  receiver: '接收方',
  notifyDatetime: '通知日期时间',
  notifyAddress: '通知地址',
  notifyComment: '备注',
  handoverResult: '交接检查结果',
  handoverResultComment: '交接检查备注',
  merchant: '商户',

}


const ServiceVehicleMovementM2mBase={menuData,displayColumns,fieldLabels,displayColumns}
export default ServiceVehicleMovementM2mBase



