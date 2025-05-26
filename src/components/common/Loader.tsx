import './Loader.scss';
import Spinner from '@/assets/loading.svg?react';

const Loader = () => {
  return (
    <div className="loader">
      <Spinner />
    </div>
  );
};

export default Loader;
