import React, { useEffect, useState, memo } from 'react';
import styles from '@/styles/property/PropertyDetail_neo.module.css';
import Website from '../layouts/website';
import { fetchData } from '@/config/fetchApi';
import API_URLS from '@/config/apiconfig';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { currencyConverter, imageKitLoader } from '@/helper/Helper';
import { useCurrency } from '@/context/CurrencyProvider';

const ReviewFrm = dynamic(() => import('@/components/website/common/ReviewFrm'));
const PropertyMap = dynamic(() => import('@/components/website/property/PropertyMap'));
const FloorPlan = dynamic(() => import('@/components/website/property/FloorPlan'));
const TriggerFrm = dynamic(() => import('@/components/website/form/TriggerFrm'));

const Slug = ({ property, meta, recommended }) => {
  const { currency } = useCurrency();
  const [price, setPrice] = useState('...');
  const [activeTab, setActiveTab] = useState('GENERAL');

  const gallery = [property?.thumbnail, ...(property?.Gallery?.filter(g => g.fileFor === "Gallery").map(g => g.thumbnails || g.file) || [])].filter(Boolean);
  const [activeImage, setActiveImage] = useState(gallery[0]);
  // console.log(gallery);
  useEffect(() => {
    setActiveImage(gallery[0]);
  }, [property]);

  useEffect(() => {
    const convert = async () => {
      if (!property?.minAmount) {
        setPrice('Contact Us');
        return;
      }
      const min = parseInt(property.minAmount) ? await currencyConverter(parseInt(property.minAmount), currency) : 'Contact Us';
      setPrice(min);
    };
    convert();
  }, [property, currency]);

  // Center active thumbnail in slider
  useEffect(() => {
    if (gallery.length > 5 && activeImage) {
      const activeEl = document.querySelector(`.${styles.activeThumb}`);
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [activeImage, gallery.length, styles.activeThumb]);

  const tabs = ['GENERAL', 'CONFIGURATIONS', 'OVERVIEW', 'AMMENITIES', 'LOCATION'];

  // Scroll spy for active tab
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -50% 0px', // Adjust based on your sticky header height
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    tabs.forEach((tab) => {
      const element = document.getElementById(tab);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [tabs]);

  return (
    <div className={styles.detailWrapper}>
      {/* 🏙️ Top Info Strip */}
      <header className={styles.topHeader}>
        <div className="container">
          <div className={styles.headerFlex}>
            <div className={styles.headerLeft}>
              <span className={styles.headerCategory}>{property.PCategory?.title} • {property.bedroom} BEDS</span>
              <h1 className={styles.headerTitle}>{property.title}</h1>
              <div className={styles.headerLoc}>
                <i className="fas fa-map-marker-alt"></i> {property.address || property.city + ', ' + property.country}
              </div>
            </div>
            <div className={styles.headerRight}>
              <div className={styles.basePriceBox}>
                <span className={styles.basePriceLabel}>Base Price:</span>
                <span className={styles.basePriceVal}>{price}</span>
              </div>
              <div className={styles.estPymt}>Ext. Payments of {currency} 20,000 /month <Link href="#">Prequalify</Link></div>
            </div>
          </div>
        </div>
      </header>

      {/* 🖼️ Dynamic Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroMainImg}>
          <Image loader={imageKitLoader} src={activeImage} alt={property.title} fill priority quality={100} key={activeImage} />
        </div>

        {/* Floating Mini Gallery Slider */}
        <div className={styles.floatingGallery}>
          {gallery.length > 5 && (
            <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={() => {
              const track = document.getElementById('galleryTrack');
              track.scrollBy({ left: -200, behavior: 'smooth' });
            }}>
              <i className="fas fa-chevron-left"></i>
            </button>
          )}

          <div className={`${styles.galleryTrack} ${gallery.length <= 5 ? styles.centerTrack : ''}`} id="galleryTrack">
            {gallery.map((img, i) => (
              <div
                key={i}
                className={`${styles.floatCard} ${activeImage === img ? styles.activeThumb : ''}`}
                onClick={() => setActiveImage(img)}
              >
                <Image loader={imageKitLoader} src={img} alt="Property View" fill />
              </div>
            ))}
          </div>

          {gallery.length > 5 && (
            <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={() => {
              const track = document.getElementById('galleryTrack');
              track.scrollBy({ left: 200, behavior: 'smooth' });
            }}>
              <i className="fas fa-chevron-right"></i>
            </button>
          )}
        </div>
      </section>

      {/* 📑 Sticky Tab Navigation */}
      <nav className={styles.tabNav}>
        <div className="container">
          <ul className={styles.tabList}>
            {tabs.map(tab => (
              <li
                key={tab}
                className={`${styles.tabItem} ${activeTab === tab ? styles.activeTab : ''}`}
                onClick={() => {
                  setActiveTab(tab);
                  const element = document.getElementById(tab);
                  if (element) {
                    const offset = 100; // Account for sticky header
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = element.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;

                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
              >
                {tab}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className={`container ${styles.mainContainer}`}>
        <div className={styles.layoutGrid}>
          {/* 📝 Left Content Area */}
          <div className={styles.mainContent}>

            {/* --- CREATIVE ADDITION: Property Highlight Strip --- */}
            <section className={styles.highlightStrip}>
              <div className={styles.highItem}>
                <div className={styles.highIcon}><i className="fas fa-crown"></i></div>
                <div className={styles.highText}>
                  <h6>Elite Status</h6>
                  <span>Handpicked Premium Listing</span>
                </div>
              </div>
              <div className={styles.highItem}>
                <div className={styles.highIcon}><i className="fas fa-chart-line"></i></div>
                <div className={styles.highText}>
                  <h6>Investment Grade</h6>
                  <span>Projected 8.5% Net Yield</span>
                </div>
              </div>
              <div className={styles.highItem}>
                <div className={styles.highIcon}><i className="fas fa-shield-check"></i></div>
                <div className={styles.highText}>
                  <h6>Safe & Secure</h6>
                  <span>100% Verified Ownership</span>
                </div>
              </div>
            </section>

            {/* General Section */}
            <section id="GENERAL" className={styles.contentSection}>
              <h4 className={styles.sectionTitle}>GENERAL DESCRIPTION</h4>
              <div className={styles.quickMetrics}>
                <div className={styles.metricItem}>
                  <span className={styles.mLabel}>Price:</span>
                  <span className={styles.mValue}>from {price}</span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.mLabel}>Area:</span>
                  <span className={styles.mValue}>{property.totalArea || '1,400'} sq ft</span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.mLabel}>Rooms:</span>
                  <span className={styles.mValue}>{property.bedroom}-{property.bathroom}</span>
                </div>
                <div className={styles.metricItem}>
                  <span className={styles.mLabel}>Floors:</span>
                  <span className={styles.mValue}>12</span>
                </div>
              </div>
              <div className={styles.descriptionText} dangerouslySetInnerHTML={{ __html: property?.description }} />
            </section>

            {/* Configurations Section */}
            <section id="CONFIGURATIONS" className={styles.contentSection}>
              <h4 className={styles.sectionTitle}>CONFIGURATIONS AND PLAN FLOORS</h4>
              <div className="row">
                {property?.FloorPlan?.length > 0 ? (
                  <FloorPlan items={property.FloorPlan} />
                ) : (
                  <div className="col-12"><div className={styles.placeholderBox}>No floor plans available for this property.</div></div>
                )}
              </div>
            </section>

            {/* Overview Section */}
            <section id="OVERVIEW" className={styles.contentSection}>
              <h4 className={styles.sectionTitle}>OVERVIEW</h4>
              <div className={styles.detailsTable}>
                <div className={styles.tableRow}>
                  <div className={styles.td}>
                    <span className={styles.tdLbl}>Property Type</span>
                    <span className={styles.tdVal}>{property.PCategory?.title}</span>
                  </div>
                  <div className={styles.td}>
                    <span className={styles.tdLbl}>Status</span>
                    <span className={styles.tdVal}>Ready To Move</span>
                  </div>
                  <div className={styles.td}>
                    <span className={styles.tdLbl}>Project</span>
                    <span className={styles.tdVal}>{property.Developer?.name || 'Private'}</span>
                  </div>
                  <div className={styles.td}>
                    <span className={styles.tdLbl}>State</span>
                    <span className={styles.tdVal}>A+ (Elite)</span>
                  </div>
                </div>
                <div className={styles.tableRow}>
                  <div className={styles.td}>
                    <span className={styles.tdLbl}>Bedroom</span>
                    <span className={styles.tdVal}>{property.bedroom}</span>
                  </div>
                  <div className={styles.td}>
                    <span className={styles.tdLbl}>Bathroom</span>
                    <span className={styles.tdVal}>{property.bathroom}</span>
                  </div>
                  <div className={styles.td}>
                    <span className={styles.tdLbl}>Parking</span>
                    <span className={styles.tdVal}>2 Slots</span>
                  </div>
                  <div className={styles.td}>
                    <span className={styles.tdLbl}>Furnishing</span>
                    <span className={styles.tdVal}>Fully Furnished</span>
                  </div>
                </div>
                <div className={styles.tableRow}>
                  <div className={styles.td}>
                    <span className={styles.tdLbl}>Construction Date</span>
                    <span className={styles.tdVal}>23 Feb, 2023</span>
                  </div>
                  <div className={styles.td}>
                    <span className={styles.tdLbl}>Pool Size</span>
                    <span className={styles.tdVal}>400 mts2</span>
                  </div>
                  <div className={styles.td}>
                    <span className={styles.tdLbl}>Electricity</span>
                    <span className={styles.tdVal}>23.5h/day avg.</span>
                  </div>
                  <div className={styles.td}>
                    <span className={styles.tdLbl}>Last Remediation</span>
                    <span className={styles.tdVal}>May, 2024</span>
                  </div>
                </div>
              </div>
            </section>

            {/* --- CREATIVE ADDITION: Investment Intelligence --- */}
            <section className={styles.intelSection}>
              <div className={styles.intelHeader}>
                <h4 className={styles.sectionTitle}>INVESTMENT INTELLIGENCE</h4>
                <div className={styles.overallScore}>
                  <span>9.2</span>
                  <small>Global Rating</small>
                </div>
              </div>
              <div className={styles.intelGrid}>
                <div className={styles.intelBox}>
                  <div className={styles.intelLabel}>Capital Appreciation</div>
                  <div className={styles.intelBar}><div className={styles.fill} style={{ width: '95%' }}></div></div>
                  <div className={styles.intelVal}>High</div>
                </div>
                <div className={styles.intelBox}>
                  <div className={styles.intelLabel}>Rental Yield Potential</div>
                  <div className={styles.intelBar}><div className={styles.fill} style={{ width: '85%' }}></div></div>
                  <div className={styles.intelVal}>8.2%</div>
                </div>
                <div className={styles.intelBox}>
                  <div className={styles.intelLabel}>Neighbourhood Growth</div>
                  <div className={styles.intelBar}><div className={styles.fill} style={{ width: '90%' }}></div></div>
                  <div className={styles.intelVal}>Stable</div>
                </div>
              </div>
            </section>

            {/* Amenities Section */}
            <section id="AMMENITIES" className={styles.contentSection}>
              <h4 className={styles.sectionTitle}>AMENITIES</h4>
              <div className={styles.amenitiesGrid}>
                {property?.amenities?.map((a, i) => (
                  <div key={i} className={styles.amenitySlot}>
                    <i className={a.icons || 'fas fa-check-circle'}></i>
                    <span>{a.title}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Location Section */}
            {/* --- CREATIVE ADDITION: Landmarks Pulse --- */}
            <section id="LOCATION" className={styles.contentSection}>
              <h4 className={styles.sectionTitle}>NEIGHBOURHOOD PULSE</h4>
              <div className={styles.pulseContainer}>
                <div className={styles.pulseItem}>
                  <div className={styles.pulseTime}><span>05</span>m</div>
                  <div className={styles.pulseDetail}>
                    <h6>Burj Khalifa & Downtown</h6>
                    <span>Heart of Dubai's luxury shopping & dining.</span>
                  </div>
                </div>
                <div className={styles.pulseItem}>
                  <div className={styles.pulseTime}><span>12</span>m</div>
                  <div className={styles.pulseDetail}>
                    <h6>Dubai Int. Airport</h6>
                    <span>Quick access for global travelers.</span>
                  </div>
                </div>
                <div className={styles.pulseItem}>
                  <div className={styles.pulseTime}><span>15</span>m</div>
                  <div className={styles.pulseDetail}>
                    <h6>Palm Jumeirah</h6>
                    <span>World-renowned beach & entertainment hub.</span>
                  </div>
                </div>
              </div>
              <div className={styles.mapFrame}>
                <PropertyMap data={property} />
              </div>
            </section>

            {/* Market Verdict */}
            <section className={styles.contentSection}>
              <h4 className={styles.sectionTitle}>MARKET VERDICT</h4>
              <ReviewFrm page="properties" review={property?.Review} pageCode={property?.code} />
            </section>

          </div>

          {/* 📬 Right Sidebar (Agent & Form) */}
          <aside className={styles.sidebarColumn}>
            <div className={styles.floatingForm}>
              <div className={styles.agentProfile}>
                <div className={styles.agentPic}>
                  <Image loader={imageKitLoader} src={property?.agentUser?.profile || '/default-agent.png'} alt="Agent" fill />
                </div>
                <div className={styles.agentInfo}>
                  <h5>{property?.agentUser?.firstName} {property?.agentUser?.lastName}</h5>
                  <span>Premier Portfolio Consultant</span>
                </div>
              </div>
              <div className={styles.formSection}>
                <TriggerFrm id="tSlugProperty" />
              </div>
              <div className={styles.sidebarActions}>
                <a href="#" className={`${styles.sidebarBtn} ${styles.brochureBtn}`}>
                  <i className="fas fa-file-pdf"></i> Download Brochure
                </a>
                <a href={`https://wa.me/971585966666?text=Hi, I am interested in ${property.title}`} target="_blank" className={`${styles.sidebarBtn} ${styles.waBtn}`}>
                  <i className="fab fa-whatsapp"></i> Chat on WhatsApp
                </a>
              </div>
              <div className={styles.shieldBadge}>
                <i className="fas fa-shield-alt"></i>
                <span>Verified Premium Listing. Guaranteed by InchBrick.</span>
              </div>
            </div>
          </aside>
        </div>

        {/* 🏢 Recommended Projects */}
        <section className={styles.recommendedSection}>
          <h3 className={styles.recHeading}>SIMILAR IN FEATURES RECOMMENDED PROPERTIES</h3>
          <div className={styles.recommendedGrid}>
            {recommended?.map((item, idx) => (
              <Link href={`/properties/${item.slug}`} key={idx} className={styles.recCard}>
                <div className={styles.recThumb}>
                  <Image loader={imageKitLoader} src={item.thumbnail} alt={item.title} fill />
                  <div className={styles.recPrice}>{currency} {parseInt(item.minAmount || 0).toLocaleString()}</div>
                  <div className={styles.recTag}>{item.is_rental === 1 ? 'FOR RENT' : 'FOR SALE'}</div>
                  <div className={styles.recActions}>
                    <i className="far fa-heart"></i>
                  </div>
                </div>
                <div className={styles.recBody}>
                  <div className={styles.recMeta}>{item.bedroom || 0} Beds - {item.bathroom || 0} Baths - {item.totalArea || '0'} sq ft</div>
                  <h5 className={styles.recTitleText}>{item.title}</h5>
                  <div className={styles.recLocText}><i className="fas fa-map-marker-alt"></i> {item.city}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Slug;

Slug.getLayout = function getLayout(page) {
  const { props } = page;
  return <Website meta={props?.meta}>{page}</Website>;
};

export async function getServerSideProps(context) {
  const { slug } = context.query;
  try {
    const propertyData = await fetchData(API_URLS.PROPERTIESBYSLUG(slug));
    if (propertyData && propertyData.data) {
      const metaRes = await fetchData(API_URLS.META, { slug: `properties/${slug}`, columns: 'title,description,thumbnail,slug' });
      const recRes = await fetchData(API_URLS.PROPERTIES, {
        status: 1, limit: 3, columns: 'title,thumbnail,slug,city,PCategory.title,minAmount,is_rental,bedroom,bathroom,totalArea'
      });
      return {
        props: {
          property: propertyData.data,
          meta: metaRes?.data?.[0] || {},
          recommended: recRes?.data || []
        }
      };
    }
    return { notFound: true };
  } catch (error) {
    console.error("Property Detail Fetch Error:", error);
    return { notFound: true };
  }
}
