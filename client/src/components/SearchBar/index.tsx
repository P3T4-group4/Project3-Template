import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_PROFILE } from '../../utils/queries';
import { useNavigate } from 'react-router-dom';

const SearchBar: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchProfile, { loading, data, error }] = useLazyQuery(SEARCH_PROFILE);
    const [dropDown, setDropDown] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Implement search functionality here
        if (searchQuery.trim() !== '') {
            searchProfile({
                variables: { name: searchQuery }
            })
            setDropDown(true);
        }
    };

    const handleProfileClick = (profileId: string) => {
        navigate(`/profiles/${profileId}`);
        setSearchQuery('');
        setDropDown(false);
    };

    return (
        <div style={{ position: 'relative', width: '100%' }}>
            <form onSubmit={handleSearch} autoComplete='off'>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Searching profiles..."
                    onFocus={() => data && setDropDown(true)}
                />
                <button type="submit">Search</button>
            </form>

            {dropDown && data && Array.isArray(data.searchProfile) && data?.searchProfile.length > 0 && (
                <ul style={{ position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    zIndex: 1000,
                    listStyle: 'none',
                    padding: '0',
                    margin: '0',
                    width: '169px',
                }}>
                    {data.searchProfile.map((profile: { _id: string; name: string }) => (
                        <li
                            key={profile._id}
                            onClick={() => handleProfileClick(profile._id)}
                            style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #ccc' }}
                        >
                            {profile.name}
                        </li>
                    ))}
                </ul>
            )}

                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                {dropDown && data && Array.isArray(data.SearchProfile) && data?.searchProfile.length === 0 && <p>No profiles found.</p>}
        </div>
    )
}

export default SearchBar;