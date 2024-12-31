import AddUser from './AddUser'
import PageLayout from '../../Layout/PageLayout'
import Section from '../../components/Section/Section'
import { CreateIcon } from '../../components/Icons'
import IconButton from '../../components/Buttons/IconButton'
import { useQuery } from '@tanstack/react-query'
import useApi from '../../hooks/useApi'
import { ToasterManager } from '../../components/Toasters/Toasters'
import UsersTable from '../../components/Tables/UsersTable'
import { useState } from 'react'
function UserManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCreate = () => {
    console.log('create')
  }

  const handleClose = () => {
    setIsModalOpen(false)
  }
  const handleOpen = () => {
    setIsModalOpen(true)
  }

  const { fetchUsers, deleteUser } = useApi()
  const { data, isError, error, isLoading, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  const handleDelete = async (username) => {
    const response = await deleteUser(username)
    if (response.ok) {
      ToasterManager.showToast('success', 'User deleted successfully')
      refetch()
    }
  }
    if (isLoading) return <h2>Loading...</h2>
    if (isError) return <h2>Oooops something went wrong {error}</h2>

  return (
    <PageLayout title="User Management">
      <Section>
        <div className="dashboard-header">
          <IconButton icon={CreateIcon} onClick={handleCreate} type="rounded" />
          <div className="dashboard-header-subtitle">Create a new user</div>
        </div>
      </Section>
      <Section>
        <UsersTable data={data} handleDelete={handleDelete} />
      </Section>
      <AddUser />
    </PageLayout>
  )
}

export default UserManagement
