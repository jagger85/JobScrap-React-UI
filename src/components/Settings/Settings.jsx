import './Settings.css'
import   {useState} from 'react' 
import useApi from '../../hooks/useApi'
import { ToasterManager } from '../Toasters/Toasters'
import FormInput from '../FormInput'
import useAuth from '../../hooks/useAuth'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
const Settings = () => {
  const {logOut} = useAuth()
  const {changePassword} = useApi()
  const {username} = useContext(AuthContext)
  const [values, setValues] = useState({
    newPassword: '',
    confirmPassword: ''
  })

  const inputs = [
    {
      id: '0',
      type: 'password',
      name: 'newPassword',
      label: 'New Password',
      placeholder: 'Place a password here',
      errorMessage: 'Password must have a minimum of 4 characters',
      required: true,
      pattern: `^[a-zA-Z0-9]{3,}$`,
    },
    {
      id: '1',
      type: 'password',
      name: 'confirmPassword',
      label: 'Confirm password',
      placeholder: 'Confirm the password',
      errorMessage: 'Passwords must match',
      required: true,
      pattern: values.newPassword,
    },
  ]


  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await changePassword(values.newPassword, username)
    if(response.ok){
      ToasterManager.showToast('success', 'Password changed successfully')
      setTimeout(() => {
        logOut()
      }, 3000);
    } else {
      ToasterManager.showToast('error', 'Failed to change password')
    }
  }
  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <div className="settings-content">
        <div className="settings-section">
          <h2>Change Password</h2>
          <form className="settings-form" onSubmit={handleSubmit}>
            {inputs.map((input) => {
              return (
                <FormInput
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={(e) => setValues({...values, [input.name]: e.target.value})}
                />
              )
            })}
            <button type="submit">Change Password</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Settings
