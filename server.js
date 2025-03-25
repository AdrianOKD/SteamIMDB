import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
console.log("📣 TWITCH_CLIENT_ID loaded:", !!process.env.TWITCH_CLIENT_ID);
console.log(
  "📣 TWITCH_CLIENT_SECRET loaded:",
  !!process.env.TWITCH_CLIENT_SECRET
);
const app = express();
const PORT = 3001;

let twitchToken = null;
let tokenExpiry = null;
const TWITCH_CLIENT_ID =
  process.env.TWITCH_CLIENT_ID;
const TWITCH_CLIENT_SECRET =
  process.env.TWITCH_CLIENT_SECRET;

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);

/**
 * Retrieves or refreshes the Twitch API access token
 * Only get a new token if we don't have one or it's expired
 * @async
 * @returns {Promise<string>} A valid Twitch access token
 * @throws {Error} If authentication with Twitch fails
 */
async function getTwitchToken() {
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

// IGDB Games endpoint
app.get("/api/games", async (req, res) => {
  console.log("📣 Request received for /api/games");
  try {
    const limit = req.query.limit || 100;

    const token = await getTwitchToken();

    console.log("📣 Making request to IGDB API...");

    const response = await axios({
      url: "https://api.igdb.com/v4/games",
      method: "POST",
      headers: {
        "Client-ID": TWITCH_CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      data: `fields name,cover.url,summary,storyline,rating,first_release_date,genres.name,platforms.name,screenshots.url,age_ratings.*,themes.name,keywords.name,game_modes.name,involved_companies; 
      limit ${limit}; 
      where cover != null & category = 0 & storyline != null & rating_count > 1000;
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


/**
 * Fetches involved companies data from IGDB API with support for batched requests
 *
 * @async
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @returns {Promise<void>}
 */
app.get("/api/involved-companies", async (req, res) => {
  console.log("📣 Request received for /api/involved-companies");
  try {
    const ids = req.query.ids;
    if (!ids) {
      return res.status(400).json({ error: "No IDs provided" });
    }

    const token = await getTwitchToken();

    const idArray = ids.split(",");
    const batchSize = 10;
    const batches = [];

    for (let i = 0; i < idArray.length; i += batchSize) {
      batches.push(idArray.slice(i, i + batchSize));
    }

    const allResults = [];

    for (const batch of batches) {
      const response = await axios({
        url: "https://api.igdb.com/v4/involved_companies",
        method: "POST",
        headers: {
          "Client-ID": TWITCH_CLIENT_ID,
          Authorization: `Bearer ${token}`,
        },
        data: `fields id,company,developer,publisher,game;
              where id = (${batch.join(",")});`,
      });

      allResults.push(...response.data);
    }

    console.log(
      `📣 IGDB API response received: ${allResults.length} involved companies`
    );
    res.json(allResults);
  } catch (error) {
    console.error("📣 Error fetching involved companies:", error.message);
    res
      .status(500)
      .json({ error: "Failed to fetch involved companies from IGDB" });
  }
});

/**
 * Fetches company data from IGDB API with support for batched requests
 *
 * @async
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @returns {Promise<void>}
 */
app.get("/api/companies", async (req, res) => {
  console.log("📣 Request received for /api/companies");
  try {
    const ids = req.query.ids;
    if (!ids) {
      return res.status(400).json({ error: "No IDs provided" });
    }

    const token = await getTwitchToken();
    const idArray = ids.split(",");
    const batchSize = 10;
    const batches = [];

    for (let i = 0; i < idArray.length; i += batchSize) {
      batches.push(idArray.slice(i, i + batchSize));
    }

    const allResults = [];

    for (const batch of batches) {
      const response = await axios({
        url: "https://api.igdb.com/v4/companies",
        method: "POST",
        headers: {
          "Client-ID": TWITCH_CLIENT_ID,
          Authorization: `Bearer ${token}`,
        },
        data: `fields id,name,logo.url,description;
              where id = (${batch.join(",")});`,
      });

      allResults.push(...response.data);
    }
    console.log(
      `📣 IGDB API response received: ${allResults.length} companies`
    );
    res.json(allResults);
  } catch (error) {
    console.error("📣 Error fetching companies:", error.message);
    res.status(500).json({ error: "Failed to fetch companies from IGDB" });
  }
});

/**
 * Simple test endpoint to verify the server is running correctly
 *
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 */
app.get("/api/test", (req, res) => {
  res.json({ message: "Proxy server is working correctly!" });
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
  console.log(`Configured to accept requests from http://localhost:5173`);
});
