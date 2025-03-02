

import React, { useContext } from 'react';
import UserContext from './UserContext';
import UserDetails from './UserDetails';

function UserInfo() {
  const { userData } = useContext(UserContext);

  return <UserDetails />; // No need to pass userData as prop
}

export default UserInfo;