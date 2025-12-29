import Image from 'next/image'
import React from 'react'
import Cform from './Cform'

const FormSection = ({data}) => {
  return (
    <>
       <div className='container'>
              <div className='row contact_section'>
              {data &&(
                  <div dangerouslySetInnerHTML={{ __html: data.description }} />
              )}
                  <div className='col-md-6 my-5 wow fadeInRightBig'>
                      <h2 className='title'>You matter to us. We would love to hear from you!</h2>
                      <p>Get in touch with us and let us assist you in your real estate journey.</p>
                      <Cform page="contact" />
                  </div>
                  <div className='col-md-6 my-5 wow fadeInLeftBig'>
                      <Image src={`${process.env.API_URL}/common/contact-avatar.jpg`} className='img-fluid img_avatar' width={550} height={600} alt='inchbrick frequently asked questions'/>
                  </div>
              </div>
            <style jsx>
            {`
            .contact_section {
                background: #e8e8e8;
                padding: 30px;
            }
          `}
            </style>
      </div>
    </>
  )
}

export default FormSection
