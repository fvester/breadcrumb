import './Footer.scss';

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <div className="footer-left-content">
            <div className="footer-left-title">Info</div>
            <ul className="footer-left-fields">
              <li>☎ tel: 010-5766-1656</li>
              <li>✉️ email: kdm980630@gmail.com</li>
              <li>
                🍀 github:{' '}
                <a
                  href="https://github.com/fvester"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://github.com/fvester
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-right">
          <div className="footer-right-content">
            © 2024. Fvester. All rights reserved
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
