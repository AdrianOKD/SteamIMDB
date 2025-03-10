import { Link } from 'react-router';

export function Hero({ appId }) {
  // TODO: Implement useState
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
