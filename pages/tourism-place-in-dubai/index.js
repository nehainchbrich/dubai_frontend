
import Banner from '@/components/website/tourism/Banner'
import React, { useState } from 'react'
import Website from '../layouts/website'
import API_URLS from '@/config/apiconfig'
import styles from '../../styles/TourismCard.module.css';
import Link from 'next/link'
import { fetchData, fetchWebsitePage } from '@/config/fetchApi'
import { imageKitLoader } from '@/helper/Helper'
import Image from 'next/image'

const Index = ({TourismTabs,tourismpage,TourismFile}) => {
  const [selectedTab, setSelectedTab] = useState(TourismTabs.data[0].tabskey);
  return (
    <>
    <Banner/>
    <div className='container my-5'>
      <div className='row'>
        <h1 className='text-center mb-5'>{tourismpage.title}</h1>
          {tourismpage &&(
              <div dangerouslySetInnerHTML={{ __html: tourismpage.description }} />
            )}
             <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
        {TourismTabs && TourismTabs.data.map((item, i) => (
          <li className="nav-item" role="presentation" key={i}>
            <button
              className={`btns btn-orange ${selectedTab === item.tabskey ? 'active' : ''}`}
              id={`pills-${item.tabskey}-tab`}
              data-bs-toggle="pill"
              data-bs-target={`#pills-${item.tabskey}`}
              type="button"
              role="tab"
              aria-controls={`pills-${item.tabskey}`}
              aria-selected={selectedTab === item.tabskey ? 'true' : 'false'}
              tabIndex={selectedTab === item.tabskey ? '0' : '-1'}
              onClick={() => setSelectedTab(item.tabskey)}
            >
              {item.tabs}
            </button>
          </li>
        ))}
      </ul>
      <div className="tab-content" id="pills-tabContent">
        {TourismTabs && TourismTabs.data.map((item, i) => (
          <div
            className={`tab-pane fade row ${selectedTab === item.tabskey ? 'show active' : ''}`}
            id={`pills-${item.tabskey}`}
            role="tabpanel"
            aria-labelledby={`pills-${item.tabskey}-tab`}
            key={i}
          >
            <h3>{item.tabs}</h3>
            <div dangerouslySetInnerHTML={{ __html: item.description}} />
            <div className="row my-3">
              {TourismFile && TourismFile.data
                .filter((files) => files.code === item.tabskey)
                .map((files, dataIndex) => (
                  <div className='col-md-4' key={dataIndex}>
                  <div className={`${styles.single_card} mb-3`}>
                    <div className={styles.image_container}>
                      <Image loader={imageKitLoader} src={`${files.thumbnails}`} alt={files.title} width={600} height={600} className={`${styles.img_fluid}`}/>
                      <div className={styles.caption}>
                      {files.slug ? (
                        <Link href={files.slug}><h4 className={styles.caption_text}>{files.title}</h4></Link>
                         ) : (
                          <h4 className={styles.caption_text}>{files.title}</h4>
                      )}
                      </div>
                    </div>
                  </div>
                </div>
                ))}
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
    </>
  )
}

export default Index
Index.getLayout = function getLayout(page) {
  const  {props} = page;
  return <Website meta={props.meta}>{page}</Website>;
  }

  export const getStaticProps = async () => {
    try {
      const TourismTabs = await fetchData(API_URLS.TOURISM,{columns: 'tabs,description,tabskey'});
      const TourismFile = await fetchData(API_URLS.TOURISMFILE,{status:1,columns: 'code,title,thumbnails,slug'});
      const tourismpage = await fetchWebsitePage('tourism-place-in-dubai');
      const meta = await fetchData(API_URLS.META,{slug:"tourism-place-in-dubai",columns:'title,description,thumbnail,slug'});
      if(TourismTabs.status ===true){
        return {
          props: {TourismTabs,tourismpage,TourismFile,meta:meta.data[0] || null},
          revalidate: 43200, // Set ISR and revalidate at midnight every day
        };
      }else{
        return { props: { TourismTabs: [], tourismpage: [],tourismpage:[] }, revalidate: 10 };
      }
    } catch (error) {
      return { props: { TourismTabs: [], tourismpage: [],tourismpage:[]}, revalidate: 10 };
    }
  }