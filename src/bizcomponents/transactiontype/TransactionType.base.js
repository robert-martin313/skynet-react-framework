
import ImagePreview from '../../components/ImagePreview'
import { Link } from 'dva/router'
import moment from 'moment'




const menuData = {menuName:"交易类型", menuFor: "transactionType",
  		subItems: [
  {name: 'platformAccountDetailsList', displayName:'平台账户明细', icon:'at'},
  {name: 'fundationAccountDetailsList', displayName:'平台基金账户明细', icon:'at'},
  {name: 'storeAccountDetailsList', displayName:'网点账户明细', icon:'store'},
  {name: 'customerAccountTransactionList', displayName:'客户账户明细', icon:'om'},
  
  		],
}

const renderTextCell=(value, record)=>{

	if(!value){
		return '';
	}
	if(value==null){
		return '';
	}
	if(value.length>15){
		return value.substring(0,15)+"...("+value.length+"字)"
	}
	return value
	
}

const renderIdentifier=(value, record, targtObjectType)=>{

	return (<Link to={`/${targtObjectType}/${value}/dashboard`}>{value}</Link>)
	
}

const renderDateCell=(value, record)=>{
	return moment(value).format('YYYY-MM-DD');
}
const renderDateTimeCell=(value, record)=>{
	return moment(value).format('YYYY-MM-DD HH:mm');	
}

const renderImageCell=(value, record, title)=>{
	return (<ImagePreview imageTitle={title} imageLocation={value} />)	
}

const renderMoneyCell=(value, record)=>{
	if(!value){
		return '空'
	}
	if(value == null){
		return '空'
	}
	return (`￥${value.toFixed(2)}`)
}

const renderBooleanCell=(value, record)=>{

	return  (value? '是' : '否')

}

const renderReferenceCell=(value, record)=>{

	return (value ? value.displayName : '暂无') 

}

const displayColumns = [
  { title: 'ID', debugtype: 'string', dataIndex: 'id', width: '20', render: (text, record)=>renderIdentifier(text,record,'transactionType') },
  { title: '名称', debugtype: 'string', dataIndex: 'name', width: '10',render: (text, record)=>renderTextCell(text,record) },
  { title: '代码', debugtype: 'string', dataIndex: 'code', width: '24',render: (text, record)=>renderTextCell(text,record) },
  { title: '帐户数据', dataIndex: 'accountData', render: (text, record) => renderReferenceCell(text, record)},

]

const fieldLabels = {
  id: 'ID',
  name: '名称',
  code: '代码',
  accountData: '帐户数据',

}


const TransactionTypeBase={menuData,displayColumns,fieldLabels,displayColumns}
export default TransactionTypeBase



