const WebsiteSchema ={
    "@context": "https://schema.org/",
    "@type": "WebSite",
    "name": "Inchbrick",
    "url": "https://inchbrick.com/",
   "potentialAction": [
    {
      "@type": "SearchAction",
      "target": "https://inchbrick.com/off-plan-properties-in-dubai?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    {
      "@type": "SearchAction",
      "target": "https://inchbrick.com/events?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  ]
}
export default WebsiteSchema