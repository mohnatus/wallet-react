import { useCallback, useRef } from "react";

export function useLocalId() {
  const localId = useRef(0);

  const getLocalId = useCallback(() => {
    localId.current += 1;
    return localId.current;
  }, []);

  return getLocalId;
}
