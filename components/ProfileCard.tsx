import { GitHubUser } from "@/types/github";
import Image from "next/image";
import { MapPin, Link as LinkIcon, Twitter, Calendar } from "lucide-react";

export default function ProfileCard({
  user,
  totalStars,
}: {
  user: GitHubUser;
  totalStars: number;
}) {
  const createdYear = new Date(user.created_at).getFullYear();

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 border border-gray-800 bg-[#161b22] rounded-3xl p-8 hover-glow relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="relative shrink-0">
        <Image
          src={user.avatar_url}
          alt={user.login}
          width={150}
          height={150}
          className="rounded-full border-4 border-[#0d1117] shadow-xl"
        />
      </div>

      <div className="flex-1 text-center md:text-left z-10">
        <h1 className="text-3xl font-bold text-white mb-1">
          {user.name || user.login}
        </h1>
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline text-lg font-medium inline-block mb-4"
        >
          @{user.login}
        </a>

        {user.bio && (
          <p className="text-gray-300 text-lg mb-6 max-w-2xl leading-relaxed">
            {user.bio}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-400 mb-6">
          {user.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>{user.location}</span>
            </div>
          )}
          {user.blog && (
            <div className="flex items-center gap-1.5">
              <LinkIcon className="w-4 h-4" />
              <a
                href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                {user.blog}
              </a>
            </div>
          )}
          {user.twitter_username && (
            <div className="flex items-center gap-1.5">
              <Twitter className="w-4 h-4" />
              <a
                href={`https://twitter.com/${user.twitter_username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                @{user.twitter_username}
              </a>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>Member since {createdYear}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          <Badge label="Public Repos" value={user.public_repos} />
          <Badge label="Followers" value={user.followers} />
          <Badge label="Following" value={user.following} />
          <Badge label="Total Stars" value={totalStars} />
        </div>
      </div>
    </div>
  );
}

function Badge({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-[#0d1117] border border-gray-800 px-4 py-2 rounded-lg flex items-center gap-2">
      <span className="text-gray-400 text-sm">{label}</span>
      <span className="font-bold text-white">{value.toLocaleString()}</span>
    </div>
  );
}
