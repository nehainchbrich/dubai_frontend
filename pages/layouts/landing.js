import Navbar from '@/components/landingPage/Navbar';
import ProjectModal from '@/components/landingPage/ProjectModal';
import TriggerBtn from '@/components/website/form/TriggerBtn';
import { useMeta } from '@/context/MetaProvider';
import {uniqueVisitor } from '@/helper/Helper';
import Head from 'next/head';
import React, { useEffect } from 'react'
const Landing = ({children}) => {
  const meta = useMeta();
  useEffect(() => {
    const visitors = localStorage.getItem('visitors');
    if(!visitors){uniqueVisitor();}
   
  }, ['']);

  return (
    <>
    <Head>
    {meta && meta.title ? (
      <>
        <title>{meta.title}</title>
        {meta?.description && <meta name="description" content={meta.description} />}
        <meta property="og:title" content={meta.title}/>
        <meta property="og:description" content={meta.description}/>
        <meta property="og:image" content={`${process.env.API_URL}/common/logo.png`}/>
        <meta property="og:url" content={meta.slug}/>
        <link rel="canonical" href={meta.slug} />
        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:title" content={meta.title}/>
        <meta name="twitter:description" content={meta.description}/>
        <meta name="twitter:image" content={`${process.env.API_URL}/common/logo.png`}/>
        <meta name="twitter:url" content={meta.slug}/>
        <meta name="twitter:creator" content="@inchbrick"/>
        <meta name="twitter:site" content='@inchbrick'/>
        <meta itemProp="name" content={meta.title}/>
        <meta itemProp="description" content={meta.description}/>
        <meta itemProp="image" content={`${process.env.API_URL}/common/logo.png`}/>
        <meta itemProp="url" content={meta.slug}/>
      </>
      ) : (
      <>
        <title>Real estate company in Dubai | Inchbrick</title>
        <meta name="description" content="If you want to Buy Property in Dubai, Inchbrick Realty provides expert guidance and individualized service to ensure you find the property of your dreams."/>
      </>
    )}
    </Head>
    <ProjectModal/>
    <TriggerBtn/>
    <Navbar/>
    <main>{children}</main>
    </>
  )
}

export default Landing
