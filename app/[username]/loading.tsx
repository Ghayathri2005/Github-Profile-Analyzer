export default function Loading() {
  return (
    <div className="min-h-screen max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 animate-pulse">
      <div className="h-6 w-32 bg-gray-800 rounded mb-8" />
      
      {/* Profile Card Skeleton */}
      <div className="border border-gray-800 bg-[#161b22] rounded-3xl p-8 flex flex-col md:flex-row gap-8">
        <div className="w-[150px] h-[150px] rounded-full bg-gray-800 shrink-0 mx-auto md:mx-0" />
        <div className="flex-1 space-y-4">
          <div className="h-8 bg-gray-800 rounded w-1/3" />
          <div className="h-4 bg-gray-800 rounded w-1/4" />
          <div className="space-y-2 mt-4">
            <div className="h-4 bg-gray-800 rounded w-full max-w-2xl" />
            <div className="h-4 bg-gray-800 rounded w-5/6 max-w-2xl" />
          </div>
          <div className="flex gap-4 mt-6">
            <div className="h-10 w-24 bg-gray-800 rounded" />
            <div className="h-10 w-24 bg-gray-800 rounded" />
            <div className="h-10 w-24 bg-gray-800 rounded" />
          </div>
        </div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-[#161b22]/80 border border-gray-800 rounded-2xl p-6 h-28" />
        ))}
      </div>

      {/* Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 border border-gray-800 bg-[#161b22]/50 rounded-2xl p-6 h-[400px]" />
        <div className="lg:col-span-2 border border-gray-800 bg-[#161b22]/50 rounded-2xl p-6 h-[400px]" />
      </div>
    </div>
  );
}
