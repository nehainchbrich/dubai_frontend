import React,{ useEffect,useState } from 'react'
import { Form, Formik } from "formik";
import API_URLS from '@/config/apiconfig';
import TextField from '@/form/TextField';
import { TriggerSchema } from '@/schema/TriggerSchema';
import { mobileInput } from '@/helper/Helper';
const TriggerFrm = ({id}) => {
  const defaultValue={
    name:"",
    email:"",
    mobile:"",
    city:""
  }
  const [dialCode, setDialCode] = useState('+91');
  useEffect(() => {
    const cleanup = mobileInput(id, setDialCode);
    return cleanup;
  }, [id]);
  
  const handleSubmit=async (value,action)=>{
    try {
      const modifiedValues = {
        ...value,
        mobile: `${dialCode}${value.mobile}`, // Combine dial code with mobile number
      };
      const response = await fetch(`${API_URLS.TRIGGER}`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(modifiedValues)
    })
    const res= await response.json()
    if(res.status===true){
      action.resetForm();
      window.location.href = '/thank-you';
  }
    } catch (error) {
      throw Error(error);
    }
  }

  return (
    <>
     <Formik initialValues={defaultValue} onSubmit={handleSubmit} validationSchema={TriggerSchema}>
        <Form>
        <TextField type="text" name="name" label="Full Name"/>
        <TextField type="text" name="email" label="Email ID"/>
        <TextField type="tel" name="mobile" id={id} label="Mobile"/>
        <TextField type="text" name="city" label="City"/>
        <button type="submit" className="btns btn-blue btn-100">Submit</button>
        </Form>
    </Formik>
    </>
  )
}

export default TriggerFrm
