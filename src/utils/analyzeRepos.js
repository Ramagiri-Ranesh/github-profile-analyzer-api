function analyzeRepos(repos) {
  let totalStars = 0;
  let totalForks = 0;
  const languages = {};

  let mostStarredRepo = null;
  let latestRepo = repos[0] || null;

  for (const repo of repos) {
    totalStars += repo.stargazers_count || 0;
    totalForks += repo.forks_count || 0;

    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }

    if (
      !mostStarredRepo ||
      repo.stargazers_count > mostStarredRepo.stargazers_count
    ) {
      mostStarredRepo = repo;
    }
  }

  const topLanguage =
    Object.entries(languages).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

  return {
    totalReposAnalyzed: repos.length,
    totalStars,
    totalForks,
    averageStars: repos.length
      ? Number((totalStars / repos.length).toFixed(2))
      : 0,
    topLanguage,
    languageBreakdown: languages,
    mostStarredRepo: mostStarredRepo?.name || null,
    latestRepoName: latestRepo?.name || null,
    latestRepoPushedAt: latestRepo?.pushed_at || null,
  };
}

module.exports = analyzeRepos;
