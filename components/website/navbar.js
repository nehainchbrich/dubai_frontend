import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // ✅ Pages Router
import styles from "../../styles/Nav.module.css";
import Image from 'next/image';
import { useSites } from '@/context/SiteProvider';
import { useAuth } from '@/helper/Auth';
import { imageKitLoader } from '@/helper/Helper';
import Translate from './common/Translate';
import { useCurrency } from '@/context/CurrencyProvider';
import SearchProperty from './home/SearchProperty';


function Navbar() {
  // --- Search State ---
  const [propertyData, setPropertyData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [property, setProperty] = useState([]);
  const [pdata, setPData] = useState(false);

  const fetchPropertyData = async () => {
    try {
      const options = { status: 1 };
      const res = await fetchData(API_URLS.PROPERTIES, options);
      setPData(true);
      setProperty(res?.data || []);
    } catch (err) {
      console.error("Fetch properties failed", err);
    }
  };

  useEffect(() => {
    if (pdata) {
      filterData(searchInput);
    }
  }, [pdata]);

  const handleSearch = async () => {
    setPData(false);
    if (!property.length) {
      await fetchPropertyData();
    }
    filterData(searchInput);
  };

  const filterData = (value) => {
    const lowerCaseValue = value.toLowerCase();
    const filteredData = property.filter((item) => {
      const matchesBasic =
        item.title?.toLowerCase().includes(lowerCaseValue) ||
        item.city?.toLowerCase().includes(lowerCaseValue) ||
        item.state?.toLowerCase().includes(lowerCaseValue);

      const matchesDeveloper =
        item.Developer?.name?.toLowerCase().includes(lowerCaseValue);

      const matchesCategory =
        item.PCategory?.title?.toLowerCase().includes(lowerCaseValue);

      const matchesPropertyType =
        item.property_type?.some(
          (pt) =>
            pt.title?.toLowerCase().includes(lowerCaseValue) ||
            pt.slug?.toLowerCase().includes(lowerCaseValue)
        );

      const matchesAmount =
        item.amount?.toString().includes(lowerCaseValue);

      return (
        matchesBasic ||
        matchesDeveloper ||
        matchesCategory ||
        matchesPropertyType ||
        matchesAmount
      );
    });

    setPropertyData(filteredData);
  };

  // --- Other hooks ---
  const { user, handleLogout } = useAuth();
  const { siteSettings: sites } = useSites() || {};
  const [menuIcon, setMenuIcon] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const router = useRouter();
  const { currency, setCurrency } = useCurrency();

  const getVal = (key, fallback = '') => sites?.[key] || fallback;

  useEffect(() => {
    setMenuIcon(false);
    const checkScrollTop = () => setShowScroll(window.pageYOffset > 70);

    const OutSideEvent = (event) => {
      const optionsList = document.querySelector(".options-list");
      const selectedOption = document.querySelector(".selected-option");
      const allBtns = document.querySelector(`.${styles.mobile_nav_btn}`);
      const navbarNav = document.querySelector(`.${styles.navbar_nav}`);
      if (allBtns?.contains(event.target) || navbarNav?.contains(event.target)) return;
      setMenuIcon(false);
      if (optionsList && !optionsList.contains(event.target) && !selectedOption?.contains(event.target)) {
        optionsList.style.display = "none";
      }
    };

    checkScrollTop();
    window.addEventListener('scroll', checkScrollTop);
    window.addEventListener('click', OutSideEvent);
    return () => {
      window.removeEventListener('scroll', checkScrollTop);
      window.removeEventListener('click', OutSideEvent);
    };
  }, [router.pathname]);

  const handleChangeCurrency = (value) => {
    setCurrency(value);
    toggleDropdown();
  };

  const toggleDropdown = () => {
    const optionsList = document.querySelector('.options-list');
    if (optionsList) {
      optionsList.style.display =
        optionsList.style.display === 'block' ? 'none' : 'block';
    }
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg sticky-top ${showScroll ? styles.slick_nav : styles.normal_nav} ${menuIcon ? styles.mobile_nav : ""}`}>
        <div className="container-fluid nav_box">
          <Link className={styles.brand} href="/">
            <Image loader={imageKitLoader} src={`/common/logo.png`} alt="Inchbrick" width={100} height={100} />
          </Link>

          {/* Search */}
        <SearchProperty/>

          {/* Menu */}
          <ul className={`${styles.navbar_nav} ml-auto mt-lg-0`}>
          <li className={styles.nav_item}>
              <Link
                href="/events"
                prefetch={false} // ✅ fixed
                className={`${styles.nav_link} ${
                  router.pathname === "/events" ? styles.active : ""
                }`}
              >
                Expo - {new Date().getFullYear()}
              </Link>
            </li>
            <li className={styles.nav_item}>
              <Link
                href="/buy-property-in-dubai"
                prefetch={false}
                className={`${styles.nav_link} ${
                  router.pathname === "/buy-property-in-dubai"
                    ? styles.active
                    : ""
                }`}
              >
                Buy
              </Link>
            </li>
            {getVal("rent") !== "true" && (
              <li className={styles.nav_item}>
                <Link
                  href="/rent-properties-in-dubai"
                  prefetch={false}
                  className={`${styles.nav_link} ${
                    router.pathname === "/rent-properties-in-dubai"
                      ? styles.active
                      : ""
                  }`}
                >
                  Rent
                </Link>
              </li>
            )}
            <li className={styles.nav_item}>
              <Link
                href="/sell-property-in-dubai"
                prefetch={false}
                className={`${styles.nav_link} ${
                  router.pathname === "/sell-property-in-dubai"
                    ? styles.active
                    : ""
                }`}
              >
                Sell
              </Link>
            </li>
            {getVal("new_launch") !== "true" && (
              <li className={styles.nav_item}>
                <Link
                  href="/new-launch-projects"
                  prefetch={false}
                  className={`${styles.nav_link} ${
                    router.pathname === "/new-launch-projects"
                      ? styles.active
                      : ""
                  }`}
                >
                  New Launch
                </Link>
              </li>
            )}
            {user ? (
              <>
                <li className={styles.nav_item}>
                  <Link
                    href="/user/dashboard"
                    prefetch={false}
                    className={`${styles.nav_link} ${
                      router.pathname === "/user/dashboard"
                        ? styles.active
                        : ""
                    }`}
                  >
                    Dashboard 
                  </Link>
                </li>
                <li className={styles.nav_item}>
                  <a href="#" className={styles.nav_link} onClick={logout}>
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className={styles.nav_item}>
                  <a
                    href="#"
                    className={styles.nav_link}
                    data-bs-toggle="modal"
                    data-bs-target="#signup"
                  >
                    Sign Up
                  </a>
                </li>
                <li className={styles.nav_item}>
                  <a
                    href="#"
                    className={styles.nav_link}
                    data-bs-toggle="modal"
                    data-bs-target="#login"
                  >
                    Login
                  </a>
                </li>
              </>
            )}
            <li className={styles.nav_item}>
              <div className="custom-dropdown">
                <div className="selected-option" onClick={toggleDropdown}>
                  <span className={`selected-flag flag-${currency}`}></span>
                  {currency}
                </div>
                <ul className="options-list">
                  {["AED", "USD", "CNY", "INR", "EUR", "GBP"].map((cur) => (
                    <li
                      key={cur}
                      className="option"
                      onClick={() => handleChangeCurrency(cur)}
                    >
                      <span className={`flag flag-${cur}`}></span>
                      <span className="currency">{cur}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li className={styles.nav_item}>
              <Translate />
            </li>
          </ul>
          <div className={styles.mobile_nav_btn}>
            <i
              className={`fa fa-times ${styles.mobile_nav_icon} ${styles.close_outline}`}
              onClick={() => setMenuIcon(false)}
            />
            <i
              className={`fa fa-bars ${styles.mobile_nav_icon}`}
              onClick={() => setMenuIcon(true)}
            />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
