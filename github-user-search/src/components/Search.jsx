import { useState } from "react";
import { fetchUserData } from "../services/githubService";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setUserData(null);

    try {
      const data = await fetchUserData(searchTerm);
      setUserData(data);
    } catch (err) {
      setError("Looks like we can't find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search GitHub username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {userData && (
        <div className="user-info">
          <img src={userData.avatar_url} alt={userData.login} width="100" />
          <h2>{userData.name || userData.login}</h2>
          <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
            View Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default Search;
