const pool = require("../config/db");
const {
  fetchGithubProfile,
  fetchGithubRepos,
} = require("../services/github.service");
const analyzeRepos = require("../utils/analyzeRepos");

async function analyzeProfile(req, res) {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({
        success: false,
        message: "GitHub username is required",
      });
    }

    const profile = await fetchGithubProfile(username);
    const repos = await fetchGithubRepos(username);
    const insights = analyzeRepos(repos);

    const sql = `
      INSERT INTO github_profiles (
        github_id,
        username,
        name,
        avatar_url,
        profile_url,
        bio,
        company,
        location,
        blog,
        public_repos,
        followers,
        following_count,
        public_gists,
        account_created_at,
        total_repos_analyzed,
        total_stars,
        total_forks,
        average_stars,
        top_language,
        language_breakdown,
        most_starred_repo,
        latest_repo_name,
        latest_repo_pushed_at,
        analyzed_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
      ON DUPLICATE KEY UPDATE
        github_id = VALUES(github_id),
        name = VALUES(name),
        avatar_url = VALUES(avatar_url),
        profile_url = VALUES(profile_url),
        bio = VALUES(bio),
        company = VALUES(company),
        location = VALUES(location),
        blog = VALUES(blog),
        public_repos = VALUES(public_repos),
        followers = VALUES(followers),
        following_count = VALUES(following_count),
        public_gists = VALUES(public_gists),
        account_created_at = VALUES(account_created_at),
        total_repos_analyzed = VALUES(total_repos_analyzed),
        total_stars = VALUES(total_stars),
        total_forks = VALUES(total_forks),
        average_stars = VALUES(average_stars),
        top_language = VALUES(top_language),
        language_breakdown = VALUES(language_breakdown),
        most_starred_repo = VALUES(most_starred_repo),
        latest_repo_name = VALUES(latest_repo_name),
        latest_repo_pushed_at = VALUES(latest_repo_pushed_at),
        analyzed_at = NOW(),
        updated_at = NOW()
    `;

    const values = [
      profile.id,
      profile.login,
      profile.name,
      profile.avatar_url,
      profile.html_url,
      profile.bio,
      profile.company,
      profile.location,
      profile.blog,
      profile.public_repos,
      profile.followers,
      profile.following,
      profile.public_gists,
      profile.created_at ? new Date(profile.created_at) : null,
      insights.totalReposAnalyzed,
      insights.totalStars,
      insights.totalForks,
      insights.averageStars,
      insights.topLanguage,
      JSON.stringify(insights.languageBreakdown),
      insights.mostStarredRepo,
      insights.latestRepoName,
      insights.latestRepoPushedAt
        ? new Date(insights.latestRepoPushedAt)
        : null,
    ];

    await pool.query(sql, values);

    return res.status(200).json({
      success: true,
      message: "GitHub profile analyzed successfully",
      data: {
        profile: {
          github_id: profile.id,
          username: profile.login,
          name: profile.name,
          avatar_url: profile.avatar_url,
          profile_url: profile.html_url,
          bio: profile.bio,
          company: profile.company,
          location: profile.location,
          public_repos: profile.public_repos,
          followers: profile.followers,
          following: profile.following,
        },
        insights,
      },
    });
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({
        success: false,
        message: "GitHub user not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong while analyzing profile",
      error: error.message,
    });
  }
}

async function getAllProfiles(req, res) {
  try {
    const [rows] = await pool.query(`
      SELECT
        id,
        username,
        name,
        avatar_url,
        profile_url,
        public_repos,
        followers,
        following_count,
        total_repos_analyzed,
        total_stars,
        total_forks,
        average_stars,
        top_language,
        most_starred_repo,
        analyzed_at
      FROM github_profiles
      ORDER BY analyzed_at DESC
    `);

    return res.status(200).json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch profiles",
      error: error.message,
    });
  }
}

async function getSingleProfile(req, res) {
  try {
    const { username } = req.params;

    const [rows] = await pool.query(
      `SELECT * FROM github_profiles WHERE username = ?`,
      [username],
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Profile not found in database",
      });
    }

    const profile = rows[0];

    if (typeof profile.language_breakdown === "string") {
      profile.language_breakdown = JSON.parse(profile.language_breakdown);
    }

    return res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
      error: error.message,
    });
  }
}

module.exports = {
  analyzeProfile,
  getAllProfiles,
  getSingleProfile,
};
