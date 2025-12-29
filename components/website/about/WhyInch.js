import React from 'react'
import styles from '../../../styles/AboutYInch.module.css';
const WhyInch = ({heading}) => {
  return (
    <>
       <div className={styles.whyInch_about}>
       <div className="container my-5">
        <div className="row my-5">
            <div className={`col-md-5 ${styles.why_logo}`}>
                <h2>WHY  INCHBRICK.COM?</h2>
                
            </div>
            <div className="col-md-7">
            <div dangerouslySetInnerHTML={{ __html: heading }} />
            </div>
        </div>
        </div>
       </div>
    </>
  )
}

export default WhyInch
