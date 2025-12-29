import React from 'react'
import Website from '../layouts/website'
import CommonBanner from '@/components/website/common/CommonBanner'
import FaqSection from '@/components/website/faqs/faqSection'
import LatestProperty from '@/components/website/property/LatestProperty';
import LatestBlog from '@/components/website/blogs/LatestBlog';
import API_URLS from '@/config/apiconfig'
import Image from 'next/image';
import { fetchData } from '@/config/fetchApi';
 
const Index = ({faq,meta}) => {
  return (
    <>
      {/* <CommonBanner title="Dubai Real Estate FAQ's" meta={meta}/> */}
      <div className='container my-5'>
      <div className="row">
        <h2 className='title'><b>{`Frequently Asked Questions (FAQ's)`}</b></h2>
        <div className='col-md-8'>
            <div className="my-4 accordion">
              {faq && faq.map((item, index) => (
              <FaqSection  title={item.title} content={item.content} count={index}  key={index}/>
              ))}
            </div>
        </div>
        <div className='col-md-4'>
          <Image src={`${process.env.API_URL}/common/faq.jpg`} width={400} height={600} alt='inchbrick frequently asked questions'/>
            <LatestProperty/>
            <LatestBlog/>
        </div>
      </div>
      </div>
        <style jsx>
        {`
        .accordion {
          overflow: hidden;
          margin-bottom: 1em;
        }
        `}
        </style>
    </>
  )
}

export default Index
Index.getLayout = function getLayout(page) {
  const  {props} = page;
  return <Website meta={props.meta}>{page}</Website>;
  }

  export async function getStaticProps() {
    const faq = await fetchData(`${API_URLS.FAQ}?status=1`);
    const meta = await fetchData(API_URLS.META,{slug:'dubai-real-estate-faqs',columns: 'title,description,thumbnail,slug'});
    return {
      props:{faq:faq.data,meta:meta.data[0] || null},revalidate: 60
    }
  }