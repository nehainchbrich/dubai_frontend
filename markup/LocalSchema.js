import { useRouter } from 'next/router';
const LocalSchema = () => {
    const router = useRouter();
    const schema={
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Inch & Brick Realty",
        "image": "https://cdn.inchbrick.com/banner/1702113169018_f266491b-ccdc-47f4-95e7-207a46fa4892.jpg",
        "@id": "https://inchbrick.com/",
        "url": "https://inchbrick.com/",
        "telephone": "971547614449",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Office 1303,1302 13th floor, Burlington Tower Business Bay, Dubai, United Arab Emirates",
          "addressLocality": "Dubai",
          "postalCode": "62638",
          "addressCountry": "AE"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 25.18503697532039,
          "longitude": 55.26428078109939
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          "opens": "10:00",
          "closes": "18:00"
        },
        "sameAs": [
          "https://www.facebook.com/inchbrick.realestate",
          "https://twitter.com/inchbrick",
          "https://www.instagram.com/inchbrick/",
          "https://www.youtube.com/@inchbrick934",
          "https://www.linkedin.com/company/inchbrick-internationalrealestatecompany/mycompany/",
          `https://inchbrick.com${router.asPath}`
        ] 
      
    }
  return schema
}

export default LocalSchema
