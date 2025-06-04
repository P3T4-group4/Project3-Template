import { useState, useEffect } from 'react';
import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import { QUERY_SEARCH_PROFILE, QUERY_ME } from '../utils/queries';
import { FOLLOW_PROFILE, UNFOLLOW_PROFILE } from '../utils/mutations';
import '../styles/Search.css';

interface BasicProfile {
  _id: string;
  name: string;
  email: string;
}

interface QuerySearchProfileResult {
  searchProfile: BasicProfile[];
}

interface QueryMeResult {
  me: BasicProfile & { following: BasicProfile[] };
}

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // 1) Fetch the current user (“me”)
  const { data: meData, loading: meLoading } = useQuery<QueryMeResult>(QUERY_ME);

  // 2) Lazy query to search other profiles
  const [searchProfiles, { data: searchData, loading: searchLoading }] =
    useLazyQuery<QuerySearchProfileResult>(QUERY_SEARCH_PROFILE);

  // 3) Mutations to follow / unfollow (refetch QUERY_ME to update “following”)
  const [followProfile] = useMutation(FOLLOW_PROFILE, {
    refetchQueries: [{ query: QUERY_ME }],
  });
  const [unfollowProfile] = useMutation(UNFOLLOW_PROFILE, {
    refetchQueries: [{ query: QUERY_ME }],
  });

  // Whenever searchTerm has 2+ characters, run the search
  useEffect(() => {
    if (searchTerm.length >= 2) {
      searchProfiles({ variables: { searchTerm } });
    }
  }, [searchTerm, searchProfiles]);

  // While “me” is loading, don’t attempt to render the UI
  if (meLoading) {
    return <p>Loading user info…</p>;
  }

  // Now meData.me has: { _id, name, email, followers?, following }
  const me = meData?.me;
  const results = searchData?.searchProfile || [];

  return (
    <main className="page-wrapper">
      <div className="search-page-container">
        <h2>Search Profiles</h2>
        <input
          type="text"
          placeholder="Type name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-page-input"
        />
        {searchLoading && <p>Searching…</p>}

        <ul className="search-page-results">
          {results.map((profile) => {
            // “isSelf” if the listed profile ID matches the current user
            const isSelf = me?._id === profile._id;
            // Check if me.following includes this profile’s ID
            const isFollowing = me?.following.some((f) => f._id === profile._id) ?? false;

            return (
              <li key={profile._id} className="search-page-result">
                <span>
                  {profile.name} ({profile.email})
                </span>
                {!isSelf && (
                  <button
                    onClick={() =>
                      isFollowing
                        ? unfollowProfile({ variables: { profileId: profile._id } })
                        : followProfile({ variables: { profileId: profile._id } })
                    }
                    className={`search-page-btn ${
                      isFollowing ? 'unfollow' : ''
                    }`}
                  >
                    {isFollowing ? 'Unfollow' : 'Follow'}
                  </button>
                )}
              </li>
            );
          })}
          {searchTerm.length >= 2 && results.length === 0 && (
            <li>No results found</li>
          )}
        </ul>
      </div>
    </main>
  );
};

export default SearchPage;
