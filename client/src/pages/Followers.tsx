import { useMutation } from '@apollo/client';
import { FOLLOW_PROFILE, UNFOLLOW_PROFILE } from '../utils/mutations';
import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import Auth from '../utils/auth';
import { useEffect } from 'react';
import '../styles/Followers.css';

interface Profile {
  _id: string;
  name: string;
}

export default function Followers() {
    const { profileId } = useParams();
    const visitingAnotherProfile = !!profileId;

    const { loading, data, error, refetch } = useQuery(
        visitingAnotherProfile ? QUERY_SINGLE_PROFILE : QUERY_ME,
        {
            variables: profileId ? { profileId } : undefined,
        }
    );

    const [followProfile] = useMutation(FOLLOW_PROFILE);
    const [unfollowProfile] = useMutation(UNFOLLOW_PROFILE);

    const profile = data?.profile || data?.me || {};
    const profiles: Profile[] = profile?.followers || [];
    const profilesFollowing: Profile[] = profile?.following || [];

    const currentProfileId = Auth.loggedIn() ? Auth.getProfile().data._id : null;

    console.log('Data:', data);
    console.log('Profiles:', profiles);
    console.log('Profiles Following:', profilesFollowing);

    useEffect(() => {
        refetch();
    }, [refetch]);

    const handleFollow = async (profileId: string) => {
        try {
            await followProfile({
                variables: { profileId },
            });
            refetch();
        } catch (error) {
            console.error('Error following profile:', error);
        }
    };

  const handleUnfollow = async (profileId: string) => {
    try {
      await unfollowProfile({ variables: { profileId } });
      refetch();
    } catch (error) {
      console.error('Error unfollowing profile:', error);
    }
  };

    const isFollowing = (targetProfileId: string) =>
        profilesFollowing.some((profile) => profile._id === targetProfileId);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>{profile.name} Followers List</h1>
            <ul>
                {profiles.map((profile) => (
                    <li key={profile._id}>
                        <Link to={`/profiles/${profile._id}`}>{profile.name}</Link>
                        {!visitingAnotherProfile && profile._id !== currentProfileId && (
                            isFollowing(profile._id) ? (
                                <button onClick={() => handleUnfollow(profile._id)}>Unfollow</button>
                            ) : (
                                <button onClick={() => handleFollow(profile._id)}>Follow</button>
                            )
                        )}
                        {/* <button onClick={() => handleFollow(profile._id)}>Follow</button>
                        <button onClick={() => handleUnfollow(profile._id)}>Unfollow</button> */}
                    </li>
                ))}
            </ul>
            <h1>{profile.name} Following List</h1>
            <ul>
                {profilesFollowing.map((profile) => (
                    <li key={profile._id}>
                        <Link to={`/profiles/${profile._id}`}>{profile.name}</Link>
                        {!visitingAnotherProfile && profile._id !== currentProfileId && (
                            isFollowing(profile._id) ? (
                                <button onClick={() => handleUnfollow(profile._id)}>Unfollow</button>
                            ) : (
                                <button onClick={() => handleFollow(profile._id)}>Follow</button>
                            )
                        )}
                        {/* <button onClick={() => handleFollow(profile._id)}>Follow</button>
                        <button onClick={() => handleUnfollow(profile._id)}>Unfollow</button> */}
                    </li>
                ))}
            </ul>
            <p>This is the followers list page.</p>
        </div>
    );
};