import React from 'react'
import PropTypes from 'prop-types'
import { Table, Card, Icon, Tooltip } from 'antd'
import { formatDate } from '../../../utils/formatDate'
import styles from './index.less'

class EventList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: this.props.dataSource.map(item => ({ ...item })),
      detailText: 'Expand',
      toggleEventLogVisible: false,
      iconType: 'plus-square',
    }
  }

  toggleEventLog = () => {
    this.setState({
      ...this.state,
      toggleEventLogVisible: !this.state.toggleEventLogVisible,
      detailText: !this.state.toggleEventLogVisible ? 'Collapse' : 'Expand',
      iconType: !this.state.toggleEventLogVisible ? 'minus-square' : 'plus-square',
    })
    if (!this.state.toggleEventLogVisible) {
      this.props.dispatch({
        type: 'eventlog/startWS',
        payload: {
          dispatch: this.props.dispatch,
          type: 'events',
          ns: 'eventlog',
        },
      })
    } else {
      this.props.dispatch({
        type: 'eventlog/stopWS',
      })
    }
  }

  render() {
    const columns = [
      {
        title: 'Name',
        key: 'name',
        render: (record) => {
          return (<div style={{ minWidth: 120 }}>{record.name}</div>)
        },
      }, {
        title: 'Kind',
        key: 'kind',
        render: (record) => {
          return (<div>{record.kind}</div>)
        },
      },
      {
        title: 'Source',
        key: 'source',
        render: (record) => {
          return (<div>{record.source}</div>)
        },
      },
      {
        title: 'Type',
        key: 'type',
        render: (record) => {
          return (<div>{record.type}</div>)
        },
      },
      {
        title: 'First Time',
        key: 'firstTimestamp',
        render: (record) => {
          return (<div>{formatDate(record.firstTimestamp)}</div>)
        },
      },
      {
        title: 'Last Time',
        key: 'lastTimestamp',
        render: (record) => {
          return (<div>{formatDate(record.lastTimestamp)}</div>)
        },
      },
      {
        title: 'Reason',
        key: 'reason',
        render: (record) => {
          return (<div>{record.reason}</div>)
        },
      },
      {
        title: 'Message',
        key: 'message',
        width: 400,
        render: (record) => {
          return (<div>{record.message}</div>)
        },
      },
    ]
    return (<Card bodyStyle={{ padding: 0 }}
      title={<div className={styles.header}>
      <div className="title" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Tooltip title={this.state.toggleEventLogVisible ? 'Click to Collapse' : 'Click to Expand'}>
          <div><Icon type={this.state.iconType} style={{ marginRight: 10 }} onClick={() => this.toggleEventLog()} /> Event Log</div>
        </Tooltip>
      </div></div>}
      bordered={false}>{this.state.toggleEventLogVisible ? <div style={{ padding: 24 }}>
        <Table
          bordered={false}
          columns={columns}
          dataSource={this.props.dataSource}
          rowKey={record => record.id}
        />
      </div> : <div></div>}</Card>
    )
  }
}

EventList.propTypes = {
  dataSource: PropTypes.array,
  dispatch: PropTypes.func,
}

export default EventList
