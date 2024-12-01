"use client";
import React, { useState, useEffect } from 'react';
import SpotifyAuth from '../components/SpotifyAuth';
import YouTubeAuth from '../components/YouTubeAuth';
import dynamic from 'next/dynamic';
import { Music, RefreshCw } from 'lucide-react';

const WaveAnimation = dynamic(() => import('../components/WaveAnimation'), { ssr: false });

export default function ConverterPage() {
  const [playlists, setPlaylists] = useState([]);
  const [debugInfo, setDebugInfo] = useState("");
  const [isConverting, setIsConverting] = useState({});
  const [isYouTubeAuthenticated, setIsYouTubeAuthenticated] = useState(false);

  const fetchSpotifyPlaylists = async () => {
    const token = localStorage.getItem('spotify_token');
    if (!token) {
      setPlaylists([]);
      setDebugInfo('Please authenticate with Spotify first.');
      return;
    }
  
    try {
      const response = await fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setPlaylists(data.items || []); // Ensure we always set an array
      } else {
        setPlaylists([]);
        setDebugInfo('Failed to fetch playlists from Spotify.');
      }
    } catch (error) {
      setPlaylists([]);
      setDebugInfo(`Error fetching Spotify playlists: ${error.message}`);
    }
  };

  const addVideoToYouTubePlaylist = async (searchQuery, playlistId, youtubeToken) => {
    try {
      // Step 2a: Search for the video on YouTube
      const searchResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(
          searchQuery
        )}&maxResults=1`,
        {
          headers: {
            Authorization: `Bearer ${youtubeToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

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
      const addVideoResponse = await fetch(
        'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet',
        {
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
        }
      );

      if (!addVideoResponse.ok) {
        throw new Error('Failed to add video to YouTube playlist.');
      }
    } catch (error) {
      console.error(`Error adding video to YouTube playlist: ${error.message}`);
    }
  };

  const createYouTubePlaylist = async (playlistName, playlistId) => {
    const youtubeToken = localStorage.getItem('youtube_token');

    if (!youtubeToken) {
      // User is not authenticated with YouTube
      setDebugInfo('Please connect your YouTube account to convert playlists.');
      return;
    }

    setIsConverting((prev) => ({ ...prev, [playlistId]: true }));
    const spotifyToken = localStorage.getItem('spotify_token');

    try {
      // Step 1: Fetch tracks from the Spotify playlist
      const tracksResponse = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          headers: {
            Authorization: `Bearer ${spotifyToken}`,
          },
        }
      );

      if (!tracksResponse.ok) {
        throw new Error('Failed to fetch tracks from Spotify playlist.');
      }

      const tracksData = await tracksResponse.json();
      const tracks = tracksData.items;

      // Step 2: Create a new YouTube playlist
      const playlistResponse = await fetch(
        'https://www.googleapis.com/youtube/v3/playlists?part=snippet,status',
        {
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
        }
      );

      if (!playlistResponse.ok) {
        const errorData = await playlistResponse.json();
        throw new Error(`Failed to create YouTube playlist: ${errorData.error.message}`);
      }

      const playlistData = await playlistResponse.json();
      const newPlaylistId = playlistData.id;
      const playlistUrl = `https://www.youtube.com/playlist?list=${newPlaylistId}`;
      setDebugInfo(
        `YouTube Playlist Created: <a href="${playlistUrl}" target="_blank" class="text-blue-500 underline">${playlistName}</a>`
      );

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
      setIsConverting((prev) => ({ ...prev, [playlistId]: false }));
    }
  };

  useEffect(() => {
    fetchSpotifyPlaylists();
    const youtubeToken = localStorage.getItem('youtube_token');
    setIsYouTubeAuthenticated(!!youtubeToken);
  }, []);


  return (
    <main className="min-h-screen w-full overflow-x-auto bg-gray-900 text-gray-100 flex flex-col relative">
      <style jsx>{`
        .playlist-scroller::-webkit-scrollbar {
          width: 10px;
        }
        .playlist-scroller::-webkit-scrollbar-track {
          background: #2d3748;
        }
        .playlist-scroller::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #ec4899);
          border-radius: 5px;
        }
        .playlist-scroller::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7c3aed, #db2777);
        }
      `}</style>
      <div className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative z-10">
        <div className="w-full max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
            Playlist Converter
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-center mb-12 text-gray-300">
            Transform your Spotify playlists into YouTube collections
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 text-purple-300">Authentication</h2>
              <div className="space-y-4">
                <SpotifyAuth />
                <YouTubeAuth />
                {!isYouTubeAuthenticated && (
                  <p className="text-yellow-500">
                    You need to connect your YouTube account to convert playlists.
                  </p>
                )}
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 text-pink-300">Convert Playlists</h2>
              <div className="playlist-scroller overflow-y-auto max-h-60 space-y-2 pr-2">
              {playlists && playlists.length > 0 ? (
                playlists.map((playlist) => (
                  playlist && (  // Add check for playlist existence
                    <div
                      key={playlist?.id}
                      className="flex justify-between items-center bg-gray-700 p-3 rounded-lg transition-all duration-300 hover:bg-gray-600"
                    >
                      <span className="truncate mr-2">{playlist?.name}</span>
                      <button
                        onClick={() => playlist?.id && createYouTubePlaylist(playlist.name, playlist.id)}
                        className={`flex items-center space-x-1 px-3 py-1 rounded-full transition-all duration-300 ${
                          isConverting[playlist?.id]
                            ? 'bg-gray-500 cursor-not-allowed'
                            : isYouTubeAuthenticated
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                            : 'bg-gray-500 cursor-not-allowed'
                        }`}
                        disabled={isConverting[playlist?.id] || !isYouTubeAuthenticated}
                      >
                        {isConverting[playlist?.id] ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Converting...</span>
                          </>
                        ) : (
                          <>
                            <Music className="w-4 h-4" />
                            <span>Convert</span>
                          </>
                        )}
                      </button>
                    </div>
                  )
                ))
              ) : (
                <p className="text-gray-400 text-center">
                  No playlists found. Please authenticate with Spotify.
                </p>
              )}
              </div>
            </div>
          </div>

          {debugInfo && (
            <div className="mt-4 p-4 bg-gray-800 rounded-xl shadow-inner">
              <h3 className="font-semibold text-lg mb-2 text-blue-300">Notice:</h3>
              <p
                className="text-sm text-gray-300"
                dangerouslySetInnerHTML={{ __html: debugInfo }}
              ></p>
            </div>
          )}
        </div>
      </div>

      <div className="absolute inset-0 z-0 opacity-20">
        <WaveAnimation />
      </div>
    </main>
  );
}