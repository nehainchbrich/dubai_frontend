import React from 'react'
import Link from 'next/link'
import AgentCard from '../website/common/AgentCard'
import { ImagePath } from '@/helper/Helper';

const Team = ({data,section}) => {
const description = ImagePath(section?.sectionSubHeading);
  return (
    <>
     <div className='container'>
        <div className='row'>
            <div className='col-md-12 text-center'>
                <h2 className='title_about'>{section?.sectionHeading}</h2>
                 <div className='mb-3' dangerouslySetInnerHTML={{ __html: description }}></div>
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
