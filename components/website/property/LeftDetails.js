import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from '../../../styles/SingleProperty.module.css'
import { useCurrency } from '@/context/CurrencyProvider';
import { currencyConverter, imageKitLoader } from '@/helper/Helper';
import { ImagePath, formatDate } from '@/helper/Helper'
import Link from 'next/link';
import PropertyMap from './PropertyMap';
import MyGallery from "../common/MyGallery";
import FloorPlan from './FloorPlan';
import Amenities from './Amenities';
const LeftDetails = ({ data}) => {
  const { currency } = useCurrency();
  const [floorPlans, setFloorPlans] = useState([]);
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const postDate = formatDate(data.createdAt);
  const description = ImagePath(data.description, data.title);
  useEffect(() => {
    const convertAmounts = async () => {
      try {
        // ✅ Floor plan conversion
        if (Array.isArray(data.FloorPlan) && data.FloorPlan.length > 0) {
          const convertedFloorPlans = await Promise.all(
            data.FloorPlan.map(async (item) => {
              const convertedPrice =
                item.amount && parseInt(item.amount)
                  ? await currencyConverter(item.amount, currency)
                  : 0;

              if (data.is_rental === 1 && item.amount !== null) {
                return {
                  ...item,
                  convertedAmount: `${convertedPrice}/${data.rental_type}`,
                };
              } else {
                return { ...item, convertedAmount: `${convertedPrice}` };
              }
            })
          );
          setFloorPlans(convertedFloorPlans);
        } else {
          setFloorPlans([]);
        }

        // ✅ Min/Max conversion
        let cMinAmount =
          data.minAmount && parseInt(data.minAmount)
            ? await currencyConverter(parseInt(data.minAmount), currency)
            : null;

        let cMaxAmount =
          data.maxAmount && parseInt(data.maxAmount)
            ? await currencyConverter(parseInt(data.maxAmount), currency)
            : null;

        if (data.is_rental === 1 && data.minAmount != null) {
          cMinAmount =
            data.minAmount && parseInt(data.minAmount)
              ? await currencyConverter(data.minAmount, currency)
              : null;
          cMinAmount = `${cMinAmount}/${data.rental_type}`;
        }

        setMinAmount(cMinAmount);
        setMaxAmount(cMaxAmount);
      } catch (error) {
        console.error("Currency conversion failed:", error);
      }
    };

    convertAmounts();
  }, [data, currency]);
  console.log('data', data);
  const Gallery = data.Gallery.filter((item) => item.fileFor === "Gallery");
  return (
    <>
    <div className={styles.main_thumbnail}>
        
      
      <div className={styles.detailImg}>
   
        <Image loader={imageKitLoader} src={`${data.thumbnail}`} alt={data.title} className={styles.img_fluid} width={100} height={100}/>
        <div className={styles.positionAbs}>
        <div className={styles.top_section}>
        <div className={styles.page_title}>
          <h2>{data.title}</h2>
        </div>
        {parseInt(data.minAmount) > 0 ? (
          <div className={styles.page_price}>
            <h4>
              {parseInt(data.maxAmount) > 0 
                ? `${minAmount} - ${maxAmount}`  // Show both minAmount and maxAmount
                : minAmount}
            </h4>
          </div>
        ) : (
           <Link href="/contact-us" className={`${styles.askPrice} badge bg-danger text-white`}> Ask for Price</Link>
        )}
      </div>
        <div className={styles.imgBottom}>
        <p className='mb-1'><i className="fas fa-building"></i> {data.Developer.name}</p>
        <p className='mb-0'><i className="fas fa-user"></i> {data.agentUser.firstName} {data.agentUser.firstName}</p>
        </div>
        </div>
        </div>
      </div>
      <h4 className={styles.tags}>{data.PCategory.title}</h4>
      <div className='d-md-none mt-2 mt-md-0'>
      {Gallery && Gallery.length > 0 && (
        <div className={`${styles.img_gallery}`}>
          <MyGallery items={Gallery} />
        </div>
      )}
      </div>
      <ul className={`${styles.basic_info} mb-1 mt-2`}>
        <li><i className="fas fa-comments"></i> ({data.Review.length})</li>
        <li><i className="fas fa-eye"></i> ({data.view})</li>
        <li><i className="fas fa-clock"></i> {postDate}</li>
      </ul>
      {data.amenities && data.amenities.length > 0 && (
        <div className={`${styles.amenities} row my-3`}>
          <h4 className='col-12'>Amenities</h4>
          <Amenities items={data.amenities} />
        </div>
      )}
      {floorPlans &&  ( <div className="row my-3"> <h4 className='col-12'>Floor Plans</h4><FloorPlan items={floorPlans}/></div>)}
      {description && (<div className={styles.propertyDesc} dangerouslySetInnerHTML={{ __html: description }} />)}

      <div className='map-section '>
        <h4>Location</h4>
        <PropertyMap data={data} />
      </div>
    </>
  )
}

export default LeftDetails
