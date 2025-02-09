import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
const OperationStatusBadge = ({ status }) => {
    const [currentStatus, setCurrentStatus] = useState(status)

    useEffect(() => {
        console.log(status)
        setCurrentStatus(status)
    }, [status])

    const getOperationClass = () => {
        switch (currentStatus) {
            case 'Processing':
                return 'operation-processing';
            case 'Error':
                return 'operation-failed';
            case 'Completed':
                return 'operation-finished';
            default:
                return 'operation-idle';
        }
    };

    
    return ( 
        <div className="operation-status-badge-wrapper">
            <div className={`operation-dot ${getOperationClass()}`} />
            {currentStatus}
        </div> 
    );
}

OperationStatusBadge.propTypes = {
    status: PropTypes.string.isRequired,
}
 
export default OperationStatusBadge;