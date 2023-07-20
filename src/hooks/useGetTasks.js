import { useState } from "react";

export const useGetTasks = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [tasks, setTasks] = useState();

  const getTasks = async () => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/tasks");

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.err);
    }
    if (response.ok) {
      setTasks(json);

      setIsLoading(false);
    }
  };

  return { getTasks, isLoading, error, tasks };
};
