import TextAreaField from '@/form/TextAreaField'
import TextField from '@/form/TextField'
import React from 'react'
import { Form, Formik } from "formik";
import API_URLS from '@/config/apiconfig';
import { CommentSchema } from '@/schema/CommentSchema';
const CommentFrm = ({ blogCode, comment }) => {
  const defaultValue = {
    name: "",
    email: "",
    message: "",
    blogCode: blogCode
  }
  const handleSubmit = async (value, action) => {
    try {
      const response = await fetch(`${API_URLS.COMMENT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
      })
      const res = await response.json()
      if (res.status === true) {
        action.resetForm();
        Swal.fire({
          title: 'Thanks for your comment',
          text: 'It will be reflected within 48 hrs',
          icon: 'success',
          confirmButtonText: 'OK'
        })
      }
    } catch (error) {
      throw Error(error);
    }
  }
  return (
    <>
        <div className="alert alert-light my-5" role="alert">
          <h4>Comment ({comment.length})</h4>
        </div>
        {comment && comment.map((item, i) => (
          <div key={i}>
            <p>{item.name}</p>
            <div dangerouslySetInnerHTML={{ __html: `${item.message}` }} />
            <hr />
          </div>
        ))}

        <div className="alert alert-light" role="alert">
          <h4>Leave a Comment</h4>
        </div>
        <Formik initialValues={defaultValue} onSubmit={handleSubmit} validationSchema={CommentSchema}>
          <Form>
            <TextField type="hidden" name="blogCode" value={blogCode} />
            <TextField type="text" name="name" label="Full Name" />
            <TextField type="text" name="email" label="Email ID" />
            <TextAreaField name="message" label="Comment" />
            <div className='col-md-12'>
              <button type="submit" className="btns btn-orange">Submit</button>
            </div>
          </Form>
        </Formik>
      </>
  )
}

export default CommentFrm
