import React from 'react'
import { ErrorMessage,useField } from 'formik'
const TextField = ({label,required,...props}) => {
    const [field,meta]=useField(props);
  return (
    <>
      <div className='mb-3'>
        <label htmlFor={field.name}>{label} {required && <span className="required">*</span>}</label>
        <input className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`} {...field} {...props} autoComplete="off" placeholder={label}/>
            <ErrorMessage component="div" name={field.name} className="error"/>
      </div>

    </>
  )
}

export default TextField
