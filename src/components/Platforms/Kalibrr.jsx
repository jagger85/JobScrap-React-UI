import useApi from '../../hooks/useApi'
import FormInput from '../FormInput'
import { useState } from 'react'
import './platforms.css'

const Kalibrr = () => {
  const { scrapOperationsByDateRange } = useApi()
  const inputs = [
    {
      id: 1,
      name: 'keywords',
      type: 'text',
      placeholder: 'Enter keywords',
      label: 'Keywords',
      required: true,
      pattern: `^[a-zA-Z0-9]{3,}$`,
      errorMessage: 'Keywords must have a minimum of 3 characters',
    },
    {
      id: 2,
      name: 'dateRange',
      type: 'text',
      placeholder: 'Select date range',
      label: 'Date Range',
      required: true,
      pattern: `^[1-9]|[1-2][0-9]|30$`,
      errorMessage: 'Date range must be a number between 1 and 30',
    },
  ]
  const [values, setValues] = useState({
    keywords: '',
    dateRange: '',
  })

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await scrapOperationsByDateRange(
      values.keywords,
      values.dateRange,
      'kalibrr'
    )
    console.log(response)
  }

  return (
    <div className="elevated">
      <form className="dashboard-form" onSubmit={handleSubmit}>
        <h2>Kalibrr</h2>
        <div className="platform-inputs">
        {inputs.map((input) => (
            <FormInput className="platform-input" key={input.id} {...input} onChange={onChange} />
        ))}
        <button className="platform-button" type="submit">Search</button>
        </div>
      </form>
    </div>
  )
}

export default Kalibrr
