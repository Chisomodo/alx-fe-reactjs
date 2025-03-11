// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useParams } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Blog from './components/Blog'; // Assuming you have a Blog component



// Components
const Home = () => <h2>Home Page</h2>;
const About = () => <h2>About Page</h2>;
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'user' && password === 'password') {
      onLogin(true);
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const Profile = () => {
  return (
    <div>
      <h2>Profile</h2>
      <nav>
        <Link to="/profile/details">Details</Link> | <Link to="/profile/settings">Settings</Link>
      </nav>
      <Routes>
        <Route path="details" element={<ProfileDetails />} />
        <Route path="settings" element={<ProfileSettings />} />
      </Routes>
    </div>
  );
};

const ProfileDetails = () => <h3>Profile Details</h3>;
const ProfileSettings = () => <h3>Profile Settings</h3>;

const BlogPost = () => {
  const { postId } = useParams();
  return <h3>Blog Post: {postId}</h3>;
};

const ProtectedRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Switch>
        {/* ... other routes ... */}
        <Route path="/blog/:id" component={Blog} />
        {/* ... other routes ... */}
      </Switch>
    </Router>
  );
}



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (status) => {
    setIsAuthenticated(status);
  };

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/profile">Profile</Link> | <Link to="/blog/123">Blog Post 123</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/profile/*"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/blog/:postId" element={<BlogPost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;







export default App;