import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../utils/queries';
import { FOLLOW_PROFILE, UNFOLLOW_PROFILE } from '../utils/mutations';
import'./Home.css';
import Auth from '../utils/auth';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import button from '../assets/menu-button.jpg';

interface Profile {
  _id: string;
  name: string;
  followers: { _id: string }[];
  following: { _id: string }[];
}

const Profile = () => {
  const { profileId } = useParams();

  const { loading, data, refetch } = useQuery(
    profileId ? QUERY_SINGLE_PROFILE : QUERY_ME,
    {
      variables: { profileId: profileId },
    }
  );

  const [isMutating, setIsMutating] = useState(false);
  const [justFollowed, setjustFollowed] = useState<boolean | null>(null);
  // const [isOpen, setIsOpen] = useState(false);

  const profile = data?.me || data?.profile || {};
  
  const currentProfileId = Auth.loggedIn() ? Auth.getProfile().data._id : null;

  const [followProfile] = useMutation(FOLLOW_PROFILE);
  const [unfollowProfile] = useMutation(UNFOLLOW_PROFILE);

  if (Auth.loggedIn() && currentProfileId === profileId) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div className="glow-text">Loading...</div>;
  }

  if (!profile?.name) {
    return (
      <h4 className="glow-text">
        You need to be logged in to see your profile page. Use the navigation
        links above to sign up or log in!
      </h4>
    );
  }

  const handleFollow = async () => {
    setIsMutating(true);
    try {
      await followProfile({
        variables: { profileId: profile._id },
      });
      setjustFollowed(true);
      await refetch();
    } catch (error) {
      console.error('Error following profile:', error);
    }
    setIsMutating(false);
  };

  const handleUnfollow = async () => {
    setIsMutating(true);
    try {
      await unfollowProfile({
        variables: { profileId: profile._id },
      });
      setjustFollowed(false);
      await refetch();
    } catch (error) {
      console.error('Error unfollowing profile:', error);
    }
    setIsMutating(false);
  };

  const viewingOwnProfile = profile._id === currentProfileId;

  const actualFollowing = !viewingOwnProfile
    ? profile?.followers?.some((f: { _id: string }) => f._id === currentProfileId)
    : false;

  const isFollowing = justFollowed !== null ? justFollowed : actualFollowing;

  console.log('isFollowing:', isFollowing);
  console.log(profile.following);
  console.log('Current Profile ID:', currentProfileId);
  console.log('Profile ID:', profile._id);

  return (
    <div className="profile-container">
      {/* <h2 className="neon-heading">{profile?.name}</h2> */}
      {/* {currentProfileId && profile._id !== currentProfileId && (
        isFollowing ? (
          <button className="neon-button" onClick={handleUnfollow} disabled={isMutating}>
          {isMutating ? "Processing..." : "Unfollow"}</button>
          ) : (
          <button className="neon-button" onClick={handleFollow} disabled={isMutating}>
          {isMutating ? "Processing..." : "Follow"}
          </button>
          )
        )
    } */}
      <div className="menu-button relative inline-block text-left mt-4">
        <button
          className="neon-button"
        >
          <img src={button} alt="Menu" className="w-8 h-8" />
        </button>
          <div className="menu-items absolute mt-2 left-0 rounded-md shadow-lg bg-black border border-pink-500 z-50 px-2 py-2">
            <div className="flex flex-row gap-2">
              {currentProfileId && profile._id !== currentProfileId && (
                isFollowing ? (
                  <button className="neon-button" onClick={handleUnfollow} disabled={isMutating}>
                  {isMutating ? "Processing..." : "Unfollow"}</button>
                  ) : (
                  <button className="neon-button" onClick={handleFollow} disabled={isMutating}>
                  {isMutating ? "Processing..." : "Follow"}
                  </button>
                  )
                )
              }
              <Link to="wishlist" className="neon-button">Wishlist</Link>
              <Link to="calendar" className="neon-button">Calendar</Link>
              <Link to="library" className="neon-button">Library</Link>
              <Link to="followers" className="neon-button">Followers</Link>
              <Link to="gamecollection" className="neon-button">Collection</Link>
              <Link to="playlist" className="neon-button">Playlist</Link>
            </div>
          </div>
      </div>
      <h2 className="profile">{profile?.name}</h2>
      <Outlet />
    </div>
  );
};

export default Profile;
