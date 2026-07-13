import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

const AnimatedCounter = ({ value, duration = 1.5 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseInt(value, 10);
    if (isNaN(end)) {
      setCount(value);
      return;
    }
    
    if (start === end) return;

    const totalFrames = 60;
    const frameDuration = (duration * 1000) / totalFrames;
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      // Ease out quad animation formula
      const progress = frame / totalFrames;
      const easeProgress = progress * (2 - progress);
      const currentCount = Math.round(easeProgress * end);

      if (frame >= totalFrames) {
        clearInterval(counter);
        setCount(end);
      } else {
        setCount(currentCount);
      }
    }, frameDuration);

    return () => clearInterval(counter);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

export default AnimatedCounter;
