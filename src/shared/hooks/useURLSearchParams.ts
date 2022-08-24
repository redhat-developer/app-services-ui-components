import { useCallback, useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";

export function useURLSearchParams() {
  const { search } = useLocation();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { location, push } = useHistory();

  const query = useMemo(() => new URLSearchParams(search), [search]);

  const update = useCallback(
    (query: URLSearchParams) => {
      location.search = query.toString();
      push(location);
    },
    [location, push]
  );

  return {
    query,
    update,
  };
}
