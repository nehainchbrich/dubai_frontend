import CommonBanner from '@/components/website/common/CommonBanner'
import React from 'react'
import Website from '../layouts/website'
import AgentCard from '@/components/website/common/AgentCard'
import API_URLS from '@/config/apiconfig'
import { fetchData } from '@/config/fetchApi'
const index = ({agent,meta}) => {
  return (
    <>
      <CommonBanner title="Agent Profile" meta={meta}/>
      <div className='container my-5'>
      <h2>Agent Profile</h2>
      <p>{`We are a team of passionate individuals with over 10 years of experience in Dubai Real estate . we use our expertise in finding you your dream property.`}</p>
      <h3>{`Here are some things your team can do to stand out from other real estate agents in Dubai:`}</h3>
      <ul>
        <li>{`Focus on a specific niche. Dubai is a large and diverse city, so it can be helpful to focus on a specific niche, such as luxury properties, family homes, or investment properties. This will allow you to become experts in your field and provide your clients with the best possible service.`}</li>
        <li>{`Build relationships with clients. Real estate is a people business, so it's important to build relationships with your clients. Get to know their needs and wants, and help them find the perfect property for their lifestyle and budget.`}</li>
        <li>{`Provide excellent customer service. This includes being responsive to your clients' needs, keeping them updated on the latest developments, and negotiating the best possible deals on their behalf.`}</li>
        <li>{`Use technology to your advantage. There are a number of real estate technology tools available that can help you market properties more effectively and manage your client relationships more efficiently. Make sure you are using the latest tools to stay ahead of the curve.`}</li>
      </ul>
      <div className="row blog_tiles my-5"> 
      {agent && agent.map((item,index)=>(
        <div className='col-md-4 mb-2' key={index}><AgentCard item={item}/></div>
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
  const agent = await fetchData(API_URLS.AGENT,{status:1,is_verify:1,sortBy:'order',sortOrder:'asc'});
  const meta = await fetchData(API_URLS.META,{slug:'agent-profile',columns: 'title,description,thumbnail,slug'});
    return {
      props: {agent:agent.data,meta:meta.data[0]}
    }
  }