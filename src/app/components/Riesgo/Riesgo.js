"use client"; // Añadir esta línea al principio del archivo

import { useEffect, useRef, useState } from 'react';
import { getRiskService } from '../../services/riskServise';
// ESTA BASADO EN COTIZACIONES ; FALTA CAMBIAR VARIABLES

export default function Riesgo() {
  const [dollarRates, setDollarRates] = useState([]);
  const intervalRef = useRef(null);

  // Función para obtener las tasas del dólar
  const fetchDollarRates = async () => {
    try {
      const rates = await getRiskService();
      if (rates) {
        setDollarRates(rates);
      }
    } catch (error) {
      console.error("Error fetching dollar rates:", error);
    }
  };

  useEffect(() => {
    // Llamada inicial
    fetchDollarRates();

    // Configurar el intervalo para cada 10 minutos (600000 ms)
    intervalRef.current = setInterval(fetchDollarRates, 600000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []); // Solo ejecutar en el montaje del componente

  // Función para determinar si los datos han cambiado


  if (!dollarRates) {
    return <p style={{ textAlign: 'center' }}>Cargando riesgo...</p>;
  }

  return (
          <div
            style={{
              marginTop: '1rem',
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '1rem',
              marginBottom: '1rem',
              backgroundColor: '#f4f4f4', // Resaltar cambios con un color de fondo verde claro
              transition: 'background-color 0.5s', // Transición suave para el cambio de color
            }}
          >
            <strong>riesgo pais</strong>
            <p><strong>Compra:</strong> {dollarRates.valor}</p>
            <p><strong></strong> {new Date(dollarRates.fecha).toLocaleString()}</p>
          </div>
  );
}
