import React from 'react'
import BlogItems from './BlogItems';
import Link from 'next/link';
const BlogCard = ({title,data}) => {
return (
    <>
    <div className='container'>
    <div className='row'>
      <div className='col-md-9'>
          <h2 className='title'>{title}</h2>
          <p>Get the latest news and updates on the real estate industry, including market trends, new developments, and regulatory changes, keeping you informed and empowered to make sound decisions in your property endeavours. Stay ahead of the curve with our timely and relevant news updates.</p>
        </div>
        <div className='col-md-3 text-end'>
          <Link href='/blog-category/news' className='btns btn-orange'>View More →</Link>
        </div>
        </div>
      <div className="row blog_tiles my-5">
      {data && data.map((item, index) => (
              <div className='col-md-4' key={index}>
                 <BlogItems data={item}/>
              </div>
            ))}
        
      </div>
    </div>
      <style jsx>
      {`
      .blog_tiles {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 0 -15px;
      }`}
      </style>
    </>
  )
}

export default BlogCard
