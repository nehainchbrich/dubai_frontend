import Head from "next/head"
import { useMeta } from "@/context/MetaProvider";
import PreLoader from "@/components/website/common/PreLoader";
import { useAuth } from "@/helper/Auth";
import { useState, useEffect } from "react";
import Navbar from "@/components/user/Navbar";
function User({children}) {
  const { is_login } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, [is_login]);
  if (isLoading) {
    return <PreLoader />;
  }
  if (!is_login) {
    if (typeof window !== 'undefined') {
      const Router = require('next/router').default;
      Router.push('/');
    }
  }
  return (
    <>
   {is_login?(
      <>
    <Navbar/>
   <main>{children}</main>
   </>):<PreLoader />}
    
    </>
  )
}


export default User