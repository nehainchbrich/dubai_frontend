import TextField from '@/form/TextField'
import { LoginSchema } from '@/schema/LoginSchema'
import { Form, Formik } from 'formik'
import API_URLS from '@/config/apiconfig'
import React from 'react'
import { useAuth } from '@/helper/Auth'
const LoginFrm = () => {

  const {handleAuth} =useAuth();
    const defaultValue={username:"", password:""}
    const handleSubmit=async (value,action)=>{
        try {
          const response = await fetch(`${API_URLS.USER}`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(value)
        })
        const res= await response.json()
        if(res.status===true){
          action.resetForm();
          $(".modal-close").trigger('click');
          handleAuth(res.token);
        }else{
            toastr.error(res.message);
        }
        } catch (error) {
          throw Error(error);
        }
      }
  return (
    <>
      
      <Formik initialValues={defaultValue} onSubmit={handleSubmit} validationSchema={LoginSchema}>
        <Form className='logRegFrm'>
            <TextField type="text" name="username" label="Email ID/Mobile"/>
            <TextField type="password" name="password" label="Password"/>
            <div className='mb-2 col-md-12 text-end'>
            <span><a href="#" className='smaall-fnt' data-bs-toggle="modal" data-bs-target="#forget">Forget Password?</a></span>
             </div>
             <div className='mb-2'>
                <button type="submit" className='btns btn-blue btn-100'>Login</button>
             </div>
             <p className='text-center'>OR</p>
             <div className='mb-2'>
                <button type="button" className='btns btn-orange btn-100' data-bs-toggle="modal" data-bs-target="#signup">Register</button>
             </div>
           
        </Form>
      </Formik>
    </>
  )
}

export default LoginFrm
