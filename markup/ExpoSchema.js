const ExpoSchema ={
 "@context": "https://schema.org",
    "@type": "ExhibitionEvent",
    "name": "Dubai Property Expo 2025 - Hyderabad Edition",
    "alternateName": "Inch & Brick Dubai Property Expo 2025",
    "description":
      "Dubai Property Expo 2025 in Hyderabad by Inch & Brick Realty partnered with Sobha. Discover premium Dubai real estate investment opportunities, exclusive projects, and expert consultations. Free entry, but registration is mandatory.",
    "keywords": [
      "Dubai Property Expo",
      "Real Estate Exhibition Hyderabad",
      "Dubai Investment Expo",
      "Inch & Brick Realty",
      "Sobha Properties",
      "Dubai Property Expo Hyderabad",
      "Dubai Property Show Hyderabad",
      "Dubai Property Show in Hyderabad",
      "Dubai Expo Hyderabad",
    ],
    "startDate": "2025-10-04T10:00:00+05:30",
    "endDate": "2025-10-05T22:00:00+05:30",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventType": "RealEstateExhibition",
    "location": {
      "@type": "Place",
      "name": "The Westin Mindspace, Hyderabad",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "The Westin Mindspace",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "addressCountry": "IN",
      },
    },
    "organizer": {
      "@type": "Organization",
      "name": "Inch & Brick Realty with Sobha",
      "url": "https://inchbrick.com/",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+971547614449",
          "contactType": "customer support",
        },
        {
          "@type": "ContactPoint",
          "telephone": "+918178652086",
          "contactType": "customer support",
        },
      ],
      "sameAs": [
        "https://www.instagram.com/inchbrickrealestateinvestment/",
      ],
    },
    "offers": {
      "@type": "Offer",
      "url": "https://inchbrick.com/",
      "price": "0",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "validFrom": "2025-08-21T00:00:00+05:30",
      "description": "Free entry, registration is mandatory",
    },
    "subjectOf": {
      "@type": "Thing",
      "name": "Dubai Real Estate Investments",
      "description":
        "Exclusive Dubai property showcase in Hyderabad, including luxury apartments, villas, and investment opportunities in prime Dubai locations.",
    },
}
export default ExpoSchema