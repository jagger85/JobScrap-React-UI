import './panels.css'
import { useState } from 'react'
import { CollapseIcon, TrashIcon, DownloadIcon} from '@icons'
import IconButton from '@buttons/IconButton'

export default function CollapsablePanel(props) {
  const { operation, children, onDelete} = props
  const [isOpen, setIsOpen] = useState(false)

  function togglePanel() {
    setIsOpen(!isOpen)
  }

  return (
    <div className='elevated'>
      <div
        className="cp-panel-header-collapsable"
        onClick={togglePanel}
      >

        <div className='cp-panel-header-data'>
        <img src={operation.icon} style={{ width: '30px', height: '30px' }} />
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
        <div>Status: {operation.status}</div>
        <div>Listings: {operation.numberOfListings}</div>
        <div className='cp-panel-header-item-actions'>
          <IconButton type='squared' icon={DownloadIcon}/>
          <IconButton type='squared' icon={TrashIcon} onClick={() => onDelete(operation.id)}/>
        </div>
      </div>
    </div>
  )
}
