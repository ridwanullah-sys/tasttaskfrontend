import { useState } from "react";

export const UseAddTask = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const addTask = async (title, description) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
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
      window.location.reload();
    }
  };

  return { addTask, isLoading, error };
};
