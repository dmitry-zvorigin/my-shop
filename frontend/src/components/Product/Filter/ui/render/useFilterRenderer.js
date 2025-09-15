import { useMemo } from "react";
import createFilterRenderer from "./factory";

export function useFilterRenderer(q, patchQuery, extraProps) {
  return useMemo(
    () => createFilterRenderer(q, patchQuery, extraProps),
    [q, patchQuery, extraProps]
  );
}