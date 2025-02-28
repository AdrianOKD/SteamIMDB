// server.js - Updated to accept requests from port 5173
import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = 3001;

// Configure CORS to specifically allow your React app on port 5173
app.use(cors({
  origin: 'http://localhost:5173', // This matches your actual React app URL
  credentials: true
}));

// Steam API proxy endpoint
app.get('/api/steam/app/:appId', async (req, res) => {
  try {
    const { appId } = req.params;
    const response = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${appId}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error proxying Steam API:', error);
    res.status(500).json({ error: 'Failed to fetch data from Steam API' });
  }
});

// Add a simple test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Proxy server is working correctly!' });
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
  console.log(`Configured to accept requests from http://localhost:5173`);
});