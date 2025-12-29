import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {imageKitLoader} from '@/helper/Helper';
const MainDeveloper = () => {
  const data = [
    {
      name: 'EMAAR',
      logo:'/developer/1688454297833-emmar.png'
    },
    {
      name: 'SOBHA REALTY',
      logo:'/developer/1690529808778-images (2).png'
    },
    {
      name: 'DANUBE',
      logo:'/developer/1690527186397-download (3).png'
    },
    {
      name: 'BINGHATTI',
      logo:'/developer/1688454297830-binghatti.png'
    },
    {
      name: 'DUBAI PROPERTIES',
      logo:'/developer/1690528922189-Dubai-Properties-Logo.png'
    },
    {
      name: 'DAMAC',
      logo:'/developer/1688454297831-damac.png'
    },
    {
      name: 'Vincitore',
      logo:'/developer/1697798900747_467f26d8-e31c-43e6-a6cb-870afa780d9e.png'
    },
    {
      name: 'Deyaar',
      logo:'/developer/1690528791229-Deyaar_-01 (1).png'
    },
  ];
  return (
    <>
      <div className='container'>
        <div className='row'>
            <div className='col-md-12 text-center'>
            <h2 className='title_about'>{`Meet Dubai’s Top Developers At Hyderabad Expo`}</h2>
            <p>
              {`The biggest names in Dubai development will be present at our expo, like Emaar, Nakheel, Sobha, Damac, Danube, Vincitore, and many more! Don't miss this chance to meet the movers & shakers of Dubai's iconic skyline.`}
            </p>
            </div>
            {data && data.map((item, index) => (
            <div className={`col-md-3 text-center developer_card`} key={index}>
                <Image loader={imageKitLoader} className="mx-auto img-fluid" src={`${item.logo}`} alt={`${item.name}`} width={150} height={100}/>
            </div>
            ))}
            <div className='col-md-12 text-center my-3'>
            <Link href={'/expo-invitation'} className='btns btn-orange' >Book Your Free VIP Pass →</Link>
          </div>
        </div>
      </div>
      <style jsx>
      {`
       .title_about {
            font-size: 3rem;
            margin: 1rem;
            text-transform: capitalize;
            font-weight: bold;
        }
        .developer_card{
            background:var(--color-1);
            padding: 10px;
            border: 12px solid var(--brand-color-1);
            display: flex!important;
            justify-content: center;
            align-items: center;
        }
        @media (max-width: 550px) {
              .title_about {
                  font-size: 1.5rem;
                  margin: 1rem;
              }
          }
      `}
      </style>
    </>
  )
}

export default MainDeveloper
