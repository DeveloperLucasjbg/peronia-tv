'use client'; // Asegúrate de que este archivo se trate como un componente de cliente

import axios from 'axios';
import { useEffect, useState } from 'react';
import './LiveVideo.css'; // Asegúrate de importar el archivo CSS

const LiveVideo = ({ channelIds }) => {
  const [videos, setVideos] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchLiveVideos = async () => {
      try {
        const responses = await Promise.all(
          channelIds.map(async (channelId) => {
            try {
              const res = await axios.get(`/api/latestLive?channelId=${channelId}`);
              return res.data;
            } catch (error) {
              console.error(`Error fetching video for channel ${channelId}:`, error.response ? `${error.response.status} ${error.response.data.error.message}` : error.message);
              return null; // O maneja el error como prefieras
            }
          })
        );
        const liveVideos = responses.filter(response => response !== null);
        setVideos(liveVideos);
        setHasError(liveVideos.length === 0); // Si no hay videos, se considera un error
      } catch (error) {
        console.error('Error fetching live videos:', error.response ? `${error.response.status} ${error.response.data.error.message}` : error.message);
        setHasError(true);
      }
    };

    fetchLiveVideos();
  }, [channelIds]);

  if (hasError) {
    return <div className="offline-message">Offline - No live videos available</div>;
  }

  return (
    <div className="live-video-container">
      {videos.length === 0 ? (
        <div className="offline-message">Offline - No live videos available</div>
      ) : (
        videos.map((video, index) => {
          if (!video || !video.videoId) return null;
          const { videoId } = video;

          return (
            <div key={index} className="video-item">
              <iframe
                width="560" // Tamaño del iframe
                height="315" // Tamaño del iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`} // Autoplay y mute activados
                title={`YouTube video player ${videoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          );
        })
      )}
    </div>
  );
};

export default LiveVideo;
