"use client"; // Añadir esta línea al principio del archivo

import { useEffect, useRef, useState } from 'react';
import { getDollarRates } from '../../services/dollarService';

export default function Cotizaciones() {
  const [dollarRates, setDollarRates] = useState([]);
  const [previousRates, setPreviousRates] = useState([]);
  const intervalRef = useRef(null);

  // Función para obtener las tasas del dólar
  const fetchDollarRates = async () => {
    try {
      const rates = await getDollarRates();
      if (rates) {
        setPreviousRates(dollarRates); // Guarda las tasas actuales antes de actualizarlas
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
  const hasChanged = (rate) => {
    const previousRate = previousRates.find(r => r.casa === rate.casa);
    return previousRate && (previousRate.compra !== rate.compra || previousRate.venta !== rate.venta);
  };

  if (dollarRates.length === 0) {
    return <p style={{ textAlign: 'center' }}>Cargando cotizaciones...</p>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', gap: '1rep' }}>
      {dollarRates.map((rate, index) => {
        const isChanged = hasChanged(rate);

        return (
          <div
            key={index}
            style={{
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '15px',
              marginBottom: '15px',
              backgroundColor: isChanged ? '#dff0d8' : '#f4f4f4', // Resaltar cambios con un color de fondo verde claro
              transition: 'background-color 0.5s', // Transición suave para el cambio de color
            }}
          >
            <p><strong>Nombre:</strong> {rate.nombre}</p>
            <p><strong>Compra:</strong> {rate.compra}</p>
            <p><strong>Venta:</strong> {rate.venta}</p>
            <p><strong>Fecha Actualización:</strong> {new Date(rate.fechaActualizacion).toLocaleString()}</p>
          </div>
        );
      })}
    </div>
  );
}
