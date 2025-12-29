import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import { useRouter } from "next/router";
import styles from "../../styles/Nav.module.css"
import Image from 'next/image';
import { useAuth } from '@/helper/Auth';
function Navbar() {
  const {user,handleLogout} =useAuth();
    const [menuIcon, setMenuIcon] = useState();
  const router = useRouter();
  const logout = ()=>{
    handleLogout();
  }
  return (
    <>
     <nav className={`navbar navbar-expand-lg fixed-top ${styles.slick_nav} ${menuIcon ? styles.mobile_nav : ""}`}>
              <div className="container-fluid nav_box">
                <Link className={styles.brand} href="/"><Image src={`${process.env.API_URL}/common/logo.png`} width={200} height={200} alt='INCH&BRICK'/></Link>
                  <ul className={`${styles.navbar_nav}  ml-auto mt-2 mt-lg-0`}>
                      <li className={styles.nav_item}>
                        <Link className={`${styles.nav_link} ${router.pathname == "/user/dashboard" ? styles.active: ""}`} href="/user/dashboard">Dashboard </Link>
                        </li>
                      <li className={styles.nav_item}>
                          <Link className={`${styles.nav_link} ${router.pathname == "/user/refer-earn" ? styles.active: ""}`} href="/user/refer-earn">Refer & Earn</Link>
                      </li>
                      <li className={styles.nav_item}>
                          <Link className={`${styles.nav_link} ${router.pathname == "/property-compare" ? styles.active: ""}`} href="/property-compare">Compaire Properties</Link>
                      </li>
                      <li className={styles.nav_item}>
                      <Link className={`${styles.nav_link} ${router.pathname == "/user/documents" ? styles.active: ""}`} href="/user/documents">Documents</Link>
                        </li>
                        <li className={styles.nav_item}>
                          <Link className={`${styles.nav_link} ${router.pathname == "/user/profile" ? styles.active: ""}`} href="/user/profile">Profile</Link>
                      </li>
                        <li className={styles.nav_item}>
                          <a href="#" className={`${styles.nav_link}`} onClick={logout}>Logout</a>
                        </li>
                      </ul>
                  <div className={styles.mobile_nav_btn}>
                      <i className={`fas fa-times ${styles.mobile_nav_icon} ${styles.close_outline}`} onClick={() => setMenuIcon(false)} />
                      <i className={`fas fa-bars ${styles.mobile_nav_icon}`} onClick={() => setMenuIcon(true)} />
                  </div>
              </div>
          </nav>
          <style jsx>
            {`
            .badge{
                background: #ff5500;
                font-size: 8px;
                position: absolute;
                top: -8px;
                right: -10px;
                border-radius: 100%;
                animation: pulse 1s ease-in-out infinite;
            }
            `}
          </style>
      </>
  )
}

export default Navbar