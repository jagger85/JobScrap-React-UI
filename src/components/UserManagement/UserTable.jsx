import './userManagement.css'
function UserTable() {
  return (
    <>
      <h2 className="user-table-title">Current users</h2>
      <table className="user-table">
        <thead>
          <tr className="user-table-header">
            <th>User</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Add user rows here */}
          <tr className="user-table-row">
            <td className="user-table-data">Example User</td>
            <td className="user-table-data">Admin</td>
            <td className="user-table-data">
              <button className="user-table-button">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default UserTable
