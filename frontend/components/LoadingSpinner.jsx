export default function LoadingSpinner() {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-2 h-2 rounded-full bg-gray-700 animate-bounce delay-75"></div>
      <div className="w-2 h-2 rounded-full bg-gray-700 animate-bounce delay-150"></div>
      <div className="w-2 h-2 rounded-full bg-gray-700 animate-bounce delay-225"></div>
    </div>
  );
}
