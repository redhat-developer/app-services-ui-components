import { useCallback } from "react";
import { useURLSearchParams } from "../hooks";
import { DEFAULT_PERPAGE } from "./TableView";

export function usePaginationSearchParams() {
  const { query, update } = useURLSearchParams();

  const page = parseInt(query.get("page") || "", 10) || 1;
  const perPage = parseInt(query.get("perPage") || "", 10) || DEFAULT_PERPAGE;

  const setPaginationQuery = useCallback(
    (page: number, perPage: number) => {
      query.set("page", page.toString());
      query.set("perPage", perPage.toString());
      return query;
    },
    [query]
  );

  const setPagination = useCallback(
    (page: number, perPage: number) => {
      update(setPaginationQuery(page, perPage));
    },
    [setPaginationQuery, update]
  );

  return {
    page,
    perPage,
    setPagination,
    setPaginationQuery,
  };
}
