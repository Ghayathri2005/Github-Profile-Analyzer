"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Error() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <h2 className="text-3xl font-bold mb-4 text-white">Something went wrong</h2>
      <p className="text-gray-400 mb-8">An unexpected error occurred while fetching the profile.</p>
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
