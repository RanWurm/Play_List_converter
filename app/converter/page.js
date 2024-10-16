"use client";
import React, { useState, useEffect } from 'react';
import SpotifyAuth from '../components/SpotifyAuth';
import YouTubeAuth from '../components/YouTubeAuth';
import dynamic from 'next/dynamic';

const WaveAnimation = dynamic(() => import('../components/WaveAnimation'), { ssr: false });

export default function ConverterPage() {
  const [playlists, setPlaylists] = useState([]);
  const [debugInfo, setDebugInfo] = useState("");
  const [isConverting, setIsConverting] = useState({});

  const fetchSpotifyPlaylists = async () => {
    const token = localStorage.getItem('spotify_token');
    try {
      const response = await fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPlaylists(data.items);
      } else {
        setDebugInfo('Failed to fetch playlists from Spotify.');
      }
    } catch (error) {
      setDebugInfo(`Error fetching Spotify playlists: ${error.message}`);
    }
  };
  
  const addVideoToYouTubePlaylist = async (searchQuery, playlistId, youtubeToken) => {
	try {
	  // Step 2a: Search for the video on YouTube
	  const searchResponse = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(searchQuery)}&maxResults=1`, {
		headers: {
		  Authorization: `Bearer ${youtubeToken}`,
		  'Content-Type': 'application/json',
		},
	  });
  
	  if (!searchResponse.ok) {
		throw new Error('Failed to search for video on YouTube.');
	  }
  
	  const searchData = await searchResponse.json();
	  const videoId = searchData.items[0]?.id?.videoId;
  
	  if (!videoId) {
		console.warn(`No video found for query: ${searchQuery}`);
		return;
	  }
  
	  // Step 2b: Add the video to the YouTube playlist
	  const addVideoResponse = await fetch('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet', {
		method: 'POST',
		headers: {
		  Authorization: `Bearer ${youtubeToken}`,
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify({
		  snippet: {
			playlistId: playlistId,
			resourceId: {
			  kind: 'youtube#video',
			  videoId: videoId,
			},
		  },
		}),
	  });
  
	  if (!addVideoResponse.ok) {
		throw new Error('Failed to add video to YouTube playlist.');
	  }
	} catch (error) {
	  console.error(`Error adding video to YouTube playlist: ${error.message}`);
	}
  };
  
  
  const createYouTubePlaylist = async (playlistName, playlistId) => {
	setIsConverting(prev => ({ ...prev, [playlistId]: true }));
	const youtubeToken = localStorage.getItem('youtube_token');
	const spotifyToken = localStorage.getItem('spotify_token');
  
	try {
	  // Step 1: Fetch tracks from the Spotify playlist
	  const tracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
		headers: {
		  Authorization: `Bearer ${spotifyToken}`,
		},
	  });
  
	  if (!tracksResponse.ok) {
		throw new Error('Failed to fetch tracks from Spotify playlist.');
	  }
  
	  const tracksData = await tracksResponse.json();
	  const tracks = tracksData.items;
  
	  // Step 2: Create a new YouTube playlist
	  const playlistResponse = await fetch('https://www.googleapis.com/youtube/v3/playlists?part=snippet,status', {
		method: 'POST',
		headers: {
		  Authorization: `Bearer ${youtubeToken}`,
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify({
		  snippet: {
			title: playlistName,
			description: 'Converted from Spotify',
		  },
		  status: {
			privacyStatus: 'unlisted', // or 'public' if you prefer
		  },
		}),
	  });
  
	  if (!playlistResponse.ok) {
		const errorData = await playlistResponse.json();
		throw new Error(`Failed to create YouTube playlist: ${errorData.error.message}`);
	  }
  
	  const playlistData = await playlistResponse.json();
	  const newPlaylistId = playlistData.id;
	  const playlistUrl = `https://www.youtube.com/playlist?list=${newPlaylistId}`;
	  setDebugInfo(`YouTube Playlist Created: <a href="${playlistUrl}" target="_blank" class="text-blue-500 underline">${playlistName}</a>`);
  
	  // Step 3: For each track, search for the video on YouTube and add it to the playlist
	  for (const item of tracks) {
		const track = item.track;
		const query = `${track.name} ${track.artists[0].name}`;
		await addVideoToYouTubePlaylist(query, newPlaylistId, youtubeToken);
	  }
  
	  return playlistData;
	} catch (error) {
	  setDebugInfo(`Error: ${error.message}`);
	} finally {
	  setIsConverting(prev => ({ ...prev, [playlistId]: false }));
	}
  };
  
  
  useEffect(() => {
    fetchSpotifyPlaylists();
  }, []);

  return (
    <main className="min-h-screen w-screen overflow-hidden bg-gray-900 text-gray-100 flex flex-col relative">
      <div className="flex-grow flex flex-col items-center justify-between p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-2 sm:mb-4 text-blue-400">
          Spotify to YouTube Playlist Converter
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 my-4 sm:my-6 w-full max-w-4xl">
          <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg flex flex-col justify-between space-y-4">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 sm:mb-4 text-blue-300">Authenticate</h2>
            <SpotifyAuth />
            <YouTubeAuth />
          </div>

          <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg flex flex-col justify-between">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 sm:mb-4 text-blue-300">Convert Playlist</h2>
            
            <div className="overflow-y-auto max-h-60"> {/* Set a max height and enable scrolling */}
              {playlists.length > 0 ? (
                <ul>
					
                  {playlists.map((playlist) => (
                    <li key={playlist.id} className="flex justify-between items-center bg-gray-700 p-2 rounded mb-2">
                      <span>{playlist.name}</span>
                      <button
                        onClick={() => createYouTubePlaylist(playlist.name, playlist.id)}
                        className={`${
                          isConverting[playlist.id]
                            ? 'bg-gray-500 cursor-not-allowed'
                            : 'bg-blue-500 hover:bg-blue-700'
                        } text-white font-bold py-1 px-2 rounded`}
                        disabled={isConverting[playlist.id]}
                      >
                        {isConverting[playlist.id] ? 'Converting...' : 'Convert'}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">No playlists found. Make sure you&apos;re authenticated with Spotify.</p>
              )}
            </div>
            
			{debugInfo && (
  <div className="mt-4 p-2 bg-gray-700 rounded">
    <h3 className="font-semibold text-blue-300">Debug Information:</h3>
    <p className="text-sm text-gray-300" dangerouslySetInnerHTML={{ __html: debugInfo }}></p>
  </div>
)}
          </div>
        </div>
      </div>
      <WaveAnimation />
    </main>
  );
}