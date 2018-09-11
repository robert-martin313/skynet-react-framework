
import ImagePreview from '../../components/ImagePreview'
import { Link } from 'dva/router'
import moment from 'moment'




const menuData = {menuName:"举报", menuFor: "inform",
  		subItems: [
  
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
  { title: 'ID', debugtype: 'string', dataIndex: 'id', width: '20',render: (text, record)=>renderTextCell(text,record) },
  { title: '举报人', dataIndex: 'informer', render: (text, record) => renderReferenceCell(text, record)},
  { title: '活动评论', dataIndex: 'campaignReview', render: (text, record) => renderReferenceCell(text, record)},
  { title: '书评', dataIndex: 'bookReview', render: (text, record) => renderReferenceCell(text, record)},
  { title: '创建时间', dataIndex: 'creationTime', render: (text, record) =>renderDateTimeCell(text,record)  },
  { title: '评论', debugtype: 'string', dataIndex: 'comments', width: '8',render: (text, record)=>renderTextCell(text,record) },

]

const fieldLabels = {
  id: 'ID',
  informer: '举报人',
  campaignReview: '活动评论',
  bookReview: '书评',
  creationTime: '创建时间',
  comments: '评论',

}


const InformBase={menuData,displayColumns,fieldLabels,displayColumns}
export default InformBase



