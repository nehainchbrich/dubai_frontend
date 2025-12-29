import TextField from '@/form/TextField'
import { Form, Formik } from 'formik'
import API_URLS from '@/config/apiconfig'
import React,{useState} from 'react'
import { ValidateSchema } from '@/schema/ValidateSchema'
const ValidOtp = () => {
    const defaultValue={otp:""}
    const handleSubmit=async (value,action)=>{
        const email = localStorage.getItem("fgEmail");
        try {
          const response = await fetch(`${API_URLS.VALID_OTP}`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({otp:value.otp,email:email})
        })
        const res= await response.json()
        if(res.status===true){
            $(".reset_pass").trigger('click')
        }else{
            toastr.error(res.message);
        }
        } catch (error) {
          throw Error(error);
        }
      }
      
  return (
    <>
      
      <Formik initialValues={defaultValue} onSubmit={handleSubmit} validationSchema={ValidateSchema}>
        <Form className='logRegFrm'>
            <TextField type="text" name="otp" label="otp"/>
             <div className='mb-2'>
                <button type="submit" className='btns btn-blue btn-100'>Validate</button>
             </div>
             <p className='text-center'>OR</p>
             <div className='mb-2'>
                <button type="button" className='hide reset_pass' data-bs-toggle="modal" data-bs-target="#reset_pass"/>
                <button type="button" className='btns btn-orange btn-100' data-bs-toggle="modal" data-bs-target="#login">Login</button>
             </div>
        </Form>
      </Formik>
    </>
  )
}

export default ValidOtp
