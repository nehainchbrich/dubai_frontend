import Image from 'next/image'
import React from 'react'

const JoinTeam = () => {
  return (
    <>
      <div className='container my-5'>
        <div className='row'>
        <div className='col-md-6'>
            <h4>BECOME A PART OF OUR TEAM</h4>
            
            <p>{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`}</p>
            <p>{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`}</p>
            <p>{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`}</p>
            <p>{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`}</p>
        </div>
        <div className='col-md-6'>
            <Image src={`${process.env.API_URL}/uploads/common/bg-home.jpg`} className='img-fluid' width={600} height={500} alt='INCH & BRICK'/>

        </div>
        </div>
      </div>
    </>
  )
}

export default JoinTeam
