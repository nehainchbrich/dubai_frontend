import React, { useState } from 'react'
import styles from '../../styles/OfferFrm.module.css'
import { Form, Formik } from 'formik'
import { OfferSchema } from '@/schema/OfferSchema'
import TextField from '@/form/TextField'
import SelectField from '@/form/SelectField'
import CheckboxField from '@/form/CheckBoxField'
const OfferFrm = () => {
    const [isHidden, setIsHidden] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const defaultValue={offerName:"Luxury Car Offer",offerRange:"",termsAccept:""}
    const offerRangeOpt =[
        {value:'10 M - 14.9 M AED',label:'10 M - 14.9 M AED'},
        {value:'15 M - 24.9 M AED',label:'15 M - 24.9 M AED'},
        {value:'25 M AED & Above',label:'25 M AED & Above'},
      ]
  const handleSubmit = (value,action)=>{
    try {
      setIsLoading(true);
      localStorage.setItem('offerData', JSON.stringify(value));
      setIsLoading(false);
      handleSkip();
    } catch (error) {
      console.error("Error storing value in localStorage:", error);
      setIsLoading(false);
    }
  }

  const handleSkip = ()=>{
    setIsHidden(true);
  }
  return (
    <>
    <div className={`${styles.offer_frm} ${isHidden ? "hide" : ""}`}>
      <div className={styles.skip_btn} onClick={handleSkip}>Skip</div>
      <div className={`${styles.container}`}>
        <div className='row'>
            <Formik initialValues={defaultValue} onSubmit={handleSubmit} validationSchema={OfferSchema}>
                <Form>
                <div className={`col-md-4 row m-auto ${styles.invitation_frm}`}>
                    <div className='col-md-12 text-center my-3'>
                    <h2>{`Drive Home a Brand New Luxury Car`}</h2>
                    <p className="offer-message">
                            {`Want to grab our exclusive Luxury Car Offer? 
                            Simply fill in the details below to enroll in this offer.  
                            Feel free to skip this step if it’s not relevant to you.`}
                        </p>
                    </div>
                    <hr/>
                    <TextField type="hidden" name="offerName" />
                    <SelectField label="Select Your Investment Range" required={true} name="offerRange" options={offerRangeOpt}/>
                    <CheckboxField name="termsAccept" label="I agree to the" href="/offers/term-conditions-for-mercedes" required={true}/>
                    <div className='col-md-12 text-center'>
                    <button type="submit" className="btns btn-blue btn-50" disabled={isLoading}>{isLoading ? 'Please Wait...' : 'Next'}</button>
                    <button type="submit" className="btns btn-blue btn-50" onClick={handleSkip}>Skip</button>
                    </div>
                </div>
                </Form>
            </Formik>
        </div>
      </div>
    </div>
    </>
  )
}

export default OfferFrm
