import { useEffect, useRef } from "react";
import isEqual from "lodash.isequal";

export function useDeepMemo(value) {
  const ref = useRef();
  // it can be done by using useMemo as well
  // but useRef is rather cleaner and easier

  if (!isEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

export function useDeepEffect(callback, dependencies) {
  useEffect(callback, dependencies.map(useDeepMemo));
}
