import { useCallback, useMemo } from "react";
import { useURLSearchParams } from "./useURLSearchParams";

export function useURLSearchParamsChips<T extends string>(
  name: string,
  onBeforeChange?: (
    value: T | undefined,
    action: "add" | "remove"
  ) => URLSearchParams
) {
  const { query, update } = useURLSearchParams();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const chips = useMemo(() => query.getAll(name) as T[], [name, query]);

  const add = useCallback(
    (value: T) => {
      const newQuery = onBeforeChange ? onBeforeChange(value, "add") : query;
      if (!chips.includes(value)) {
        newQuery.append(name, value);
        update(newQuery);
      }
    },
    [chips, name, onBeforeChange, query, update]
  );
  const remove = useCallback(
    (value: T) => {
      const newQuery = onBeforeChange ? onBeforeChange(value, "remove") : query;
      newQuery.delete(name);
      chips
        .filter((c) => c !== value)
        .forEach((value) => newQuery.set(name, value));
      update(newQuery);
    },
    [chips, name, onBeforeChange, query, update]
  );
  const toggle = useCallback(
    (value: T) => {
      if (chips.includes(value)) {
        remove(value);
      } else {
        add(value);
      }
    },
    [add, chips, remove]
  );
  const clear = useCallback(() => {
    const newQuery = onBeforeChange
      ? onBeforeChange(undefined, "remove")
      : query;
    newQuery.delete(name);
    update(newQuery);
  }, [name, onBeforeChange, query, update]);

  const clearChained = useCallback(
    (queryChained: URLSearchParams = query, commit = false) => {
      queryChained.delete(name);
      if (commit) {
        update(queryChained);
      }
      return queryChained;
    },
    [name, query, update]
  );
  return {
    chips,
    add,
    remove,
    toggle,
    clear,
    clearChained,
  };
}
