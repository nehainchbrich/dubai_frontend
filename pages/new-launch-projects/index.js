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

const Index = ({ property, newlaunchPage,meta }) => {
  const { data, total } = property;
  const limit = 10; // Load a small batch initially
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
      status: 1,
      minAmount: `=0`,
      sort: 'id:desc',
      "PCategory.slug": `off-plan`,
      page: nextPage,
      limit,
      columns: 'title,Developer.name,PCategory.title,property_type,thumbnail,title,slug,shortDesc,minAmount,maxAmount,city,country,agentUser.firstName,agentUser.lastName'
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

  return (
    <>
      <CommonBanner title={newlaunchPage.title} meta={meta} />
      <div className="container">
        <div className="row py-3">
          <div className="col-md-8">
            <h4>Advance Information</h4>
            <p>About {total} results</p>
          </div>
          <div className="col-md-4">
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
              {newlaunchPage && <div dangerouslySetInnerHTML={{ __html: newlaunchPage.description }} />}
              <LatestBlog />
              <LatestProperty />
            </div>
          </div>
        </div>
      </div>
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
      status: 1,
      limit: 10,
      minAmount: `=0`,
      sort: 'id:desc',
      "PCategory.slug": `off-plan`,
      columns: 'title,Developer.name,PCategory.title,property_type,thumbnail,title,slug,shortDesc,minAmount,maxAmount,city,country,agentUser.firstName,agentUser.lastName'
    };
    
    const property = await fetchData(API_URLS.PROPERTIES, options);
    const newlaunchPage = await fetchWebsitePage('new-launch-projects');
    const meta = await fetchData(API_URLS.META,{slug:'new-launch-projects',columns: 'title,description,thumbnail,slug'});
    return {
      props: { 
        property: property.total > 0 ? property : { data: [], total: 0 }, 
        newlaunchPage,
        meta:meta.data[0] || null
      },
      revalidate: 3600,
    };
  } catch (error) {
    return { props: { property: { data: [], total: 0 }, newlaunchPage: [],meta:[] }, revalidate: 10 };
  }
};
