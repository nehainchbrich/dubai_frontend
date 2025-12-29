import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { fetchHome } from "@/config/PageApiData";
import Website from "./layouts/website";
import {
  developer,
  enjoyaday,
  featureProperty,
  location,
  offplanProperty,
  propertyType,
  readytomove,
  service,
  team,
  whyUs,
} from "@/components/website/home/HomeContent";
import { fetchData, fetchMCQuestion } from "@/config/fetchApi";
import ModalMcq from "@/components/website/mcq/ModalMcq";
import API_URLS, { PROPERTIES } from "@/config/apiconfig";
import OfferPopup from "@/components/expo_new/OfferPopup";
import VideoGrid from "@/components/website/home/InstaVideos";
import ScrollTransition from "@/components/website/home/PropertiesType";
import OurTeam from "@/components/website/home/Team";
import ReviewSection from "@/components/website/home/ReviewNew";
import InstagramSection from "@/components/website/home/InstagramSection";

// Lazy load all components
const Banner = dynamic(() => import("@/components/website/home/Banner"));
const SearchProperty = dynamic(() =>
  import("@/components/website/home/SearchProperty")
);
const PropertyType = dynamic(() =>
  import("@/components/website/property/PropertyType")
);
const Service = dynamic(() => import("@/components/website/services/service"));
const PropertyFeature = dynamic(() =>
  import("@/components/website/property/PropertyFeature")
);
const OffPlan = dynamic(() => import("@/components/website/property/OffPlan"));
const ProminentLocalities = dynamic(() =>
  import("@/components/website/home/ProminentLocalities")
);
const PressSection = dynamic(() =>
  import("@/components/website/home/PressSection")
);
const Working = dynamic(() => import("@/components/website/home/Working"));
const WhyDubai = dynamic(() => import("@/components/website/home/WhyDubai"));
const Builder = dynamic(() => import("@/components/website/home/Builder"));
const WhyInchBrick = dynamic(() =>
  import("@/components/website/home/WhyInchBrick")
);
const Agent = dynamic(() => import("@/components/website/home/Agent"));
const TourismSection = dynamic(() =>
  import("@/components/website/tourism/TourismSection")
);
const TriggerSection = dynamic(() =>
  import("@/components/website/form/TriggerSection")
);
const MarketTrand = dynamic(() =>
  import("@/components/website/home/MarketTrand")
);
const Review = dynamic(() => import("@/components/website/home/Review"));
const BlogSection = dynamic(() =>
  import("@/components/website/blogs/BlogSection")
);
const BlogCard = dynamic(() => import("@/components/website/blogs/BlogCard"));
const BlogShowcase = dynamic(() =>
  import("@/components/website/home/BlogShowcase")
);
const LightCreativeBlog = dynamic(() =>
  import("@/components/website/home/LightCreativeBlog")
);
const TrendingProjects = dynamic(() =>
  import("@/components/website/home/TrendingProjects")
);
const DeveloperShowcase = dynamic(() =>
  import("@/components/website/home/DeveloperShowcase")
);
const WhyDubaiShowcase = dynamic(() =>
  import("@/components/website/home/WhyDubaiShowcase")
);
const TeamShowcase = dynamic(() =>
  import("@/components/website/home/TeamShowcase")
);
const HomePropertyShowcase = dynamic(() =>
  import("@/components/website/home/HomePropertyShowcase")
);

const Index = ({ homeData, offers, activeEvent }) => {
  const [loading, setLoading] = useState(true);
  const [mcqQuestion, setMcqQuestion] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // fetch mcq
  const fetchMcqData = async () => {
    try {
      const res = await fetchMCQuestion({ status: 1, limit: 5 });
      setMcqQuestion(res);
      localStorage.setItem(
        "MCQuestion",
        JSON.stringify({ data: res, timestamp: new Date().getTime() })
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    if (homeData) {
      setLoading(false);
    }
    fetchMcqData();
  }, [homeData]);

  // open offer modal automatically if offers + activeEvent exist
  useEffect(() => {
    if (offers && offers.length > 0 && activeEvent) {
      setShowModal(true);
    }
  }, [offers, activeEvent]);

  // handle redirect when clicking popup

  if (!homeData) {
    return (
      <>{loading ? <div className="my-5">Loading...</div> : <div>No data</div>}</>
    );
  }

  const {
    banner,
    PType,
    Location,
    agent,
    Developer,
    readyProperty,
    offplan,
    featured,
    trending,
    news,
    blog,
    press,
  } = homeData;

  return (
    <>

      {offers && offers.length > 0 && activeEvent ? (
        <OfferPopup show={showModal} offer={offers} onClose={() => setShowModal(false)} />
      ) : (
        mcqQuestion && <ModalMcq data={mcqQuestion} />
      )}

      <Banner data={banner} />

      {/* 🚀 Creative Market Stats Strip */}
      <div className="section-stats py-4" style={{
        background: 'var(--brand-color-1)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        position: 'relative',
        zIndex: 10
      }}>
        <div className="container">
          <div className="row text-center text-white g-4">
            <div className="col-md-3 col-6">
              <div style={{ color: 'var(--luxury-gold)', fontSize: '1.5rem', marginBottom: '10px' }}><i className="fas fa-home"></i></div>
              <div style={{ opacity: 0.6, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Total Listings</div>
              <h4 style={{ color: '#fff', fontWeight: 800, marginBottom: 0 }}>12,500+</h4>
            </div>
            <div className="col-md-3 col-6">
              <div style={{ color: 'var(--luxury-gold)', fontSize: '1.5rem', marginBottom: '10px' }}><i className="fas fa-building"></i></div>
              <div style={{ opacity: 0.6, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Premium Projects</div>
              <h4 style={{ color: '#fff', fontWeight: 800, marginBottom: 0 }}>450+</h4>
            </div>
            <div className="col-md-3 col-6">
              <div style={{ color: 'var(--luxury-gold)', fontSize: '1.5rem', marginBottom: '10px' }}><i className="fas fa-chart-line"></i></div>
              <div style={{ opacity: 0.6, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Market Volume</div>
              <h4 style={{ color: '#fff', fontWeight: 800, marginBottom: 0 }}>AED 1.2B</h4>
            </div>
            <div className="col-md-3 col-6">
              <div style={{ color: 'var(--luxury-gold)', fontSize: '1.5rem', marginBottom: '10px' }}><i className="fas fa-user-tie"></i></div>
              <div style={{ opacity: 0.6, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Expert Agents</div>
              <h4 style={{ color: '#fff', fontWeight: 800, marginBottom: 0 }}>85+</h4>
            </div>
          </div>
        </div>
      </div>

      <VideoGrid />
      <DeveloperShowcase data={Developer} />
      {/* <InstagramSection /> */}
      <PropertyType data={PType} heading={propertyType} />
      <TrendingProjects data={trending} />
      <ScrollTransition data={homeData} />

      <div className="section light-bg location">
        <ProminentLocalities data={Location} heading={location} />
      </div>
      <WhyDubaiShowcase />
      <TeamShowcase data={agent} />
      <ReviewSection />
      {blog && blog.length > 0 && (
        <LightCreativeBlog data={blog} />
      )}


      {/* <Service heading={service} /> */}
      {/* <div className="section light-bg feature goldan-line">
        <PropertyFeature
          data={featured}
          tag={true}
          title="Feature Property"
          heading={featureProperty}
        />
      </div> */}
      {/* <div className="section dark-bg feature offplan goldan-line">
        <OffPlan data={offplan} heading={offplanProperty} />
      </div> */}
      {/* <div className="section dark-bg feature goldan-line">
        <PropertyFeature
          data={readyProperty}
          tag={false}
          title="Ready to Move Property"
          heading={readytomove}
        />
      </div> */}

      {/* <div className="section dark-bg goldan-line">
        <Working heading={enjoyaday} />
      </div> */}
      {/*       
      <div className="section light-bg goldan-line">
        <Agent data={agent} type="team" heading={team} />
      </div> */}
      {/* <div className="dark-bg">
        <MarketTrand />
      </div> */}

      {/* <div className="section light-bg goldan-line why-inchbrick">
        <WhyInchBrick heading={whyUs} />
      </div>
      */}
      {/* <div className="section dark-bg property-type goldan-line">
        <Review />
      </div> */}
      {/* <div className="section light-bg goldan-line trigger-frm">
        <TriggerSection />
      </div> */}
      {/* <div className="section light-bg goldan-line">
        <BlogSection title="Latest Blog" data={blog} />
      </div> */}
      {/* <div className="section light-bg">
        <PressSection data={press} />
      </div> */}

      {/* <div className="section dark-bg tourism">
        <TourismSection />
      </div> */}
      {/* <div className="section dark-bg">
        <BlogCard data={news} title="Latest News" />
      </div> */}

    </>
  );
};

Index.getLayout = function getLayout(page) {
  const { props } = page;
  return <Website meta={props.meta}>{page}</Website>;
};
export const getStaticProps = async () => {
  const offers = await fetchData(API_URLS.OFFERS, { status: 1 });
  const meta = await fetchData(API_URLS.META, {
    slug: "home",
    columns: "title,description,slug",
  });
  const homeData = await fetchHome();

  // ✅ fetch active event
  const activeEventRes = await fetchData(API_URLS.EVENTDETAILS, {
    status: "ACTIVE",
    limit: 1,
  });
  const activeEvent = activeEventRes?.data?.[0] || null;

  return {
    props: {
      homeData,
      offers: offers.data,
      meta: meta.data[0],
      activeEvent,
    },
    revalidate: 60,
  };
};

export default Index;
