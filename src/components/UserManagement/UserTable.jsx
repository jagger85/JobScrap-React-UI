import './userManagement.css'
import { useQuery } from '@tanstack/react-query'
import useApi  from '../../hooks/useApi'
import { ToasterManager } from '../Toasters/Toasters'
function UserTable() {
    const {fetchUsers, deleteUser} = useApi()
    const {data, isError, error, isLoading, refetch} = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers
    })

    if(isLoading) return <h2>Loading...</h2> 
    if(isError) return <h2>Oooops something went wrong  {error}</h2>


    const handleDelete = async (username) => {
        const response = await deleteUser(username)
        if(response.ok){
            ToasterManager.showToast('success', 'User deleted successfully')
            refetch()
        }
    }
    return (
    <>
      <h2 className="user-table-title">Current users</h2>
      <table className="user-table">
        <thead>
          <tr className="user-table-header">
            <th className="user-table-header-first">User</th>
            <th>Role</th>
            <th className="user-table-header-last">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user,index) => {
            return (
                <tr key={index} className="user-table-row">
                <td className="user-table-data">{user.username}</td>
                <td className="user-table-data">{user.role}</td>
                <td className="user-table-data">
                  <button className="user-table-button" onClick={() => handleDelete(user.username)}>Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default UserTable
