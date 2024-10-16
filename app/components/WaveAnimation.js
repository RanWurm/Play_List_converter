"use client"

import React from 'react';

const WaveAnimation = () => (
  <div className="wave-container">
    {[...Array(40)].map((_, index) => (
      <div key={index} className="wave-bar" style={{ '--i': index }} />
    ))}
    <style jsx>{`
      .wave-container {
        display: flex;
        align-items: flex-end;
        height: 100px;
        width: 100%;
        
      }
      .wave-bar {
        flex-grow: 1;
        background-color: #3b82f6;
        margin: 0 1px;
        animation: wave 1.2s ease-in-out infinite;
        animation-delay: calc(0.1s * var(--i));
      }
      @keyframes wave {
        0%, 100% { height: 20%; }
        50% { height: 80%; }
      }
    `}</style>
  </div>
);

export default WaveAnimation;