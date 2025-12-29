import React from 'react'
import Website from '../layouts/website'
import { fetchData } from '@/config/fetchApi'
import API_URLS from '@/config/apiconfig'
import { ImagePath } from '@/helper/Helper'
import ListView from '@/components/website/property/ListView'
import CommonBanner from '@/components/website/common/CommonBanner'

const Slug = ({ptype,property,meta}) => {
  const description = ImagePath(ptype.description)
  return (
    <>
      <CommonBanner title={ptype.title} meta={meta}/>
      <div className='container my-5'>
              <div className='row'>
                  <h4>{ptype.title} (About {property.length} results)</h4>
                  <div dangerouslySetInnerHTML={{ __html:description }}/>
              </div>
              <div className='row'>
              {property && property.length ? (
                  property.map((item, index) => (
                    <div className="col-md-6 mb-3" key={index}>
                      <ListView item={item} />
                    </div>
                  ))
                ) : (
                  <p>No data found</p>
                )}
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
   const propertyType = await fetchData(API_URLS.PROPERTIES_TYPE,{slug,status:1});
   if(propertyType.total > 0){
        const meta = await fetchData(API_URLS.META,{slug:`residential-properties/${slug}`,columns:'title,description,thumbnail,slug'});
        const pTypeCode =propertyType.data[0].code;
        const options = {status: 1,property_type:pTypeCode};
        const property = await fetchData(API_URLS.PROPERTIES,options);
      return {
        props:{ptype:propertyType.data[0],
          property: property.data,
          meta: meta.data[0] || null}
      }
   }
   return {
    notFound: true,
  };
    
  } catch (error) {
    return { props: {} };
  }
}