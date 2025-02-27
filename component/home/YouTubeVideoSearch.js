import React, { useState } from "react";
import axios from "axios";
import "../../style/YouTubeVideoSearch.css";

const API_KEY = "AIzaSyDlKFkYane2cWuiOKAQPtkJF2lWMKsXlB4"; // Replace with your YouTube API key
const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

const YouTubeVideoSearch = () => {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState([]);

  // Function to fetch videos from YouTube API
  const fetchVideos = async () => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          part: "snippet",
          maxResults: 6,
          q: query,
          type: "video",
          key: API_KEY,
        },
      });
      setVideos(response.data.items);
    } catch (error) {
      console.error("Error fetching videos", error);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Green Loop Search</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for videos..."
        className="search-input"
      />
      <button onClick={fetchVideos} className="search-button">
        Search
      </button>

      <div className="video-list">
        {videos.map((video) => (
          <div key={video.id.videoId} className="video-item">
            <h3 className="video-title">{video.snippet.title}</h3>
            {/* Embed YouTube video using iframe */}
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              title={video.snippet.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouTubeVideoSearch;
