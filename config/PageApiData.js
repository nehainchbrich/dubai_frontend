import API_URLS from "./apiconfig";
import { fetchBlogTags, fetchData, fetchMeta, fetchProperty, fetchPropertyGallery, fetchPropertyPrice, fetchReview, fetchSingleProperty, fetchSites } from "./fetchApi";

export const fetchHome = async () => {
   try {
      const featureOption = { status: 1, limit: 1, is_featured: 1, columns: 'title,shortDesc,Developer.name,Developer.slug,minAmount,maxAmount,thumbnail,slug,PCategory.title,is_rental,rental_type,city,createdAt,country,state,agentUser.*' };
      const readyMoveOption = { status: 1, limit: 1, is_featured: 1, "PCategory.slug": "ready-to-move-in", columns: 'title,shortDesc,Developer.name,Developer.slug,minAmount,maxAmount,thumbnail,slug,PCategory.title,is_rental,rental_type,city,createdAt,country,state,agentUser.*' };
      const offPlanOption = { status: 1, limit: 1, is_featured: 1, "PCategory.slug": "off-plan", columns: 'title,shortDesc,minAmount,maxAmount,thumbnail,slug' };

      const trendingOption = { status: 1, limit: 6, "sort": "order:asc", columns: 'title,shortDesc,minAmount,maxAmount,thumbnail,slug,city,PCategory.title' };

      const banner = await fetchData(API_URLS.BANNER, { status: 1, limit: 1, sortBy: 'id', sortOrder: 'desc', columns: 'thumbnail,permalink,heading1,heading2' });
      const PType = await fetchData(API_URLS.PROPERTIES_TYPE, { status: 1, columns: 'title,slug,description,thumbnail' });
      const Location = await fetchData(API_URLS.LOCATION, { status: 1, is_prominent: 1, limit: 4, columns: 'name,thumbnail,slug,rating,shortDesc,country,state' });
      const agent = await fetchData(API_URLS.AGENT, { status: 1, is_verify: 1, "sort": "order:asc", columns: 'firstName,lastName,slug,profile,designation,is_agent' });
      const Developer = await fetchData(API_URLS.DEVELOPER, { status: 1, limit: 5, columns: 'logo,slug,name' });
      const readyProperty = await fetchData(API_URLS.PROPERTIES, readyMoveOption);
      const offplan = await fetchData(API_URLS.PROPERTIES, offPlanOption);
      const featured = await fetchData(API_URLS.PROPERTIES, featureOption);
      const trending = await fetchData(API_URLS.PROPERTIES, trendingOption);
      const news = await fetchData(API_URLS.BLOG, { status: 1, limit: 3, "category.title": 'News', columns: 'title,slug,shortDesc,thumbnail' });
      const blog = await fetchData(API_URLS.BLOG, { status: 1, limit: 5, "category.title": '!News', columns: 'title,slug,shortDesc,thumbnail' });
      const press = await fetchData(API_URLS.PRESS, { status: 1, columns: 'logo,slug,title' });

      return { banner: banner.data, PType: PType.data, Location: Location.data, agent: agent.data, Developer: Developer.data, readyProperty: readyProperty.data, offplan: offplan.data, featured: featured.data, trending: trending.data, press: press.data, news: news.data, blog: blog.data };
   } catch (error) {
      console.error('Error fetching home data:', error);
      throw new Error('An error occurred while fetching data.');
   }
}

const globalCache = {};

export const fetchGlobal = async (url) => {
   try {
      const slug = encodeURIComponent(url.toString());

      // Check if data is cached
      if (globalCache[slug]) {
         return globalCache[slug];
      }

      const metaDataPromise = fetchMeta(slug);
      const sitesPromise = fetchSites();

      // Execute both promises concurrently
      const [metaData, sites] = await Promise.all([metaDataPromise, sitesPromise]);

      // Cache the data
      globalCache[slug] = { metaData, sites };

      return { metaData, sites };
   } catch (error) {
      console.error('Error fetching global data:', error);
      throw new Error('An error occurred while fetching global data.');
   }
}


export const fetchInsideProperty = async (slug) => {
   try {
      // const property = await fetchSingleProperty(slug);
      const property = await fetchData(API_URLS.PROPERTIES, { slug });
      if (property.total > 0) {

         const developer = property.data[0].developer;
         const code = property.data[0].code;
         const [latestProperty, relatedProperty, blogTag, florplan, gallery, review] = await Promise.all([
            fetchData(API_URLS.PROPERTIES, { status: 1, limit: 10 }),
            fetchData(API_URLS.PROPERTIES, { status: 1, limit: 10, developer }),
            fetchData(API_URLS.BLOG_TAG, { status: 1 }),
            fetchData(API_URLS.PROPERTY_PRICE, { status: 1, propertyCode: code }),
            fetchData(API_URLS.PROPERTY_FILE, { status: 1, propertyCode: code }),
            fetchData(API_URLS.REVIEW, { status: 1, pageCode: code })
         ]);
         return {
            property: property.data[0], latestProperty: latestProperty.data,
            relatedProperty: relatedProperty.data,
            blogTag: blogTag.data,
            florplan: florplan.data,
            gallery: gallery.data,
            review: review.data
         };
      } else {
         return null;
      }
   } catch (error) {
      console.error('Error fetching property data:', error);
      throw new Error('An error occurred while fetching data.');
   }
}