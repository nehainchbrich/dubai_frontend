import React from "react";
import Link from "next/link";

const OfferBlog = ({event}) => {
  return (
     <div className="container">
        {event.length > 0 && (
  <div
    className="alert alert-light alert-gradient alert-dismissible fade show mt-3"
    role="alert">
      <Link
        href={`/events/${event[0].slug}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-decoration-none text-dark"
      >
        <h2 className="fw-bolder text-center text-md-start">
              <strong>Dubai Property Expo</strong> in Hyderabad
            </h2>
        <div className='row text-center text-md-start'>
          <div className="col-md-5 col-12">
            
            <h3 className='fw-bolder'>4th and 5th October 2025</h3>
            <small className='bg-danger text-white px-2 py-1'>Starting At 2.33 CR</small>
            <p>
              <b>Venue : </b>The Westin Mindspace, Hyderabad
            </p>
          </div>
          <div className="col-md-3 col-12 d-block d-md-flex align-items-center">
            <div className='text-center'>
              <i className="fa fa-shield-alt text-danger"></i>
            <h4 className='mb-0 fw-bolder'>8 - 15% Guaranteed</h4>
            <small>Return on Investment</small>
            </div>
          </div>
       
        <div className='col-md-4 col-12'>
          <div>
             <small className='fw-bolder text-danger'>100% Property Ownership</small>
             <a href="/expo-invitation" target="_blank" rel="noopener noreferrer">
            <button className="btn btn-danger h-fit">
              Book Your Free Vip Pass Now
            </button>
            </a>
            </div>
        </div>
        </div>
      </Link>
  

    {/* Close button (outside the Link so it doesn’t redirect) */}
    <button
      type="button"
      className="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    ></button>
  </div>
)}
  <style jsx>{`
   .fa-shield-alt{
     font-size:2rem;
     }
      .alert strong{
      color: #703900;
      }
      .alert{
      font-family:system-ui}
        .blogOfferImgDesk {
          display: none;
        }
          .alert-gradient{
          background: linear-gradient(45deg, #edb707, #ffffff);
          border:0;
          }
          .h-fit{
          height:fit-content}
        .blogOfferImg {
          display: block;
        }
  `}</style>
</div>
  )
}

export default OfferBlog
