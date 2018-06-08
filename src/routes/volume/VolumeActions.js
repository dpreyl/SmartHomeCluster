import React, { PropTypes } from 'react'
import { Modal } from 'antd'
import { DropOption } from '../../components'
const confirm = Modal.confirm

function actions({ selected, showAttachHost, detach, showEngineUpgrade, deleteVolume, showBackups, showSalvage }) {
  const handleMenuClick = (event, record) => {
    switch (event.key) {
      case 'attach':
        showAttachHost(record)
        break
      case 'salvage':
        showSalvage(record)
        break
      case 'delete':
        confirm({
          title: `Are you sure you want to delete volume ${record.name} ?`,
          onOk() {
            deleteVolume(record)
          },
        })
        break
      case 'detach':
        confirm({
          title: `Are you sure you want to detach volume ${record.name} ?`,
          onOk() {
            detach(record.actions.detach)
          },
        })
        break
      case 'engineUpgrade':
        showEngineUpgrade(record)
        break
      case 'backups':
        showBackups(record)
        break
      default:
    }
  }

  const allActions = [
    { key: 'attach', name: 'Attach' },
    { key: 'detach', name: 'Detach' },
    { key: 'engineUpgrade', name: 'Upgrade' },
    { key: 'salvage', name: 'Salvage' },
  ]
  const availableActions = [{ key: 'backups', name: 'Backups' }, { key: 'delete', name: 'Delete' }]
  allActions.forEach(action => {
    for (const key of Object.keys(selected.actions)) {
      if (key === action.key) {
        availableActions.push(action)
      }
    }
  })
  return (
    <DropOption menuOptions={availableActions} onMenuClick={(e) => handleMenuClick(e, selected)}
    />
  )
}

actions.propTypes = {
  selected: PropTypes.object,
  detach: PropTypes.func,
  deleteVolume: PropTypes.func,
  showAttachHost: PropTypes.func,
  showEngineUpgrade: PropTypes.func,
  showRecurring: PropTypes.func,
  showSnapshots: PropTypes.func,
  showBackups: PropTypes.func,
  takeSnapshot: PropTypes.func,
  showSalvage: PropTypes.func,
}

export default actions
