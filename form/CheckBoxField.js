import React from 'react';
import { ErrorMessage, useField } from 'formik';

const CheckboxField = ({ label, required, href, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });

  return (
    <>
      <div className="mb-3 form-check">
        <input
          id={field.name}
          type="checkbox"
          className={`form-check-input shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
          {...field}
          {...props}
        />
        <label className="form-check-label" htmlFor={field.name}>
          {label}{" "}
          {href && (
            <a href={href} target="_blank" rel="noopener noreferrer" className="terms_link">
              terms and conditions
            </a>
          )}
          {required && <span className="required">*</span>}
        </label>
        <ErrorMessage component="div" name={field.name} className="error" />
      </div>
      <style jsx>
        {`
        .terms_link{
            color:var(--brand-color-2)!important;
            text-decoration: underline !important;
        }
        `}
      </style>
    </>
  );
};

export default CheckboxField;
