import API_URLS from "./apiconfig";

export const fetchBanner = async (option) => {
  const { status, limit, offset, columns } = option;
  let query = '';
  if (status) { query += `status=${status}`; }
  if (limit) { query += `${query.length ? '&' : ''}limit=${limit}`; }
  if (offset) { query += `${query.length ? '&' : ''}limit=${offset}`; }
  if (columns) { query += `${query.length ? '&' : ''}columns=${columns}`; }
  const res = await fetch(`${API_URLS.BANNER}?${query}`);
  const data = await res.json();
  if (data.status === true) {
    return data.data;
  } else {
    return null;
  }
}
export const fetchPropertyType = async (option) => {
  const { status, limit, offset, columns } = option;
  let query = '';
  if (status) { query += `status=${status}`; }
  if (limit) { query += `${query.length ? '&' : ''}limit=${limit}`; }
  if (offset) { query += `${query.length ? '&' : ''}limit=${offset}`; }
  if (columns) { query += `${query.length ? '&' : ''}columns=${columns}`; }
  const res = await fetch(`${API_URLS.PROPERTIES_TYPE}?${query}`);
  const data = await res.json();
  if (data.status === true) {
    return data.data;
  } else {
    return null;
  }
}
export const fetchLocation = async (option) => {
  const { status, is_prominent, limit, offset, columns } = option;
  let query = '';
  if (status) { query += `status=${status}`; }
  if (limit) { query += `${query.length ? '&' : ''}limit=${limit}`; }
  if (is_prominent) { query += `${query.length ? '&' : ''}is_prominent=${is_prominent}`; }
  if (offset) { query += `${query.length ? '&' : ''}limit=${offset}`; }
  if (columns) { query += `${query.length ? '&' : ''}columns=${columns}`; }
  const res = await fetch(`${API_URLS.LOCATION}?${query}`);
  const data = await res.json();
  if (data.status === true) {
    return data.data;
  } else {
    return null;
  }
}

export const fetchPropertyCategory = async (option) => {
  const { status, limit } = option;
  let query = '';
  if (status) { query += `status=${status}`; }
  if (limit) { query += `${query.length ? '&' : ''}limit=${limit}`; }
  const res = await fetch(`${API_URLS.PROPERTIES_CATEGORY}?${query}`);
  const data = await res.json();
  if (data.status === true) {
    return data.data;
  } else {
    return null;
  }
}
export const fetchPropertyPrice = async (option) => {
  const { status, limit, code } = option;
  let query = '';
  if (status) { query += `status=${status}`; }
  if (limit) { query += `${query.length ? '&' : ''}limit=${limit}`; }
  if (code) { query += `${query.length ? '&' : ''}propertyCode=${code}`; }
  const res = await fetch(`${API_URLS.PROPERTY_PRICE}?${query}`);
  const data = await res.json();
  if (data.status === true) {
    return data.data;
  } else {
    return null;
  }
}
export const fetchPropertyGallery = async (option) => {
  const { status, limit, code } = option;
  let query = '';
  if (status) { query += `status=${status}`; }
  if (limit) { query += `${query.length ? '&' : ''}limit=${limit}`; }
  if (code) { query += `${query.length ? '&' : ''}propertyCode=${code}`; }
  const res = await fetch(`${API_URLS.PROPERTY_FILE}?${query}`);
  const data = await res.json();
  if (data.status === true) {
    return data.data;
  } else {
    return null;
  }
}
export const fetchReview = async (option) => {
  const { status, limit, code } = option;
  let query = '';
  if (status) { query += `status=${status}`; }
  if (limit) { query += `${query.length ? '&' : ''}limit=${limit}`; }
  if (code) { query += `${query.length ? '&' : ''}pageCode=${code}`; }
  const res = await fetch(`${API_URLS.REVIEW_DATA}?${query}`);
  const data = await res.json();
  if (data.status === true) {
    return data.data;
  } else {
    return null;
  }
}
export const fetchAgent = async (option) => {
  const { status, is_verify } = option;
  let query = '';
  if (status) { query += `status=${status}`; }
  if (is_verify) { query += `${query.length ? '&' : ''}is_verify=${is_verify}`; }
  const res = await fetch(`${API_URLS.AGENT}?${query}`);
  const data = await res.json();
  if (data.status === true) {
    return data.data;
  } else {
    return null;
  }
}
export const fetchDeveloper = async (option) => {
  const { status, limit } = option;
  let query = '';
  if (status) { query += `status=${status}`; }
  if (limit) { query += `${query.length ? '&' : ''}limit=${limit}`; }
  const res = await fetch(`${API_URLS.DEVELOPER}?${query}`);
  const data = await res.json();
  if (data.status === true) {
    return data.data;
  } else {
    return null;
  }
}

export const fetchBlog = async (option) => {
  const { status, limit, categoryName } = option;
  let query = '';
  if (status) { query += `status=${status}`; }
  if (limit) { query += `${query.length ? '&' : ''}limit=${limit}`; }
  if (categoryName) {
    if (categoryName.startsWith('!')) {
      const notCategoryName = categoryName.substring(1);
      query += `${query.length ? '&' : ''}categoryName=!${notCategoryName}`;
    } else {
      query += `${query.length ? '&' : ''}categoryName=${categoryName}`;
    }
  }
  const res = await fetch(`${API_URLS.BLOG}?${query}`);
  const data = await res.json();
  if (data.status === true) {
    return data.data;
  } else {
    return null;
  }
}
export const fetchBlogTags = async (option) => {
  const { status, limit } = option;
  let query = '';
  if (status) { query += `status=${status}`; }
  if (limit) { query += `${query.length ? '&' : ''}limit=${limit}`; }
  const res = await fetch(`${API_URLS.BLOG_TAG}?${query}`);
  const data = await res.json();
  if (data.status === true) {
    return data.data;
  } else {
    return null;
  }
}
export const fetchMeta = async (slug) => {
  const res = await fetch(`${API_URLS.METABYSLUG(slug)}`);
  const data = await res.json();
  if (data.status === true) {
    return data.data;
  } else {
    return null;
  }
}
export const fetchSites = async () => {
  const res = await fetch(`${API_URLS.SITES}?status=1`);
  const data = await res.json();
  if (data.status === true) {
    const sites = {};
    data && data.data.forEach((item) => {
      sites[item.title] = item.value;
    });
    return sites;
  } else {
    return null;
  }
}

export const fetchMCQuestion = async () => {
  const res = await fetch(API_URLS.INQUIRYMCQ);
  const data = await res.json();
  if (data.status === true) {
    return data.data;
  } else {
    return null;
  }
}

export const fetchPress = async (option) => {
  const { status, limit } = option;
  let query = '';
  if (status) { query += `status=${status}`; }
  if (limit) { query += `${query.length ? '&' : ''}limit=${limit}`; }
  const res = await fetch(`${API_URLS.PRESS}?${query}`);
  const data = await res.json();
  if (data.status === true) {
    return data.data;
  } else {
    return null;
  }
}
export const fetchWebsitePage = async (slug) => {
  const websiteData = await fetchData(API_URLS.WEBSITEPAGE, { slug, columns: 'title,description' });
  return websiteData.data[0];
}
export const fetchData = async (url, options) => {
  let apiUrl = url.replace(/\s+/g, '');
  if (options) {
    const queryParams = Object.entries(options)
      .filter(([key, value]) => value !== undefined && value !== null)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    apiUrl = `${url}?${queryParams}`;
  }
  console.log(`Fetching URL: ${apiUrl}`);
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.status === true) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Fetch failed for URL: ${apiUrl}`, error);
    throw error; // Re-throw to maintain existing behavior or handle gracefully
  }
};