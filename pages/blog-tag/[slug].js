import React from 'react'
import Website from '../layouts/website'
import CommonBanner from '@/components/website/common/CommonBanner'
import BlogItems from '@/components/website/blogs/BlogItems'
import API_URLS from '@/config/apiconfig'
import { fetchData } from '@/config/fetchApi'
const slug = ({tags,blog,meta}) => {
  return (
    <>
      <CommonBanner title={tags.title} meta={meta}/>
     <div className='container my-5'>
          <div className='row'>
              <h4>Blogs ({blog.length})</h4>
              {blog && blog.map((item,index)=>(
            <div className='col-md-4 my-3' key={index}>
              <BlogItems data={item}/>
            </div>
          ))}
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
        const tags = await fetchData(API_URLS.BLOG_TAG,{status:1,slug});
        const meta = await fetchData(API_URLS.META,{slug:`blog-tag/${slug}`,columns: 'title,description,thumbnail,slug'});
        if(tags.total > 0){
          const tagCode=tags.data[0].code;
          const blog = await fetchData(API_URLS.BLOG,{status:1,tags:tagCode});
         return {
          props: {tags:tags.data,blog:blog.data,meta:meta.data[0] || null}
        }
       }
       return {notFound: true,};
        
      } catch (error) {
        return { props: {} };
      }
    }
