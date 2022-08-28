import axios from "axios";

const KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
console.log(KEY);

const youtube = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
});

export const fetchPopularData = async () => {
  return await youtube.get(`/search?key=${KEY}`, {
    params: {
      part: "snippet",
      maxResults: 40,
      regionCode: "jp",
      type: "video",
      order: "rating",
    },
  });
};
