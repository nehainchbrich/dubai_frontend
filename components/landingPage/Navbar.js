import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import { useRouter } from "next/router";
import styles from "../../styles/Nav.module.css"
import Image from 'next/image';
import {imageKitLoader} from '@/helper/Helper';
function Navbar() {
    const router = useRouter();
    const [menuIcon, setMenuIcon] = useState();
    const [showScroll, setShowScroll] = useState(false);
    const checkScrollTop = () => {    
        if (!showScroll && window.pageYOffset > 70) {
          setShowScroll(true);    
        } else if (showScroll && window.pageYOffset <= 70) {
          setShowScroll(false);    
        }  
      };
   
    useEffect(() => {
    checkScrollTop();
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
    });
  
  const toggleDropdown = ()=> {
    const optionsList = document.querySelector('.options-list');
    optionsList.style.display = optionsList.style.display === 'block' ? 'none' : 'block';
  }
  return (
    <>
     <nav className={`navbar navbar-expand-lg fixed-top ${showScroll ? styles.slick_nav:"normal_nav"} ${menuIcon ? styles.mobile_nav : ""}`}>
              <div className="container-fluid nav_box">
                <Link className={`${styles.brand}`} href="/"><Image loader={imageKitLoader} src={`/common/logo.png`} title="Inchbrick Logo" alt="Inchbrick" className='img-fluid' width={100} height={100} quality={50} sizes='(max-width: 426px) 50vw, 426px' priority={true} loading='eager'/></Link>
                  <ul className={`${styles.navbar_nav}  ml-auto mt-2 mt-lg-0`}>
                    <li className={styles.nav_item}>
                          <Link className={`${styles.nav_link} ${router.pathname == "#description" ? styles.active: ""}`} href="#description">About</Link>
                    </li>
                    
                      <li className={styles.nav_item}>
                          <Link className={`${styles.nav_link} ${router.pathname == "#location" ? styles.active: ""}`} href="#location">Expo 2024</Link>
                      </li>
                      <li className={styles.nav_item}>
                          <Link className={`${styles.nav_link} ${router.pathname == "#gallery" ? styles.active: ""}`} href="#gallery">Gallery</Link>
                      </li>
                   
                       
                     <li className={styles.nav_item}>
                          <Link className={`${styles.nav_link} ${router.pathname == "#video-section" ? styles.active: ""}`} href="#video-section">Video</Link>
                      </li>
                      <li className={styles.nav_item}>
                          <Link className={`${styles.nav_link} ${router.pathname == "#payment-plan" ? styles.active: ""}`} href="#payment-plan">Payment Plan</Link>
                      </li>
                      <li className={styles.nav_item}>
                          <Link className={`${styles.nav_link} ${router.pathname == "#team" ? styles.active: ""}`} href="#team">Team</Link>
                      </li>
                      <li className={styles.nav_item}>
                          <Link className={`${styles.nav_link} ${router.pathname == "#map" ? styles.active: ""}`} href="#map">Map</Link>
                      </li>
                      <li className={styles.nav_item}>
                          <Link className={`${styles.nav_link} ${router.pathname == "#contact-us" ? styles.active: ""}`} href="#contact-us">Contact Us</Link>
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
            .normal_nav{
              background: var(--tr-color-1);
            }
            .badge{
                font-size: 8px;
                position: absolute;
                top: -8px;
                right: -10px;
                border-radius: 100%;
                animation: badge 1s ease-in-out infinite;
            }
            `}
          </style>
      </>
  )
}

export default Navbar
