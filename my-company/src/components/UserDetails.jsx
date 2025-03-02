import React, { useContext } from 'react';
import UserContext from './UserContext';

function UserDetails() {
  const { userData } = useContext(UserContext); // Access userData from context

  return (
    <div>
      {/* Now use userData from the context */}
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
      {/* ... other user details */}
    </div>
  );
}

export default UserDetails;