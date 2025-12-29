import React from 'react'
import LoginFrm from './LoginFrm'
import SignUp from './SignUp'
import Forget from './Forget'
import ValidOtp from './ValidOtp'
import ResetPass from './ResetPass'

const Model = ({id,title}) => {

  return (
    <>
<div className="modal fade" id={id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-width-small">
    <div className="modal-content">
      <div className="modal-header">
        <p className="modal-title fs-5" id="staticBackdropLabel">{title}</p>
        <button type="button" className="modal-close" data-bs-dismiss="modal" aria-label="Close">
          <i className="fas fa-times"></i>
        </button>
      </div>
      <div className="modal-body">
        {id==="login"?(
            <LoginFrm/>
        ): id === "signup" ?(
            <SignUp/>
        ):id === "forget" ?(
            <Forget/>
        ):id ==="valid_Otp"?(
          <ValidOtp/>
        ):(
          <ResetPass/>
        )}
      </div>
    </div>
  </div>
</div>
    </>
  )
}

export default Model
