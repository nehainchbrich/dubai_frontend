import CommonBanner from '@/components/website/common/CommonBanner'
import React, {useState,useEffect} from 'react'
import Website from '../layouts/website'
import FilterSection from '@/components/website/property/FilterSection'
import LatestBlog from '@/components/website/blogs/LatestBlog'
import API_URLS from '@/config/apiconfig'
import { getUniqueData,getAmenities,filterProperty} from '@/helper/Helper';
import Link from 'next/link'
import PropertyListMap from '@/components/website/property/PropertyListMap'
import { fetchData } from '@/config/fetchApi'
const Index = ({property,loadingTime,meta}) => {
const pTypeData= getUniqueData(property,'pTypeName');
const categoryData =getUniqueData(property,'categoryName');
const amenities =getAmenities(property,'amenities');
const developer =getUniqueData(property,'developerName');
const agents =getUniqueData(property,'agentName');
const address =getUniqueData(property,'city');
const [propertyData, setPropertyData] = useState(property);
const [searchInput, setSearchInput] = useState("");

const [filters, setFilters] = useState({pTypeName: [],categoryName: [],amenities: [],developerName:[],agentName:[],address:[]});

useEffect(() => {
  const data = filterProperty(property, filters);
  sortData(data);
}, [property, filters]);

const handleFilterChange = (event) => {
  const { name, value, checked } = event.target;
  setFilters(prevState => {
    const newFilters = { ...prevState };
    if (checked) {
      newFilters[name].push(value);
    } else {
      newFilters[name] = newFilters[name].filter(tag => tag !== value);
    }
    return newFilters;
  });
};

const SearchKeyPress =(e)=>{
  const value = e.target.value.toLowerCase();
  setSearchInput(value);
  const filteredData = property.filter((item) =>
  ["title", "city", "state", "country", "agentName", "developerName", "address_line_2","categoryName","pTypeName"].some(
    (key) => item[key] && item[key].toLowerCase().includes(value)
  ) || (item.amount && item.amount.toString().includes(value))
);
  sortData(filteredData);
}

const sortData = (data, sortOrder = "") => {
  let sortedData = [...data];
  if (sortOrder === "lowToHigh") {
    sortedData.sort((a, b) => a.amount - b.amount);
  } else if (sortOrder === "highToLow") {
    sortedData.sort((a, b) => b.amount - a.amount);
  }
  setPropertyData(sortedData);
};


return (
    <>
    <CommonBanner title="Find Property in Map" meta={meta}/>
    <div className='container my-5'>
        <div className='row'>
          <div className='col-md-12 row'>
          <div className='col-md-8'>
              <h4>Advance Information</h4>
              <p>About {propertyData.length} results ({loadingTime/1000} sec.)</p>
            
          </div>
          <div className='col-md-4'>
            <ul className='top_filter gap-4'>
             
              <li><Link href="/buy-property-in-dubai"> BUY</Link></li>
              <li><Link href="/rent-properties-in-dubai"> RENT</Link></li>
              <li><Link href="/off-plan-properties-in-dubai"> OFF PLAN</Link></li>
            </ul>
          </div>
          </div>
          <div className='col-md-3'>
            <FilterSection address={address} agents={agents} developer={developer} category={categoryData} amenities={amenities} ptype={pTypeData} handleFilterChange={handleFilterChange} filter={filters}/>
            <LatestBlog/>
          </div>
          <div className='col-md-9'>
            <div className='col-md-12 my-4'>
            <input type="text" name="search" placeholder='🔍Search Property' className='form-control search_bar' value={searchInput} onChange={SearchKeyPress}/>
            </div>
            <PropertyListMap data={propertyData}/>
          </div>
        </div>
      </div>
      <style jsx>
      {`
      .search_bar{
        border-radius:25px;
      }
      .top_filter{
        list-style: none;
        display: flex;
        padding: 5px;
        cursor: pointer;
        place-items: center;
      }
      .top_filter .active{
        padding: 5px;
        border-radius: 10px;
        background: var(--brand-color-2);
        color: var(--color-1);
      }
      @media (max-width: 768px) {
        .search_bar{
          border-radius:25px;
        }
        .top_filter{
          list-style: none;
          display: flex;
          padding: 5px;
          justify-content: space-around;
          cursor: pointer;
          place-items: center;
          font-size:12px;
        }
        .top_filter .active{
          padding: 5px;
          border-radius: 10px;
          background: var(--brand-color-2);
          color: var(--color-1);
        }
      }
    
      `}
      </style>
    </>
  )
}

export default Index
Index.getLayout = function getLayout(page) {
  const  {props} = page;
  return <Website meta={props.meta}>{page}</Website>;
}
export async function getServerSideProps(context) {
    try {
      const start = new Date().getTime();
      const meta = await fetchData(API_URLS.META,{slug:'map',columns:'title,description,thumbnail,slug'});
      const res = await fetch(`${API_URLS.PROPERTIES}?status=1`);
      const property =await res.json();
      const end = new Date().getTime();
      const loadingTime = end - start;
      return {
        props: {property:property.data,loadingTime,meta:meta.data[0] || null},
      }
      
    } catch (error) {
      return { props: {} };
    }
  }