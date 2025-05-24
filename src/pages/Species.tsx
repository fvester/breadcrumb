import './Species.scss';
import { Link } from 'react-router-dom';

const Species = () => {
  return (
    <div id="species">
      <h1>Species</h1>

      <Link className="species-button" to="/species/2">
        Get started ➝
      </Link>
    </div>
  );
};

export default Species;
