import CommonBanner from '@/components/website/common/CommonBanner'
import React from 'react'
import Website from './layouts/website'
import API_URLS from '@/config/apiconfig'
import { fetchData } from '@/config/fetchApi'
const TermsAndCondition = ({ policy,meta }) => {
  return (
    <>
      <CommonBanner title="Terms &  Conditions" meta={meta}/>
      <div className='container section'>
        <div className='shadow p-4'>
        <div className=''>
          <div className='row'>
            <div dangerouslySetInnerHTML={{ __html: `${policy.terms}` }} />
          </div>
        </div>
        </div>
      </div>
    </>
  )
}

export default TermsAndCondition
TermsAndCondition.getLayout = function getLayout(page) {
  const  {props} = page;
  return (
    <Website meta={props.meta}>{page}</Website>
  )
}

export async function getStaticProps() {
  const policy = await fetchData(API_URLS.TERMS);
  const meta = await fetchData(API_URLS.META,{slug:'terms-and-condition',columns: 'title,description,thumbnail,slug'});
  return {
    props: { policy: policy.data,meta:meta.data[0] }, revalidate: 30
  }
}