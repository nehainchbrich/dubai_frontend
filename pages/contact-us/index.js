import React from 'react'
import Website from '../layouts/website'
import FormSection from '@/components/website/contact/FormSection'
import Address from '@/components/website/contact/Address';
import Map from '@/components/website/contact/Map';
import { fetchData, fetchWebsitePage } from '@/config/fetchApi';
import API_URLS from '@/config/apiconfig';

const Index = ({ contactPage }) => {
  return (
    <>
      {/* <Banner title={contactPage.title} /> */}
      <div className='container-fluid'>
      <div className='section light-bg contact-form'><FormSection data={contactPage} /></div>
      <Address />
      <Map />
      </div >
    </>
  )
}
export default Index
Index.getLayout = function getLayout(page) {
  const  {props} = page;
  return (
    <Website meta={props.meta}>{page}</Website>
  )
}
export const getStaticProps = async () => {
  
  try {
    const contactPage = await fetchWebsitePage('contact-us');
    const meta = await fetchData(API_URLS.META,{slug:'contact-us',columns:'title,description,slug'});
    return { props: { contactPage,meta:meta.data[0] }, revalidate: 30 };
  } catch (error) {
    return { props: { contactPage: [],meta:[] }, revalidate: 10 }; // Fallback revalidate time
  }
};