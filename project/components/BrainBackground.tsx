'use client';

import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

const STAR_COLORS = ['#fff', '#E92EFB', '#8ecaff'];
const STAR_COUNT = 40;

function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function RainingStars() {
  // Generate star configs only once
  const stars = useMemo(() => Array.from({ length: STAR_COUNT }, (_, i) => ({
    id: i,
    left: getRandom(0, 100),
    size: getRandom(2, 5),
    duration: getRandom(3, 7),
    delay: getRandom(0, 5),
    color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
    opacity: getRandom(0.5, 1),
  })), []);

  return (
    <>
      {stars.map(star => (
        <motion.div
          key={star.id}
          initial={{ top: '-5%', opacity: 0 }}
          animate={{ top: '105%', opacity: [0, star.opacity, 0] }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            left: `${star.left}%`,
            width: star.size,
            height: star.size,
            borderRadius: '50%',
            background: star.color,
            boxShadow: `0 0 12px 4px ${star.color}`,
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
      ))}
    </>
  );
}

export default function BrainBackground() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: -1,
      pointerEvents: 'none',
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(120deg, rgba(40,0,80,0.12) 0%, rgba(255,32,121,0.10) 100%)',
    }}>
      {/* Raining Stars Layer */}
      <RainingStars />
      {/* Canvas and 3D box removed as per user request */}
      {/* Black Neon Lightning SVG with animation removed as per user request */}
    </div>
  );
} 