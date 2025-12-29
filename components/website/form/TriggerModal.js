import React, { useState } from 'react';
import TriggerFrm from '../form/TriggerFrm';
import { useSites } from '@/context/SiteProvider';
import Link from 'next/link';

const TriggerModal = () => {
  const sites = useSites();
 

  return (
    <>
        <div className="modal fade" id="triggerFrm" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <p className="modal-title fs-5" id="staticBackdropLabel">Enquiry Now</p>
                <button type="button" className="modal-close" data-bs-dismiss="modal" aria-label="Close">
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="modal-body">
                <TriggerFrm id='tModalMobile'/>
                <p className='text-center'>OR</p>
                <p className='text-center'>contact us right now via <Link href={`https://api.whatsapp.com/send?phone=${sites.dubai_whatsapp}`} title={sites.dubai_whatsapp}><i className={`fab fa-whatsapp`}></i> WhatsApp</Link></p>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default TriggerModal;
