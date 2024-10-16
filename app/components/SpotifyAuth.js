"use client"
import React from 'react';
import { FaSpotify } from 'react-icons/fa';

const SpotifyAuth = () => {
  const handleSpotifyAuth = () => {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const redirectUri = `${window.location.origin}/callback`;
    const scopes = 'playlist-read-private';

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}&response_type=token&state=spotify`;

    
    window.location.href = authUrl;
  };

  return (
    <button
      onClick={handleSpotifyAuth}
      className="flex items-center justify-center w-full bg-gray-800 hover:bg-gray-700 text-gray-100 font-semibold py-2 px-4 rounded-md shadow transition duration-300 ease-in-out transform hover:scale-105 border border-gray-700"
    >
      <FaSpotify className="mr-2 text-green-600 text-xl" />
      <span>Connect Spotify</span>
    </button>
  );
};

export default SpotifyAuth;