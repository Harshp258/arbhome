import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from '@/styles/BeforeAfterSlider.module.css';

const BeforeAfterSlider = ({ beforeImage, afterImage, alt }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percent = (x / rect.width) * 100;
      setSliderPosition(Math.min(Math.max(percent, 0), 100));
    }
  };

  const handleTouchMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const percent = (x / rect.width) * 100;
      setSliderPosition(Math.min(Math.max(percent, 0), 100));
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMove);
      container.addEventListener('touchmove', handleTouchMove);
    }
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMove);
        container.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, []);

  return (
    <div className={styles.sliderWrapper}>
      <div className={styles.sliderContainer} ref={containerRef}>
        <div className={styles.imageContainer}>
          <Image 
            src={afterImage} 
            alt={`${alt} - After`} 
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div 
          className={styles.imageContainer} 
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image 
            src={beforeImage} 
            alt={`${alt} - Before`} 
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div 
          className={styles.slider} 
          style={{ left: `${sliderPosition}%` }}
        >
          <div className={styles.sliderButton} />
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;