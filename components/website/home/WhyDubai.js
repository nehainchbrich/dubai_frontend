import React from 'react'
import styles from '../../../styles/Builder.module.css';
import Link from 'next/link';
import FullModal from '../common/FullModal';
import Image from 'next/image';
const WhyDubai = () => {
  return (
    <>
      <FullModal />
      <section className={`${styles.callto_area} ${styles.glassCard} section_gap`}>
        <div className={styles.overlay}></div>
        <div className={`${styles.zIndx} container`}>
          <div className="row">
            <div className='col-md-10'>
              <div className={`${styles.call_wrap} ${styles.glassCard}`}>
                <a className={styles.video_play_button} href="#" data-bs-toggle="modal" data-bs-target="#whyDeveloper">
                  <span></span>
                </a>
                <h2 className={styles.gradientText}>Why Invest in Dubai?</h2>
                <div className={`row`}>
                  <div className={`${styles.list} col-md-6`}>

                    <p className={styles.listItem}><Link href={`/blogs/which-is-the-safest-city-in-the-world-dubai-as-per-reports`}><Image alt="check" width={20} height={20} src='/images/check.png' /> Safest city in the world </Link></p>

                    <p className={styles.listItem}><Link href={`/blogs/what-is-a-freehold-property-in-dubai`}><Image alt="check" width={20} height={20} src='/images/check.png' /> Freehold ownership</Link></p>

                    <p className={styles.listItem}><Link href={`/blogs/how-to-get-dubai-golden-visa-2`}><Image alt="check" width={20} height={20} src='/images/check.png' /> Long term golden visa</Link></p>

                    <p className={styles.listItem}><Link href={`/blogs/do-you-know-these-upcoming-transportation-systems-in-uae-2`}><Image alt="check" width={20} height={20} src='/images/check.png' /> Worldwide connectivity</Link></p>
                    <p className={styles.listItem}><Link href={`/blogs/dubai-real-estate`}><Image alt="check" width={20} height={20} src='/images/check.png' /> High capital appreciation </Link></p>

                  </div>
                  <div className={`${styles.list} col-md-6`}>


                    <p className={styles.listItem}><Link href={`/blogs/the-golden-opportunities-invest-in-dubai-for-long-term-growth`}><Image alt="check" width={20} height={20} src='/images/check.png' /> Ease of investment </Link></p>

                    <p className={styles.listItem}><Link href={`/blogs/100-tax-free-income-in-dubai`}><Image alt="check" width={20} height={20} src='/images/check.png' /> 100% income tax free </Link></p>

                    <p className={styles.listItem}><Link href={`/blogs/unexpected-rise-in-dubai-real-estate-market-till-new-year`}><Image alt="check" width={20} height={20} src='/images/check.png' /> Fastest growing economy </Link></p>

                    <a href="#" data-bs-toggle="modal" data-bs-target="#triggerFrm" className='btns btn-blue'>Enquiry Now →</a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

export default WhyDubai
