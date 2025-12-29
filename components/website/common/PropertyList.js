import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styles  from '../../../styles/ListProperty.module.css';
import Link from 'next/link';
import { currencyConverter, imageKitLoader } from '@/helper/Helper';
import { useCurrency } from '@/context/CurrencyProvider';
const PropertyList = ({item}) => {
  const { currency } = useCurrency();
  const [minAmount,setMinAmount] = useState(null);
  useEffect(() => {
  const handleCurrencyConversion = async () => {
    try {
      let cMinAmount;
      cMinAmount = item.minAmount && parseInt(item.minAmount) ? await currencyConverter(parseInt(item.minAmount), currency) : null;
        if (item.is_rental == 1 && item.minAmount != null) {
          cMinAmount = item.minAmount && parseInt(item.minAmount) ? await currencyConverter(item.minAmount, currency):null;
          cMinAmount = `${cMinAmount}/${item.rental_type}`;
        }
        setMinAmount(cMinAmount);
    } catch (error) {
      console.error(error);
    }
  };
  handleCurrencyConversion();
}, [item.minAmount, item.is_rental, currency, item.rental_type]);
   
  return (
    <>
    
     <div className={styles.list_item}>
     <Link href={`/properties/${item.slug}`} className='d-flex'>
     <Image loader={imageKitLoader} src={`${item.thumbnail}`} alt={item.title} width={100} height={100} style={{width:'115px',height:'78px'}} sizes='(max-width:50px) 2vw, (max-width:425px) 50vw, 75vw' quality={60} loading='eager' priority={true}/>
          <div className={styles.content}>
            <div className={styles.title}>{item.title}</div>
            <div className={styles.title}>
            {parseInt(item.minAmount) > 0 ? ( minAmount) : (
                <Link href="#" className='simple-btn' data-bs-toggle="modal" data-bs-target="#mcq-modal">Ask for Price →</Link>
            )}
            </div>
            <Link href={`/properties/${item.slug}`}>
            <div className={styles.text}>{item.city},{item.state},{item.country}</div>
            <div className={styles.text}>{item.developerName}</div>
            <div className={styles.text}>{item.categoryName}</div>
            <div className={styles.text}>{item.pTypeName}</div>
            </Link>
          </div>
          </Link>
        </div>
    </>
  )
}

export default PropertyList
