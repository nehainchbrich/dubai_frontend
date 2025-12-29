import React, { useEffect, useState } from 'react';
import Website from '../layouts/website';
import CommonBanner from '@/components/website/common/CommonBanner';
import Image from 'next/image';
import { currencyConverter, imageKitLoader } from '@/helper/Helper';
import Link from 'next/link';
import { useCurrency } from '@/context/CurrencyProvider';
import { fetchData } from '@/config/fetchApi';
import API_URLS from '@/config/apiconfig';

const Index = ({meta}) => {
  const { currency } = useCurrency();
  const [compareData, setCompareData] = useState([]);
  const [convertedData, setConvertedData] = useState([]);

  useEffect(() => {
    const storedProperties = JSON.parse(localStorage.getItem('compareData')) || [];
    setCompareData(storedProperties);
  }, []);

  useEffect(() => {
    const handleCurrencyConversion = async () => {
      try {
        const updatedCompareData = [];
        for (const property of compareData) {
          let convertedPrice = '';
          if (!isNaN(parseFloat(property.minAmount))) { // Check if amount is a valid number
            convertedPrice = await currencyConverter(property.minAmount, currency);
            if (property.is_rental == 1 && property.minAmount != null) {
              convertedPrice = `${convertedPrice}/${property.rental_type}`;
            }
          }
          const updatedProperty = { ...property, convertedPrice };
          updatedCompareData.push(updatedProperty);
        }
        setConvertedData(updatedCompareData);
      } catch (error) {
        console.error(error);
      }
    };

    handleCurrencyConversion(); // Call handleCurrencyConversion whenever compareData changes
  }, [compareData, currency]); // Depend on compareData and currency
  return (
    <>
      <CommonBanner title="Compare Properties" meta={meta}/>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12 my-5'>
            { convertedData.length > 0 ? (
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Thumbnails</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Developer</th>
                      <th>City</th>
                      <th>Amenities</th>
                      {/* <th>Area (Sq.Ft)</th>
                      <th>Bedroom</th> */}
                      <th>Type</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {convertedData.map((property, index) => (
                      <tr key={index}>
                        <td><Image loader={imageKitLoader} src={property.thumbnail} width={80} height={80} alt={property.title}/></td>
                        <td>{property.title}</td>
                        <td>{property.convertedPrice ? ( // Check if convertedPrice is available
                          <>{property.convertedPrice}</>
                        ) : (
                          <Link href="#" className='simple-btn' data-bs-toggle="modal" data-bs-target="#inquiryModal"><p>Ask for Price →</p></Link>
                        )}</td>
                        <td>{property.developerName}</td>
                        <td>{property.city}</td>
                        <td>{property.amenities.split(';').map(entry => entry.split('|')[0]).join(' ,')}</td>
                        {/* <td>{property.area}</td>
                        <td>{property.bedroom}</td> */}
                        <td>{property.pTypeName}</td>
                        <td className='text-center'><Link href={`/properties/${property.slug}`}><i className="fa-solid fa-share"></i></Link> | <i className="text-danger fa-solid fa-trash simple-btn" onClick={() => removeProperty(index)}></i></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ): (
              <>
                <h4 className='text-center'>Please select properties to compare.</h4>
                <div className='text-center'><Link className='btns btn-orange'  href={'/buy-property-in-dubai'}>Add Property →</Link></div>
              </>
            )}
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .table{
            color:var(--color-1);
          }
        `}
      </style>
    </>
  );

  function removeProperty(index) {
    const updatedProperties = [...compareData];
    updatedProperties.splice(index, 1);
    setCompareData(updatedProperties);
    localStorage.setItem('compareData', JSON.stringify(updatedProperties));
  }
};

export default Index;

Index.getLayout = function getLayout(page) {
  const  {props} = page;
  return <Website meta={props.meta}>{page}</Website>;
};
export async function getStaticProps() {
    const meta = await fetchData(API_URLS.META,{slug:'property-compare',columns: 'title,description,thumbnail,slug'});
    return {
      props:{meta:meta.data[0] || null},revalidate: 60
    }
  }