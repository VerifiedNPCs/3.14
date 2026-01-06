// src/hooks/useCryptoPrice.js
import { useState, useEffect, useRef } from 'react';

export const useCryptoPrice = (symbol) => {
  const [price, setPrice] = useState('---');
  const [change, setChange] = useState('0.00'); // New state for % change
  const [color, setColor] = useState('text-white');
  const ws = useRef(null);

  useEffect(() => {
    // We use the @ticker stream which gives price (c) and percentage (P)
    // Note: 'c' = current price, 'P' = price change percent
    const url = `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@ticker`;
    
    ws.current = new WebSocket(url);

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.c) {
        const currentPrice = parseFloat(data.c).toFixed(2);
        const percentChange = parseFloat(data.P).toFixed(2);
        
        setChange(percentChange);
        
        setPrice((prev) => {
          if (prev !== '---') {
              const numCurrent = parseFloat(currentPrice);
              const numPrev = parseFloat(prev);
              if (numCurrent > numPrev) setColor('text-primary'); // Green
              else if (numCurrent < numPrev) setColor('text-red-500'); // Red
              else setColor('text-white');
              
              setTimeout(() => setColor('text-white'), 1000);
          }
          return currentPrice;
        });
      }
    };

    return () => {
      if (ws.current) ws.current.close();
    };
  }, [symbol]);

  return { price, change, color };
};
