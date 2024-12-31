import './tables.css'
import PropTypes from 'prop-types'
import IconButton from '../Buttons/IconButton'
import { TrashIcon } from '../Icons'

function UsersTable(props) {
  const { data, handleDelete } = props
  return (
    <div className="user-table-container elevated" >
    <div className="table-title">Current users</div>
   <table className="user-table">
     <thead>
       <tr>
         <th>User</th>
         <th>Role</th>
         <th>Actions</th>
       </tr>
     </thead>
     <tbody>
       {data.map((user, index) => {
         return (
           <tr key={index}>
             <td>{user.username}</td>
             <td>{user.role}</td>
             <td className="table-actions">
               <IconButton
                 icon={TrashIcon}
                 type="table-delete-button squared"
                 onClick={() => handleDelete(user.username)}
                 />
             </td>
           </tr>
         )
       })}
     </tbody>
   </table>
   </div>
  )
}

UsersTable.propTypes = {
  data: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default UsersTable