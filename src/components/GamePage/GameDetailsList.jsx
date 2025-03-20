import React, { useEffect } from "react";
import "./DetailsList.css";

/**   GameDetailsList Component
 * This component displays a list of the games metadata.
 */

export function GameDetailsList({ selectedGame }) {
  useEffect(() => {
    console.log("Selected Game:", selectedGame);
  }, [selectedGame]);

  if (!selectedGame) {
    return <div className="DetailsList">Loading game details...</div>;
  }

  const genre =
    selectedGame.genres && selectedGame.genres.length > 0
      ? selectedGame.genres[0].name
      : "Unknown Genre ";

  const rating = selectedGame.rating;

  const releaseDate = selectedGame.first_release_date
    ? new Date(selectedGame.first_release_date * 1000).toLocaleDateString()
    : "Unknown Release Date";

  //   const {
  //     developer = "Developer",
  //     publisher = "Publisher",
  //     ageRating = "5",
  //     review = "Good",
  //     genre = " Action ",
  //     releaseDate = " 2025-02-26",
  //   } = selectedGame;

  //     const developerCompany = selectedGame.involved_companies.find(
  //         (company) => company.developer === true
  //       );
  //       const developer = developerCompany.company.name || "Dunno";

  // const publisher =
  //   selectedGame.involved_companies?.find(
  //     (company) => company.publisher === true
  //   )?.company?.name || "Publisher";

  //   const ageRating = selectedGame.age_rating?.find()

  const ageRating = ageRatings(selectedGame);
  function ageRatings(selectedGame) {
    if (!selectedGame.age_ratings || !selectedGame.age_ratings === undefined) {
      return (selectedGame.age_ratings?.[0]);
    } else {
      return "Unknown age rating";
    }
  }

  //   return (
  //     <div className="DetailsList">
  //       <div>Developer - Dunno</div>
  //       <div>Publisher - Dunno</div>
  //       <div>Age Rating - 65</div>
  //       <div>Review - shit</div>
  //       <div>Genre - Racism</div>
  //       <div>Release Date - today</div>
  //     </div>
  //   );
  const publisher = publisherName(selectedGame);
  function publisherName(selectedGame) {
    if (!selectedGame.publisher || selectedGame.publisher.lenght === 0)
      return "Unkown publisher";
  }

  const developer = developerName(selectedGame);
  function developerName() {
    if (
      !selectedGame.involved_companies ||
      selectedGame.involved_companies.length === 0
    ) {
      return "Unknown developer";
    } else {
      return;
    }
  }

  return (
    <div className="DetailsList">
      <span className="detail-developer"> {developer} </span>
      <span>----</span>
      <span className="detail-publisher"> {publisher} </span>
      <span>----</span>
      <span className="detail-age"> Age - {ageRating} </span>
      <span>----</span>
      <span className="detail-rating"> Rating - {rating} </span>
      <span>----</span>
      <span className="detail-genre"> Genre - {genre} </span>
      <span>----</span>
      <span className="detail-release"> Release - {releaseDate} </span>
    </div>
  );
}
