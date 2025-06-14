import { useEffect } from 'react';
import './ErrorPage.scss';

import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from 'react-router-dom';

// When page not found
const ErrorPage: React.FC = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  let reason: string = 'This is Error page';
  let msg: string = 'Error!!!';

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        reason = 'Not Found';
        msg = "Can't Find Page. Please check URL";
        break;
      case 500:
        reason = 'Server Error';
        msg = 'There is something wrong in server. Please wait and re-access';
        break;
      default:
        reason = 'Page Error occured';
        msg = 'Now find cause of error.';
    }
  }

  msg += '\n Go home after 3 seconds...';

  return (
    <div className="error-page">
      <div className="error-page-container">
        <h1 className="error-page-title">
          <span className="point">Error:</span> {reason}
        </h1>
        <p>{msg}</p>
      </div>
    </div>
  );
};

export default ErrorPage;
