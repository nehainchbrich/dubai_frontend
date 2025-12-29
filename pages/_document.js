import ExpoSchema from '@/markup/ExpoSchema';
import WebsiteSchema from '@/markup/WebsiteSchema';
import { Html, Head, Main,NextScript } from 'next/document';
import Script from 'next/script';
const Document = () => {
  return (
    <Html lang="en">
      <Head>
      <link rel="icon" href={`${process.env.API_URL}/common/favicon.ico`} />
      <link rel="manifest" href="/manifest.json" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css"/>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.1.4/dist/sweetalert2.min.css" />
      <script dangerouslySetInnerHTML={{__html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '257222173947869');
              fbq('track', 'PageView');
            `,
            }}
          />
      <noscript>
        <img height="1"  width="1" style={{ display: 'none' }} src="https://www.facebook.com/tr?id=257222173947869&ev=PageView&noscript=1"/>
      </noscript>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WebsiteSchema)}}/>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ExpoSchema)}}/>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=G-B6W6XEVCWN`} defer />
      <script strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-B6W6XEVCWN');
          `,
        }}
      />
      <Script src={`https://www.googletagmanager.com/gtag/js?id=AW-11329483513`} defer />
      <script strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-11329483513');
          `,
        }}
      />
      <script strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            gtag('event', 'conversion', {'send_to': 'AW-11329483513/HuKvCNb1leEYEPnlqJoq'});
          `,
        }}
      />
      <script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5DHVMMKK');
          `,
        }}
      />
      <script src="https://code.jquery.com/jquery-3.6.0.min.js" defer></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" defer></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js" defer></script>
      <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.1.4/dist/sweetalert2.all.min.js" defer></script>
      {/* Google Tag Manager */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PZ92L7KP');`,
            }}
          />
          {/* End Google Tag Manager */}
    </Head>
      <body>
        {/* Google Tag Manager (noscript) */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-PZ92L7KP"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>
          {/* End Google Tag Manager (noscript) */}
        <Main/>
        <NextScript/>
        <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5DHVMMKK" height="0" width="0" style="display:none;visibility:hidden"></iframe>`}}></noscript>
      </body>
    </Html>
  )
}

export default Document

