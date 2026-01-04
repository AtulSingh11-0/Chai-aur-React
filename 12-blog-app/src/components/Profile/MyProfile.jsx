import React, { useEffect } from 'react'
import profileService from '../../lib/profileService';
import { useDispatch, useSelector } from 'react-redux';
import ProfileForm from './ProfileForm';
import { Container } from '../layout';

export default function MyProfile() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userData?.$id);
  // const userProfile = useSelector((state) => state.profile.userProfile);
  const [userProfile, setUserProfile] = React.useState(null);

  useEffect(() => {
    if (!userId) return;

    let isMounted = true;

    const fetchUserProfile = async () => {
      try {
        const profile = await profileService.getUserProfileByUserId(userId);
        console.log("User Profile:", profile);
        if (isMounted) {
          setUserProfile(profile);
          dispatch(setUserProfile({ userProfile: profile }));
        }
      } catch (err) {
        // console.error("Error fetching user profile:", err);
        if (isMounted) {
          setUserProfile(null);
        }
      }
    };

    fetchUserProfile();

    return () => {
      isMounted = false;
    };
  }, [userId, dispatch]);

  if (userProfile === null) {
    return (
      <Container>
        <ProfileForm />
      </Container>
    );
  }

  return (
    <>
      <div>UserID: {userId}</div>
      <div>Profile: {JSON.stringify(userProfile)}</div>
    </>
  )
}
