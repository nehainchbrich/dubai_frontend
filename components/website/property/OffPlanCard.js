import React,{ useState, useEffect } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../../styles/OffPlan.module.css';
import { currencyConverter,imageKitLoader } from '@/helper/Helper';
import { useCurrency } from '@/context/CurrencyProvider';
import { staticBlurDataUrl } from '@/utils/staticBlurDataUrl';
const OffPlanCard = ({ item }) => {
    const { currency } = useCurrency();
    // const [showPrice, setShowPrice] = useState('');
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
            <div className={styles.offplan_card}>
            <i className={`${styles.verified}`}>Verified</i>
            <Link href={`/properties/${item.slug}`}>
                <div className={styles.image_container}>
                    <Image loader={imageKitLoader} src={`${item.thumbnail}`} alt={item.title} className={styles.img_fluid} width={100} height={100} quality={70}  placeholder="blur" blurDataURL={staticBlurDataUrl()} sizes='(max-width: 426px) 40vw, 426px' />
                    <div className={styles.caption}>
                        <h4 className={styles.caption_text}>{item.title}</h4>
                    </div>
                    <div className={styles.overlay}>
                        <div className={styles.overlay_content}>
                            <h2>{item.title}</h2>
                            {parseInt(item.minAmount) > 0 ? (
                            <div className={styles.page_price}>
                              <h3 className='text-center'>
                                {parseInt(item.maxAmount) > 0
                                  ? `${minAmount} - ${maxAmount}`  // Show both minAmount and maxAmount
                                  : minAmount} 
                              </h3>
                            </div>
                          ) : (
                            <p className='simple-btn text-center' data-bs-toggle="modal" data-bs-target="#mcq-modal">Ask for Price →</p>
                          )}
                            <p>{item.shortDesc}</p>
                            <button className='btns btn-orange'>Read More</button>
                        </div>
                    </div>
                </div>
                </Link>
            </div>
        </>
    )
}

export default OffPlanCard
