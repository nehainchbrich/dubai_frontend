import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../../../styles/Offer.module.css';
import { imageKitLoader } from '@/helper/Helper';
import Link from 'next/link';

const OfferModal = ({ data }) => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Ensure the modal shows only after the page has completely loaded
    const handlePageLoad = () => {
      setIsPageLoaded(true); // Page is fully loaded
    };

    if (document.readyState === 'complete') {
      handlePageLoad(); // If the page is already loaded
    } else {
      window.addEventListener('load', handlePageLoad);
    }

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('load', handlePageLoad);
    };
  }, []);

  useEffect(() => {
    // Show the modal if the page is fully loaded
    if (isPageLoaded) {
      const modalElement = document.getElementById('offerModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }
  }, [isPageLoaded]);

  // Function to close the modal
  const closeModal = () => {
    const modalElement = document.getElementById('offerModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  };

  // Function to handle link click
  const handleLinkClick = (href) => (e) => {
    e.preventDefault(); // Prevent the default link behavior
    closeModal(); // Close the modal
    setTimeout(() => {
      router.push(href); // Redirect after the modal is closed
    }, 300); // Delay to allow modal animation to complete
  };

  return (
    <>
      <div
        className="modal fade"
        id="offerModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <button
              type="button"
              className="modal-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            >
              <i className="fas fa-times"></i>
            </button>
            <div className="modal-body">
              <div className="row">
                <div className={`col-md-7 ${styles.offer_img}`}>
                  <Image
                    src={`${process.env.API_URL}${data[0].thumbnail}`}
                    alt={data[0].title}
                    width={250}
                    height={250}
                    loading="lazy"
                    className="img-fluid"
                    unoptimized 
                  />
                </div>
                <div className={`col-md-5 ${styles.offer_content}`}>
                  <div dangerouslySetInnerHTML={{ __html: data[0].description }} />
                  <Link href={`/expo-invitation`} onClick={handleLinkClick(`/expo-invitation`)} className={`btns btn-orange`}>
                    Download Free VIP Pass →</Link>
                    <p className={`${styles.offer_terms} text-end`}><Link href={`/offers/${data[0].slug}`} onClick={handleLinkClick(`/offers/${data[0].slug}`)}>T&C APPLY</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OfferModal;
