import React from 'react'
import Website from '../layouts/website'
import { fetchData } from '@/config/fetchApi'
import API_URLS from '@/config/apiconfig'
import Banner from '@/components/expo_new/Banner'
import Events from '@/components/expo_new/Events'
import Team from '@/components/expo_new/Team'
import Gallery from '@/components/expo_new/Gallery'
import VideoSection from '@/components/expo_new/Video'


const Index = ({developer, team, press, event, gallery, meta}) => {
  return (
    <>
    <section>
      <Banner data={meta} developer={developer} event={event}/>
      <Events data={event}/>
      <Gallery data={gallery}/>
      <VideoSection data={gallery}/>
      <Team data={team}/>
    </section>
   <style jsx>
  {`section{background:#fff;}` }
</style>

    </>
  )
}

export default Index
Index.getLayout = function getLayout(page) {
  const  {props} = page;
  return <Website meta={props.meta}>{page}</Website>;
  }

   export const getServerSideProps = async()=> {
    const event = await fetchData(API_URLS.EVENTDETAILS,{status:'!POSTPONED'}); 
    const developer = await fetchData(API_URLS.DEVELOPER,{status:1});
    const team = await fetchData(API_URLS.AGENT,{status:1,is_agent:1,"sort":"order:asc"});
    const press = await fetchData(API_URLS.PRESS,{status:1,columns:'logo,slug,title'});
    const gallery = await fetchData(API_URLS.EVENTFILE, { status: 1,limit:15 });
    const meta = await fetchData(API_URLS.META,{slug:'events',columns:'title,description,thumbnail,slug'});
    return {
      props:{developer:developer.data,team:team.data,press:press.data,event:event.data,gallery:gallery.data,meta:meta.data[0] || null}
    }
  }