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

### POST `/api/analyze/Ramagiri-Ranesh`

```json
{
  "success": true,
  "message": "GitHub profile analyzed successfully",
  "data": {
    "profile": {
      "github_id": 118656281,
      "username": "Ramagiri-Ranesh",
      "name": null,
      "avatar_url": "https://avatars.githubusercontent.com/u/118656281?v=4",
      "profile_url": "https://github.com/Ramagiri-Ranesh",
      "bio": null,
      "company": null,
      "location": null,
      "public_repos": 21,
      "followers": 0,
      "following": 0
    },
    "insights": {
      "totalReposAnalyzed": 21,
      "totalStars": 0,
      "totalForks": 0,
      "averageStars": 0,
      "topLanguage": "JavaScript",
      "languageBreakdown": {
        "JavaScript": 9,
        "TypeScript": 3,
        "EJS": 1,
        "HTML": 5,
        "Jupyter Notebook": 1,
        "Python": 1
      },
      "mostStarredRepo": "github-profile-analyzer-api",
      "latestRepoName": "github-profile-analyzer-api",
      "latestRepoPushedAt": "2026-06-24T17:49:57Z"
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
      "username": "Ramagiri-Ranesh",
      "name": null,
      "avatar_url": "https://avatars.githubusercontent.com/u/118656281?v=4",
      "profile_url": "https://github.com/Ramagiri-Ranesh",
      "public_repos": 21,
      "followers": 0,
      "following_count": 0,
      "total_repos_analyzed": 21,
      "total_stars": 0,
      "total_forks": 0,
      "average_stars": "0.00",
      "top_language": "JavaScript",
      "most_starred_repo": "github-profile-analyzer-api",
      "analyzed_at": "2026-06-24T18:02:39.000Z"
    }
  ]
}
```

### GET `/api/profiles/Ramagiri-Ranesh`

```json
{
  "success": true,
  "data": {
    "id": 1,
    "github_id": 118656281,
    "username": "Ramagiri-Ranesh",
    "name": null,
    "avatar_url": "https://avatars.githubusercontent.com/u/118656281?v=4",
    "profile_url": "https://github.com/Ramagiri-Ranesh",
    "bio": null,
    "company": null,
    "location": null,
    "blog": "",
    "public_repos": 21,
    "followers": 0,
    "following_count": 0,
    "public_gists": 0,
    "account_created_at": "2022-11-20T08:02:07.000Z",
    "total_repos_analyzed": 21,
    "total_stars": 0,
    "total_forks": 0,
    "average_stars": "0.00",
    "top_language": "JavaScript",
    "language_breakdown": {
      "EJS": 1,
      "HTML": 5,
      "Python": 1,
      "JavaScript": 9,
      "TypeScript": 3,
      "Jupyter Notebook": 1
    },
    "most_starred_repo": "github-profile-analyzer-api",
    "latest_repo_name": "github-profile-analyzer-api",
    "latest_repo_pushed_at": "2026-06-24T17:49:57.000Z",
    "analyzed_at": "2026-06-24T18:02:39.000Z",
    "created_at": "2026-06-24T17:52:48.000Z",
    "updated_at": "2026-06-24T18:02:39.000Z"
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

```text
https://github-profile-analyzer-api-m4ad.onrender.com
```

## GitHub Repository Link

```text
https://github.com/Ramagiri-Ranesh/github-profile-analyzer-api
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
