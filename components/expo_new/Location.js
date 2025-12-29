"use client";
import React from "react";
import styles from "../../styles/expo_new/Locations.module.css";
import { formatEventDatesWithSuffix, ImagePath } from '@/helper/Helper';
import Link from "next/link";
const Locations = ({ data,section,event }) => {
const activeExpos = Array.isArray(event)
    ? event.filter((expo) => {
        const status = (expo.status || "").toUpperCase();
        return (
          status === "ACTIVE" ||
          (status === "UPCOMING" && Number(expo.default_status) === 1)
        );
      })
    : [];
   const expoDate = formatEventDatesWithSuffix(data[0].eventDate);
    const description = ImagePath(section?.sectionSubHeading);

  return (
    <main className={styles.locationPadding}>
      <div className={styles.container}>
        <div className={`${styles.headerRow} ${styles.dFlex} ${styles.alignItem}`}>
          <div>
            <h2 className={styles.locationHeading}>{section?.sectionHeading}</h2>
            <div className={styles.lead} dangerouslySetInnerHTML={{__html:description}}></div>
          </div>
           {activeExpos.length > 0 ? (
                       <Link className={styles.btnClass} href="/expo-invitation">
                      Grab FREE VIP Pass
                    </Link>
                      ) : (
                        <Link
                          className={`${styles.btn} ${styles.ghost}`}
                          href="/contact-us"
                        >
                          Talk to Us
                        </Link>
                      )}
        </div>

        {/* ✅ Locations Grid */}
        <div className={styles.locations} id="locations">
           {activeExpos.length > 0 ? (
            <article
              className={styles.locCard}
              tabIndex={0}
             style={{backgroundImage:"url('https://cdn.inchbrick.com/common/4TH OCTOBER.png')"}}>
              <div className={styles.locContent}>
                <div>
                  <h3 className={styles.locTitle}>{expoDate[0].label}</h3>
                  <div className={styles.locSub}>{`10:00 AM to 10:00 PM`}</div>
                </div>
            
              </div>
            </article>
            ) : (
            <article
              className={styles.locCard}
              tabIndex={0}
             style={{backgroundImage:"url('https://cdn.inchbrick.com/common/calendar-1.jpg')"}}>
              <div className={styles.locContent}>
                <div>
                  <h3 className={styles.locTitle}>{expoDate[0].label}</h3>
                  <div className={styles.locSub}>{`10:00 AM to 10:00 PM`}</div>
                </div>
            
              </div>
            </article>
              )}


             {activeExpos.length > 0 ? ( 
          <article
              className={styles.locCard}
              tabIndex={0}
              style={{backgroundImage:"url('https://cdn.inchbrick.com/common/5th oct.png')"}}>
    
              <div className={styles.locContent}>
                <div>
                  <h3 className={styles.locTitle}>{expoDate[1].label}</h3>
                  <div className={styles.locSub}>{`10:00 AM to 10:00 PM`}</div>
                </div>
               
              </div>
            </article>
            ) : (
            <article
              className={styles.locCard}
              tabIndex={0}
              style={{backgroundImage:"url('https://cdn.inchbrick.com/common/calendar-2.jpg')"}}>
    
              <div className={styles.locContent}>
                <div>
                  <h3 className={styles.locTitle}>{expoDate[1].label}</h3>
                  <div className={styles.locSub}>{`10:00 AM to 10:00 PM`}</div>
                </div>
               
              </div>
            </article>
            )}
              <article
              className={styles.locCard}
              tabIndex={0}
                style={{
    backgroundImage: `url(https://cdn.inchbrick.com/${
      data[0]?.venue_img ? data[0].venue_img : "expo-indore/hotal.webp"
    })`,
  }}
            >
              <div className={styles.locContent}>
                <div>
                  <h3 className={styles.locTitle}>{data[0].venue}</h3>
                </div>
               
              </div>
            </article>




            {activeExpos.length > 0 ? ( 
              <article
              className={styles.locCard}
              tabIndex={0}
               style={{backgroundImage:"url('https://cdn.inchbrick.com/common/SEASON 4.png')"}}
            >
              <div className={styles.locContent}>
                <div>
                  <h3 className={styles.locTitle}>{data[0].eventName}</h3>
                  <Link href={`/blogs${data[0].blog_link}`}>Know More</Link>
                </div>
              </div>
            </article>
             ) : (
            <article
              className={styles.locCard}
              tabIndex={0}
               style={{backgroundImage:"url('https://cdn.inchbrick.com/common/127010293Burj_Al_Arab.jpg')"}}
            >
              <div className={styles.locContent}>
                <div>
                  <h3 className={styles.locTitle}>{data[0].eventName}</h3>
                  <Link href={`/blogs${data[0].blog_link}`}>Know More</Link>
                </div>
              </div>
            </article>
             )}
        </div>
      </div>
    </main>
  );
};

export default Locations;
