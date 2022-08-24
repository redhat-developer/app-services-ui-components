import { useURLSearchParams } from "../hooks";
import type { ResponsiveThProps } from "./ResponsiveTable";

const SortDirectionValues = ["asc", "desc"] as const;
export type SortDirection = typeof SortDirectionValues[number];

export function useSortableSearchParams<T extends string>(
  columns: readonly T[],
  labels: { [column in T]: string },
  initialSortColumn: T | null = null,
  initialSortDirection: SortDirection = "asc"
): [
  (
    column: string
  ) => (ResponsiveThProps["sort"] & { label: string }) | undefined,
  T | null,
  SortDirection
] {
  const { query, update } = useURLSearchParams();

  const sortParam = query.get("sort") as T | null;
  const directionParam = query.get("dir") as SortDirection | null;

  const activeSortColumn =
    sortParam && columns.includes(sortParam) ? sortParam : initialSortColumn;

  const activeSortDirection =
    directionParam && SortDirectionValues.includes(directionParam)
      ? directionParam
      : initialSortDirection;

  return [
    (column) => {
      const columnIndex = columns.indexOf(column as T);
      return columnIndex >= 0
        ? {
            columnIndex,
            onSort: (_event, index, direction) => {
              query.set("sort", columns[index]);
              query.set("dir", direction);
              update(query);
            },
            sortBy: {
              index: activeSortColumn
                ? columns.indexOf(activeSortColumn)
                : undefined,
              direction: activeSortDirection ? activeSortDirection : undefined,
              defaultDirection: initialSortDirection,
            },
            label: labels[column as T],
          }
        : undefined;
    },
    activeSortColumn ? activeSortColumn : null,
    activeSortDirection,
  ];
}
