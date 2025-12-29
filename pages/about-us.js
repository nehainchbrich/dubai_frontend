import React from 'react'
import AboutInch from '@/components/website/about/AboutInch'
import Approach from '@/components/website/about/Approach'
import Leadership from '@/components/website/about/Leadership'
import Mission from '@/components/website/about/Mission'
import Vission from '@/components/website/about/Vission'
import WhyInch from '@/components/website/about/WhyInch'
import Website from './layouts/website'
import CommonBanner from '@/components/website/common/CommonBanner'
import { about, approch, mission, vision, why } from '@/components/website/about/AboutContent'
import { fetchData } from '@/config/fetchApi'
import API_URLS from '@/config/apiconfig'
const About = ({meta}) => {
  return (
  <>
  <CommonBanner title='About Us' meta={meta}/>

  <AboutInch heading={about}/>
  <Mission heading={mission}/>
  <Vission heading={vision}/>
  <Approach heading={approch}/>
  <WhyInch heading={why}/>
  <Leadership/>
  </>
  )
}

export default About
About.getLayout = function getLayout(page) {
    const  {props} = page;
    return (<Website meta={props.meta}>{page}</Website>)
  }

 export async function getStaticProps() {
    const meta = await fetchData(API_URLS.META,{slug:'about-us',columns: 'title,description,thumbnail,slug'});
    return {
      props:{meta:meta.data[0]},revalidate: 30
    }
  }