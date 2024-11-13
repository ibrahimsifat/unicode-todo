"use client";
import DashboardSkeleton from "@/components/DashboardSkeleton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FcCalendar } from "react-icons/fc";
import { IoGrid } from "react-icons/io5";
import {
  MdOutlineDragIndicator,
  MdOutlineKeyboardCommandKey,
} from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If user is not authenticated, redirect to the login page
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <DashboardSkeleton />; // Loading state while session is being checked
  }

  return (
    <div>
      <TaskList />
    </div>
  );
}

const TaskList = () => {
  return (
    <div className="w-full max-w-3xl mx-auto p-8 bg-white rounded-xl  mt-10">
      {/* Greeting Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Good Evening, Camero{" "}
            <span role="img" aria-label="smiling face">
              🤩
            </span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            It's Monday, 25 September 2023
          </p>
        </div>
        <button className="focus:outline-none bg-gray-50 p-1 rounded-md">
          <IoGrid size={22} />
        </button>
      </div>

      {/* Task List Header */}
      {/* one day task */}

      <div className="bg-base-100 collapse collapse-arrow collapse-open">
        <input type="checkbox" className="peer" />
        <div className="collapse-title  bg-gray-50  peer-checked:bg-gray-100 ">
          <div className="flex items-center justify-between mb-4 ">
            <div className="flex items-center ">
              <FcCalendar size={20} />
              <span className="text-lg font-semibold text-gray-700">Today</span>
              <span className=" bg-gray-200 text-gray-800 text-sm font-medium px-2 mx-3 py-1 rounded">
                4
              </span>
            </div>
          </div>
        </div>

        <div className="collapse-content bg-gray-100  peer-checked:bg-gray-100 ">
          {/* Task Items */}
          <div className="space-y-4">
            {/* Task Item 1 */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
              <div className="flex items-center space-x-2">
                <MdOutlineDragIndicator size={23} color="gray" />

                <input type="checkbox" className="checkbox text-gray-400" />

                <span className="text-sm text-gray-800 ">
                  Finish the sales presentation for the client meeting at 2:00
                  PM
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  <div className="avatar-group -space-x-4 rtl:space-x-reverse">
                    <div className="avatar">
                      <div className="w-8">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                      </div>
                    </div>
                    <div className="avatar">
                      <div className="w-8">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                      </div>
                    </div>
                  </div>
                </div>
                <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-0.5 rounded">
                  Today
                </span>
                <button className="text-gray-400 hover:text-gray-600">
                  <RiDeleteBin6Line />
                </button>
              </div>
            </div>
            {/* Task Item 2 */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
              <div className="flex items-center space-x-2">
                <MdOutlineDragIndicator size={23} color="gray" />

                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox text-gray-400"
                />

                <span className="text-sm text-gray-800 line-through">
                  Finish the sales presentation for the client meeting at 2:00
                  PM
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  <div className="avatar-group -space-x-4 rtl:space-x-reverse">
                    <div className="avatar">
                      <div className="w-8">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                      </div>
                    </div>
                    <div className="avatar">
                      <div className="w-8">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                      </div>
                    </div>
                  </div>
                </div>
                <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-0.5 rounded">
                  Today
                </span>
                <button className="text-gray-400 hover:text-gray-600">
                  <RiDeleteBin6Line />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <DashboardSkeleton /> */}

      {/* Add New Task */}
      <button className="flex items-center justify-center w-full py-2 mt-4 text-gray-600 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md border-2 border-dashed border-gray-300">
        <div className="w-11/12 flex items-center justify-between">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span
              className="text
-sm font-semibold"
            >
              New Task
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-white rounded px-2 py-1">
              <MdOutlineKeyboardCommandKey size={17} />
            </div>
            <span className="text-sm font-semibold bg-white rounded px-3 py-0.5">
              T
            </span>
          </div>
        </div>
      </button>
    </div>
  );
};
