import Script from "next/script";
const AdSense = () => {
    return (
      <Script
      async
      src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8737844615082936'
      crossOrigin="anonymous"
      strategy="lazyOnload"
      />
    )
};

export default AdSense;
