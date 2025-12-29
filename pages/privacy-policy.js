import CommonBanner from '@/components/website/common/CommonBanner'
import React from 'react'
import Website from './layouts/website'
import API_URLS from '@/config/apiconfig'
import { fetchData } from '@/config/fetchApi'
const PrivacyPolicy = ({policy,meta}) => {
  return (
    <>
    <CommonBanner title="Privacy Policy" meta={meta}/>
    <div className='container section'>
      <div className='shadow p-4'>
        <h2 className='title'>Privacy Policy</h2>
       <div className='row'>
       <div dangerouslySetInnerHTML={{ __html: `${policy.policy}` }} />
       </div> 
       </div>
    </div>
    </>
  )
}

export default PrivacyPolicy
PrivacyPolicy.getLayout = function getLayout(page) {
  const  {props} = page;
    return (<Website meta={props.meta}>{page}</Website>)
  }

  export async function getStaticProps() {
    const policy = await fetchData(API_URLS.TERMS);
    const meta = await fetchData(API_URLS.META,{slug:'privacy-policy',columns: 'title,description,thumbnail,slug'});
    return {
      props:{policy:policy.data,meta:meta.data[0]},revalidate: 30
    }
  }