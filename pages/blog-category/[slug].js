import React from 'react'
import Website from '../layouts/website'
import CommonBanner from '@/components/website/common/CommonBanner'
import BlogItems from '@/components/website/blogs/BlogItems'
import API_URLS from '@/config/apiconfig'
import { fetchData } from '@/config/fetchApi'
const slug = ({blog,blogCat,meta}) => {
  return (
    <>
      <CommonBanner title={blogCat[0].title} meta={meta}/>
      <div className='container my-5'>
          <div className='row'>
              <h4>{blogCat.title}</h4>
              <div dangerouslySetInnerHTML={{ __html: blogCat.description }}/>
          </div>
      </div>
      <div className='container my-5'>
          <div className='row'>
              <h4>Blogs</h4>
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

export async function getServerSideProps(context) {
  const {slug} =context.query;
  try {
    const blogCat = await fetchData(API_URLS.BLOGCATEGORY,{slug,status:1});
    const meta = await fetchData(API_URLS.META,{slug:`blog-category/${slug}`,columns: 'title,description,thumbnail,slug'});
    if(blogCat.total > 0){
      const category=blogCat.data[0].code;
      const blog = await fetchData(API_URLS.BLOG,{category,status:1});
      return {
       props: {blogCat:blogCat.data,blog:blog.data,meta:meta.data[0]}
     }
    }
    return {notFound: true,};
  } catch (error) {
    return { props: {} };
  }
}
export default slug
slug.getLayout = function getLayout(page) {
  const  {props} = page;
  return <Website meta={props.meta}>{page}</Website>;
  }

