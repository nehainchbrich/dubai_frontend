import React,{useState,useEffect} from 'react'
import Website from '../../pages/layouts/website';
import CommonBanner from '@/components/website/common/CommonBanner';
import API_URLS from '@/config/apiconfig';
import Image from 'next/image';
import LatestProperty from '@/components/website/property/LatestProperty';
import LatestBlog from '@/components/website/blogs/LatestBlog';
import GridView from '@/components/website/property/GridView';
import InfiniteScroll from 'react-infinite-scroll-component'
import ReviewFrm from '@/components/website/common/ReviewFrm';
import TriggerFrm from '@/components/website/form/TriggerFrm';
import { fetchData } from '@/config/fetchApi';
import { imageKitLoader } from '@/helper/Helper';
import ListView from '@/components/website/property/ListView';
const Slug = ({agent,property,review,meta}) => {
  const fullName =`${agent[0].firstName} ${agent[0].lastName}`;
  const [currentPage, setCurrentPage] = useState(1);
  const limit=3;
  const [propertyData,setpropertyData]=useState(property)
  const [searchInput, setSearchInput] = useState('');
  const SearchKeyPress =(e)=>{
    const value = e.target.value.toLowerCase();
    setSearchInput(value);
    const filterData = property.filter((item) =>
    ["title", "city", "state", "country", "house_number", "address_line_1", "address_line_2","categoryName","pTypeName"].some(
      (key) => item[key] && item[key].toLowerCase().includes(value)
    )|| (item.amount && item.amount.toString().includes(value))
    );
    setpropertyData(filterData);
  }
  const fetchMoreData = () => {setCurrentPage(currentPage + 1);};
  useEffect(() => {
    setpropertyData(property);
  }, [property]);
  return (
    <>
    <CommonBanner title={fullName} meta={meta}/>
    <div className="container my-5">
        <div className="row">
            <div className="col-md-9">
                <div className='text-center'>
                <Image loader={imageKitLoader} src={`${agent[0].profile}`} width={200} height={200} alt={fullName} className='img-fluid' loading='lazy'/>
                    <h2>{fullName}</h2>
                    <p>Mobile:-{agent[0].mobile}</p>
                    <p>Email:-{agent[0].email}</p>
                    <p>Inchbrick Realty, Office 1303,1302 13th floor, Burlington Tower Business Bay, Dubai, United Arab Emirates</p>
                </div>
                <h4>About</h4>
                <div dangerouslySetInnerHTML={{ __html: agent[0].about }}/>
                <div className='row col-md-12'>
                  <ReviewFrm page="agent-profile" review={review} pageCode={agent[0].userCode}/>
                </div>
            </div>
            <div className='col-md-3'>
            <div className='contact-details'>
                  <h4>Contact Me</h4>
                    <TriggerFrm id='tAgentMobile'/>
                </div>
                <LatestProperty/>
                <LatestBlog/>
              
            </div>
            <div className='col-md-6 offset-md-3 my-4'>
            <input type="text" name="search" placeholder='🔍Search Property' className='form-control search_bar' value={searchInput} onChange={SearchKeyPress}/>
            </div>
            <InfiniteScroll dataLength={currentPage * limit} next={fetchMoreData} hasMore={propertyData.length > currentPage * limit}
                loader={<h4>Loading...</h4>} className='col-md-12 row' style={{ height: 'unset', overflow: 'unset' }}>
            <h4>My Properties ({propertyData.length})</h4>
              {propertyData && propertyData.slice(0, currentPage * limit).map((item,index)=>(
                <div className='col-md-6 mb-3' key={index}>
                  <ListView item={item}/>
                </div>
              ))}
              </InfiniteScroll>
        </div>
    </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const {slug} =context.query;
    try {
      const agent = await fetchData(API_URLS.AGENT,{slug,is_verify:1,is_agent:1});
      const meta = await fetchData(API_URLS.META,{slug:`agent-profile/${slug}`,columns: 'title,description,thumbnail,slug'});
      if(agent.total > 0){
        const agents = agent.data[0].userCode
        const property= await fetchData(API_URLS.PROPERTIES,{status:1,agent:agents});

        const review = await fetchData(API_URLS.REVIEW,{status:1,pageCode:agents});
       return {
          props:{agent:agent.data,property:property.data,review:review.data,meta:meta.data[0]}
        }
     }
     return {
      notFound: true,
    };
      
    } catch (error) {
      return { props: {} };
    }
  }
export default Slug
Slug.getLayout = function getLayout(page) {
  const  {props} = page;
  return <Website meta={props.meta}>{page}</Website>;
}


