import WelcomeBar from '@/components/user/WelcomeBar'
import { useSites } from '@/context/SiteProvider'
import User from '@/pages/layouts/user'
import Link from 'next/link'
import React from 'react'
const Index = () => {
    const sites = useSites();
  return (
    <>
      <WelcomeBar/>
      <div className='container'>
        <div className='row'>
            <div className='col-md-12 mt-4 p-5 bg-light text-dark rounded'>
                <h1 className='text-center mb-3'>Refer & Earn</h1>
                <h2 className='text-center mb-3'>{`Earn Big By Referring Friends to Find Their Dream Property in Dubai!`}</h2>
                <p className='text-center mb-3'><b>{`Looking to make some extra cash?`} </b> {`We're on the hunt for property matchmakers!  Do you know people who are interested in buying or renting a property in Dubai? `}</p>
                <h4 className='text-center mb-3'><b>{`Join our referral program and get rewarded for every successful connection!`}</b></h4>
                <h4><b>{`Here's how it works:`}</b></h4>
                <ol>
                    <li><b>{`Spread the Word:`}</b> {`Tell your friends, family, and network about our amazing selection of properties in Dubai. From luxury apartments to spacious villas, we have something for everyone.`}</li>
                    <li><b>{`Referrals Made Easy:`}</b> {`Simply share our website link or contact details with your referrals.`}</li>
                    <li><b>{`We Do the Rest:`}</b> {`Our dedicated team will take care of all their property needs, from finding the perfect match to guiding them through the buying or renting process.`}</li>
                    <li><b>{`Earn Big Rewards!`}</b> {`When your referral successfully rents or buys a property through us, you'll receive a generous commission! The more referrals you send our way, the more you earn!`}</li>
                </ol>
                <h4><b>{`Why Choose Our Referral Program?`}</b></h4>
                <ul>
                    <li><b>{`Lucrative Commissions:`}</b> {`Earn a significant percentage of the commission on every successful referral.`}</li>
                    <li><b>{`Easy to Participate:`}</b> {`No experience necessary! Simply refer interested individuals and we'll handle the rest.`}</li>
                    <li><b>{`Wide Range of Properties:`}</b> {`We offer a diverse selection of properties to suit all budgets and lifestyles.`}</li>
                    <li><b>{`Expert Support`}</b> {`Our team is dedicated to providing exceptional service to both you and your referrals.`}</li>
                </ul>
                <h4 className='text-center'><b>{`Don't miss out on this exciting opportunity to earn extra income while helping others find their dream property in Dubai!`}</b></h4>
                <h5>{`Visit our website:`} <Link href={'https://www.inchbrick.com'} className='text-dark'>{`https://www.inchbrick.com`}</Link></h5>
                <h5>{`Contact us:`} <Link href={`https://api.whatsapp.com/send?phone=${sites.dubai_contact}`} className='text-dark'>{sites.dubai_contact}</Link></h5>

            </div>
        </div>
      </div>
    </>
  )
}

export default Index
Index.getLayout = function getLayout(page) {
    return (<User>{page}</User>)
  }