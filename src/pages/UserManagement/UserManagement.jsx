import AddUserModal from '@modals/AddUser/AddUserModal'
import PageLayout from '../../Layout/PageLayout'
import { CreateIcon } from '../../components/Icons'
import IconButton from '../../components/Buttons/IconButton'
import { useQuery } from '@tanstack/react-query'
import useApi from '../../hooks/useApi'
import { ToasterManager } from '../../components/Toasters/Toasters'
import UsersTable from '../../components/Tables/UsersTable'
import { useState } from 'react'
function UserManagement() {

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleClose = () => {
    console.log('close')
    setIsModalOpen(false)
    refetch()
  }
  const handleOpen = () => {
    setIsModalOpen(true)
  }

  const { services } = useApi()
  const { data, isError, error, isLoading, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: () => services.users.fetchUsers(),
  })

  const handleDelete = async (username) => {
    try {
      await services.users.deleteUser(username)
      ToasterManager.showToast('success', 'User deleted successfully')
      await refetch()
    } catch (error) {
      ToasterManager.showToast('error', error.response?.data?.message || 'Failed to delete user')
    }
  }
    if (isLoading) return <h2>Loading...</h2>
    if (isError) return <h2>Oooops something went wrong {error}</h2>

  return (
    <PageLayout title="User Management">
        <div className="dashboard-header">
          <IconButton icon={CreateIcon} onClick={handleOpen} type="rounded" />
          <div className="dashboard-header-subtitle">Create a new user</div>
        </div>
        <UsersTable data={data} handleDelete={handleDelete} />
      {isModalOpen && <AddUserModal onClose={handleClose} />}
    </PageLayout>
  )
}

export default UserManagement
