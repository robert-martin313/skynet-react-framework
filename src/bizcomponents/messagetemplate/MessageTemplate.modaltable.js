
import React, { PureComponent } from 'react'
import moment from 'moment'
import { Table, Alert, Badge } from 'antd'
import styles from './MessageTemplate.table.less'
import ImagePreview from '../../components/ImagePreview'
import MessageTemplateBase from './MessageTemplate.base'


class MessageTemplateModalTable extends PureComponent {
  render() {
    // const { data,count,current, owner } = this.props
    const { data } = this.props
	const {displayColumns} = MessageTemplateBase

    return (
      <div className={styles.standardTable}>
        <div className={styles.tableAlert}>
          <Alert
            message={(
              <p>
                一共 <a style={{ fontWeight: 600 }}>{data.length}</a> 项 
              </p>
            )}
            type="warning"
            showIcon
          />
        </div>
        <Table
          rowKey={record => record.id}
          dataSource={data}
          columns={displayColumns}
          size="small"
          scroll={{ x: 800 }}
        />
      </div>
    )
  }
}

export default MessageTemplateModalTable
