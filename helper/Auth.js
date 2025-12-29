import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [is_login, setIsLogin] = useState(false);
  
  useEffect(() => {
    const token = Cookies.get('user_token');
    if (token) {
      const data = jwtDecode(token);
      setUser(data.user);
      setIsLogin(true);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove('user_token');
    setUser(null);
    setIsLogin(false);
    router.push('/');
  };

  const handleAuth = (token) => {
    if (token) {
      const data = jwtDecode(token);
      setUser(data.user);
      setIsLogin(true);
      Cookies.set('user_token', token, { expires: 7 });
      router.push('/user/dashboard');
      // window.location.reload();
    }
  };

  return (
    <AuthContext.Provider value={{ user, is_login, handleLogout, handleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
