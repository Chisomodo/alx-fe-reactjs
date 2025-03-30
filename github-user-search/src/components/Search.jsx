import React, { useState, useCallback } from 'react';
import { fetchUserData, searchUsers } from '../services/githubService';

function Search() {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [userData, setUserData] = useState(null);
  const [users, setUsers] = useState([]); // For multiple users in advanced search
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // Track if there are more pages to load
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleMinReposChange = (event) => {
    setMinRepos(event.target.value);
  };

  const handleBasicSearch = async (event) => {
    event.preventDefault();
    setUsers([]); // Clear previous advanced search results
    setUserData(null);
    setError('');
    setLoading(true);
    setPage(1);
    setHasMore(true);
    setIsAdvancedSearch(false);

    try {
      const data = await fetchUserData(username);
      setUserData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Looks like we cant find the user');
      setLoading(false);
    }
  };

  const handleAdvancedSearch = useCallback(async (loadMore = false) => {
    if (loading) return; // Prevent multiple concurrent requests

    if (!loadMore) {
      setUsers([]); // Clear previous search results
      setPage(1);
      setHasMore(true); // Reset for new search
    }

    setError('');
    setLoading(true);
    setIsAdvancedSearch(true);

    try {
      const query = {
        username,
        location,
        minRepos,
        page,
      };

      const result = await searchUsers(query);

      if (result.items.length === 0) {
        setHasMore(false);
        setLoading(false);
        if (users.length === 0) {
          setError('No users found matching your criteria.');
        }
        return;
      }
      if (loadMore) {
        setUsers((prevUsers) => [...prevUsers, ...result.items]);
      } else {
        setUsers(result.items);
      }

      setPage((prevPage) => prevPage + 1);
      setHasMore(result.items.length === 30); // GitHub API returns max 30 items per page
      setLoading(false);
    } catch (error) {
      console.error('Error searching users:', error);
      setError('Error searching users');
      setLoading(false);
      setHasMore(false);
    }
  }, [username, location, minRepos, page, loading, users.length]);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      handleAdvancedSearch(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <form onSubmit={handleBasicSearch} className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Enter GitHub username"
            value={username}
            onChange={handleInputChange}
            className="flex-1 border rounded p-2"
          />
          <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded">
            Search
          </button>
        </form>

        <div className="border rounded p-4">
          <h2 className="text-lg font-semibold mb-4">Advanced Search</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={handleLocationChange}
              className="border rounded p-2"
            />
            <input
              type="number"
              placeholder="Minimum Repositories"
              value={minRepos}
              onChange={handleMinReposChange}
              className="border rounded p-2"
            />
            <button
              type="button"
              onClick={() => {
                setPage(1);
                setUsers([]);
                setHasMore(true);
                handleAdvancedSearch();
              }}
              disabled={loading}
              className="md:col-span-1 bg-green-500 text-white px-4 py-2 rounded"
            >
              Search Users
            </button>
          </div>
        </div>
      </div>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {userData && !isAdvancedSearch && (
        <div className="border rounded p-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="rounded-full overflow-hidden h-16 w-16">
              {userData.avatar_url && <img src={userData.avatar_url} alt={userData.login} className="h-full w-full object-cover"/>}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-blue-600">{userData.name || userData.login}</h3>
              <div className="flex gap-2">
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded">
                  {userData.followers} Followers
                </span>
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded">
                  {userData.public_repos} Repos
                </span>
              </div>
            </div>
          </div>
          <div>
            <p className="text-gray-700">Username: <span className="font-medium">{userData.login}</span></p>
            {userData.location && <p className="text-gray-700">Location: <span className="font-medium">{userData.location}</span></p>}
            {userData.html_url && (
              <p>
                <a
                  href={userData.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View Profile on GitHub
                </a>
              </p>
            )}
          </div>
        </div>
      )}

      {/* Display for Advanced Search Results */}
      {isAdvancedSearch && users.length > 0 && (
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="border rounded p-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="rounded-full overflow-hidden h-16 w-16">
                  <img src={user.avatar_url} alt={user.login} className="h-full w-full object-cover" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-600">{user.login}</h3>
                  {user.location && <p className="text-sm text-gray-500">Location: <span className="font-medium">{user.location}</span></p>}
                  <div className="flex gap-2">
                    <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded">
                      {user.followers} Followers
                    </span>
                    <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded">
                      {user.public_repos} Repos
                    </span>
                  </div>
                </div>
              </div>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Profile on GitHub
              </a>
            </div>
          ))}
          {hasMore && (
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;