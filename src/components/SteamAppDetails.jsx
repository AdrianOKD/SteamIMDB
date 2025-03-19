// src/components/SteamAppDetails.jsx
import React from "react";
import useSteamApp from "../hooks/useSteamApp";

const SteamAppDetails = ({ appId }) => {
  const { loading, error, appData } = useSteamApp(appId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!appData) return <div>No data available</div>;

  // Steam API returns data in format { "440": { data } } where 440 is the appId
  const app = appData[appId]?.data;

  if (!app) return <div>App not found</div>;

  return (
    <div>
      <h1>{app.name}</h1>
      <img src={app.header_image} alt={app.name} />
      <p>{app.short_description}</p>
      <div>
        <strong>Price:</strong>{" "}
        {app.is_free
          ? "Free"
          : app.price_overview?.final_formatted || "Price unavailable"}
      </div>
      {/* Add more details as needed */}
    </div>
  );
};

export default SteamAppDetails;
