import Script from "next/script";
const AdSense = () => {
    return (
      <Script
      async
      src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=pub-8737844615082936'
      crossOrigin="anonymous"
      strategy="afterInteractive"
      />
    )
};

export default AdSense;
