"use client";

import { useEffect } from "react";

const AdBanner = ({
  dataAdFormat,
  dataFullWidthResponsive,
}) => {
  useEffect(() => {
    const loadAdSenseScript = () => {
      return new Promise((resolve, reject) => {
        if (typeof window !== 'undefined') {
          // Verifica si el script ya está en el DOM
          const existingScript = document.querySelector('script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]');
          
          if (existingScript) {
            resolve();
            return;
          }

          const script = document.createElement('script');
          script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
          script.async = true;

          script.onload = () => resolve();
          script.onerror = (error) => reject(new Error('Failed to load AdSense script: ' + error.message));

          document.body.appendChild(script);
        } else {
          reject(new Error('Window is not defined'));
        }
      });
    };

    const initializeAdSense = async () => {
      try {
        await loadAdSenseScript();
        // Ejecuta adsbygoogle.push solo después de que el script esté cargado
        const adsbygoogle = window.adsbygoogle || [];
        
        // Verifica si ya hay un anuncio en el elemento
        const adElements = document.querySelectorAll('.adsbygoogle');
        adElements.forEach(el => {
          if (!el.hasAttribute('data-ad-status')) {
            // Solo empuja si el elemento no tiene el atributo data-ad-status
            adsbygoogle.push({});
            el.setAttribute('data-ad-status', 'initialized');
          }
        });
      } catch (error) {
        console.error('Error initializing AdSense:', error.message);
      }
    };

    initializeAdSense();

  }, []); // Dependencias vacías para que el efecto se ejecute solo una vez

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-slot="5171626815"
      data-ad-format={dataAdFormat}
      data-full-width-responsive={dataFullWidthResponsive ? "true" : "false"}
    ></ins>
  );
};

export default AdBanner;
