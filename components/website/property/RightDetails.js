import React from "react";
import styles from "../../../styles/SingleProperty.module.css";
import Image from "next/image";
import Link from "next/link";
import LatestProperty from "./LatestProperty";
import LatestBlog from "../blogs/LatestBlog";
import { useSites } from "@/context/SiteProvider";
import { imageKitLoader } from "@/helper/Helper";
import TriggerFrm from "../form/TriggerFrm";
import MyGallery from "../common/MyGallery";
const RightDetails = ({ data }) => {
  const { siteSettings: sites } = useSites() || {};
  const getVal = (key, fallback = "") => sites?.[key] || fallback;
  if (!sites || Object.keys(sites).length === 0) {
    return null; // or return a loader/skeleton
  }
  const Gallery = data.Gallery.filter((item) => item.fileFor === "Gallery");
  return (
    <>
      {Gallery && Gallery.length > 0 && (
        <div className={`${styles.img_gallery} d-none d-md-block`}>
          <MyGallery items={Gallery} />
        </div>
      )}

      {data.agentUser  && (
        <>
        <div className={`${styles.agent_card}`}>
          <Image loader={imageKitLoader} src={`${data.agentUser.profile}`} alt={`${data.agentUser.firstName} ${data.agentUser.lastName}`} width={100} height={100} className="card_img"/>
            <div className="card_content">
                <h4 className="card_title">{data.agentUser.firstName} {data.agentUser.lastName}</h4>
                <p className="btn_service text-center"><Link href={`/agent-profile/${data.agentUser.slug}`}>Check Profile →</Link></p>
            </div>
        </div>
        </>
      )}
      <div className={`${styles.contact_frm} shadow p-3 mt-5`}>
        <h4>Contact Us</h4> 
        <div className={styles.inquiry_icons}>
          <span>
            <Link
              href={`mailto:${getVal("dubai_mail")}`}
              title={getVal("dubai_mail")}
            >
              <i className="fas fa-envelope"></i>
            </Link>
          </span>
          <span>
            <Link
              href={`tel:${getVal("dubai_contact")}`}
              title={getVal("dubai_contact")}
            >
              <i className="fas fa-phone"></i>
            </Link>
          </span>
          <span>
            <Link
              href={`https://api.whatsapp.com/send?phone=${getVal(
                "dubai_whatsapp"
              )}`}
              title={getVal("dubai_whatsapp")}
            >
              <i className="fab fa-whatsapp"></i>
            </Link>
          </span>
        </div>

        <p className="text-center">OR</p>
        <TriggerFrm id="tPropertyMobile" />
      </div>
      <div className="d-flex flex-wrap gap-2 mt-3">
        {/* Property Type Badges */}
        {data.property_type &&
          data.property_type.map((item, i) => (
            <Link
              href={`/residential-properties/${item.slug}`}
              key={`ptype-${i}`}
              className="text-decoration-none"
            >
              <span className="badge-pill-modern property-badge">
                {item.title}
              </span>
            </Link>
          ))}

        {/* Tags Badges */}
        {data.tags &&
          data.tags.map((tag, i) => (
            <Link
              href={`/blog-tag/${tag.slug}`}
              key={`tag-${i}`}
              className="text-decoration-none"
            >
              <span className="badge-pill-modern tag-badge">{tag.title}</span>
            </Link>
          ))}
      </div>

      <style jsx>{`
        .badge-pill-modern {
          display: inline-block;
          padding: 8px 16px;
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.3s ease-in-out;
          cursor: pointer;
        }

        /* Property Type = colorful neon */
        .property-badge {
          background: linear-gradient(135deg, #ff7eb3, #ff758c);
          color: #fff;
          box-shadow: 0 0 10px rgba(255, 118, 136, 0.6);
        }
        .property-badge:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 18px rgba(255, 118, 136, 0.9);
        }

        /* Tags = sleek outline style */
        .tag-badge {
          background: transparent;
          border: 1px solid #aaa;
          color: #474646;
        }
        .tag-badge:hover {
          border-color: #fff;
          color: #fff;
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }
      `}</style>
    </>
  );
};

export default RightDetails;
