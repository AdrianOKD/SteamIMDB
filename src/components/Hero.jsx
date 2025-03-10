import { Link } from "react-router";

export function Hero({ appId }) {
  // TODO: Implement useState

  /* {is this a possible solution to rendering multiple gamecard links} */

  /* <Link to={`/GamePage/${appId}`}> */

  return (
    <div>
      <Link to="/GamePage">
        <img
          src={`https://cdn.akamai.steamstatic.com/steam/apps/${appId}/library_hero.jpg`}
          alt=""
        />
      </Link>
    </div>
  );
}
