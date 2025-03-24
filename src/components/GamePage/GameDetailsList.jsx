import React, { useEffect } from "react";
import "../../Css/gamepage/DetailsList.css";
import Tags from "./Tags";
/**   GameDetailsList Component
 * This component displays a list of the selected games metadata.
 * It extracts and formats information such as developer, publisher,
 *  age rating, review score and release date.
 *
 * @param {Object} selectedGame - Containing the games metadata to display.
 * @returns {JSX.Elements} A formatted list of game details.
 */

export function GameDetailsList({ selectedGame }) {
  useEffect(() => {
    console.log("Selected Game:", selectedGame);
  }, [selectedGame]);

  if (!selectedGame) {
    return <div className="DetailsList">Loading game details...</div>;
  }

  const developer = getDeveloperName(selectedGame);
  const genre = getGenre(selectedGame);
  const rating = getRating(selectedGame);
  const releaseDate = getReleaseDate(selectedGame);
  const ageRating = getAgeRatings(selectedGame);
  const publisher = getPublisherName(selectedGame);

  /**
   *
   * @param {*} selectedGame - Selected game object.
   * @returns {string}  Name of the first genre or "Unkown" if not available
   */
  function getGenre(selectedGame) {
    if (!selectedGame.genres || !selectedGame.genres.length > 0) {
      return "Unknown";
    }
    return selectedGame.genres[0].name;
  }

  /**
   * collects and formats the game's rating to 2 decimals.
   *
   * @param {*} selectedGame
   * @returns {string|number} Formatted rating or "Unknown" if not available.
   */
  function getRating(selectedGame) {
    if (!selectedGame.rating) {
      return "Unknown";
    }
    return Math.round(selectedGame.rating * 100) / 100;
  }
  /**
   * Converts the timestamp to a readable date format
   * @param {*} selectedGame
   * @returns {string}  returns a formatted date from selected game or "Unknown" if not found.
   */

  function getReleaseDate(selectedGame) {
    if (!selectedGame.first_release_date) {
      return "Unknown";
    }
    return new Date(
      selectedGame.first_release_date * 1000
    ).toLocaleDateString();
  }
  /**
   * Extracts the age rating information
   * @param {*} selectedGame
   * @returns {string} Age rating or "Unknown".
   */

  function getAgeRatings(selectedGame) {
    console.log("Age ratings:", selectedGame.age_ratings);

    if (
      !selectedGame.age_ratings ||
      !Array.isArray(selectedGame.age_ratings) ||
      selectedGame.age_ratings.length === 0
    ) {
      return "Choose something";
    }
    if (typeof selectedGame.age_ratings[0] === "object") {
      const pegi = selectedGame.age_ratings.find(
        (rating) => rating.organization === 2 || rating.category === 2
      );

      if (pegi) {
        const ratingValue =  pegi.rating;

        if (ratingValue) {
          const pegiAgeMap = {
            1: "3",
            2: "7",
            3: "12",
            4: "16",
            5: "18",
          };
          
            return `PEGI ${pegiAgeMap[pegi.rating] || pegi.rating}`;
          }
        }
      }
    }
  
  /**
   * Extracts the publishers name for display.
   * @param {*} selectedGame
   * @returns {string} Publishers name or "Unknown" if not available.
   */

  function getPublisherName(selectedGame) {
    if (!selectedGame.publisher || selectedGame.publisher.length === 0) {
      return "Unknown";
    }
    return selectedGame.publisher;
  }

  /**
   * Extracts the developers name for display.
   * @param {*} selectedGame
   * @returns {string} Developer name or "Unknown" if not available
   */

  function getDeveloperName(selectedGame) {
    if (
      !selectedGame.involved_companies ||
      !Array.isArray(selectedGame.involved_companies) ||
      selectedGame.involved_companies.length === 0
    ) {
      return "Unknown";
    }
    return selectedGame.selectedGame.involved_companies[0].company.name;
  }

  return (
    <grid className="details-main-container">
      <div className="detailslist-container">
        <span className="detail-developer"> Developer - {developer} </span>
        <span className="detail-publisher"> Publisher - {publisher} </span>
        <span className="detail-age"> Age Rating - {ageRating} </span>
        <span className="detail-rating"> Review - {rating} </span>
        <span className="detail-genre">Genre - {genre} </span>
        <span className="detail-release"> Release Date - {releaseDate} </span>
        <span>
          {" "}
          <Tags />{" "}
        </span>
      </div>
    </grid>
  );
}