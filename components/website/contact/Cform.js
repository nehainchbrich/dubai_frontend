import React,{ useEffect,useState } from 'react'
import { Form, Formik } from "formik";
import { ContactSchema } from '@/schema/ContactSchema';
import API_URLS from '@/config/apiconfig';
import TextField from '@/form/TextField';
import TextAreaField from '@/form/TextAreaField';
import { mobileInput } from '@/helper/Helper';
const Cform = ({page}) => {
  const defaultValue={
    name:"",
    email:"",
    mobile:"",
    subject:"",
    page:page,
    message:""
  }
  const [dialCode, setDialCode] = useState('+91');
  useEffect(() => {
    const cleanup = mobileInput('cmobile', setDialCode);
    return cleanup;
  }, []);
  
  const handleSubmit=async (value,action)=>{
    try {
      const modifiedValues = {
        ...value,
        mobile: `${dialCode}${value.mobile}`, // Combine dial code with mobile number
      };
      const response = await fetch(`${API_URLS.CONTACT}`,{
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
     <Formik initialValues={defaultValue} onSubmit={handleSubmit} validationSchema={ContactSchema}>
    <Form>
       <TextField type="text" name="name" label="Full Name"/>
       <TextField type="text" name="email" label="Email ID"/>
       <TextField type="tel" name="mobile" id="cmobile" label="Mobile"/>
       <TextField type="text" name="subject" label="Subject"/>
       <TextAreaField name="message" label="Message"/>
       <TextField type="hidden" name="page" label=""/>
        <button type="submit" className="btns btn-blue btn-100">Submit</button>
    </Form>
    </Formik>
    <style jsx>
    {`
    input,
      textarea {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 25px;
        margin-bottom: 1rem;
        font-size: 1rem;
      }
      .contact_btn{
        background: #25408f;
        padding: 10px;
        width: 100%;
        border: none;
        outline: none;
        color: #fff;
        text-transform: uppercase;
        border-radius: 20px;
      }
     `}
    </style>
    </>
  )
}

export default Cform
