import React from 'react'
import Website from '../layouts/website';
import CommonBanner from '@/components/website/common/CommonBanner';
import Image from 'next/image';
import API_URLS from '@/config/apiconfig';
import { imageKitLoader } from '@/helper/Helper';
import { fetchData } from '@/config/fetchApi';
import ListView from '@/components/website/property/ListView';
import styles from '../../styles/DeveloperDetail.module.css';

const slug = ({ developer, property, meta }) => {
  const currentDev = developer[0];

  return (
    <>
      <CommonBanner title={currentDev.name} meta={meta} />

      <section className={styles.detailSection}>
        <div className="container">
          <div className={styles.developerHeader}>
            <div className={styles.logoContainer}>
              <Image
                loader={imageKitLoader}
                src={`${currentDev.logo}`}
                alt={currentDev.name}
                width={200}
                height={200}
                style={{ objectFit: 'contain' }}
                sizes='(max-width: 768px) 150px, 200px'
                quality={80}
                priority={true}
              />
            </div>

            <div className={styles.infoContainer}>
              <h1 className={styles.devName}>{currentDev.name}</h1>
              <div
                className={styles.devDescription}
                dangerouslySetInnerHTML={{ __html: currentDev.description }}
              />

              <div className={styles.statsSection}>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{property ? property.length : 0}</span>
                  <span className={styles.statLabel}>Total Projects</span>
                </div>
                {/* Additional stats could be added here if available in the API */}
              </div>
            </div>
          </div>

          <div className={styles.propertiesSection}>
            <h2 className={styles.sectionTitle}>
              Projects by {currentDev.name}
            </h2>

            <div className={styles.propertyGrid}>
              {property && property.map((item, index) => (
                <div className={styles.propertyCardWrapper} key={index}>
                  <ListView item={item} />
                </div>
              ))}
            </div>

            {(!property || property.length === 0) && (
              <p className="text-muted text-center py-5">No properties found for this developer.</p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export async function getServerSideProps(context) {
  const { slug } = context.query;
  try {
    const developer = await fetchData(API_URLS.DEVELOPER, { status: 1, slug });
    const meta = await fetchData(API_URLS.META, {
      slug: `top-real-estate-developer-in-dubai/${slug}`,
      columns: 'title,description,thumbnail,slug'
    });

    if (developer.total > 0) {
      const devCode = developer.data[0].code;
      const property = await fetchData(API_URLS.PROPERTIES, { status: 1, developer: devCode });
      return {
        props: {
          developer: developer.data,
          property: property.data || [],
          meta: meta.data ? meta.data[0] : null
        }
      }
    }
    return { notFound: true };
  } catch (error) {
    console.error("Error fetching developer details:", error);
    return { props: { developer: [], property: [], meta: null } };
  }
}

export default slug

slug.getLayout = function getLayout(page) {
  const { props } = page;
  return <Website meta={props.meta}>{page}</Website>;
}
