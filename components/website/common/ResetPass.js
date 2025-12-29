import TextField from '@/form/TextField'
import { Form, Formik } from 'formik'
import API_URLS from '@/config/apiconfig'
import React from 'react'
import { ResetPassSchema } from '@/schema/ResetPassSchema'
const ResetPass = () => {
    const defaultValue={password:"", cpassword:""}
    const handleSubmit=async (value,action)=>{
        const email = localStorage.getItem("fgEmail");
        try {
          const response = await fetch(`${API_URLS.PASS_RESET}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({password:value.password,email:email})
        })
        const res= await response.json()
        if(res.status===true){
          action.resetForm();
          $(".modal-close").trigger('click');
          toastr.success(res.message);
        }else{
            toastr.error(res.message);
        }
        } catch (error) {
          throw Error(error);
        }
      }
  return (
    <>
      
      <Formik initialValues={defaultValue} onSubmit={handleSubmit} validationSchema={ResetPassSchema}>
        <Form className='logRegFrm'>
            <TextField type="password" name="password" label="Password"/>
            <TextField type="password" name="cpassword" label="Confirm Password"/>
             <div className='mb-2'>
                <button type="submit" className='btns btn-blue btn-100'>Reset</button>
             </div>
             <p className='text-center'>OR</p>
             <div className='mb-2'>
                <button type="button" className='btns btn-orange btn-100' data-bs-toggle="modal" data-bs-target="#login">Login</button>
             </div>
        </Form>
      </Formik>
    </>
  )
}

export default ResetPass
