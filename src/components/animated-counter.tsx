"use client";

import { useEffect, useState, useRef } from 'react';

type AnimatedCounterProps = {
  value: number;
};

export function AnimatedCounter({ value }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const prevValueRef = useRef(0);

  useEffect(() => {
    const startValue = prevValueRef.current;
    const endValue = value;
    const duration = 500; // ms
    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (startTime === null) {
        startTime = currentTime;
      }
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      const newDisplayValue = Math.floor(startValue + (endValue - startValue) * progress);
      setDisplayValue(newDisplayValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(endValue);
        prevValueRef.current = endValue;
      }
    };

    requestAnimationFrame(animate);
    
    // On unmount, make sure the final value is set
    return () => {
        prevValueRef.current = value;
    };
  }, [value]);

  return <span>{displayValue}</span>;
}
