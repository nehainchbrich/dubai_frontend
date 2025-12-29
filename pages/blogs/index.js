import React, { useEffect, useState } from 'react';
import Website from '../layouts/website';
import CommonBanner from '@/components/website/common/CommonBanner';
import InfiniteScroll from 'react-infinite-scroll-component';
import BlogItem2 from '@/components/website/blogs/BlogItem2';
import { fetchData } from '@/config/fetchApi';
import API_URLS from '@/config/apiconfig';
import OfferBlog from '@/components/expo_new/OfferBlog';

const Blog = ({ blog, meta, event }) => {
    const activeExpos = Array.isArray(event)
    ? event.filter((expo) => {
        const status = (expo.status || "").toUpperCase();
        return (
          status === "ACTIVE" ||
          (status === "UPCOMING" && Number(expo.default_status) === 1)
        );
      })
    : [];
  const { data, total } = blog;
  const limit = 10;

  const [blogData, setBlogData] = useState(data || []);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(data.length >= limit);
  const [searchInput, setSearchInput] = useState('');

  // 🔹 Fetch Blogs from server with pagination + search
  const fetchMoreBlogs = async (nextPage = 1, reset = false) => {
    try {
      const options = {
        status: 1,
        limit,
        page: nextPage,
        sort: 'id:desc',
        columns: 'title,category,tags,slug,thumbnail,shortDesc',
      };

      if (searchInput) {
        options.search = searchInput;
        options.searchColumns = 'title,category,tags';
      }

      const res = await fetchData(API_URLS.BLOG, options);
      const newData = res.data || [];

      setBlogData(prev => (reset ? newData : [...prev, ...newData]));
      setHasMore(newData.length === limit);
      setPage(nextPage);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };
  // 🔹 Search handler
  const SearchKeyPress = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchInput(value); // only set state
  };

  // 🔹 Run fetch when search input changes
  useEffect(() => {
    fetchMoreBlogs(1, true); // reset to page 1 with search applied
  }, [searchInput]);

  const loadMore = () => {
    fetchMoreBlogs(page + 1);
  };

  return (
    <>
      {/* <CommonBanner title="Blogs" meta={meta} /> */}
      <OfferBlog event={activeExpos}/>
      <div className="container mb-5 mt-3">
        <div className="row mb-4">
        <div className="col-md-6">
          <h2>Latest Blogs ({total})</h2>
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="search"
              placeholder="🔍 Search Blogs"
              className="form-control search_bar"
              value={searchInput}
              onChange={SearchKeyPress}
            />
          </div>
        </div>

        <InfiniteScroll
          dataLength={blogData.length}
          next={loadMore}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          style={{ height: 'unset', overflow: 'unset' }}
          className="row"
        >
          {blogData.map((item, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <BlogItem2 data={item} />
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Blog;

// Layout wrapper
Blog.getLayout = function getLayout(page) {
  const { props } = page;
  return <Website meta={props.meta}>{page}</Website>;
};

// Fetch initial data from server (SSR)
export async function getServerSideProps() {
  try {
    const options = {
      status: 1,
      limit: 10,
      page: 1,
      sort: 'id:desc',
      columns: 'title,category,tags,slug,thumbnail,shortDesc',
    };

    const blog = await fetchData(API_URLS.BLOG, options);
    const meta = await fetchData(API_URLS.META, {
      slug: 'blogs',
      columns: 'title,description,thumbnail,slug',
    });
// ✅ fetch expo events for activeExpos
      const eventRes = await fetchData(API_URLS.EVENTDETAILS, {
        status: "!UPCOMING",
      });
      const event = eventRes?.data || [];
    return {
      props: {
        blog: blog.total > 0 ? blog : { data: [], total: 0 },
        meta: meta.data[0] || null,
        event,
      },
    };
  } catch (error) {
    return {
      props: { blog: { data: [], total: 0 }, meta: null },
    };
  }
}
