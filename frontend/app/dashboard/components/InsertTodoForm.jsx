import { useAddTaskMutation, useGetTasksQuery } from "@/features/task/tasksApi";
import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { MdOutlineEditNote } from "react-icons/md";
import { useSelector } from "react-redux";

const priorityOptions = [
  { value: "low", label: "Low", id: 1 },
  { value: "medium", label: "Medium", id: 2 },
  { value: "high", label: "High", id: 3 },
];

const InsertTodoForm = ({ isFormOpen, setIsFormOpen }) => {
  // state for title, priority, and duedate
  const [taskState, setTaskState] = useState({
    title: "",
    priority: "medium",
    duedate: "",
  });

  const [addTask, { isLoading, error }] = useAddTaskMutation();
  const { refetch } = useGetTasksQuery();
  const user = useSelector((state) => state.user);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    // Update the specific field in the taskState object
    setTaskState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!taskState.title || !taskState.duedate) {
      alert("Task description and due date cannot be empty!");
      return;
    }

    try {
      const newTask = {
        user_id: user.id,
        title: taskState.title,
        duedate: taskState.duedate,
        status: "pending",
        priority: taskState.priority,
      };

      await addTask(newTask).unwrap();
      await refetch();

      setTaskState({ title: "", priority: "low", duedate: "" }); // Clear the input fields
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  return (
    <div>
      <form onSubmit={handleAddTask}>
        <div className="flex items-center bg-gray-100 px-4 py-4 rounded-md my-6">
          <MdOutlineEditNote size={35} />

          <input
            type="text"
            name="title"
            placeholder="Type your todo"
            value={taskState.title}
            className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
            onChange={handleOnChange}
            required
          />

          <select
            name="priority"
            className="select select-sm max-w-xs focus:outline-none appearance-none"
            value={taskState.priority}
            onChange={handleOnChange}
          >
            <option disabled selected className="text-gray-800">
              Priority
            </option>
            {priorityOptions.map((option) => (
              <option
                key={option.id}
                value={option.value}
                className="hover:bg-gray-400 transition-colors duration-300 ease-in delay-150"
              >
                {option.label}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="duedate"
            value={taskState.duedate}
            required
            className="border-none outline-none bg-gray-100 text-gray-500 mx-4"
            onChange={handleOnChange}
          />

          <button
            type="submit"
            className={`appearance-none w-8 h-8 bg-no-repeat bg-contain hover:bg-gray-200 rounded-md `}
            onClick={() => setIsFormOpen(!isFormOpen)}
          >
            <IoMdCloseCircle size={30} color="red" />
          </button>
        </div>
        <SubmitButton />
      </form>
    </div>
  );
};

const SubmitButton = () => {
  return (
    <button className="flex items-center justify-center w-full py-2 mt-4 text-gray-600 hover:text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md border-2 border-dashed border-gray-300">
      <div className="w-11/12 flex items-center justify-center">
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
          <span className="text-sm font-semibold">New Task</span>
        </div>
      </div>
    </button>
  );
};

export default InsertTodoForm;
