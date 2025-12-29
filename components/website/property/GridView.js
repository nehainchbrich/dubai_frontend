import React,{ useEffect, useState } from 'react'
import styles from '../../../styles/property/Property.module.css';
import Link from 'next/link';
import { currencyConverter,handleSelectForComparison,imageKitLoader } from '@/helper/Helper';
import Image from 'next/image';
import { useCurrency } from '@/context/CurrencyProvider';
import { useSites } from '@/context/SiteProvider';
import { staticBlurDataUrl } from '@/utils/staticBlurDataUrl';
const GridView =  ({item,tag}) => {
  const { currency } = useCurrency();
  const [minAmount,setMinAmount] = useState(null);
  const [maxAmount,setMaxAmount] = useState(null);
  const sites = useSites();
  useEffect(() => {
    const handleCurrencyConversion = async () => {
      try {
        let cMinAmount;
        let cMaxAmount;
        cMinAmount = item.minAmount && parseInt(item.minAmount) ? await currencyConverter(parseInt(item.minAmount), currency) : null;
        cMaxAmount = item.maxAmount && parseInt(item.maxAmount) ? await currencyConverter(parseInt(item.maxAmount), currency) : null;
          if (item.is_rental == 1 && item.minAmount != null) {
            cMinAmount = item.minAmount && parseInt(item.minAmount) ? await currencyConverter(item.minAmount, currency):null;
            cMinAmount = `${cMinAmount}/${item.rental_type}`;
          }
          setMinAmount(cMinAmount);
          setMaxAmount(cMaxAmount);
      } catch (error) {
        console.error(error);
      }
    };
    handleCurrencyConversion();
  }, [item.minAmount, item.is_rental, currency, item.rental_type]);
  return (
    <>
      <div className={styles.gridCard}>
        <div className={styles.card_box}>
          <div className={styles.frent_card}>
            <Image loader={imageKitLoader} src={`${item.thumbnail}`} title={item.title} alt={item.title} className='img-fluid' width={100} height={100} quality={50}  placeholder="blur" blurDataURL={staticBlurDataUrl()} sizes='(max-width: 426px) 40vw, 426px'/>
            <div className={styles.content}>
            {parseInt(item.minAmount) > 0 ? (
          <div className={styles.page_price}>
            <h3 className='text-center'>
              {parseInt(item.maxAmount) > 0
                ? `${minAmount} - ${maxAmount}`  // Show both minAmount and maxAmount
                : minAmount} 
            </h3>
          </div>
        ) : (
          <p className='text-center'>
                <Link href="#" className='simple-btn' data-bs-toggle="modal" data-bs-target="#mcq-modal">Ask for Price →</Link>
              </p>
        )}
           
              <h4>{item.title}<i className={`verified`}>Verified</i></h4>
            </div>
            <div className={styles.top_list}>
              <p><i className="fas fa-building" /> {item.developerName}</p>
              <p><i className="fas fa-user-circle" /> {item.agentName}</p>
            </div>
            <div className={styles.bottom_list}>
              <p><i className="fas fa-rss" /> {item.pTypeName}</p>
              <p><i className="fas fa-map-marked-alt" /> {item.city},{item.country}</p>
            </div>
          </div>
          <div className={styles.back_card}>
          {tag?(<p className={styles.tags}>{item.categoryName}</p>):null}
            <h4><Link href={`/properties/${item.slug}`}>{item.title}</Link><i className={`verified`}>Verified</i></h4>
            {parseInt(item.minAmount) > 0 ? (
          <div className={styles.page_price}>
            <h3 className='text-center'>
              {parseInt(item.maxAmount) > 0
                ? `${minAmount} - ${maxAmount}`  // Show both minAmount and maxAmount
                : minAmount} 
            </h3>
          </div>
        ) : (
          <p className='text-center'>
                <Link href="#" className='simple-btn' data-bs-toggle="modal" data-bs-target="#mcq-modal">Ask for Price →</Link>
              </p>
        )}
            <p><Link href={`/properties/${item.slug}`} >{item.shortDesc && item.shortDesc.substring(0, 130)}...</Link></p>
            <Link href={`/properties/${item.slug}`} className='btns btn-orange'>Read More →</Link>
            <Link href={`#`} className='btns btn-orange' onClick={(e) => {e.preventDefault(); handleSelectForComparison(item);}}>Compare →</Link>
          <div className={styles.inquiry_icons}>
            <span><Link href={`mailto:${sites.dubai_mail}`} title={sites.dubai_mail}><i className="fas fa-envelope"></i></Link></span>
            <span><Link href={`tel:${sites.dubai_contact}`} title={sites.dubai_contact}><i className="fas fa-phone"></i></Link></span>
            <span><Link href={`https://api.whatsapp.com/send?phone=${sites.dubai_whatsapp}`} title={sites.dubai_whatsapp}><i className="fab fa-whatsapp"></i></Link></span>
          </div>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default GridView
