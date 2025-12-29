import React from 'react'
import TriggerFrm from '../form/TriggerFrm'
import Link from 'next/link';
import { useSites } from '@/context/SiteProvider';
const ExpoTrigger = ({id}) => {
    const sites = useSites();
  return (
    <>
      <div className='container'>
      <div className='row'>
      <div className='col-md-12 text-center my-3'>
        <h2 className='title_about'>{`Have Queries About Hyderabad's Mega Dubai Real Estate Expo? Get Answers Now`}</h2>
         <p>{`Fill out the given details and our real estate pros will reach out to you shortly`}</p>
        </div>
        <div className='col-md-12 trigger_frm_sec'>
            <TriggerFrm id={id}/>
            <p className='text-center'>OR</p>
            <p className='text-center'>contact us right now via <Link href={`https://api.whatsapp.com/send?phone=${sites.dubai_whatsapp}`} title={sites.dubai_whatsapp}><i className={`fab fa-whatsapp`}></i> WhatsApp</Link></p>
        </div>
        
      </div>
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
    </>
  )
}

export default ExpoTrigger
