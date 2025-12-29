import React,{ useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { currencyConverter,handleSelectForComparison,imageKitLoader} from '@/helper/Helper';
import styles from '../../../styles/property/Property.module.css';
import { useCurrency } from '@/context/CurrencyProvider';
import { staticBlurDataUrl } from '@/utils/staticBlurDataUrl';
const ListView = ({item,tag}) => {
  const { currency } = useCurrency();
  const [minAmount,setMinAmount] = useState(null);
  const [maxAmount,setMaxAmount] = useState(null);
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
      <div className={styles.listCard} >
      <div className={styles.img_container}>
        {tag?(<p className={styles.tags}>{item.PCategory.title}</p>):null}
        <Link href={`/properties/${item.slug}`}>
        <Image loader={imageKitLoader} src={`${item.thumbnail}`} title={item.title} alt={item.title} className='img-fluid' width={100} height={100} quality={50}  placeholder="blur" blurDataURL={staticBlurDataUrl()} sizes='(max-width: 426px) 50vw, 426px'/>
        </Link>
      </div>
      <div className={styles.content}>
        <Link href={`/properties/${item.slug}`}>
        <h4>{item.title} <i className={`verified`}>Verified</i></h4>
        <p>{item.shortDesc && item.shortDesc.slice(0, 80)}...</p>
        </Link>
     
        
        <div className={styles.top_list}>
        {parseInt(item.minAmount) > 0 ? (
          <h3>
            {parseInt(item.maxAmount) > 0
                ? `${minAmount} - ${maxAmount}`  // Show both minAmount and maxAmount
                : minAmount} 
          </h3>
        ) : (
          <p><Link href='/contact-us' className={`simple-btn ${styles.price_btn}`} target='_blank'>Ask For Price →</Link></p>
        )}
          <p><i className="fas fa-building" /> {item.Developer.name}</p>
          <p><i className="fas fa-user-circle" /> {item.agentUser.firstName} {item.agentUser.lastName}</p>
        </div>
        <div className={`${styles.bottom_list} d-flex justify-content-start`}>
          {item.property_type?.length > 0 && (
            <p>
              <i className="fas fa-rss" /> {item.property_type[0].title}
            </p>
          )}
          <p className='ms-3'><i className="fas fa-map-marker-alt" /> {item.city},{item.country}</p>
        </div>
        <div className='d-flex justify-content-between align-items-center'>
          <Link className={`${styles.compare_btn} simple-btn me-2`}  href={'#'}  onClick={(e) => {e.preventDefault(); handleSelectForComparison(item);}}>Add to Compare</Link>
          <Link href={`/properties/${item.slug}`} className='simple-btn text-success'>Read More →</Link>
        </div>
       
      </div>
      </div>
    </>
  )
}

export default ListView
