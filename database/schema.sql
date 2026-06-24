
CREATE TABLE github_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,

    github_id BIGINT NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE,
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
    average_stars DECIMAL(10,2) DEFAULT 0,
    top_language VARCHAR(100),
    language_breakdown JSON,
    most_starred_repo VARCHAR(255),
    latest_repo_name VARCHAR(255),
    latest_repo_pushed_at DATETIME,

    analyzed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);