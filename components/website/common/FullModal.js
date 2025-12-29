import React from 'react'
const FullModal = () => {

  return (
    <>
<div className="modal fade" id="whyDeveloper" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog modal-xl modal-dialog-centered">
    <div className="modal-content">
        <button type="button" className="modal-close" data-bs-dismiss="modal" aria-label="Close"><i className="fas fa-times"></i>
        </button>
      <div className="modal-body">
        <video controls={true} controlsList="nodownload">
            <source src={`${process.env.API_URL}/common/why invest in dubai.mp4`} type="video/mp4" />
        </video>
      </div>
    </div>
  </div>
</div>
<style jsx>
{`
#whyDeveloper video{
    width:100%;
}`}
</style>
    </>
  )
}

export default FullModal
