import React from 'react'

const Map = ({data}) => {
  return (
    <>
       <iframe
          src={data[0].venue_map}
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