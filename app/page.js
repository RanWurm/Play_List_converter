import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Head from 'next/head';
import { Music, Youtube, ArrowRight } from 'lucide-react';

const WaveAnimation = dynamic(() => import('./components/WaveAnimation.js'), { ssr: false });

export default function Home() {
  return (
    <>
          <Head>
        <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
        <title>Spotify to YouTube - Transfer Playlists Easily</title>
        {/* You can add more head elements here if needed */}
      </Head>

    <main className="min-h-screen w-screen overflow-hidden bg-gray-900 text-gray-100 flex flex-col relative">
      <div className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative z-10">
        <div className="w-full max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
            Spotify to YouTube
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-center mb-12 text-gray-300">
            Transfer your favorite playlists with ease
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
            <Link href="/converter" className="group">  
              <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group-hover:bg-gradient-to-br from-purple-800 to-pink-700">
                <Music className="w-12 h-12 mb-4 text-purple-400 group-hover:text-white transition-colors duration-300" />
                <h2 className="text-2xl font-semibold mb-4 text-purple-300 group-hover:text-white transition-colors duration-300">
                  Start Converting
                </h2>
                <p className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                  Transfer your Spotify playlists to YouTube in just a few clicks
                </p>
                <ArrowRight className="w-6 h-6 mt-4 text-purple-400 group-hover:text-white transition-all duration-300 transform group-hover:translate-x-2" />
              </div>
            </Link>

            <a
              href="https://bingen.onrender.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group-hover:bg-gradient-to-br from-pink-800 to-red-700">
                <Youtube className="w-12 h-12 mb-4 text-pink-400 group-hover:text-white transition-colors duration-300" />
                <h2 className="text-2xl font-semibold mb-4 text-pink-300 group-hover:text-white transition-colors duration-300">
                  AI Playlist Generator
                </h2>
                <p className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                  Let our AI create a personalized playlist just for you
                </p>
                <ArrowRight className="w-6 h-6 mt-4 text-pink-400 group-hover:text-white transition-all duration-300 transform group-hover:translate-x-2" />
              </div>
            </a>
          </div>
        </div>

        <footer className="text-center text-gray-500 w-full mt-auto">
          <p className="text-sm">© 2024 Playlist Transfer Tool. All rights reserved.</p>
          <Link href="/privacy-policy" className="text-sm text-purple-400 hover:text-purple-300 transition-colors duration-300 mt-2 inline-block">
            Privacy Policy
          </Link>
        </footer>
      </div>
      
      <div className="absolute inset-0 z-0 opacity-20">
        <WaveAnimation />
      </div>
    </main>
    </>
  );
}