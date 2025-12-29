import { useState, useEffect } from 'react';
import styles from '../../../styles/PropertyView.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { currencyConverter, isVideo } from '@/helper/Helper';
import { useCurrency } from '@/context/CurrencyProvider';
import {slugify,formatDate,imageKitLoader } from '@/helper/Helper';
import { useSites } from '@/context/SiteProvider';
import { staticBlurDataUrl } from '@/utils/staticBlurDataUrl';
import useHoverPlay from '../common/useHoverPlay';
const Feature = ({item,tag}) => {
  const { handleMouseEnter, handleMouseLeave, handleTouchStart, handleTouchEnd } = useHoverPlay();
  const { siteSettings: sites } = useSites() || {};
  const { currency } = useCurrency();
  const [minAmount,setMinAmount] = useState(null);
  const [maxAmount,setMaxAmount] = useState(null);
  const postDate = formatDate(item.createdAt);
  const location = slugify(item.city);
  const getVal = (key, fallback = '') => sites?.[key] || fallback;
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
  }, [item.cMinAmount, item.is_rental, currency, item.rental_type]);
  
 return (
   <>
     <div className={styles.card}>
       <div className={styles.card_top}>
         {tag ? <p className={styles.tags}>{item.PCategory.title}</p> : null}

         <Link href={`/properties/${item.slug}`}>
           {isVideo(item.thumbnail) ? (
             <div className="video-container">
               <video
                 src={`${process.env.API_URL}${item.thumbnail}`}
                 type={`video/${item.thumbnail.split(".").pop()}`}
                 loop
                 muted
                 onMouseEnter={(e) => handleMouseEnter(e.target)}
                 onMouseLeave={(e) => handleMouseLeave(e.target)}
                 onTouchStart={(e) => handleTouchStart(e.target)}
                 onTouchEnd={(e) => handleTouchEnd(e.target)}
               ></video>
             </div>
           ) : (
             <Image
               loader={imageKitLoader}
               src={`${item.thumbnail}`}
               alt={item.title}
               width={100}
               height={100}
               quality={50}
               placeholder="blur"
               blurDataURL={staticBlurDataUrl()}
               sizes="(max-width: 426px) 40vw, 426px"
               className="img-fluid"
             />
           )}
         </Link>
         <Link href={`/location-in-dubai/${location}`}>
           <div className={`${styles.caption}`}>
             <p>
               <i className="fas fa-map-marker-alt"></i> {item.city},
               {item.state},{item.country}{" "}
             </p>
             <p>→</p>
           </div>
         </Link>
       </div>
       <div className={styles.card_bottom}>
         <h3>
           {item.title.length > 80
             ? `${item.title.substring(0, 50)}...`
             : item.title}
           <i className={`verified`}>Verified</i>
         </h3>
         <p>
           {item.shortDesc.substring(0, 80)}...
           <small>
             <Link href={`/properties/${item.slug}`}>[read more]</Link>
           </small>
         </p>

         <ul>
           <li>
             <i className="fas fa-clock"></i> {postDate}
           </li>
           <li>
             <Link href={`/top-real-estate-developer-in-dubai/${item.Developer.slug}`}>
               <i className="far fa-building"></i> {item.Developer.name}
             </Link>
           </li>
         </ul>
         {parseInt(item.minAmount) > 0 ? (
           <div className={styles.page_price}>
             <h3 className="text-center">
               {parseInt(item.maxAmount) > 0
                 ? `${minAmount} - ${maxAmount}`
                 : minAmount}
             </h3>
           </div>
         ) : (
           <p className="text-center">
             <Link
               href="#"
               className="simple-btn"
               data-bs-toggle="modal"
               data-bs-target="#mcq-modal"
             >
               Ask for Price →
             </Link>
           </p>
         )}
       </div>
       <hr />
       <Link href={`/agent-profile/${item.agentUser.slug}`}>
         <div className={styles.agent_profile}>
           {item.agentUser ? (
             <Image
               loader={imageKitLoader}
               src={`${item.agentUser.profile}`}
               alt={`${item.agentUser.firstName} ${item.agentUser.lastName}`}
               width={100}
               height={100}
               quality={50}
               placeholder="blur"
               blurDataURL={staticBlurDataUrl()}
               sizes="(max-width: 426px) 40vw, 426px"
             />
           ) : null}
           <p>{item.agentUser.firstName} {item.agentUser.lastName}</p>
           <p>→</p>
         </div>
       </Link>
       <div className={styles.inquiry_icons}>
         <span>
           <Link
             href={`mailto:${getVal("dubai_mail")}`}
             title={getVal("dubai_mail")}
           >
             <i className="fas fa-envelope"></i>
           </Link>
         </span>
         <span>
           <Link
             href={`tel:${getVal("dubai_contact")}`}
             title={getVal("dubai_contact")}
           >
             <i className="fas fa-phone"></i>
           </Link>
         </span>
         <span>
           <Link
             href={`https://api.whatsapp.com/send?phone=${getVal(
               "dubai_whatsapp"
             )}`}
             title={getVal("dubai_whatsapp")}
           >
             <i className="fab fa-whatsapp"></i>
           </Link>
         </span>
       </div>
     </div>
   </>
 );
}

export default Feature
