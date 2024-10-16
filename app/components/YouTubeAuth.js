// app/components/YouTubeAuth.js
import React, { useEffect } from 'react';
import { FaYoutube } from 'react-icons/fa';

const YouTubeAuth = () => {
  const handleYouTubeAuth = () => {
    const clientId = process.env.NEXT_PUBLIC_YOUTUBE_CLIENT_ID;
    const redirectUri = `${window.location.origin}/callback`; // Ensure this is correct
    const scopes = 'https://www.googleapis.com/auth/youtube.force-ssl';

    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}&response_type=token&state=youtube`;

    
    window.location.href = authUrl; // Redirect user to YouTube for authentication
  };


  return (
    <button
      onClick={handleYouTubeAuth}
      className="flex items-center justify-center w-full bg-gray-800 hover:bg-gray-700 text-gray-100 font-semibold py-2 px-4 rounded-md shadow transition duration-300 ease-in-out transform hover:scale-105 border border-gray-700"
    >
      <FaYoutube className="mr-2 text-red-600 text-xl" />
      <span>Connect YouTube</span>
    </button>
  );
};

export default YouTubeAuth;
