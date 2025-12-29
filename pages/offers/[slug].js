import React from 'react'
import Website from '../layouts/website'
import { fetchData } from '@/config/fetchApi'
import API_URLS from '@/config/apiconfig'
import Banner from '@/components/expo/Banner'

const Slug = ({offers,meta}) => {
  return (
    <>
      <Banner meta={meta}/>
      <div className='container section'>
       <div className='row'>
       <div dangerouslySetInnerHTML={{ __html: `${offers[0].terms}` }} />
       </div> 
    </div>
    </>
  )
}

export default Slug
Slug.getLayout = function getLayout(page) {
  const  {props} = page;
  return <Website meta={props.meta}>{page}</Website>;
  }
export async function getServerSideProps(context) {
  const {slug} =context.query;
  try {
    const offerDetails = await fetchData(API_URLS.OFFERS,{slug:slug,status:1});
    const meta = await fetchData(API_URLS.META,{slug:`offers/${slug}`,columns:'title,description,thumbnail,slug'});
    if(offerDetails.data.length > 0){
      return {
        props:{offers:offerDetails.data,meta:meta.data[0] || null}
      }
    }
    return {notFound: true}; 
  } catch (error) {
    console.error('Error fetching home data:', error);
    throw new Error('An error occurred while fetching data.');
  }
}