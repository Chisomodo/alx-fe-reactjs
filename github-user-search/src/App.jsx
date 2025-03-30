import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Search from "./components/Search";

function App() {
  const [username, setUsername] = useState(""); // Store input value
  const [userData, setUserData] = useState(null); // Store GitHub user data
  const [error, setError] = useState(""); // Store error messages

  const GITHUB_API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY; // Load API key

  const fetchGitHubUser = async () => {
    if (!username) {
      setError("Please enter a GitHub username.");
      return;
    }

    try {
      setError(""); // Clear previous errors

      const response = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
          Authorization: `token ${GITHUB_API_KEY}`,
        },
      });

      if (!response.ok) {
        throw new Error("User not found.");
      }

      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError(err.message);
      setUserData(null);
    }
  };

  return (
    <>
    <div className="App">
      <h1>GitHub User Search</h1>
      <Search />
    </div>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>GitHub User Search</h1>

      {/* Input field for GitHub username */}
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={fetchGitHubUser}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display user data if available */}
      {userData && (
        <div className="card">
          <img src={userData.avatar_url} alt="User Avatar" width={100} />
          <h2>{userData.name || userData.login}</h2>
          <p>{userData.bio}</p>
          <a href={userData.html_url} target="_blank">
            View Profile
          </a>
        </div>
      )}
    </>
  );
}

export default App;
