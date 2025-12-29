import TextField from '@/form/TextField'
import { Form, Formik } from 'formik'
import React, {useEffect,useState} from 'react';
import API_URLS from '@/config/apiconfig'
import { SignUpSchema } from '@/schema/SignUpSchema'
import { useAuth } from '@/helper/Auth'
import { mobileInput } from '@/helper/Helper';
const SignUp = () => {
  const {handleAuth}=useAuth();
  const defaultValue={fullName:"",email:"",password:"",mobile:"",ReferralCode:""}
  const [dialCode, setDialCode] = useState('+91');
  useEffect(() => {
    const cleanup = mobileInput('smobile', setDialCode);
    return cleanup;
  }, []);
  const handleSubmit=async (value,action)=>{
        try {
          const modifiedValues = {
            ...value,
            mobile: `${dialCode}${value.mobile}`, // Combine dial code with mobile number
          };
          const response = await fetch(`${API_URLS.REGISTER_USER}`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(modifiedValues)
        })
        const res= await response.json()
        if(res.status===true){
          action.resetForm();
          $(".modal-close").trigger('click');
          handleAuth(res.token);
      }
        } catch (error) {
          throw Error(error);
        }
      }
  return (
    <>
      
      <Formik initialValues={defaultValue} onSubmit={handleSubmit} validationSchema={SignUpSchema}>
        <Form className='logRegFrm'>
            <TextField type="text" name="fullName" label="Full Name"/>
            <TextField type="email" name="email" label="Email ID"/>
            <TextField type="password" name="password" label="Password"/>
            <TextField type="text" name="mobile" id="smobile" label="Mobile"/>
            <div className='mb-2'>
             <button type="submit" className='btns btn-blue btn-100'>Register</button>
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

export default SignUp
