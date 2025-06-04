// client/src/pages/Home.tsx
import { useLazyQuery } from '@apollo/client';
import SearchBar from '../components/SearchBar';
import { QUERY_SEARCH_PROFILE } from '../utils/queries'; 
// ─── Changed: imported QUERY_SEARCH_PROFILE (singular)

function Home() {
  // Run the searchProfile query on demand:
  const [searchProfiles] = useLazyQuery(QUERY_SEARCH_PROFILE);

  // This callback gets passed down to <SearchBar />:
  const handleSearch = (searchTerm: string) => {
    searchProfiles({
      variables: { searchTerm },
    })
      .then(({ data }) => {
        console.log('Search results:', data.searchProfile);
        // You could store data.searchProfile in state here if you want to display results
      })
      .catch((err) => console.error(err));
  };

  return (
    <main>
      <div>
        {/* Pass handleSearch into the SearchBar so onSearch is satisfied */}
        <SearchBar onSearch={handleSearch} />
        {/* …the rest of your Home page markup… */}
      </div>
    </main>
  );
}

export default Home;
