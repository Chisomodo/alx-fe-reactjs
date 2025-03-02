import React, { useContext } from 'react';
import UserContext from '../context/UserContext'; // Adjust path as needed


function UserProfile() {
  const { user, setUser } = useContext(UserContext);

  // ... rest of your component code
}



import React, { useContext } from 'react';
import UserContext from '../context/UserContext';

function UserProfile() {
  const { user, setUser } = useContext(UserContext);

  if (!user) {
    return <div>Loading...</div>; // Or handle the case where the user is not available
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      {/* ... other user profile details */}
    </div>
  );
}

export default UserProfile;


import React from 'react';

function UserProfile(props) {
  return (
    <div style={{ border: '1px solid gray', padding: '10px', margin: '10px' }}>
   <h2 style={{ color: 'blue' }}>{props.name}</h2>
   <p>Age: <span style={{ fontWeight: 'bold' }}>{props.age}</span></p>
   <p>Bio: {props.bio}</p>
 
      <h2>{props.name}</h2>
      <p>Age: {props.age}</p>
      <p>Bio: {props.bio}</p>
    </div>
  );
}

export default UserProfile;

import React from 'react';
import UserProfile from './components/UserProfile'; // Adjust path if needed

function App() {
  return (
    
    <div>
      <UserProfile 
        name="Alice" 
        age="25" 
        bio="Loves hiking and photography" 
      />
      <UserProfile
        name="Bob"
        age="30"
        bio="Enjoys coding and gaming"
      />
      {/* You can add more UserProfile components with different data */}
    </div>
  );
}

export default App;