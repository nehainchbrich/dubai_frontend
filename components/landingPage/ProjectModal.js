import TextField from '@/form/TextField'
import { Form, Formik } from 'formik'
import React from 'react'
import Link from 'next/link'
import { TriggerSchema } from '@/schema/TriggerSchema'
const ProjectModal = () => {
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
          $(".modal-close").trigger('click');
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
      <div className="modal fade" id='projectModal' data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <p className="modal-title fs-5" id="staticBackdropLabel">REGISTER HERE AND AVAIL THE BEST OFFERS!!</p>
        <button type="button" className="modal-close" data-bs-dismiss="modal" aria-label="Close">
          <i className="fas fa-times"></i>
        </button>
      </div>
      <div className="modal-body">
      <Formik initialValues={defaultValue} onSubmit={handleSubmit} validationSchema={TriggerSchema}>
        <Form className='logRegFrm'>
            <TextField type="text" name="name" label="Full Name"/>
            <TextField type="email" name="email" label="Email ID"/>
            <TextField type="tel" name="mobile" label="Mobile No."/>
            <TextField type="text" name="city" label="City"/>
             <div className='mb-2'>
                <button type="submit" className='btns btn-blue btn-100'>Pre Register Now</button>
             </div>
        </Form>
      </Formik>
      </div>
      <div className="modal-footer">
       <p className="small text-center">I authorize company representatives to Call, SMS, Email or WhatsApp me about its products and offers. This consent overrides any registration for DNC/NDNC.</p>
       <p className="text-left my-3">
        <Link title="971547614449" href="tel:971547614449"><i className="fas fa-phone"></i> 971547614449</Link> </p>
      </div>
    </div>
  </div>
</div>
     
    </>
  )
}

export default ProjectModal
