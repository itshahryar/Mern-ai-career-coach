import { useState } from "react";
import { toast } from "sonner";

// @@@ HOOKS @@@
// ✅ They help fetch and manage backend data in the frontend.
// Your useFetch hook does not directly fetch data from the backend, but it makes API requests
// using a function (cb) and manages:
// Hooks don’t send data but help fetch, manage, and display backend data in the frontend efficiently 🚀

// Custom hook for handling API requests
const useFetch = (cb) => {
    // State for storing data, loading status, and errors
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  // Function to call the API + All Logic Here + For reuse
  const fn = async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(...args); // Call the provided API function
      setData(response);
      setError(null);
    } catch (error) {
      setError(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn, setData };
};

export default useFetch;
