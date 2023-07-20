import { useEffect, useState } from "react";
import { useGetTasks } from "../hooks/useGetTasks";
import "./landingPage.css";
import { UseAddTask } from "../hooks/useAddTask";
import { UseGetTask } from "../hooks/useGetTask";
import { UseDeleteTask } from "../hooks/useDelete";

const LandingPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [searchId, setSearchId] = useState();
  const { getTasks, isLoading, error, tasks } = useGetTasks();
  const {
    addTask,
    isLoading: addTaskIsLoading,
    error: AddTaskError,
  } = UseAddTask();
  const {
    getTask,
    isLoading: getTaskLoading,
    error: getTaskError,
    onetask,
    setTask,
  } = UseGetTask();

  const {
    deleteTask,
    isLoading: deleteLoading,
    error: deleteError,
  } = UseDeleteTask();
  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div id="page">
      <div id="navbar">
        <div id="title">Task Test</div>
        <div id="search">
          <input
            id="searchInput"
            onChange={(e) => {
              setSearchId(e.target.value);
            }}
          />
          <button
            class="searchButton"
            onClick={() => {
              getTask(searchId);
            }}
          >
            {getTaskLoading ? <div>getting...</div> : <div>Get Task</div>}
          </button>
          {getTaskError && <div>{getTaskError}</div>}
        </div>
      </div>
      <div id="body">
        <div>
          {isLoading ? (
            <div class="message">Loading .....</div>
          ) : error ? (
            <div class="message">{error}</div>
          ) : tasks && tasks.length > 0 ? (
            <div id="Alltasks">
              {tasks.map((task) => (
                <div class="tasks">
                  <div>{`Task ID: ${task.task_id}`}</div>
                  <div>{`Title: ${task.title}`}</div>
                  <div>{`Description: ${task.description}`}</div>
                  <div>{`Description: ${task.status}`}</div>
                  <div>{`Created at: ${task.createdAt}`}</div>
                  <div>{`Updated at: ${task.updatedAt}`}</div>
                  <div class="taskbuttons">
                    <button class="searchButton">Edit status</button>
                    <button
                      class="searchButton"
                      style={{ backgroundColor: "red" }}
                      onClick={() => {
                        deleteTask(task.task_id);
                      }}
                    >
                      {deleteLoading ? (
                        <div>deleting....</div>
                      ) : (
                        <div>Delete task</div>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div class="message">No Task Available</div>
          )}
        </div>
        <div id="createtask">
          <div id="craeteTaskTitle">Add A Now Task</div>
          <div class="InputTaskDiv">
            <div class="inputTaskTitle">Title</div>
            <input
              class="InputTask"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div class="InputTaskDiv">
            <div class="inputTaskTitle">Description</div>
            <input
              class="InputTask"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <button
            class="searchButton"
            onClick={() => {
              addTask(title, description);
            }}
          >
            {addTaskIsLoading ? <div>adding...</div> : <div>Add</div>}
          </button>
          {AddTaskError && (
            <div style={{ color: "red", textAlign: "center" }}>
              {AddTaskError}
            </div>
          )}
        </div>
      </div>
      {onetask && (
        <div
          class="tasks"
          id="onetask"
          style={{ position: "absolute", inset: 0 }}
        >
          <button
            onClick={() => {
              setTask(null);
            }}
            style={{ backgroundColor: "red" }}
          >
            X
          </button>
          <div>{`Task ID: ${onetask.task_id}`}</div>
          <div>{`Title: ${onetask.title}`}</div>
          <div>{`Description: ${onetask.description}`}</div>
          <div>{`Description: ${onetask.status}`}</div>
          <div>{`Created at: ${onetask.createdAt}`}</div>
          <div>{`Updated at: ${onetask.updatedAt}`}</div>
          <div class="taskbuttons">
            <button class="editbutton">Edit status</button>
            <button class="deletebutton">Delete task</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default LandingPage;
