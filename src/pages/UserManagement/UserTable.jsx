import './userManagement.css'
import { useQuery } from '@tanstack/react-query'
import useApi from '../../hooks/useApi'
import { ToasterManager } from '../../components/Toasters/Toasters'
import IconButton from '../../components/Buttons/IconButton'
import { TrashIcon } from '../../components/Icons'
function UserTable() {
  const { fetchUsers, deleteUser } = useApi()
  const { data, isError, error, isLoading, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  if (isLoading) return <h2>Loading...</h2>
  if (isError) return <h2>Oooops something went wrong {error}</h2>

  const handleDelete = async (username) => {
    const response = await deleteUser(username)
    if (response.ok) {
      ToasterManager.showToast('success', 'User deleted successfully')
      refetch()
    }
  }
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
            <tr key={index} className="user-table-row">
              <td className="user-table-data">{user.username}</td>
              <td className="user-table-data">{user.role}</td>
              <td className="user-table-data">
                <IconButton
                  icon={TrashIcon}
                  type="squared"
                  size={20}
                  onClick={() => handleDelete(user.username)}
                  >
                  Delete
                </IconButton>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
        </div>
  )
}

export default UserTable
