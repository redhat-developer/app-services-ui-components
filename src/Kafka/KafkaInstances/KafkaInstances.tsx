import { useCallback, useEffect, useRef, useState } from "react";
import type { SortDirection } from "../../shared";
import {
  usePaginationSearchParams,
  useSortableSearchParams,
  useURLSearchParamsChips,
} from "../../shared";
import type { KafkaInstance, SimplifiedStatus } from "../types";
import { useKafkaLabels } from "../useKafkaLabels";
import type { InstancesTableProps } from "./components";
import { InstancesTable } from "./components";

type Query = {
  name: string[];
  owner: string[];
  status: SimplifiedStatus[];
};

const SortableColumns = [
  "name",
  "owner",
  "createdAt",
  "provider",
  "region",
] as const;

export type KafkaInstancesProps<T extends KafkaInstance> = {
  getInstances: (
    page: number,
    perPage: number,
    query: Query,
    sort: typeof SortableColumns[number] | null,
    sortDirection: SortDirection
  ) => Promise<{
    instances: T[];
    count: number;
  }>;
  onChangeOwner: (row: T, onDone: () => void) => void;
  onDelete: (row: T, onDone: () => void) => void;
  onCreate: (onDone: () => void) => void;
} & Omit<
  InstancesTableProps<T>,
  | "instances"
  | "itemCount"
  | "page"
  | "perPage"
  | "onPageChange"
  | "names"
  | "owners"
  | "statuses"
  | "isRefreshing"
  | "onSearchName"
  | "onRemoveNameChip"
  | "onRemoveNameChips"
  | "onSearchOwner"
  | "onRemoveOwnerChip"
  | "onRemoveOwnerChips"
  | "onSearchStatus"
  | "onRemoveStatusChip"
  | "onRemoveStatusChips"
  | "onClearAllFilters"
  | "onRefresh"
  | "onChangeOwner"
  | "onDelete"
  | "onCreate"
>;

export const KafkaInstances = <T extends KafkaInstance>({
  getInstances,
  onChangeOwner,
  onDelete,
  onCreate,
  ...props
}: KafkaInstancesProps<T>) => {
  const labels = useKafkaLabels();
  const [instances, setInstances] = useState<T[] | undefined | null>(null);
  const [count, setCount] = useState<number | undefined>(undefined);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { page, perPage, setPagination, setPaginationQuery } =
    usePaginationSearchParams();
  const resetPaginationQuery = useCallback(
    () => setPaginationQuery(1, perPage),
    [perPage, setPaginationQuery]
  );

  const namesChips = useURLSearchParamsChips("names", resetPaginationQuery);
  const ownersChips = useURLSearchParamsChips("owners", resetPaginationQuery);
  const statusesChips = useURLSearchParamsChips<SimplifiedStatus>(
    "statuses",
    resetPaginationQuery
  );

  const [isColumnSortable, sort, sortDirection] = useSortableSearchParams(
    SortableColumns,
    labels.fields,
    "createdAt",
    "desc"
  );

  const previousFetchArgs = useRef([
    page,
    perPage,
    {
      name: namesChips.chips,
      owner: ownersChips.chips,
      status: statusesChips.chips,
    },
    sort,
    sortDirection,
  ] as const);

  const onClearAllFilters = useCallback(() => {
    setInstances(undefined);
    namesChips.clearChained(
      ownersChips.clearChained(
        statusesChips.clearChained(setPaginationQuery(1, perPage))
      ),
      true
    );
  }, [namesChips, ownersChips, perPage, setPaginationQuery, statusesChips]);

  const fetchData = useCallback(() => {
    const fetchArgs = [
      page,
      perPage,
      {
        name: namesChips.chips,
        owner: ownersChips.chips,
        status: statusesChips.chips,
      },
      sort,
      sortDirection,
    ] as const;
    if (
      JSON.stringify(fetchArgs) !== JSON.stringify(previousFetchArgs.current)
    ) {
      setInstances(undefined);
    }
    previousFetchArgs.current = fetchArgs;
    return getInstances(...fetchArgs)
      .then(({ instances, count }) => {
        setInstances(instances);
        setCount(count);
      })
      .catch((e) => console.error(e));
  }, [
    getInstances,
    namesChips.chips,
    ownersChips.chips,
    page,
    perPage,
    sort,
    sortDirection,
    statusesChips.chips,
  ]);

  const onRefresh = useCallback(() => {
    if (instances !== undefined && !isRefreshing) {
      setIsRefreshing(true);
      fetchData().finally(() => setIsRefreshing(false));
    }
  }, [fetchData, instances, isRefreshing]);

  // first load of data, independent of a user action
  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  // polling
  useEffect(() => {
    const timer = setInterval(onRefresh, 5000);
    return () => clearInterval(timer);
  }, [onRefresh]);

  return (
    <InstancesTable
      instances={instances}
      itemCount={count}
      page={page}
      perPage={perPage}
      names={namesChips.chips}
      owners={ownersChips.chips}
      statuses={statusesChips.chips}
      isRefreshing={isRefreshing}
      isColumnSortable={isColumnSortable}
      onRefresh={onRefresh}
      onPageChange={setPagination}
      onSearchName={namesChips.add}
      onRemoveNameChip={namesChips.remove}
      onRemoveNameChips={namesChips.clear}
      onSearchOwner={ownersChips.add}
      onRemoveOwnerChip={ownersChips.remove}
      onRemoveOwnerChips={ownersChips.clear}
      onSearchStatus={statusesChips.toggle}
      onRemoveStatusChip={statusesChips.remove}
      onRemoveStatusChips={statusesChips.clear}
      onClearAllFilters={onClearAllFilters}
      onChangeOwner={(row) => onChangeOwner(row, onRefresh)}
      onDelete={(row) => onDelete(row, onRefresh)}
      onCreate={() => onCreate(onRefresh)}
      {...props}
    />
  );
};
