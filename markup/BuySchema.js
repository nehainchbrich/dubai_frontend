export const BuySchema =
{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are some popular areas to buy property in Dubai?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Some popular areas to buy property in Dubai include Downtown Dubai, Palm Jumeirah, Dubai Marina, Arabian Ranches, and Dubai Creek Harbour."
        }
      },
      {
        "@type": "Question",
        "name": "What are the advantages of buying property in Dubai?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Advantages include eligibility for residency visas, potential for high returns on investment, tax-friendly environment, and affordable property prices compared to other major cities."
        }
      },
      {
        "@type": "Question",
        "name": "What is the process for buying property in Dubai?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The process involves steps such as finding a property, making an offer, completing the necessary paperwork, and registering the property with the Dubai Land Department."
        }
      },
      {
        "@type": "Question",
        "name": "Are there any legal restrictions for foreigners to buy property in Dubai?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, there are no legal restrictions for foreigners to buy property in Dubai. Several prominent freehold districts are open to foreigners, including Arabian Ranches, Palm Jumeirah, Dubai Marina, and Downtown Dubai."
        }
      },
      {
        "@type": "Question",
        "name": "What are the potential returns on investment for buying property in Dubai?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The potential returns on investment vary depending on factors such as property location, type, and market conditions. Rental yields for long-term leases range from 5-8% per annum, while short-term leases can yield 11-13% per annum."
        }
      },
      {
        "@type": "Question",
        "name": "What are the residency visa options for property buyers in Dubai?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Property buyers in Dubai are eligible for residency visas. Properties worth AED 750,000 (US$204,000) or more qualify for a three-year residency visa, while properties exceeding 2 million dirhams (US$544,500) allow investors to apply for a 10-year golden visa granting permanent residency in Dubai."
        }
      },
      {
        "@type": "Question",
        "name": "Is it necessary to be physically present to buy property in Dubai?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, it is not necessary to be physically present to buy property in Dubai. Transactions can be completed remotely, and agencies like Inch & Brick Realty can assist with all necessary paperwork."
        }
      },
      {
        "@type": "Question",
        "name": "What are the advantages of investing in Dubai real estate during the construction phase?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Investing in real estate during the construction phase allows for potential profits of 20-30% upon completion. Buyers pay an initial deposit and then pay the balance in installments according to an approved schedule, with some projects offering payment only after the building is operational."
        }
      }
    ]
}

export const generateProductSchema = (products) => {
  if (!products || products.length === 0) {
    // Return an empty schema if products array is null or empty
    return {
      "@context": "https://schema.org/",
      "@type": "ItemList",
      "name": "Buy Property in Dubai",
      "url": "https://inchbrick.com/buy-property-in-dubai",
      "itemListElement": []
    };
  }

  return {
    "@context": "https://schema.org/",
    "@type": "ItemList",
    "name": "Buy Property in Dubai",
    "url": "https://inchbrick.com/buy-property-in-dubai",
    "itemListElement": products.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url":`https://inchbrick.com/properties/${product.slug}`,
      "name": product.title,
      "description": product.shortDesc,
      "image":`https://cdn.inchbrick.com${product.thumbnail}`
    }))
  };
};