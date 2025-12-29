import React from 'react'
import AgentCard from '../common/AgentCard'
import Link from 'next/link'

const Team = ({data}) => {
  return (
    <>
     <div className='container'>
        <div className='row'>
            <div className='col-md-12 text-center'>
                <h2 className='title_about'>Our Strong & Visionary Team</h2>
                <p>{`Our leadership team will be there for you every minute in our Hyderabad expo because we're committed to helping you to live the life you deserve in the city of dreams and providing you with exceptional investment opportunities.`}</p>
            </div>
            {data && data.map((item, index) => (
            <div className='col-md-3 mb-3' key={index}>
              <AgentCard item={item} type={'team'} />
            </div>
          ))}
          <div className='col-md-12 text-center'>
            <Link href={'/expo-invitation'} className='btns btn-orange'>Book Your Free VIP Pass →</Link>
          </div>
            <style jsx>
      {`
        .title_about {
            font-size: 3rem;
            margin: 1rem;
            text-transform: capitalize;
            font-weight: bold;
        }
        @media (max-width: 550px) {
              .title_about {
                  font-size: 1.5rem;
                  margin: 1rem;
              }
          }    
       `}
      </style>
        </div>
     </div> 
    </>
  )
}

export default Team
