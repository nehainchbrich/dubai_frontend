"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../styles/expo_new/Events.module.css";
import { imageKitLoader } from "@/helper/Helper";
import Link from "next/link";

const OfferPopup = ({ show, offer, onClose }) => {
  const router = useRouter();

  if (!show) return null;
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className='modal-header offer-modal-view'>
        {/* Show close button ONLY on home ("/") */}
        {router.pathname === "/" && (
          <button
            className={styles.closeBtn}
            onClick={onClose}   // 👈 calls onClose handler
            aria-label="Close modal"
          >
            ✕
          </button>
        )}
</div>
        <Link href={offer[0].redirection} target="_blank">
          <Image loader={imageKitLoader}
            src={offer[0].thumbnail}
            alt={offer[0].title}
            width={400}
            height={250}
          />
        </Link>
      </div>
      
    </div>
   
  );
};

export default OfferPopup;
