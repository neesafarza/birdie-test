import { useRef, useEffect } from "react";

// This hook is to check whether a component is mounted for the first time
export const useIsMount = () => {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};
