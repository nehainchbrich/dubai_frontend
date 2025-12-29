import React from 'react'
import styles from '../../styles/Dubaiproperty.module.css'
import Website from '../layouts/website';
import Banner from '@/components/website/statics/Banner';
import DubaiMarket from '@/components/website/statics/DubaiMarket';
import OffPlan from '@/components/website/statics/OffPlan';
import ReadyToMove from '@/components/website/statics/ReadyToMove';
import TopArea from '@/components/website/statics/TopArea';
import PropertySale from '@/components/website/statics/PropertySale';
import SaleTransactions from '@/components/website/statics/SaleTransactions';
import IndianDillionaire from '@/components/website/statics/IndianDillionaire';
import SuperRich from '@/components/website/statics/SuperRich';
import Land from '@/components/website/statics/Land';
import dynamic from 'next/dynamic';
import { fetchData } from '@/config/fetchApi';
const LazyLoad = dynamic(() => import('react-lazy-load'), {
    ssr: false
});

const index = () => {
    return (
        <>
        <div className={`${styles.dubai_market}`}>
            <LazyLoad className='statics_banner'><Banner /></LazyLoad>
            <LazyLoad className='section dubai_market'><DubaiMarket /></LazyLoad>
            <LazyLoad className='section'><OffPlan /></LazyLoad>
            <LazyLoad className='section'><ReadyToMove /></LazyLoad>
            <LazyLoad className='section'><TopArea /></LazyLoad>
            <LazyLoad className='section'><PropertySale /></LazyLoad>
            <LazyLoad className='section'><SaleTransactions /></LazyLoad>
            <LazyLoad className='section'><IndianDillionaire /></LazyLoad>
            <LazyLoad className='section'><SuperRich /></LazyLoad>
            <LazyLoad className='section'><Land /></LazyLoad>
       </div>
            
        </>
    )
}

export default index
index.getLayout = function getLayout(page) {
    const  {props} = page;
  return <Website meta={props.meta}>{page}</Website>;
}
export const getStaticProps = async () => {
  try {
    const meta = await fetchData(API_URLS.META,{slug:'dubai-property-market',columns: 'title,description,slug'});
    return {
      props: { meta:meta.data[0] || null},
      revalidate: 30,
    };
  } catch (error) {
    return { props: {meta:[] }, revalidate: 10 };
  }
};