import { useState } from "react";

export const UseGetTask = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [task, setTask] = useState(null);

  const getTask = async (task_id) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`/tasks/${task_id}`);

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.err);
    }
    if (response.ok) {
      // save the user to local storage
      console.log(json);
      setTask(json);
      // update loading state
      setIsLoading(false);
    }
  };

  return { getTask, isLoading, error, onetask: task, setTask };
};
