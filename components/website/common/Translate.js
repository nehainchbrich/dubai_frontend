import { useEffect, useState } from 'react';

const Translate = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(script);

      // Define the function for Google Translate initialization
      window.googleTranslateElementInit = function () {
        console.log('Google Translate initialized successfully.'); // Log success
        new window.google.translate.TranslateElement(
          { pageLanguage: 'en', layout: window.google.translate.TranslateElement.InlineLayout.VERTICAL },
          'google_translate_element'
        );
      };

      script.onerror = () => {
        console.error('Error loading Google Translate script.'); // Log error if script fails to load
      };

      return () => {
        // Clean up: Remove the script when the component unmounts
        document.body.removeChild(script);
        // Remove the function reference from the window object
        delete window.googleTranslateElementInit;
      };
    }
  }, [isClient]);

  if (!isClient) {
    return null; // Render nothing on the server-side
  }

  return <div id="google_translate_element" />;
};

export default Translate;
