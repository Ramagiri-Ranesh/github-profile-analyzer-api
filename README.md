# GitHub Profile Analyzer API

## Objective

GitHub Profile Analyzer API is a Node.js and Express backend that analyzes a public GitHub user profile, fetches the user's repositories from the GitHub API, calculates repository insights, and stores the analyzed profile data in a MySQL database.

## Tech Stack

- Node.js
- Express.js
- MySQL
- mysql2
- Axios
- dotenv
- CORS
- Helmet
- Morgan
- Nodemon

## Features

- Analyze any public GitHub user by username.
- Fetch profile details from the GitHub API.
- Fetch and analyze up to 100 recently updated public repositories.
- Calculate total repositories analyzed, total stars, total forks, average stars, top language, language breakdown, most starred repository, and latest pushed repository.
- Store analyzed profile data in MySQL.
- Update existing profile records when the same GitHub username is analyzed again.
- Fetch all analyzed profiles.
- Fetch one analyzed profile by username.
- Health check endpoint.
- Postman collection file included.

## API Endpoints

Base URL for local development:

```text
http://localhost:5000
```

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/health` | Check whether the API is running. |
| POST | `/api/analyze/:username` | Analyze a GitHub profile and save or update it in the database. |
| GET | `/api/profiles` | Get all analyzed GitHub profiles. |
| GET | `/api/profiles/:username` | Get one analyzed profile from the database. |

## Database Schema

Database name can be configured with `DB_NAME` in the `.env` file.

```sql
CREATE TABLE github_profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  github_id BIGINT NOT NULL,
  username VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  avatar_url TEXT,
  profile_url TEXT,
  bio TEXT,
  company VARCHAR(255),
  location VARCHAR(255),
  blog TEXT,
  public_repos INT DEFAULT 0,
  followers INT DEFAULT 0,
  following_count INT DEFAULT 0,
  public_gists INT DEFAULT 0,
  account_created_at DATETIME,
  total_repos_analyzed INT DEFAULT 0,
  total_stars INT DEFAULT 0,
  total_forks INT DEFAULT 0,
  average_stars DECIMAL(10, 2) DEFAULT 0,
  top_language VARCHAR(100),
  language_breakdown JSON,
  most_starred_repo VARCHAR(255),
  latest_repo_name VARCHAR(255),
  latest_repo_pushed_at DATETIME,
  analyzed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Setup Instructions

1. Clone the repository.

```bash
git clone <github-repository-link>
cd github-profile-analyzer-api
```

2. Install dependencies.

```bash
npm install
```

3. Create a `.env` file in the project root.

```bash
cp .env.example .env
```

4. Create a MySQL database.

```sql
CREATE DATABASE github_profile_analyzer;
```

5. Create the `github_profiles` table using the schema from the Database Schema section.

6. Add your environment variable values in `.env`.

7. Start the API locally.

```bash
npm run dev
```

## Environment Variables

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=github_profile_analyzer
GITHUB_API_BASE_URL=https://api.github.com
GITHUB_TOKEN=your_github_token_optional
```

| Variable | Required | Description |
| --- | --- | --- |
| `PORT` | No | Port used by the Express server. Defaults to `5000`. |
| `DB_HOST` | Yes | MySQL host name. |
| `DB_USER` | Yes | MySQL username. |
| `DB_PASSWORD` | Yes | MySQL password. |
| `DB_NAME` | Yes | MySQL database name. |
| `GITHUB_API_BASE_URL` | Yes | GitHub API base URL. Use `https://api.github.com`. |
| `GITHUB_TOKEN` | No | GitHub personal access token. Useful for higher API rate limits. |

## How to Run Locally

Run in development mode with Nodemon:

```bash
npm run dev
```

Run in production mode:

```bash
npm start
```

After starting the server, test the health endpoint:

```bash
curl http://localhost:5000/api/health
```

## Sample API Responses

### GET `/api/health`

```json
{
  "success": true,
  "message": "GitHub Profile Analyzer API is running"
}
```

### POST `/api/analyze/octocat`

```json
{
  "success": true,
  "message": "GitHub profile analyzed successfully",
  "data": {
    "profile": {
      "github_id": 583231,
      "username": "octocat",
      "name": "The Octocat",
      "avatar_url": "https://avatars.githubusercontent.com/u/583231?v=4",
      "profile_url": "https://github.com/octocat",
      "bio": null,
      "company": "@github",
      "location": "San Francisco",
      "public_repos": 8,
      "followers": 18000,
      "following": 9
    },
    "insights": {
      "totalReposAnalyzed": 8,
      "totalStars": 12000,
      "totalForks": 5000,
      "averageStars": 1500,
      "topLanguage": "Ruby",
      "languageBreakdown": {
        "Ruby": 4,
        "JavaScript": 2,
        "CSS": 1
      },
      "mostStarredRepo": "Spoon-Knife",
      "latestRepoName": "hello-world",
      "latestRepoPushedAt": "2025-01-10T12:30:00Z"
    }
  }
}
```

### GET `/api/profiles`

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 1,
      "username": "octocat",
      "name": "The Octocat",
      "avatar_url": "https://avatars.githubusercontent.com/u/583231?v=4",
      "profile_url": "https://github.com/octocat",
      "public_repos": 8,
      "followers": 18000,
      "following_count": 9,
      "total_repos_analyzed": 8,
      "total_stars": 12000,
      "total_forks": 5000,
      "average_stars": "1500.00",
      "top_language": "Ruby",
      "most_starred_repo": "Spoon-Knife",
      "analyzed_at": "2026-06-24T16:45:00.000Z"
    }
  ]
}
```

### GET `/api/profiles/octocat`

```json
{
  "success": true,
  "data": {
    "id": 1,
    "github_id": 583231,
    "username": "octocat",
    "name": "The Octocat",
    "avatar_url": "https://avatars.githubusercontent.com/u/583231?v=4",
    "profile_url": "https://github.com/octocat",
    "bio": null,
    "company": "@github",
    "location": "San Francisco",
    "blog": "https://github.blog",
    "public_repos": 8,
    "followers": 18000,
    "following_count": 9,
    "public_gists": 8,
    "account_created_at": "2011-01-25T18:44:36.000Z",
    "total_repos_analyzed": 8,
    "total_stars": 12000,
    "total_forks": 5000,
    "average_stars": "1500.00",
    "top_language": "Ruby",
    "language_breakdown": {
      "Ruby": 4,
      "JavaScript": 2,
      "CSS": 1
    },
    "most_starred_repo": "Spoon-Knife",
    "latest_repo_name": "hello-world",
    "latest_repo_pushed_at": "2025-01-10T12:30:00.000Z",
    "analyzed_at": "2026-06-24T16:45:00.000Z",
    "created_at": "2026-06-24T16:45:00.000Z",
    "updated_at": "2026-06-24T16:45:00.000Z"
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "GitHub user not found"
}
```

## Deployment URL

Not deployed yet. Add the deployed API URL here after deployment.

```text
https://your-deployment-url.com
```

## GitHub Repository Link

Repository link is not configured in this local folder yet. Add it here after pushing the project to GitHub.

```text
https://github.com/your-username/github-profile-analyzer-api
```

## Postman Collection

Postman collection file path:

```text
postman/github-profile-analyzer.postman_collection.json
```

Import this file into Postman and set the base URL to:

```text
http://localhost:5000
```
