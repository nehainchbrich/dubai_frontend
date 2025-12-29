import React from 'react'

const Map = () => {
  return (
    <>
       <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d798.7581449048076!2d78.38106072014023!3d17.442443939910305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93e1ac389ce3%3A0x7acc5d097f6e2e6!2sThe%20Westin%20Hyderabad%20Mindspace!5e1!3m2!1sen!2sin!4v1704700487857!5m2!1sen!2sin"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <style jsx>
        {`
        iframe{
            width:100%;
        }
        `}
        </style>
    </>
  )
}

export default Map
