export default function LoadingSpinner() {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-3 h-3 rounded-full bg-gray-700 animate-bounce delay-75"></div>
      <div className="w-3 h-3 rounded-full bg-gray-700 animate-bounce delay-150"></div>
      <div className="w-3 h-3 rounded-full bg-gray-700 animate-bounce delay-225"></div>
    </div>
  );
}
