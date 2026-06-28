import { GitHubRepo } from "@/types/github";
import { Star, GitFork } from "lucide-react";

// Simple color map for common languages
const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Ruby: "#701516",
  PHP: "#4F5D95",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Swift: "#F05138",
};

export default function RepoCard({ repo }: { repo: GitHubRepo }) {
  const languageColor = repo.language
    ? languageColors[repo.language] || "#8b949e"
    : "#8b949e";

  return (
    <div className="flex flex-col bg-[#0d1117] border border-gray-800 rounded-xl p-5 hover-glow h-full">
      <div className="flex-1">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-bold text-accent hover:underline mb-2 line-clamp-1"
        >
          {repo.name}
        </a>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2 min-h-[40px]">
          {repo.description || "No description provided."}
        </p>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-400 mt-4 pt-4 border-t border-gray-800">
        <div className="flex items-center gap-4">
          {repo.language && (
            <div className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: languageColor }}
              />
              <span>{repo.language}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5" />
            <span>{repo.stargazers_count}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="w-3.5 h-3.5" />
            <span>{repo.forks_count}</span>
          </div>
        </div>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-white bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-md transition-colors"
        >
          View
        </a>
      </div>
    </div>
  );
}
