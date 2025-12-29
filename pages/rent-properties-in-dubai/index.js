import CommonBanner from '@/components/website/common/CommonBanner';
import React, { useEffect, useState, useRef } from 'react';
import styles from '../../styles/property/Property.module.css';
import Link from 'next/link';
import { fetchData, fetchWebsitePage } from '@/config/fetchApi';
import Website from '../layouts/website';
import dynamic from 'next/dynamic';
const LatestBlog = dynamic(() => import('@/components/website/blogs/LatestBlog'));
const LatestProperty = dynamic(() => import('@/components/website/property/LatestProperty'));
const ListView = dynamic(() => import('@/components/website/property/ListView'));
import InfiniteScroll from 'react-infinite-scroll-component';
import API_URLS from '@/config/apiconfig';
import FaqSection from '@/components/website/faqs/faqSection';

const Index = ({ property,meta }) => {
  const { data, total } = property;
  const limit = 20; // Load a small batch initially
  const [propertyData, setPropertyData] = useState(data || []);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(data.length >= limit);
  const [sortOrder, setSortOrder] = useState('');
  const [searchInput, setSearchInput] = useState('');

   // Fetch Remaining Properties in the Background
  const fetchMoreProperties = async (nextPage = 1, reset = false) => {
    try {
      // build options for API
      const options = {
        "PCategory.slug":'rental',
        minAmount: `!=0`,
        status: 1,
        limit: 8,
        page: 1,
        sort: 'id:desc',
        columns:'title,Developer.name,PCategory.title,property_type,thumbnail,title,slug,shortDesc,minAmount,maxAmount,city,country,agentUser.firstName,agentUser.lastName',
      };

      // 🔹 add search filter
      if (searchInput) {
        options.search = searchInput;
        options.searchColumns = 'title,shortDesc';
      }

      // 🔹 add sorting
      if (sortOrder === 'lowToHigh') {
        options.sort = 'minAmount:asc';
      } else if (sortOrder === 'highToLow') {
        options.sort = 'minAmount:desc';
      } else {
        options.sort = 'id:desc'; // default
      }

      const res = await fetchData(API_URLS.PROPERTIES, options);
      const newData = res.data || [];

      setPropertyData((prev) => (reset ? newData : [...prev, ...newData]));
      setHasMore(newData.length === limit);
      setPage(nextPage);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

   // initial load
   useEffect(() => {
     fetchMoreProperties();
   }, []);
 
   // 🔹 Handle sorting
   const shortByPrice = (e) => {
     const value = e.target.value;
     setSortOrder(value);
     fetchMoreProperties(1, true); // reset data
   };
 
   // 🔹 Handle search
   const SearchKeyPress = (e) => {
     const value = e.target.value.toLowerCase();
     setSearchInput(value);
     fetchMoreProperties(1, true); // reset data
   };
 
   // load more for infinite scroll
   const loadMore = () => {
     fetchMoreProperties(page + 1);
   };
  const items = [
    { title: 'What type of property  is available for rent ?', content: "We offer a wide range of luxury rent properties in Dubai, including opulent villas, high-end apartments and upscale penthouses." },
    { title: 'Are the luxurious properties for rent in Dubai fully furnished ?', content:"Most of them are, however, there are properties for rent available to add your own touch to it"},
    { title: 'What are these luxury properties located in Dubai ?', content: "Our luxury properties are strategically located in the most prestigious and sought-after areas of Dubai, such as Palm Jumeirah, Dubai Marina, Downtown Dubai and Emirates Hills." },
    { title: 'What amenities can I expect in a luxury  property on rent ?', content: "Our luxury properties come with a range of exclusive amenities such as private swimming pools, spas, fitness centres, outdoor entertainment areas, concierge services and 24/7 security."},

    { title: 'How much does  it cost to rent a luxury  property in Dubai ?', content: "Rental rates for luxury rent properties in Dubai vary depending on location, size, amenities and length of tenancy. Please contact our team for individual pricing information."},

    { title: 'Are  there any additional fees or charges ?', content: "In addition to rent, tenants are usually responsible for utilities, maintenance costs up to a certain amount, and brokerage fees. Our team will be happy to provide you with detailed information about any additional costs associated with the lease"},

    { title: 'Can i view  the luxury property before making decission ?', content: "Yes, we encourage prospective tenants to make viewing appointments. Our experienced team will be happy to arrange a hassle-free viewing appointment to showcase the property's exquisite features." },

    { title: 'How  can I book a luxury property for rent  in Dubai ?', content: "If you would like to book a luxury rent property in Dubai, please contact our dedicated team by phone or email. They will guide you through the rental process and help you secure your dream property."},
    { title: 'What are these terms for luxury  properties in Dubai ?', content: "The lease term for luxury properties is typically one year. However, we recommend discussing your requirements with our team to find the best solution for you." },
  ];
  return (
    <>
      <CommonBanner title="Rent Properties in Dubai" meta={meta}/>
      {propertyData.length > 0 ?
      <div className="container">
        <div className="row py-3">
          <div className="col-md-7">
            <h4>Advance Information</h4>
            <p>About {total} results</p>
          </div>
          <div className="col-md-5">
            <div className={styles.filter}>
              <ul>
                <li>
                  <input
                    type="text"
                    name="search"
                    placeholder="🔍 Search Property"
                    className="form-control search_bar"
                    value={searchInput}
                    onChange={SearchKeyPress}
                  />
                </li>
                <li>
                  <select className="form-control" value={sortOrder} onChange={shortByPrice}>
                    <option>Sort By Price</option>
                    <option value="lowToHigh">Price: Low to High</option>
                    <option value="highToLow">Price: High to Low</option>
                  </select>
                </li>
                <li>
                  <Link href={`/map`}>
                    <i className="fas fa-map"></i> Map
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-9">
            <InfiniteScroll
              dataLength={propertyData.length}
              next={loadMore}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              style={{ height: 'unset', overflow: 'unset' }}
              className="row"
            >
              {propertyData.map((item, i) => (
                <div key={i} className="mb-4">
                  <ListView item={item} tag={true} />
                </div>
              ))}
            </InfiniteScroll>
          </div>
          <div className="col-md-3">
            <div className={`${styles.left_card}`}>
              <h2><b>{`FAQs about Luxury Rent properties in dubai`}</b></h2>
                <div className="my-4 accordion">
                {items && items.map((item, index) => (
                  <FaqSection  title={item.title} content={item.content} count={index}  key={index}/>
                ))}
              </div>
              <LatestBlog />
              <LatestProperty />
            </div>
          </div>
        </div>
      </div>
      : 
      <>
      <div className='container py-5'>
        <div className='row'>
          <div className='col-md-9'>
          <h2><b>{`FAQs about Luxury Rent properties in dubai`}</b></h2>
              <div className="my-4 accordion">
              {items && items.map((item, index) => (
                <FaqSection  title={item.title} content={item.content} count={index}  key={index}/>
              ))}
          </div>
          </div>
          <div className='col-md-3'>
            <div className={`${styles.left_card}`}>
              <LatestBlog/>
              <LatestProperty/>
            </div>
          </div>
         
        </div>
      </div>
      </>
      }
    </>
  );
};


export default Index;

// Layout Configuration
Index.getLayout = function getLayout(page) {
  const  {props} = page;
  return <Website meta={props.meta}>{page}</Website>;
};

// Fetch Static Data for SSR
export const getStaticProps = async () => {
  try {
    const options = {
      "PCategory.slug":'rental',
      minAmount: `!=0`,
      status: 1,
      limit: 8,
      page: 1,
      sort: 'id:desc',
      columns:'title,Developer.name,PCategory.title,property_type,thumbnail,title,slug,shortDesc,minAmount,maxAmount,city,country,agentUser.firstName,agentUser.lastName',
    };
    const property = await fetchData(API_URLS.PROPERTIES, options);
    const meta = await fetchData(API_URLS.META,{slug:'rent-properties-in-dubai',columns: 'title,description,thumbnail,slug'});
    return {
      props: { 
        property: property.total > 0 ? property : { data: [], total: 0 }, 
        meta:meta.data[0]
      },
      revalidate: 3600,
    };
  } catch (error) {
    return { props: { property: { data: [], total: 0 },meta:[]}, revalidate: 10 };
  }
};
