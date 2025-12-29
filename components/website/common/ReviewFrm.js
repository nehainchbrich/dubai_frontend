import TextAreaField from '@/form/TextAreaField'
import TextField from '@/form/TextField'
import React from 'react'
import { Form, Formik } from "formik";
import RatingField from '@/form/RatingField';
import { ReviewSchema } from '@/schema/ReviewSchema';
import API_URLS from '@/config/apiconfig';
import ReviewCard from './ReviewCard';
const ReviewFrm = ({page,review,pageCode}) => {
    const defaultValue={
        rating:"",
        name:"",
        review:"",
        page:page,
        pageCode:pageCode
      }
      const handleSubmit=async (value,action)=>{
        try {
          const response = await fetch(`${API_URLS.REVIEW}`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(value)
        })
        const res= await response.json()
        if(res.status===true){
          action.resetForm();
          const radioButtons = document.querySelectorAll('input[type="radio"][name="rating"]');
            radioButtons.forEach(button => button.checked = false);
          Swal.fire({
            title: 'Thanks for Contact!',
            text: 'Our Team will contact you as soon as possible!',
            icon: 'success',
            confirmButtonText: 'Success'
          })
      }
        } catch (error) {
          throw Error(error);
        }
      }
  return (
    <>
    <div className="alert alert-light my-5" role="alert"><h4>Review ({review.length})</h4></div>
    {review && review.map((item,i)=>(
       <ReviewCard key={i} item={item}/>
    ))}
    <div className="alert alert-light" role="alert"><h4>Leave a Review</h4></div> 
    <Formik initialValues={defaultValue} onSubmit={handleSubmit} validationSchema={ReviewSchema}>
    <Form>
    <TextField type="hidden" name="page" value={page}/>
    <TextField type="hidden" name="pageCode" value={pageCode}/>
    <TextField type="text" name="name" label="Full Name"/><br/>
    <TextAreaField name="review" label="Review"/>
    <div className='rating'>
        <p>Rating</p>
    <RatingField name="rating" label="star5"/>
    </div>
    <div className='col-md-12'>
    <button type="submit" className="btns btn-orange">Submit</button>
    </div>
    </Form>
    </Formik>
   
    </>
  )
}

export default ReviewFrm
