"use client";
import React, { useState, useEffect, useRef } from "react";
import { fetchData } from "@/config/fetchApi";
import PropertyList from "../common/PropertyList";
import API_URLS from "@/config/apiconfig";
import styles from "../../../styles/Nav.module.css";

const SearchProperty = () => {
  const [property, setProperty] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    fetchPropertyData();
  }, []);

  const fetchPropertyData = async () => {
    const res = await fetchData(API_URLS.PROPERTIES, { status: 1 });
    setProperty(res.data || []);
  };

  const handleSearch = (value) => {
    setSearch(value);
    if (!value.trim()) {
      setFiltered([]);
      setDropdownOpen(false);
      return;
    }

    const lower = value.toLowerCase();
    const results = property.filter((item) => {
      const matchesBasic =
        item.title?.toLowerCase().includes(lower) ||
        item.city?.toLowerCase().includes(lower) ||
        item.state?.toLowerCase().includes(lower);
      const matchesDeveloper = item.Developer?.name?.toLowerCase().includes(lower);
      const matchesCategory = item.PCategory?.title?.toLowerCase().includes(lower);
      const matchesType = item.property_type?.some(
        (pt) =>
          pt.title?.toLowerCase().includes(lower) ||
          pt.slug?.toLowerCase().includes(lower)
      );
      const matchesAmount = item.amount?.toString().includes(lower);
      return (
        matchesBasic ||
        matchesDeveloper ||
        matchesCategory ||
        matchesType ||
        matchesAmount
      );
    });

    setFiltered(results);
    setDropdownOpen(true);
  };

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="searchSection" ref={searchRef}>
        <div className="searchWrapper">
          {/* 🧭 Desktop Search Bar */}
          <div className="desktopSearch align-items-center searchBarWrapper">
            <input
              type="text"
              name="search"
              placeholder="🔍 Search Property here..."
              className="form-control mb-md-0 mr-md-2"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => search && setDropdownOpen(true)}
              autoComplete="off"
            />
            <button className="btns btn-orange">
              <i className="fa fa-search"></i>
            </button>
          </div>

          {/* 📱 Mobile Search Icon */}
          <div className="mobileSearchWrapper">
            {!mobileSearchOpen && (
              <button
                className="mobileSearchIcon"
                onClick={() => setMobileSearchOpen(true)}
              >
                <i className="fa fa-search"></i> Search </button>
            )}

            {mobileSearchOpen && (
              <div className="mobileSearchBar">
                <button
                  className="backBtn"
                  onClick={() => {
                    setMobileSearchOpen(false);
                    setDropdownOpen(false);
                    setSearch("");
                  }}
                >
                  <i className="fa fa-arrow-left"></i>
                </button>
                <input
                  type="text"
                  placeholder="Search Property..."
                  className="form-control"
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => search && setDropdownOpen(true)}
                  autoComplete="off"
                />
              </div>
            )}
          </div>

          {/* ⬇️ Dropdown Results */}
          {dropdownOpen && (
            <div
              className={`${styles.searchResultpopup} dropdownBox ${
                mobileSearchOpen ? "mobileDropdown" : ""
              }`}
            >
              {filtered.length > 0 ? (
                <>
                  <p className="resultCount">
                    Results: {filtered.length} out of {property.length}
                  </p>
                  <div className="dropdownContent">
                    {filtered.slice(0, 10).map((item, index) => (
                      <div
                        key={index}
                        className="dropdownItem"
                        onClick={() => {
                          setSearch(item.title);
                          setDropdownOpen(false);
                          if (mobileSearchOpen) setMobileSearchOpen(false);
                        }}
                      >
                        <PropertyList item={item} />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                search && <p className="text-center py-2 mb-0">No results found.</p>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .searchSection {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .form-control {
          height: 44px;
          border-top-right-radius: 0 !important;
          border-bottom-right-radius: 0 !important;
        }

        .btn-orange {
          border-top-left-radius: 0 !important;
          border-bottom-left-radius: 0 !important;
          background: #2c2424;
          border: 0;
          color: var(--color-1) !important;
          height: 44px;
        }

        .searchWrapper {
          position: relative;
          width: 100%;
          min-width: 300px;
        }

        .dropdownBox {
          position: absolute;
          top: 100%;
          left: 0;
          width: 400px;
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          max-height: 400px;
          overflow-y: auto;
          z-index: 9999;
          animation: slideDown 0.2s ease;
          margin-top: 6px;
        }

        .dropdownItem {
          border-bottom: 1px solid #eee;
          cursor: pointer;
        }

        .dropdownItem:hover {
          background: #f8f8f8;
        }

        .resultCount {
          font-size: 14px;
          font-weight: 500;
          border-bottom: 1px solid #ddd;
          color: #555;
          padding: 8px 12px;
          background: #fafafa;
        }

        /* 🟢 Mobile styles */
        .mobileSearchWrapper {
          display: none;
        }
           .desktopSearch {
            display: flex;
          }

        @media (max-width: 768px) {
          .desktopSearch {
            display: none;
          }
.searchWrapper {
min-width:auto;
}
          .mobileSearchWrapper {
            display: flex;
            align-items: center;
            justify-content: center;
                    position: fixed;
        top: 0;
        left: 0;
        width: 100%;
          }

          .mobileSearchIcon {
            background: none;
            border: none;
            font-size: 15px;
        color: #ffffff;
        position: fixed;
        bottom: 14px;
        left: 28%;
          }

          .mobileSearchBar {
            display: flex;
            align-items: center;
            gap: 8px;
            width: 100%;
            background: #fff;
            padding: 6px 10px;
            border-radius: 8px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
            animation: slideIn 0.3s ease;
            position: relative;
            z-index: 10000;
          }

          .mobileSearchBar .form-control {
            border-radius: 6px;
            flex: 1;
          }

          .backBtn {
            background: none;
            border: none;
            font-size: 18px;
            color: #333;
          }

          /* ✅ Full width dropdown for mobile */
          .dropdownBox.mobileDropdown {
            position: fixed;
            top: 60px;
            left: 0;
            right: 0;
            width: 100%;
            max-width: 100%;
            border-radius: 0;
            max-height: 60vh;
            overflow-y: auto;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            animation: slideDown 0.25s ease;
            z-index: 99999;
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default SearchProperty;
