import React from 'react'
import Website from '../layouts/website'
import CommonBanner from '@/components/website/common/CommonBanner'
import Link from 'next/link'
import API_URLS from '@/config/apiconfig'
import { fetchData } from '@/config/fetchApi'
const index = ({tags,meta}) => {
  return (
    <>
     <CommonBanner title="Blog Tags" meta={meta}/>
     <div className='container my-5'>
 
      <div className="row blog_tiles my-5"> 
        {tags && tags.map((item,index)=>(
            <div className='tags' key={index}>
              <Link href={`/blog-tag/${item.slug}`} className='btns btn-orange'>
                <small>{item.title}</small>
              </Link>
            </div>
        ))}
      </div>
    </div>
    <style jsx>
    {`
    .tags {
      width: auto;
      margin-bottom: .5rem;
  }
     
  `}
    </style>
    </>
  )
}

export default index
index.getLayout = function getLayout(page) {
    const  {props} = page;
  return <Website meta={props.meta}>{page}</Website>;
  }
  export async function getServerSideProps(context) {
    const tags = await fetchData(`${API_URLS.BLOG_TAG}?status=1`);
    const meta = await fetchData(API_URLS.META,{slug:'blog-tag',columns: 'title,description,thumbnail,slug'});
    return {
      props: {tags:tags.data,meta:meta.data[0]} // will be passed to the page component as props
    }
  }