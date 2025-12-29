"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"; 
import Website from "../layouts/website";
import { fetchData } from "@/config/fetchApi";
import API_URLS from "@/config/apiconfig";

import Banner from "@/components/expo_new/Banner";
import Team from "@/components/expo_new/Team";
import Gallery from "@/components/expo_new/Gallery";
import VideoSection from "@/components/expo_new/Video";
import CountdownTimer from "@/components/expo_new/Countdown";
import Locations from "@/components/expo_new/Location";
import Offer from "@/components/expo_new/Offer";
import Vip from "@/components/expo_new/Vip";
import { countDownExpo } from "@/helper/Helper";
import OfferPopup from "@/components/expo_new/OfferPopup"; // ✅ new popup

const Slug = ({
  event = [],
  meta = null,
  eventPage = null,
  team = [],
  gallery = [],
  developer = [],
  activeEvent = null,
  offers = null,
}) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  // ✅ show modal if event is COMPLETED
  useEffect(() => {
    if (event?.[0]?.status?.toUpperCase() === "COMPLETED") {
      setShowModal(true);
    }
  }, [event]);

  // ✅ close modal + redirect to active event in new tab
  const handleModalRedirect = () => {
    setShowModal(false);
    const target = activeEvent?.slug ? `/events/${activeEvent.slug}` : "/events";
    window.open(target, "_blank");
  };

  // countdown
  const countStatus = event?.[0]?.eventDate
    ? countDownExpo(event[0].eventDate)
    : null;

  // helper to fetch section
  function getSectionData(eventPage, sectionName) {
    return eventPage?.find((s) => s.sectionName === sectionName) || null;
  }

  const topDeveloper = getSectionData(eventPage, "top-developer");
  const allDeveloper = getSectionData(eventPage, "all-developer");
  const dSection = topDeveloper ? topDeveloper : allDeveloper;

  return (
    <>
      {offers && offers.length > 0 && (
        <OfferPopup show={showModal}  offer={offers}/>
      )}
   

      {/* ✅ Page Content */}
      <section>
        <Banner
          data={meta}
          developer={developer}
          section={getSectionData(eventPage, "home")}
          dSection={dSection}
          event={event}
        />

        {event?.[0]?.eventDate &&
          countStatus &&
          getSectionData(eventPage, "countdown") && (
            <CountdownTimer
              data={event}
              section={getSectionData(eventPage, "countdown")}
            />
          )}

        {getSectionData(eventPage, "venue") && (
          <Locations
            event={event}
            data={event}
            section={getSectionData(eventPage, "venue")}
          />
        )}

        {getSectionData(eventPage, "invitation") && (
          <Vip data={event} section={getSectionData(eventPage, "invitation")} />
        )}

        {getSectionData(eventPage, "offer") && (
          <Offer section={getSectionData(eventPage, "offer")} />
        )}

        {getSectionData(eventPage, "gallery") && (
          <>
            <Gallery
              event={event}
              data={gallery}
              section={getSectionData(eventPage, "gallery")}
            />
            <VideoSection
              event={event}
              data={gallery}
              section={getSectionData(eventPage, "gallery")}
            />
          </>
        )}

        {getSectionData(eventPage, "team") && (
          <Team
            event={event}
            data={team}
            section={getSectionData(eventPage, "team")}
          />
        )}
      </section>

      <style jsx>{`
        section {
          background: #fff;
        }
      `}</style>
    </>
  );
};

export default Slug;

// ✅ Layout Wrapper
Slug.getLayout = function getLayout(page) {
  const { props } = page;
  return <Website meta={props.meta}>{page}</Website>;
};

// ✅ Server Side Props
export async function getServerSideProps(context) {
  const { slug } = context.query;
  try {
    // fetch current event (not upcoming)
    const event = await fetchData(API_URLS.EVENTDETAILS, {
      slug: slug,
      status: "!UPCOMING",
    });

    const meta = await fetchData(API_URLS.META, {
      slug: `events/${slug}`,
      columns: "title,description,thumbnail,slug",
    });

    // fetch one active event for redirect
    const activeEventRes = await fetchData(API_URLS.EVENTDETAILS, {
      status: "ACTIVE",
      limit: 1,
    });
    const activeEvent = activeEventRes?.data?.[0] || null;

    if (event.total == 1) {
      const eventName = event.data[0].eventName;
      const eventCode = event.data[0].code;
      const eventPage = await fetchData(API_URLS.EVENTPAGE, {
        eventName,
        status: 1,
      });

      let gallery = await fetchData(API_URLS.EVENTFILE, {
        status: 1,
        eventCode,
      });
      if (gallery.total === 0) {
        gallery = await fetchData(API_URLS.EVENTFILE, { status: 1 });
      }

      const team = await fetchData(API_URLS.AGENT, {
        status: 1,
        is_agent: 1,
        sort: "order:asc",
      });
      const developer = await fetchData(API_URLS.DEVELOPER, { status: 1 });
  const offers = await fetchData(API_URLS.OFFERS, { status: 1 });
      return {
        props: {
          event: event.data,
          meta: meta.data[0] || null,
          eventPage: eventPage.data || null,
          team: team.data,
          gallery: gallery.data,
          developer: developer.data,
          activeEvent, // ✅ pass active event
          offers: offers.data,
        },
      };
    }
    return { notFound: true };
  } catch (error) {
    return { props: {} };
  }
}
