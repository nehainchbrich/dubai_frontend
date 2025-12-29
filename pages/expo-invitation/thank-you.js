import { imageKitLoader } from '@/helper/Helper';
import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/Thanks.module.css';
import Link from 'next/link';

const ThanksExpoPage = () => {
  const [qrCode, setQrCode] = useState(null);

  useEffect(() => {
    // Check if running on client-side
    if (typeof window !== 'undefined') {
      const storedQrCode = localStorage.getItem('qrCode');
      if (storedQrCode) {
        try {
          const parsedQrCode = JSON.parse(storedQrCode);
          setQrCode(parsedQrCode);
          // Optionally, you can remove the QR code from localStorage after retrieving it
          localStorage.removeItem('qrCode');
        } catch (error) {
          console.error('Error parsing QR code from localStorage:', error);
        }
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>Thank You | Inchbrick</title>
        <meta name="description" content="If you want to Buy Property in Dubai, Inchbrick Realty provides expert guidance and individualized service to ensure you find the property of your dreams." />
        <link rel="icon" href={`${process.env.API_URL}/common/favicon.ico`} />
      </Head>
      <div className='expo_frm'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6 row m-auto invitation_frm text-center'>
              <Link href={'/'}>
                <Image loader={imageKitLoader} src={`/common/black-logo.png`} title="Inchbrick Logo" alt="Inchbrick" className={`${styles.expo_img} img-fluid`} width={100} height={100} />
              </Link>
              <h1>Thank You for Your Interest in Our Expo</h1>
              <p>{`Check your inbox & download your VIP pass to enter the magical world of Dubai Real estate investment. In case you do not receive the mail, check in spam.`}</p>
              {qrCode && (
                <>
                  <Image src={qrCode.qr} title="QR Code" alt="QR Code" className={`${styles.expo_qr} img-fluid`} width={200} height={200} />
                  <h4 className='text-center'>OR</h4>
                  <Link href={`https://cdn.inchbrick.com/expo-pass/${qrCode.pass}.jpg`} download={true}><p className={`${styles.clickBtn}`}>Click here to download VIP Pass.</p></Link>
                </>
              )}
              <Link href={'/events'} className='btns btn-blue btn-50'>Explore More</Link>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .invitation_frm {
            min-height: 50vh;
            height: 100%;
            background: #fffffff2;
            padding: 10px;
            color: #110101;
            border-radius: 10px;
            box-shadow: 0 2px 4px 0 rgba(141, 138, 138, 0.688);
            display: flex;
            place-items: center;
            flex-direction: column;
            justify-content: center;
          }
        `}
      </style>
    </>
  );
};

export default ThanksExpoPage;
