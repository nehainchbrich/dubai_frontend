import { useEffect, useState } from 'react'
import styles from '../../../styles/Working.module.css';
import CountUp from 'react-countup';
import Image from 'next/image';
import Map from '../contact/Map';
import {imageKitLoader} from '@/helper/Helper';
import { staticBlurDataUrl } from '@/utils/staticBlurDataUrl';
const Working = ({heading}) => {
    const [property,setProperty] =useState(null)
    useEffect(() => {
        const cachedData = localStorage.getItem('propertyData');
        if(cachedData){
            const { data } = JSON.parse(cachedData);
            setProperty(data.length)
        }else{
            setProperty(200);
        }
        const counters = document.querySelectorAll('.counter');
        counters.forEach((counter) => {
          const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const speed = 200;
      
            const inc = target / speed;
      
            if (count < target) {
              counter.innerText = Math.ceil(count + inc);
              setTimeout(updateCount, 1);
            } else {
              counter.innerText = target;
            }
          };
          updateCount();
        });
      }, []);
      
  return (
    <>
      <div className="container">
        <div className="row my-5">
            <div className="col-lg-12">
                <div dangerouslySetInnerHTML={{ __html: heading }} />
                <a href="#" data-bs-toggle="modal" data-bs-target="#triggerFrm" className='btns btn-orange'>Enquiry Now →</a>
            </div>
            <div className="col-lg-12">
                <Image loader={imageKitLoader} src={`/background/bg-home-3.webp`} width={100} height={100} quality={50}  placeholder="blur" blurDataURL={staticBlurDataUrl()} style={{width:'100%',height:'auto'}} sizes='(max-width: 426px) 40vw, 426px' alt='Enjoy a day with inch & Brick Property' className={styles.img_fluid}/>
            </div>
            <div className={`col-md-12 my-5 row `}>
            <div className='col-md-6 my-5'>
            <Map/>   
            </div>
                <div className={`col-md-6 row ${styles.counter}`}>
                    <div className="col-md-6">
                        <div className={styles.counter_section}>
                            <div className={styles.counter_area}>
                                <h3><CountUp start={0} end={2} duration={15} separator="," delay={0} decimals={0} redraw={true} suffix='' prefix=''></CountUp></h3>
                                <p>Offices Worldwide</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                    <div className={styles.counter_section}>
                        <div className={styles.counter_area}>
                        <h3><CountUp start={0} end={ property} duration={15} separator="," delay={0} decimals={0} redraw={true} suffix='' prefix=''></CountUp></h3>
                        <p>Properties Listed</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className={styles.counter_section}>
                        <div className={styles.counter_area}>
                        <h3><CountUp start={0} end={40254} duration={15} separator="," delay={0} decimals={0} redraw={true} suffix='' prefix=''></CountUp></h3>
                        <p>Property Views</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className={styles.counter_section}>
                        <div className={styles.counter_area}>
                        <h3><CountUp start={0} end={3} duration={15} separator="," delay={0} decimals={0} redraw={true} suffix='' prefix=''></CountUp></h3>
                        <p>Languages Spoken</p>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Working
