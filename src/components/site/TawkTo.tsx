'use client';

import Script from 'next/script';

/**
 * Chat en direct Tawk.to (propriété auditresto360).
 * Chargé après l'hydratation (strategy afterInteractive) pour ne pas pénaliser le LCP.
 */
export function TawkTo() {
  return (
    <Script id="tawkto" strategy="afterInteractive">
      {`
        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        (function(){
          var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
          s1.async=true;
          s1.src='https://embed.tawk.to/6a3beda137254e1d4584b8d1/1jrt1gfuk';
          s1.charset='UTF-8';
          s1.setAttribute('crossorigin','*');
          s0.parentNode.insertBefore(s1,s0);
        })();
      `}
    </Script>
  );
}
