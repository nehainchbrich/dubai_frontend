import CommonBanner from '@/components/website/common/CommonBanner'
import React from 'react'
import Website from '../layouts/website';
import API_URLS from '@/config/apiconfig';
import LocationCard from '@/components/website/common/LocationCard';
import { fetchData, fetchWebsitePage } from '@/config/fetchApi';
const index = ({location,locationPage,meta}) => {
  const {data}= location;
  return (
    <>
      <CommonBanner title={locationPage.title} meta={meta}/>
      <div className='container my-5'>
        {locationPage &&(
            <div dangerouslySetInnerHTML={{ __html: locationPage.description }} />
        )}
      <div className="row blog_tiles my-5"> 
        {data && data.map((item,index)=>(
          <div className='col-md-4 mb-5' key={index}>
            <LocationCard item={item}/>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default index
index.getLayout = function getLayout(page) {
  const  {props} = page;
  return <Website meta={props.meta}>{page}</Website>;
}
export const getStaticProps = async () => {
  try {
    const options = {status: 1,columns: 'name,thumbnail,slug,rating,country,shortDesc,state'};
    const meta = await fetchData(API_URLS.META,{slug:'location-in-dubai',columns:'title,description,thumbnail,slug'});
    const location = await fetchData(API_URLS.LOCATION,options);
    const locationPage =await fetchWebsitePage('location-in-dubai');
    if(location.status ===true){
      return {
        props: {location,locationPage,meta:meta.data[0] || null },
        revalidate: 43200, // Set ISR and revalidate at midnight every day
      };
    }else{
      return { props: { location: [],locationPage:[],meta:[] || null }, revalidate: 10 };
    }
    
  } catch (error) {
    return { props: { location: [], locationPage:[],meta:[] || null }, revalidate: 10 }; // Fallback revalidate time
  }
};