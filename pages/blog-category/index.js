import React from 'react'
import Website from '../layouts/website'
import CommonBanner from '@/components/website/common/CommonBanner'
import SimpleCard from '@/components/website/common/SimpleCard'
import API_URLS from '@/config/apiconfig'
import { fetchData } from '@/config/fetchApi'
const index = ({category,meta}) => {
  return (
    <>
     <CommonBanner title="Blog Categories" meta={meta}/>
     <div className='container my-5'>
      <h2 className='text-center'>Blog Categories</h2>
      <div className="row blog_tiles my-5"> 
        {category && category.map((item,index)=>(
            <div className='col-md-4 mb-3' key={index}>
                <SimpleCard item={item}/>
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
  export async function getServerSideProps(context) {
    const category = await fetchData(`${API_URLS.BLOGCATEGORY}?status=1`);
    const meta = await fetchData(API_URLS.META,{slug:'blog-category',columns: 'title,description,thumbnail,slug'});
    return {
      props: {category:category.data,meta:meta.data[0]} // will be passed to the page component as props
    }
  }