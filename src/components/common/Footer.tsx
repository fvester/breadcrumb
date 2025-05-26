import './Footer.scss';

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <div className="footer-left-content">
            <div className="footer-left-title">Info</div>
            <ul className="footer-left-fields">
              <li>tel: </li>
              <li>email: </li>
            </ul>
          </div>
        </div>
        <div className="footer-right">
          <div className="footer-right-content">right</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
