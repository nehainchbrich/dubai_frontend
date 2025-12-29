import CommonBanner from '@/components/website/common/CommonBanner'
import React from 'react'
import Website from '../layouts/website'
import API_URLS from '@/config/apiconfig';
import { ImagePath } from '@/helper/Helper';
import LatestProperty from '@/components/website/property/LatestProperty';
import LatestBlog from '@/components/website/blogs/LatestBlog';
import GridView from '@/components/website/property/GridView';
import { fetchData } from '@/config/fetchApi';
import ListView from '@/components/website/property/ListView';
const slug = ({location,property,meta}) => {
    const description = ImagePath(location.description,location.name);
  return (
    <>
      <CommonBanner title={location.name} meta={meta}/>
      <div className='container my-5'>
        <div className='row'>
            <div className='col-md-9'>
                <h4>{location.name}</h4>
                <div dangerouslySetInnerHTML={{ __html: description }}/>
            </div>
            <div className='col-md-3'>
                <div className='populer-property'>
                    <LatestProperty/>
                </div>
                <div className='populer-property'>
                    <LatestBlog/>
                </div>
            </div>
        </div>
        <div className='row my-5'>
            <h4 className='mb-3'>Property Listed ({property.length})</h4>
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

export default slug
slug.getLayout = function getLayout(page) {
    const  {props} = page;
  return <Website meta={props.meta}>{page}</Website>;
}
export async function getServerSideProps(context) {
  const {slug} =context.query;
  try {
    const meta = await fetchData(API_URLS.META,{slug:`location-in-dubai/${slug}`,columns:'title,description,thumbnail,slug'});
    const res =await fetch(`${API_URLS.LOCATIONSLUG(slug)}`);
    const location =await res.json();
    if(location.status ===true){
        const res =await fetch(`${API_URLS.PROPERTIES}?status=1&city=${location.data.name}`);
        const property =await res.json();
      return {
        props:{location:location.data,property:property.data,meta:meta.data[0] || null}
      }
   }
   return {
    notFound: true,
  };
    
  } catch (error) {
    return { props: {} };
  }
}