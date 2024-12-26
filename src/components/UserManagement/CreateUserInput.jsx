import { useState } from "react"

function CreateUserInput(props) {
    
    const [focused, setFocused] = useState(false)
    const { label, errorMessage, onChange, id, ...inputProps} = props
    
    const handleFocus = (e) => {
        setFocused(true)
    }

    return (
    <div className="user-form-input">
        <label>{label}</label>
        <input className="form-input" {...inputProps} onChange={onChange} onBlur={handleFocus} focused={focused.toString()}/>
        <span>{errorMessage}</span>
    </div>
  )
}

export default CreateUserInput