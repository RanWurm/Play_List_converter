"use client"
import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Dynamically import the WaveAnimation with no SSR
const WaveAnimation = dynamic(() => import('./components/WaveAnimation.js'), { ssr: false });

export default function Home() {
  return (
    <main className="h-screen w-screen overflow-hidden bg-gray-900 text-gray-100 flex flex-col relative">
      <div className="flex-grow flex flex-col items-center justify-between p-4 sm:p-6 lg:p-8">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-2 sm:mb-4 text-blue-400">
            Welcome to My Dark-Themed Website
          </h1>
          <p className="text-sm sm:text-base lg:text-xl text-center mb-4 sm:mb-6 text-gray-300">
            This is a sample page with a dark color scheme and vertical wave animation at the bottom.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 my-4 sm:my-6 w-full max-w-4xl">
          <Link href="/converter" className="block">  
            <button className="w-full h-full bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-300 text-left flex flex-col justify-between">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 sm:mb-4 text-blue-300">Converter</h2>
              <p className="text-sm sm:text-base text-gray-400">Click here to go to the converter page</p>
            </button>
          </Link>

          <Link href="https://bingen.onrender.com" target="_blank" rel="noopener noreferrer" className="block">
            <button className="w-full h-full bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-300 text-left flex flex-col justify-between">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 sm:mb-4 text-blue-300">Dont have a playlist yet?</h2>
              <p className="text-sm sm:text-base text-gray-400">Here you can have an AI generate playlist for you</p>
            </button>
          </Link>
        </div>

        <footer className="text-center text-gray-500 w-full">
          <p className="text-xs sm:text-sm">© 2024 Your Company Name. All rights reserved.</p>
        </footer>
      </div>
      
      <div className="w-full">
        <WaveAnimation />
      </div>
    </main>
  );
}
