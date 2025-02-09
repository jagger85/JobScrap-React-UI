import './panels.css'
import { useState } from 'react'
import { CollapseIcon, TrashIcon, DownloadIcon} from '@icons'
import IconButton from '@buttons/IconButton'
import PropTypes from 'prop-types'
import {downloadCSV} from '@utils/csvManager'
import useApi from '@hooks/useApi'
import OperationStatusBadge from '../Badges/OperationStatusBadge/OperationStatusBadge'
import { PLATFORM_ICONS } from '@constants'

export default function CollapsablePanel(props) {
  const { fetchOperationByTaskId } = useApi()
  const { operation, children, onDelete} = props
  const [isOpen, setIsOpen] = useState(false)

  function togglePanel() {
    setIsOpen(!isOpen)
  }
  async function handleDownload(){
    const data = await fetchOperationByTaskId(operation.taskId)
    downloadCSV(data.listings)
  }

  return (
    <div className='elevated'>
      <div className="cp-panel-header-collapsable" onClick={togglePanel}>
        <div className='cp-panel-header-data'>
        <img src={PLATFORM_ICONS[operation.platform.toUpperCase()]} style={{ width: '30px', height: '30px' }} />
        <div className="cp-panel-header-item"><span className="cp-panel-header-item-platform">{operation.platform}</span></div>
        <div className="cp-panel-header-item">Keywords: <span>{operation.keywords}</span></div>
        <div className="cp-panel-header-item">Date range: <span>{operation.dateRange}</span></div>
        </div>
        <div className={isOpen ? 'cp-icon-open' : 'cp-icon-closed'}>
          <CollapseIcon />
        </div>
      </div>
      <div
        className={`cp-content cp-content-collapsable ${
          isOpen ? 'cp-content-open' : 'cp-content-closed'
        }`}
      >
        {children}
        <div className='cp-content-row'>
        <div className='cp-content-row-items'>
        <OperationStatusBadge status={operation.status}/>
        <div>Listings: {operation.numberOfListings}</div>
        </div>
        <div className='cp-panel-header-item-actions'>
          <IconButton type='squared download' icon={DownloadIcon} onClick={handleDownload} disabled={operation.status !== 'Completed'} />
          <IconButton type='squared delete' icon={TrashIcon} onClick={() => onDelete(operation.id)} />
        </div>
        </div>

        <div className='cp-panel-header-item-message'>{operation.message}</div>
      </div>
    </div>
  )
}

CollapsablePanel.propTypes = {
  operation: PropTypes.object.isRequired,
  children: PropTypes.node,
  onDelete: PropTypes.func.isRequired,
}