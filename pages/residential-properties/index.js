import React from 'react'
import Website from '../layouts/website'
import CommonBanner from '@/components/website/common/CommonBanner'
import API_URLS from '@/config/apiconfig';
import PTypeCard from '@/components/website/common/PTypeCard';
import { fetchData, fetchWebsitePage } from '@/config/fetchApi';
import { ImagePath } from '@/helper/Helper';
const index = ({ptype,ptypePage,meta}) => {
  const {data} =ptype;
  const description = ImagePath(ptypePage.description)
  return (
    <>
      <CommonBanner title={ptypePage.title} meta={meta}/>
      <div className='container my-5'>
        {ptypePage &&(
            <div dangerouslySetInnerHTML={{ __html: description }} />
        )}
     <div className="row blog_tiles my-5"> 
        {data && data.map((item,index)=>(
          <div className='col-md-4 mb-5' key={index}>
            <PTypeCard data={item}/>
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
    const options = {status: 1,columns: 'title,thumbnail,slug,description'};
    const ptype = await fetchData(API_URLS.PROPERTIES_TYPE,options);
    const ptypePage = await fetchWebsitePage('residential-properties');
    const meta = await fetchData(API_URLS.META,{slug:'residential-properties',columns:'title,description,thumbnail,slug'});
    if(ptype.status ===true){
      return {
        props: {ptype,ptypePage,meta:meta.data[0] || null },
        revalidate: 43200, // Set ISR and revalidate at midnight every day
      };
    }else{
      return { props: { ptype: [],ptypePage:[] }, revalidate: 10 };
    }
    
  } catch (error) {
    return { props: { ptype: [], ptypePage:[] }, revalidate: 10 }; // Fallback revalidate time
  }
};