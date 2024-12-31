import './tables.css'
import PropTypes from 'prop-types'
import IconButton from '../Buttons/IconButton'
import { TrashIcon } from '../Icons'
import Badge from '@badges/Badge'
function UsersTable(props) {
  const { data, handleDelete } = props
  return (
    <div className="elevated table-container">
      <div className="table-title">Current users</div>
      <table className="user-table">
        <thead>
          <tr className="table-header">
            <th>User</th>
            <th>Role</th>
            <th className="table-actions-cell">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.username}</td>
                <td><Badge text={user.role} className="background-badge" /></td>
                <td className="table-actions-cell">
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
