import { GitHubUser, GitHubRepo } from "@/types/github";
import ProfileCard from "@/components/ProfileCard";
import StatsGrid from "@/components/StatsGrid";
import LanguageChart from "@/components/LanguageChart";
import RepoCard from "@/components/RepoCard";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

async function getUserData(username: string) {
  const res = await fetch(`https://api.github.com/users/${username}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    if (res.status === 404) return { error: "not_found" };
    if (res.status === 403) return { error: "rate_limit" };
    throw new Error("Failed to fetch user data");
  }

  return res.json();
}

async function getUserRepos(username: string) {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=stars`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch repos");
  }

  return res.json();
}

export default async function ResultsPage({
  params,
}: {
  params: { username: string };
}) {
  const userData = await getUserData(params.username);

  if (userData.error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-bold mb-4 text-white">
          {userData.error === "not_found"
            ? "User not found"
            : "API Rate Limit Reached"}
        </h2>
        <p className="text-gray-400 mb-8">
          {userData.error === "not_found"
            ? `Could not find a GitHub user with the handle @${params.username}`
            : "GitHub API rate limit reached. Please try again in a minute."}
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl text-white bg-accent hover:bg-accent/80 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>
    );
  }

  const user = userData as GitHubUser;
  const repos = (await getUserRepos(params.username)) as GitHubRepo[];

  const topRepos = repos
    .filter((repo) => !repo.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);

  const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
  const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0);

  return (
    <main className="min-h-screen max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 animate-in fade-in duration-500">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Search Another Profile
      </Link>

      <ProfileCard user={user} totalStars={totalStars} />

      <StatsGrid
        user={user}
        totalStars={totalStars}
        totalForks={totalForks}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 border border-gray-800 bg-[#161b22]/50 backdrop-blur-sm rounded-2xl p-6 hover-glow">
          <h2 className="text-xl font-bold mb-6 text-white border-b border-gray-800 pb-2">
            Most Used Languages
          </h2>
          <LanguageChart repos={repos} />
        </div>

        <div className="lg:col-span-2 border border-gray-800 bg-[#161b22]/50 backdrop-blur-sm rounded-2xl p-6 hover-glow">
          <h2 className="text-xl font-bold mb-6 text-white border-b border-gray-800 pb-2">
            Top Repositories by Stars
          </h2>
          {topRepos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {topRepos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              No public repositories found.
            </p>
          )}
        </div>
      </div>

      <footer className="pt-8 border-t border-gray-800 text-center text-sm text-gray-500 pb-12">
        <p>Analysis generated for @{user.login} on {new Date().toLocaleDateString()}</p>
      </footer>
    </main>
  );
}
