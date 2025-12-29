import NoEvent from "@/components/expo/NoEvent";
import OfferFrm from "@/components/expo/OfferFrm";
import ExpoFrm from "@/components/website/expo/ExpoFrm"
import API_URLS from "@/config/apiconfig";
import { fetchData } from "@/config/fetchApi";
import Head from "next/head"
import { useEffect, useState } from "react";

const Calendar = ({event,team,offers,showLastPage }) => {
  if(showLastPage){
    return (
      <>
        <NoEvent/>
      </>
  );
  }
  const [showOffers, setShowOffers] = useState(false);
  const activeExpos = event && event.filter((expo) => 
    expo.status === 'ACTIVE' || (expo.status === 'UPCOMING' && expo.default_status === 1)
);
useEffect(() => {
  // Remove offerData from localStorage
  localStorage.removeItem("offerData");

  // Reset body styles to avoid top offset issue
  document.body.style.top = "0px";
  document.body.style.position = "unset"; // Resets any relative positioning

  // Delay showing offers
  const timer = setTimeout(() => {
    setShowOffers(true);
  }, 1000); // 1 second delay

  // Cleanup function to remove inline styles and clear timeout
  return () => {
    clearTimeout(timer);
    document.body.style.top = "";
    document.body.style.position = "";
  };
}, []);

  return (
    <>
    <Head>
      <title>Register for Dubai Property Expo by Inchbrick Realty</title>
      <meta name="description" content="Secure your spot at the Dubai Property Expo by Inchbrick Realty. Explore top properties, meet experts & unlock exclusive investment opportunities. Register now"/>
      <link rel="icon" href={`${process.env.API_URL}/common/favicon.ico`} />
    </Head>
    {/* {showOffers && offers?.length > 0 && <OfferFrm/>} */}
     <div className="expo_frm"><ExpoFrm data={activeExpos} team={team}/></div>
     
    </>
  )
}

export default Calendar
export const getServerSideProps = async()=> {
  const event = await fetchData(API_URLS.EVENTDETAILS,{status:'ACTIVE'});
  if(event.total > 0){
    const team = await fetchData(API_URLS.AGENT,{status:1,is_agent:1,columns:'firstName,lastName,userCode',sortBy:'firstName',sortOrder:'asc'});
    const offers = await fetchData(API_URLS.OFFERS,{status:1});
    return {
      props:{team:team.data,event:event.data,offers:offers.data}
    }
  }
  return {
    props: { showLastPage: true },
  };
 
}