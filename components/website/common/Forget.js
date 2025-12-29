import TextField from '@/form/TextField'
import { Form, Formik } from 'formik'
import API_URLS from '@/config/apiconfig'
import React from 'react'
import { ForgetSchema } from '@/schema/ForgetSchema'
const Forget = () => {
    const defaultValue={username:""}
    const handleSubmit=async (value,action)=>{
        try {
          const response = await fetch(`${API_URLS.FORGET}`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(value)
        })
        const res= await response.json()
        if(res.status===true){
          localStorage.clear();
          action.resetForm();
          localStorage.setItem('fgEmail', res.email);
          $(".valid_otp").trigger('click')
        }else{
            toastr.error(res.message);
        }
        } catch (error) {
          throw Error(error);
        }
      }
  return (
    <>
      
      <Formik initialValues={defaultValue} onSubmit={handleSubmit} validationSchema={ForgetSchema}>
        <Form className='logRegFrm'>
            <TextField type="text" name="username" label="Email ID/Mobile"/>
             <div className='mb-2'>
                <button type="submit" className='btns btn-blue btn-100'>Send OTP</button>
             </div>
             <p className='text-center'>OR</p>
             <div className='mb-2'>
                <button type="button" className='hide valid_otp' data-bs-toggle="modal" data-bs-target="#valid_Otp"/>
                <button type="button" className='btns btn-orange btn-100' data-bs-toggle="modal" data-bs-target="#login">Login</button>
             </div>
        </Form>
      </Formik>
    </>
  )
}

export default Forget
