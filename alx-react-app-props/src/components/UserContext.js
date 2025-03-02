


import React from 'react';

const UserContext = React.createContext({
  userData: null, // Provide a default value! Prevents potential undefined errors.
  setUserData: () => {}, // Provide a default no-op function.
});

export default UserContext;




function App() {
    const [user, setUser] = useState(null); // Initialize user state (e.g., null, or initial user data)
  
    return (
      <UserContext.Provider value={{ user, setUser }}>
        {/* Your app components go here */}
        <Router> 
          {/* Example: setting up routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    );
  }