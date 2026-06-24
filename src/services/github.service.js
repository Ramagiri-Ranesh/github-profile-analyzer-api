const axios = require("axios");

const githubApi = axios.create({
  baseURL: process.env.GITHUB_API_BASE_URL,
  headers: {
    Accept: "application/vnd.github+json",
    ...(process.env.GITHUB_TOKEN && {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    }),
  },
});

async function fetchGithubProfile(username) {
  const response = await githubApi.get(`/users/${username}`);
  return response.data;
}

async function fetchGithubRepos(username) {
  const response = await githubApi.get(`/users/${username}/repos`, {
    params: {
      per_page: 100,
      sort: "updated",
      direction: "desc",
    },
  });

  return response.data;
}

module.exports = {
  fetchGithubProfile,
  fetchGithubRepos,
};
