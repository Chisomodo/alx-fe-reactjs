


import React, { useContext } from 'react';
import UserContext from './UserContext';
import UserInfo from './UserInfo';

function ProfilePage() {
  const { userData } = useContext(UserContext);

  return <UserInfo />; // No need to pass userData as prop
}

export default ProfilePage;