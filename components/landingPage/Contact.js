import React from 'react'
import { TriggerSchema } from '@/schema/TriggerSchema'
import TextField from '@/form/TextField'
import { Form, Formik } from 'formik'
import styles from '../../styles/landing/landing.module.css'
const Contact = () => {
    const defaultValue={
        name:"",
        email:"",
        mobile:"",
        city:""
      }
    const handleSubmit=async (value,action)=>{
        try {
          const response = await fetch('https://admin.inchbrick.com/api/external-lead',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(value)
        })
        const res= await response.json()
        if(res.status===true){
          action.resetForm();
          window.location.href = '/thank-you';
        }else{
            toastr.error(res.message);
        }
        } catch (error) {
          throw Error(error);
        }
      }
  return (
    <>
    <div className="container">
        <div className='row'>
            <div className='col-md-7'>
                <div className="section-title">
                    <h2>Get In Touch</h2>
                    <p>YOU MATTER TO US. WE WOULD LOVE TO HEAR FROM YOU!</p>
                    <p className="contact-error text-danger"></p>
                </div>
                <Formik initialValues={defaultValue} onSubmit={handleSubmit} validationSchema={TriggerSchema}>
                    <Form className='logRegFrm'>
                        <TextField type="text" name="name" label="Full Name"/>
                        <TextField type="email" name="email" label="Email ID"/>
                        <TextField type="tel" name="mobile" label="Mobile No."/>
                        <TextField type="text" name="city" label="City"/>
                        <div className='mb-2 text-center'>
                            <button type="submit" className='btns btn-blue btn-50'>Pre Register Now</button>
                        </div>
                    </Form>
                </Formik>
            </div>
            <div className='col-md-5'>
                <div className="section-title">
                    <h2>Contact Info</h2>
                </div>
                <div className={styles.contact_item}>
                <p><span>Address</span>Inchbrick Realty, Office 1303,1302 13th floor,<br/>
                    Burlington Tower Business Bay,Dubai, United Arab Emirates</p>
                </div>
                <div className={styles.contact_item}>
                <p><span>Dubai Mobile</span> 971547614449</p>
                <p><span>India Mobile</span> +91 9999015246</p>
                </div>
                <div className={styles.contact_item}>
                <p><span>Email</span> info@inchbrick.com</p>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Contact
