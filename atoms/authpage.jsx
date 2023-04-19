import { useEffect } from "react";

export function useClearAuthTokenOnUnload(auth_token) {
  useEffect(() => {
    // Store the authentication token in localStorage // Listen for the beforeunload event and remove the authentication token from localStorage
    const onBeforeUnload = () => {
      localStorage.removeItem("auth_token");
    };
    window.addEventListener("beforeunload", onBeforeUnload);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, [auth_token]);
}
