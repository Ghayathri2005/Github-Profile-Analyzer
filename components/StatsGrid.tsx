import { GitHubUser } from "@/types/github";
import { BookOpen, Star, GitFork, Users } from "lucide-react";

export default function StatsGrid({
  user,
  totalStars,
  totalForks,
}: {
  user: GitHubUser;
  totalStars: number;
  totalForks: number;
}) {
  const stats = [
    {
      label: "Total Repositories",
      value: user.public_repos,
      icon: BookOpen,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      label: "Total Stars Earned",
      value: totalStars,
      icon: Star,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
    },
    {
      label: "Total Forks",
      value: totalForks,
      icon: GitFork,
      color: "text-green-400",
      bg: "bg-green-400/10",
    },
    {
      label: "Followers",
      value: user.followers,
      icon: Users,
      color: "text-pink-400",
      bg: "bg-pink-400/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-[#161b22]/80 backdrop-blur border border-gray-800 rounded-2xl p-6 flex items-center gap-4 hover-glow"
        >
          <div className={`p-4 rounded-xl ${stat.bg}`}>
            <stat.icon className={`w-8 h-8 ${stat.color}`} />
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">
              {stat.value.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
