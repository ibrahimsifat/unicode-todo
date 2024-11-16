const DashboardSkeleton = () => {
  return (
    <div>
      <div className="navbar bg-base-200 sticky top-0 z-50 ">
        <div className="flex justify-between items-center max-w-screen-lg mx-auto w-full"></div>
      </div>
      <div className="min-h-screen py-8 px-4 lg:max-w-3xl lg:mx-auto lg:mt-14 lg:mb-10 ">
        <div className="bg-white p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <div className="animate-pulse bg-gray-300 h-8 w-32 rounded"></div>
            <div className="animate-pulse bg-gray-300 h-8 w-8 rounded"></div>
          </div>

          <div className="mb-4">
            <div className="animate-pulse bg-gray-300 h-4 w-1/2 rounded mb-2"></div>
            <div className="animate-pulse bg-gray-300 h-6 w-2/3 rounded"></div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-200 p-4 rounded-lg animate-pulse">
              <div className="flex items-center mb-2">
                <div className="animate-pulse bg-gray-300 h-6 w-6 rounded mr-2"></div>
                <div className="animate-pulse bg-gray-300 h-6 w-2/3 rounded"></div>
                <div className="flex items-center ml-4">
                  <div className="animate-pulse bg-gray-300 h-8 w-8 rounded mr-2"></div>
                  <div className="animate-pulse bg-gray-300 h-8 w-8 rounded"></div>
                </div>
                <div className="flex items-center ml-4">
                  <div className="animate-pulse bg-gray-300 h-6 w-1/4 rounded mr-2"></div>
                  <div className="animate-pulse bg-gray-300 h-6 w-1/4 rounded"></div>
                </div>
              </div>
            </div>

            <div className="bg-gray-200 p-4 rounded-lg animate-pulse">
              <div className="flex items-center mb-2">
                <div className="animate-pulse bg-gray-300 h-6 w-6 rounded mr-2"></div>
                <div className="animate-pulse bg-gray-300 h-6 w-2/3 rounded"></div>
                <div className="flex items-center ml-4">
                  <div className="animate-pulse bg-gray-300 h-8 w-8 rounded mr-2"></div>
                  <div className="animate-pulse bg-gray-300 h-8 w-8 rounded"></div>
                </div>
                <div className="flex items-center ml-4">
                  <div className="animate-pulse bg-gray-300 h-6 w-1/4 rounded mr-2"></div>
                  <div className="animate-pulse bg-gray-300 h-6 w-1/4 rounded"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-200 p-4 rounded-lg mt-4 animate-pulse">
            <div className="w-full bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-full flex items-center">
              <div className="animate-pulse bg-gray-300 h-6 w-6 rounded mr-2"></div>
              <div className="animate-pulse bg-gray-300 h-6 w-2/3 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
