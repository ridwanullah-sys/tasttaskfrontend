import { useState } from "react";

export const UseDeleteTask = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const deleteTask = async (task_id) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/tasks", {
      method: "DEL",
      body: JSON.stringify({ task_id }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.err);
      console.log(json.err);
    }
    if (response.ok) {
      // save the user to local storage
      console.log(json);

      // update loading state
      setIsLoading(false);
      //window.location.reload();
    }
  };

  return { deleteTask, isLoading, error };
};
