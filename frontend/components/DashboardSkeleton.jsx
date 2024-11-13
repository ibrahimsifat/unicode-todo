const DashboardSkeleton = () => {
  return (
    <div>
      <div class="min-h-screen py-8 px-4 lg:max-w-3xl lg:mx-auto lg:mt-30">
        <div class="bg-white p-4 rounded-lg">
          <div class="flex justify-between items-center mb-4">
            <div class="animate-pulse bg-gray-300 h-8 w-32 rounded"></div>
            <div class="animate-pulse bg-gray-300 h-8 w-8 rounded"></div>
          </div>

          <div class="mb-4">
            <div class="animate-pulse bg-gray-300 h-4 w-1/2 rounded mb-2"></div>
            <div class="animate-pulse bg-gray-300 h-6 w-2/3 rounded"></div>
          </div>

          <div class="space-y-4">
            <div class="bg-gray-200 p-4 rounded-lg animate-pulse">
              <div class="flex items-center mb-2">
                <div class="animate-pulse bg-gray-300 h-6 w-6 rounded mr-2"></div>
                <div class="animate-pulse bg-gray-300 h-6 w-2/3 rounded"></div>
                <div class="flex items-center ml-4">
                  <div class="animate-pulse bg-gray-300 h-8 w-8 rounded mr-2"></div>
                  <div class="animate-pulse bg-gray-300 h-8 w-8 rounded"></div>
                </div>
                <div class="flex items-center ml-4">
                  <div class="animate-pulse bg-gray-300 h-6 w-1/4 rounded mr-2"></div>
                  <div class="animate-pulse bg-gray-300 h-6 w-1/4 rounded"></div>
                </div>
              </div>
            </div>

            <div class="bg-gray-200 p-4 rounded-lg animate-pulse">
              <div class="flex items-center mb-2">
                <div class="animate-pulse bg-gray-300 h-6 w-6 rounded mr-2"></div>
                <div class="animate-pulse bg-gray-300 h-6 w-2/3 rounded"></div>
                <div class="flex items-center ml-4">
                  <div class="animate-pulse bg-gray-300 h-8 w-8 rounded mr-2"></div>
                  <div class="animate-pulse bg-gray-300 h-8 w-8 rounded"></div>
                </div>
                <div class="flex items-center ml-4">
                  <div class="animate-pulse bg-gray-300 h-6 w-1/4 rounded mr-2"></div>
                  <div class="animate-pulse bg-gray-300 h-6 w-1/4 rounded"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gray-200 p-4 rounded-lg mt-4 animate-pulse">
            <div class="w-full bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-full flex items-center">
              <div class="animate-pulse bg-gray-300 h-6 w-6 rounded mr-2"></div>
              <div class="animate-pulse bg-gray-300 h-6 w-2/3 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
