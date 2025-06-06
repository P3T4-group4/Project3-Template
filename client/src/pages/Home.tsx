import { useQuery } from '@apollo/client';

import { QUERY_PROFILES } from '../utils/queries';
import '../styles/Home.css'; // Assuming you have a CSS file for styles
// import 'animate.css/animate.min.css';

const Home = () => {
  const { loading, data } = useQuery(QUERY_PROFILES);
  const profiles = data?.profiles || [];

  return (
    <main>
      <div>
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <h3>There are {profiles.length} users.</h3>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
