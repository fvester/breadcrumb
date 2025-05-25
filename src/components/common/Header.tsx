import { useNavigate } from 'react-router-dom';
import './Header.scss';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="header-container">
        <div
          className="header-title"
          onClick={(e: React.MouseEvent) => navigate('/')}
          style={{ cursor: 'pointer' }}
        >
          <span>Pokédex</span>
        </div>
        <div className="header-link"></div>
      </div>
    </div>
  );
};

export default Header;
