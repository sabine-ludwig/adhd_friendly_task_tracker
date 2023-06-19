import React, { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import TrendsGraph from '../../components/TrendsGraph/TrendsGraph';

const TrendsPage = () => {
  const [user, token] = useAuth();

  return (
    <div>
      <h1>Trends Page</h1>
      <TrendsGraph token={token} />
    </div>
  );
};

export default TrendsPage;
