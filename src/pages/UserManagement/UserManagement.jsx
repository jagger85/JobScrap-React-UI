import UserTable from './UserTable'
import AddUser from './AddUser'
import PageLayout from '../../Layout/PageLayout'
import Section from '../../components/Section/Section'
import { CreateIcon } from '../../components/Icons'
import IconButton from '../../components/Buttons/IconButton'

function UserManagement() {
  const handleCreate = () => {
    console.log('create')
  }

  return (
    <PageLayout title="User Management">
      <Section>
        <div className="dashboard-header">
          <IconButton icon={CreateIcon} onClick={handleCreate} type="rounded" />
          <div className="dashboard-header-subtitle">Create a new user</div>
        </div>
      </Section>
      <Section>
        <UserTable />
      </Section>
      <AddUser />
    </PageLayout>
  )
}

export default UserManagement
