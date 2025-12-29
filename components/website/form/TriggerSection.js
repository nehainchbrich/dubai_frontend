import React from 'react'
import {imageKitLoader } from '@/helper/Helper';
import Image from 'next/image';
import Link from 'next/link';
import { useSites } from '@/context/SiteProvider';
import TriggerFrm from './TriggerFrm';
const TriggerSection = () => {
    const sites = useSites();
  return (
    <>
      <div className='container'>
      <div className='row'>
      <div className='col-md-8'>
          <h2 className='title'>Enquiry Now</h2>
         <p>{`Fill form below and our agent will contact you shortly`}</p>
        </div>
        <div className='col-md-12 trigger_frm_sec'>
            <TriggerFrm id='tHomeMobile'/>
            <p className='text-center'>OR</p>
            <p className='text-center'>contact us right now via <Link href={`https://api.whatsapp.com/send?phone=${sites.dubai_whatsapp}`} title={sites.dubai_whatsapp}><i className={`fab fa-whatsapp`}></i> WhatsApp</Link></p>
        </div>
        
      </div>
      </div>
    </>
  )
}

export default TriggerSection
