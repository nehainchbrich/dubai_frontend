import {useContext} from 'react';
import BlogContex from './BlogContex';
export function LatestBlogProvider({ children, latestBlog }) {
    return (
      <BlogContex.Provider value={latestBlog}>
        {children}
      </BlogContex.Provider>
    );
  }
  export function useLatestPost() {
    const latestBlog = useContext(BlogContex);
    return latestBlog;
  }