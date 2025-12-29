// DatePickerField.js
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ErrorMessage, useField } from 'formik';

const DatePickerField = ({ label, ...props }) => {
  const [field, meta,helpers] = useField(props);

  return (
    <div className='mb-3'>
      <label htmlFor={field.name} className="form-label">{label}</label>
      <div className='input-group'>
      <DatePicker id={field.name} {...field} {...props} className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
        autoComplete="off" placeholderText={label} dateFormat="MM/dd/yyyy" isClearable onChange={(date) => { helpers.setValue(date);}}/>
      <ErrorMessage component="div" name={field.name} className="error" />
      </div>
      
    </div>
  );
};

export default DatePickerField;
