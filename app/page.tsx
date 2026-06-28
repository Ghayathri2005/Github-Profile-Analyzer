"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      router.push(`/${username}`);
    }
  };

  const exampleUsers = ["torvalds", "gaearon", "sindresorhus"];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="z-10 text-center max-w-2xl w-full">
        <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          GitHub Profile Analyzer
        </h1>
        <p className="text-xl text-gray-400 mb-10">
          Analyze any GitHub profile instantly
        </p>

        <form onSubmit={handleSearch} className="flex gap-4 w-full max-w-md mx-auto mb-8">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter GitHub username..."
              className="block w-full pl-10 pr-3 py-4 border border-gray-700 rounded-xl leading-5 bg-[#161b22] text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent sm:text-sm transition-all shadow-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="px-6 py-4 border border-transparent text-sm font-medium rounded-xl text-white bg-accent hover:bg-accent/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent focus:ring-offset-[#0d1117] transition-all shadow-lg shadow-accent/20"
          >
            Analyze
          </button>
        </form>

        <div className="flex flex-col items-center gap-3">
          <span className="text-sm text-gray-500">Try these profiles:</span>
          <div className="flex flex-wrap justify-center gap-3">
            {exampleUsers.map((user) => (
              <button
                key={user}
                onClick={() => setUsername(user)}
                className="px-4 py-2 rounded-full border border-gray-700 bg-[#161b22] text-sm text-gray-400 hover:text-white hover:border-gray-500 hover:bg-gray-800 transition-colors"
              >
                {user}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
