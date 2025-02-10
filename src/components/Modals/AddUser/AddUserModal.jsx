import '../overlay.css'
import './addUserModal.css'
import PropTypes from 'prop-types'
import { customSelectStyle } from '@utils/reactCustomStyle'
import { useState } from 'react'
import FormInput from '@components/FormInput'
import Select from 'react-select'
import useApi from '@hooks/useApi'
import { ToasterManager } from '@toasters/Toasters'
import { useQueryClient } from '@tanstack/react-query'
import IconButton from '@buttons/IconButton'
import {CloseIcon} from '@icons'
import StandardButton from '@buttons/StandardButton'

const roleOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'user', label: 'User' },
  { value: 'guest', label: 'Guest' },
]

function AddUserModal({ onClose }) {
  const queryClient = useQueryClient()
  const { services } = useApi()

  const [values, setValues] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    role: null,
  })

  const inputs = [
    {
      id: '0',
      type: 'text',
      name: 'username',
      label: 'Username',
      placeholder: 'John Connor',
      errorMessage: 'A minimun of three characters',
      required: true,
      pattern: `^[a-zA-Z0-9]{3,}$`,
    },
    {
      id: '1',
      type: 'password',
      name: 'password',
      label: 'Password',
      placeholder: 'Place a password here',
      errorMessage: 'Password must have a minimum of 4 characters',
      required: true,
      pattern: `^[a-zA-Z0-9]{3,}$`,
    },
    {
      id: '2',
      type: 'password',
      name: 'confirmPassword',
      label: 'Confirm password',
      placeholder: 'Confirm the password',
      errorMessage: 'Passwords must match',
      required: true,
      pattern: values.password,
    },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await services.users.addUser(
        values.username,
        values.password,
        values.role
      )
      ToasterManager.showToast('success', 'User added successfully')
      queryClient.refetchQueries(['users'])
      onClose()
    } catch (error) {
      ToasterManager.showToast('error', error.response?.data?.message || 'Failed to add user')
      onClose()
    }
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleRoleChange = (selectedOption) => {
    setValues((prevValues) => ({
      ...prevValues,
      role: selectedOption.value, // Update the role with the selected value
    }))
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content elevated">
        <div className="modal-header">
          <div className="modal-title">Add user</div>
          <IconButton icon={CloseIcon} onClick={onClose}  type='squared'/>
        </div>
        <form onSubmit={handleSubmit} className="add-user-form">
          {inputs.map((input) => {
            return (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            )
          })}
          <div style={{ width: '395px' }}>
            <label>Role</label>
            <Select
              styles={customSelectStyle}
              placeholder="Select role..."
              isSearchable={false}
              options={roleOptions}
              onChange={handleRoleChange}
              value={roleOptions.find((option) => option.value == values.role)}
            />
          </div>
          <StandardButton type="submit" text='Add user' className='standard-button'/>
        </form>
        </div>
      </div>
  )
}

AddUserModal.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default AddUserModal
