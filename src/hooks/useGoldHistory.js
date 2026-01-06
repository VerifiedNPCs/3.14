// src/hooks/useGoldHistory.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useGoldHistory = () => {
  const [chartPath, setChartPath] = useState('');
  const [isUp, setIsUp] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Fetch 30 days of data for PAX Gold (Gold-backed crypto)
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/pax-gold/market_chart?vs_currency=usd&days=30&interval=daily'
        );
        
        const prices = response.data.prices.map(p => p[1]);
        
        // Calculate SVG Path
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        const range = max - min;
        
        // Normalize to 100x40 box (SVG viewbox)
        const points = prices.map((price, index) => {
          const x = (index / (prices.length - 1)) * 100;
          const y = 40 - ((price - min) / range) * 40; // Invert Y because SVG 0 is top
          return `${x},${y}`;
        });

        // Create Path String
        const pathD = `M ${points.join(' L ')}`;
        setChartPath(pathD);
        
        // Determine trend
        setIsUp(prices[prices.length - 1] > prices[0]);

      } catch (error) {
        console.error("Failed to fetch gold history", error);
      }
    };

    fetchHistory();
  }, []);

  return { chartPath, isUp };
};
