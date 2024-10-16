"use client"

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Callback = () => {
  const router = useRouter();

  useEffect(() => {
    // Get the access tokens from the URL
    const hash = window.location.hash;

    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get('access_token');
      const state = params.get('state');

      if (token && state) {
        if (state === 'spotify') {
          localStorage.setItem('spotify_token', token);
        } else if (state === 'youtube') {
          localStorage.setItem('youtube_token', token);
        }
        // Redirect to the converter page
        router.push('/converter');
      } else {
        // Handle the case where no token or state is found
        console.error('No token or state found in URL');
        router.push('/'); // Redirect to home or error page
      }
    } else {
      // Handle the case where no hash is present
      console.error('No hash present in URL');
      router.push('/'); // Redirect to home or error page
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-gray-100">
      <h1 className="text-3xl">Authenticating...</h1>
    </div>
  );
};

export default Callback;
