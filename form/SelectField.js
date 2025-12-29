import React from 'react';
import { ErrorMessage, useField } from 'formik';

const SelectField = ({ label,required, options, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <div className='mb-3'>
        <label htmlFor={field.name}>{label} {required && <span className="required">*</span>}</label>
        <select
          className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
          {...field}
          {...props}
        >
            <option defaultValue="SELECT">SELECT</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ErrorMessage component="div" name={field.name} className="error" />
      </div>
    </>
  );
};

export default SelectField;
