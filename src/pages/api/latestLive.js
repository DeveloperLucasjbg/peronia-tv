import axios from 'axios';

export default async function handler(req, res) {
  const { channelId } = req.query;

  if (!channelId) {
    return res.status(400).json({ error: 'Missing channelId' });
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&eventType=live&type=video&part=snippet`;

  try {
    const response = await axios.get(url);
    
    if (response.status !== 200) {
      console.error(`Error fetching live video: ${response.status} ${response.data.error.message}`);
      return res.status(response.status).json({ error: `${response.status} ${response.data.error.message}` });
    }

    const data = response.data;
    const liveVideo = data.items[0]; // Assuming we want the first live video

    if (liveVideo) {
      return res.status(200).json({ 
        videoId: liveVideo.id.videoId,
        title: liveVideo.snippet.title // Directly include the title
      });
    } else {
      return res.status(404).json({ error: 'No live video found' });
    }
  } catch (error) {
    console.error('Error fetching live video:', error.response ? `${error.response.status} ${error.response.data.error.message}` : error.message);
    return res.status(error.response ? error.response.status : 500).json({ error: `${error.response ? error.response.status : 500} ${error.response ? error.response.data.error.message : error.message}` });
  }
}
