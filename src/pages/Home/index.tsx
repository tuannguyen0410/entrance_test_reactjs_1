import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getAccessToken } from 'services/common/storage';

const Home: React.FC = () => {
  const token = getAccessToken();
  const navigator = useNavigate();

  useEffect(() => {
    if (!token) {
      navigator('/login');
    }
  }, [token, navigator]);
  return (
    <div>Page Home</div>
  );
};

export default Home;
