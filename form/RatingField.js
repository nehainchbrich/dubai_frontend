import React from 'react'
import { ErrorMessage,useField } from 'formik'
import styles from '../styles/Rating.module.css';
const RatingField = ({label,...props}) => {
    const [field,meta]=useField(props);
  return (
    <>
    <div className={styles.rating}>
        <input type="radio" className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`} {...field} {...props} autoComplete="off" placeholder={label} id="star5" value="5"/>
        <label htmlFor="star5" className={styles.star}><span className="visually-hidden">{label}</span></label>
        <input type="radio" className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`} {...field} {...props} autoComplete="off" placeholder={label} id="star4" value="4"/>
        <label htmlFor="star4" className={styles.star}><span className="visually-hidden">{label}</span></label>
        <input type="radio" className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`} {...field} {...props} autoComplete="off" placeholder={label} id="star3" value="3"/>
        <label htmlFor="star3" className={styles.star}><span className="visually-hidden">{label}</span></label>
        <input type="radio" className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`} {...field} {...props} autoComplete="off" placeholder={label} id="star2" value="2"/>
        <label htmlFor="star2" className={styles.star}><span className="visually-hidden">{label}</span></label>
        <input type="radio" className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`} {...field} {...props} autoComplete="off" placeholder={label} id="star1" value="1"/>
        <label htmlFor="star1" className={styles.star}><span className="visually-hidden">{label}</span></label>
        <ErrorMessage component="div" name={field.name} className="error"/>
      </div>
    </>
  )
}

export default RatingField
