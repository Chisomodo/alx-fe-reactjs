import axios from "axios";

const GITHUB_API_BASE_URL = "https://api.github.com/search/users?q";

export const fetchUsers = async (query, location, minRepos) => {
  try {
    const searchQuery = `q=${query} ${location ? `location:${location}` : ""} ${
      minRepos ? `repos:>${minRepos}` : ""
    }`;

    const response = await axios.get(`${BASE_URL}?${searchQuery}`);
    return response.data.items;
  } catch (error) {
    throw new Error("Error fetching GitHub users");
  }
};
