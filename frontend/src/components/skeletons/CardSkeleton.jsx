const CardSkeleton = () => (
  <div className="rounded-xl shadow-lg p-6 bg-gradient-to-br from-gray-500 to-gray-400 animate-pulse">
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="w-24 h-5 bg-gray-600 rounded"></div>
        <div className="flex gap-4 items-center">
          <div className="w-5 h-5 bg-gray-600 rounded-full"></div>
          <div className="w-5 h-5 bg-gray-600 rounded-full"></div>
        </div>
      </div>
      <div className="w-full h-4 bg-gray-600 rounded mt-2"></div>
      <div className="w-full h-4 bg-gray-600 rounded mt-2"></div>
      <div className="w-full h-4 bg-gray-600 rounded mt-2"></div>
      <div className="w-full h-4 bg-gray-600 rounded mt-2"></div>
    </div>
  </div>
);

export default CardSkeleton;