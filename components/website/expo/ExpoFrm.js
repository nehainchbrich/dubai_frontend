import SelectField from '@/form/SelectField';
import TextField from '@/form/TextField';
import React, { useEffect, useState } from 'react'
import styles from '../../../styles/Thanks.module.css'
import { Form, Formik } from 'formik';
import { ExpoSchema } from '@/schema/ExpoSchema';
import API_URLS from '@/config/apiconfig';
import { formatEventDatesWithSuffix, formatExpoDate, generateQRCode, imageKitLoader, mobileInput } from '@/helper/Helper';
import Link from 'next/link';
import Image from 'next/image';
const ExpoFrm = ({ data, team }) => {
  const defaultValue = { expodate: "", name: "", email: "", mobile: "", city: "", interest: "EXPO", visitcountry: "", agent: "", slot: "", refer: "", occupation: "",eventName:data?.[0]?.eventName || "", occupation_other: "" }
  const venueOrCity = data[0].venue ? data[0].venue : data[0].city;
  const [isLoading, setIsLoading] = useState(false);
  const countryOpt = [
    { value: 'U.K', label: 'U.K' },
    { value: 'Dubai', label: 'Dubai' },
    { value: 'Singapore', label: 'Singapore' },
    { value: 'Thailand', label: 'Thailand' },
    { value: 'None of Above', label: 'None of Above' },
  ];
  const occupation = [
    { value: 'Government Employee', label: 'Government Employee' },
    { value: 'Self-Employed', label: 'Self-Employed' },
    { value: 'Business Owner', label: 'Business Owner' },
    { value: 'Private Sector Employee', label: 'Private Sector Employee' },
    { value: 'Retired', label: 'Retired' },
    { value: 'Freelancer', label: 'Freelancer' },
    { value: 'Others', label: 'Others' },
  ]
  const timeOpt = [
    { value: '10-12 PM', label: '10-12 PM' },
    { value: '12-02 PM', label: '12-02 PM' },
    { value: '02-04 PM', label: '02-04 PM' },
    { value: '04-06 PM', label: '04-06 PM' },
    { value: '06-08 PM', label: '06-08 PM' },
    { value: '08-10 PM', label: '08-10 PM' },
  ];

  const agentOpt = [
    ...team.map((member) => ({
      label: `${member.firstName.trim()} ${member.lastName}`, // Combine firstName and lastName
      value: `${member.userCode}`
    })),
    { label: "None of Above", value: "Inchbrick" },
  ];
  const expoDateOpt = formatEventDatesWithSuffix(data[0].eventDate);
  const frmDate = formatExpoDate(expoDateOpt);
  const [dialCode, setDialCode] = useState('+91');
  useEffect(() => {
    const cleanup = mobileInput('Expomobile', setDialCode);
    return cleanup;
  }, []);

  const handleSubmit = async (value, action) => {
    localStorage.removeItem('qrCode');
    try {
      setIsLoading(true);
      if (!value.agent) {
        value.agent = "Inchbrick";
      }
      if (!value.visitcountry) {
        value.visitcountry = "None of Above";
      }
      let modifiedOccupation = value.occupation === 'Others' ? value.occupation_other : value.occupation;
      const offerData = JSON.parse(localStorage.getItem('offerData'));
      const modifiedValues = {
        ...value,
        mobile: `${dialCode}${value.mobile}`, // Combine dial code with mobile number
        occupation: modifiedOccupation,
        offerData: offerData || null,
      };
      delete modifiedValues.occupation_other;
      const response = await fetch(`${API_URLS.EXPO}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(modifiedValues)
      })
      const res = await response.json()
      if (res.status === true) {
        action.resetForm();
        const qr = await generateQRCode(res.data.passno);
        const data = {
          qr: qr,
          pass: res.data.passno
        }
        localStorage.setItem('qrCode', JSON.stringify(data));
        localStorage.removeItem('offerData');
        window.location.href = '/expo-invitation/thank-you';
      } else {
        Swal.fire({
          title: 'Registration Failed',
          text: 'The provided email or mobile number is already in use. Please try with another email or mobile number.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      throw Error(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <div className='container'>
        <div className='row'>

          <Formik initialValues={defaultValue} onSubmit={handleSubmit} validationSchema={ExpoSchema}>
            {({ isSubmitting, values }) => (
              <Form>
                <div className='col-md-6 row m-auto invitation_frm'>
                  <div className='col-md-12 text-center my-3 '>
                    <Link href={'/'}>
                      <Image loader={imageKitLoader} src={`/common/logo.png`} title="Inchbrick Logo" alt="Inchbrick" className={`${styles.expo_img} img-fluid`} width={100} height={100} />
                    </Link>
                    <h1 className='heading'>Register for Dubai Property Expo by Inchbrick Realty</h1>
                    <h3 className='heading2'>{`Download Your Free VIP Pass for Dubai Grand Real Estate Expo in ${data[0].city}`}</h3>
                    <p>{`${venueOrCity} | ${frmDate} | 10 am to 10 pm`}</p>
                  </div>
                  <hr />
                  <TextField type="hidden" name="interest" />
                  <TextField type="hidden" name="eventName" />
                  <div className='col-md-6'>
                    <SelectField label="Select Your Expo Date" required={true} name="expodate" options={expoDateOpt} />
                  </div>
                  <div className='col-md-6'>
                    <SelectField label="Select Your Slot" required={true} name="slot" options={timeOpt} />
                  </div>
                  <div className='col-md-6'>
                    <TextField type="text" name="name" label="Full Name" required={true} />
                  </div>
                  <div className='col-md-6'>
                    <TextField type="email" name="email" label="Enter Email ID" required={true} />
                  </div>
                  <div className='col-md-6'>
                    <TextField type="tel" name="mobile" id="Expomobile" label="Mobile" required={true} />
                  </div>
                  <div className='col-md-6'>
                    <TextField type="text" name="city" label="Enter Your City" required={true} />
                  </div>
                  <div className='col-md-6'>
                    <SelectField type="text" name="occupation" label="Type of Occupation" required={true} options={occupation} />
                  </div>
                  {values.occupation === 'Others' && (
                    <div className='col-md-6'>
                      <TextField type="text" name="occupation_other" label="Other Occupation" required={true} />
                    </div>
                  )}
                  <div className='col-md-6 hide'>
                    <TextField type="text" name="refer" label="Have a referral code?" />
                  </div>
                  <div className='col-md-6'>
                    <SelectField label="Select Your Portfolio manager" name="agent" options={agentOpt} />
                  </div>
                  <div className='col-md-6'>
                    <SelectField label="Which country you visit most for Vacations?" name="visitcountry" options={countryOpt} />
                  </div>
                  <div className='col-md-12 text-center'>
                    <button type="submit" className="btns btn-blue btn-50" disabled={isLoading}>{isLoading ? 'Please Wait...' : 'Submit'}</button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <style jsx>
        {`
      
      .invitation_frm{
        background: var(--brand-color-1);
        padding: 10px;
        color: val(--color-1);
        border-radius: 10px;
        box-shadow: 0 2px 4px 0 rgba(141, 138, 138, 0.688);
        border: 4px solid;
        border-image: var(--four-side-border);
      }
        .invitation_frm .expo_logo{
          width: 200px;
          height: 50px;
          margin-bottom: 10px;
        }
         
  .heading{
        font-size:2rem;
     
        text-transform: uppercase;
        margin-bottom:6px;
      }
        .heading{
        margin-top:4px
        }
 
      `}
      </style>
    </>
  )
}

export default ExpoFrm
