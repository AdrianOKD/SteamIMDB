// server.js - Updated to include IGDB API alongside Steam
import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv"; // Add this to handle environment variables

// Load environment variables from .env file
dotenv.config();
console.log("📣 TWITCH_CLIENT_ID loaded:", !!process.env.TWITCH_CLIENT_ID);
console.log(
  "📣 TWITCH_CLIENT_SECRET loaded:",
  !!process.env.TWITCH_CLIENT_SECRET
);
const app = express();
const PORT = 3001;

// Twitch/IGDB auth token management
let twitchToken = null;
let tokenExpiry = null;
const TWITCH_CLIENT_ID =
  process.env.TWITCH_CLIENT_ID || process.env.VITE_TWITCH_CLIENT_ID;
const TWITCH_CLIENT_SECRET =
  process.env.TWITCH_CLIENT_SECRET || process.env.VITE_TWITCH_CLIENT_SECRET;
// Configure CORS to specifically allow your React app on port 5173
app.use(
  cors({
    origin: "http://localhost:5173", // This matches your actual React app URL
    credentials: true,
  })
);

// Get Twitch access token for IGDB
async function getTwitchToken() {
  // Only get a new token if we don't have one or it's expired
  if (!twitchToken || Date.now() > tokenExpiry) {
    console.log("📣 Getting new Twitch access token...");
    try {
      const response = await axios.post(
        "https://id.twitch.tv/oauth2/token",
        null,
        {
          params: {
            client_id: TWITCH_CLIENT_ID,
            client_secret: TWITCH_CLIENT_SECRET,
            grant_type: "client_credentials",
          },
        }
      );

      twitchToken = response.data.access_token;
      // Set expiry time (token lasts 60 days but we'll refresh after 50)
      tokenExpiry = Date.now() + 50 * 24 * 60 * 60 * 1000;
      console.log("📣 New Twitch token obtained successfully");
    } catch (error) {
      console.error("📣 Error getting Twitch token:", error.message);
      if (error.response) {
        console.error("📣 Response data:", error.response.data);
      }
      throw new Error("Failed to authenticate with Twitch");
    }
  }

  return twitchToken;
}

// IGDB Games endpoint - get games with images
app.get("/api/games", async (req, res) => {
  console.log("📣 Request received for /api/games");
  try {
    const limit = req.query.limit || 100;

    // Get valid access token
    const token = await getTwitchToken();

    console.log("📣 Making request to IGDB API...");
    // Make request to IGDB API
    const response = await axios({
      url: "https://api.igdb.com/v4/games",
      method: "POST",
      headers: {
        "Client-ID": TWITCH_CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      // This query gets games with covers, limits results, and sorts by popularity
      data: `fields name,cover.url,summary,storyline,rating,first_release_date,genres.name,platforms.name,screenshots.url,age_ratings.type,themes.name,keywords.name,game_modes.name; 
      limit ${limit}; 
      where cover != null & category = 0 & storyline != null; 
      sort rating desc;`,
    });

    console.log(`📣 IGDB API response received: ${response.data.length} games`);
    res.json(response.data);
  } catch (error) {
    console.error("📣 Error fetching IGDB games:", error.message);
    if (error.response) {
      console.error("📣 Response status:", error.response.status);
      console.error("📣 Response data:", error.response.data);
    }
    res.status(500).json({ error: "Failed to fetch games from IGDB" });
  }
});

// IGDB Game details endpoint
app.get("/api/games/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const token = await getTwitchToken();

    const response = await axios({
      url: "https://api.igdb.com/v4/games",
      method: "POST",
      headers: {
        "Client-ID": TWITCH_CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      data: `fields name,cover.url,summary,storyline,rating,first_release_date,genres.name,platforms.name,screenshots.url,videos.video_id,similar_games.name,similar_games.cover.url;
             where id = ${id};`,
    });

    if (response.data && response.data.length > 0) {
      res.json(response.data[0]);
    } else {
      res.status(404).json({ error: "Game not found" });
    }
  } catch (error) {
    console.error("Error fetching IGDB game details:", error);
    res.status(500).json({ error: "Failed to fetch game details" });
  }
});

// Keep the existing Steam endpoints for backward compatibility
app.get("/api/steam/app/:appId", async (req, res) => {
  try {
    const { appId } = req.params;
    const response = await axios.get(
      `https://store.steampowered.com/api/appdetails?appids=${appId}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error proxying Steam API:", error);
    res.status(500).json({ error: "Failed to fetch data from Steam API" });
  }
});

app.get("/api/steam/apps", async (req, res) => {
  console.log("📣 Request received for /api/steam/apps");
  try {
    console.log("📣 Making request to Steam API...");
    const response = await axios.get(
      "https://api.steampowered.com/ISteamApps/GetAppList/v2/"
    );
    console.log("📣 Steam API response received:", {
      status: response.status,
      dataReceived: !!response.data,
    });
    res.json(response.data);
  } catch (error) {
    console.error("📣 Error proxying Steam API:", error);
    console.error("📣 Error details:", {
      message: error.message,
      code: error.code,
      response: error.response
        ? {
            status: error.response.status,
            data: error.response.data,
          }
        : "No response",
    });
    res.status(500).json({ error: "Failed to fetch data from Steam API" });
  }
});

// Add a simple test endpoint
app.get("/api/test", (req, res) => {
  res.json({ message: "Proxy server is working correctly!" });
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
  console.log(`Configured to accept requests from http://localhost:5173`);
});

/* OLD VERSION

// server.js - Updated to accept requests from port 5173
import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = 3001;

// Configure CORS to specifically allow your React app on port 5173
app.use(
  cors({
    origin: "http://localhost:5173", // This matches your actual React app URL
    credentials: true,
  })
);

// Steam API proxy endpoint
app.get("/api/steam/app/:appId", async (req, res) => {
  try {
    const { appId } = req.params;
    const response = await axios.get(
      `https://store.steampowered.com/api/appdetails?appids=${appId}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error proxying Steam API:", error);
    res.status(500).json({ error: "Failed to fetch data from Steam API" });
  }
});

app.get("/api/steam/apps", async (req, res) => {
  console.log("📣 Request received for /api/steam/apps");
  try {
    console.log("📣 Making request to Steam API...");
    const response = await axios.get(
      "https://api.steampowered.com/ISteamApps/GetAppList/v2/"
    );
    console.log("📣 Steam API response received:", {
      status: response.status,
      dataReceived: !!response.data,
    });
    res.json(response.data);
  } catch (error) {
    console.error("📣 Error proxying Steam API:", error);
    console.error("📣 Error details:", {
      message: error.message,
      code: error.code,
      response: error.response
        ? {
            status: error.response.status,
            data: error.response.data,
          }
        : "No response",
    });
    res.status(500).json({ error: "Failed to fetch data from Steam API" });
  }
});

// Add a simple test endpoint
app.get("/api/test", (req, res) => {
  res.json({ message: "Proxy server is working correctly!" });
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
  console.log(`Configured to accept requests from http://localhost:5173`);
});

*/
