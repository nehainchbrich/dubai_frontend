import React from 'react';
import { useSites } from '@/context/SiteProvider';
import Link from 'next/link';

const Address = () => {
  const { siteSettings: sites } = useSites() || {};

  // Helper to safely get values
  const getVal = (key, fallback = 'N/A') => sites?.[key] || fallback;

  // Return nothing if sites not yet loaded
  if (!sites || Object.keys(sites).length === 0) {
    return null; // or use a skeleton loader
  }

  return (
    <>
      <div className='container'>
        <div className='location row my-5'>
          <div className='col-md-6 wow fadeInRightBig'>
            <div className='location_one'>
              <h4><i className="fas fa-map-marker-alt"></i> Dubai UAE Head Office</h4>
              <p>{getVal('dubai_addr')}</p>
            </div>
            <div className='contact_details'>
              <p><i className="fas fa-mobile-alt"></i> Mobile: <span><Link href={`tel:${getVal('dubai_contact')}`}>{getVal('dubai_contact')}</Link></span></p>
              <p><i className="fab fa-whatsapp"></i> Whatsapp: <span><Link href={`https://api.whatsapp.com/send?phone=${getVal('dubai_whatsapp')}`}>{getVal('dubai_whatsapp')}</Link></span></p>
              <p><i className="fas fa-envelope"></i> E-mail: <span><Link href={`mailto:${getVal('dubai_mail')}`}>{getVal('dubai_mail')}</Link></span></p>
            </div>
          </div>

          <div className='col-md-6 wow fadeInLeftBig'>
            <div className='location_two'>
              <h4><i className="fas fa-map-marker-alt"></i> India Office</h4>
              <p>{getVal('ind_addr')}</p>
            </div>
            <div className='contact_details'>
              <p><i className="fas fa-mobile-alt"></i> Mobile: <span><Link href={`tel:${getVal('india_contact')}`}>{getVal('india_contact')}</Link></span></p>
              <p><i className="fab fa-whatsapp"></i> Whatsapp: <span><Link href={`https://api.whatsapp.com/send?phone=${getVal('india_whatsapp')}`}>{getVal('india_whatsapp')}</Link></span></p>
              <p><i className="fas fa-envelope"></i> E-mail: <span><Link href={`mailto:${getVal('india_email')}`}>{getVal('india_email')}</Link></span></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Address;
