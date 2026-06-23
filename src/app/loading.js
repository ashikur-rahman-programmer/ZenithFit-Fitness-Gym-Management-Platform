export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0a0a0a] z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin"></div>
        <p className="text-white/50 text-sm font-medium animate-pulse">
          Loading ZenithFit...
        </p>
      </div>
    </div>
  );
}
