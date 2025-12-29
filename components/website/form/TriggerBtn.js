import React, { useState } from 'react';
import styles from '../../../styles/Trigger.module.css';
import { useSites } from '@/context/SiteProvider';
import Link from 'next/link';
const TriggerBtn = () => {
  const { siteSettings: sites } = useSites() || {};
  const getVal = (key, fallback = '') => sites?.[key] || fallback;

  if (!sites || Object.keys(sites).length === 0) {
    return null; // Or return a skeleton loader if you prefer
  }

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {setIsHovered(true);};
  const handleMouseLeave = () => {setIsHovered(false);};
  const handleClick = () => {setIsHovered(!isHovered);};

  return (
    <div className={`${styles.triggerbtn}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick}>
      {isHovered ? (
        <i className="fas fa-times"></i>
      ) : (
        <i className={`fas fa-phone ${styles.phoneBlink}`}></i>
      )}
      {isHovered && (
        <div className={styles.contactOptions}>
          <ul>
            <li> <Link href={`tel:${getVal('dubai_contact')}`}><i className={`fas fa-phone ${styles.phone}`}></i></Link></li>
            <li><Link href={`https://api.whatsapp.com/send?phone=${getVal("dubai_whatsapp")}`}><i className={`fab fa-whatsapp ${styles.whatsapp}`}></i></Link></li>
            <li><Link href={`mailto:${getVal('dubai_mail')}`}><i className={`far fa-envelope ${styles.envelope}`}></i></Link></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default TriggerBtn;
