import { useState, useCallback, useRef, useEffect } from "react";
import type { SortDirection } from "../../shared";
import { TopicsTable } from "./components";
import type { TopicsTableProps } from "./components";
import type { KafkaTopic, KafkaTopicField } from "./types";
import {
  usePaginationSearchParams,
  useSortableSearchParams,
  useURLSearchParamsChips,
} from "../../shared";
import { useTranslation } from "react-i18next";

type Query = {
  names: string[];
};
const SortableColumns = [
  "partitions",
  "retention_time",
  "retention_size",
] as const;

export type KafkaTopicsProps<T extends KafkaTopic> = {
  getTopics: (
    page: number,
    perPage: number,
    query: Query,
    sort: typeof SortableColumns[number] | null,
    sortDirection: SortDirection
  ) => Promise<{
    topics: T[];
    count: number;
  }>;
} & Omit<
  TopicsTableProps<T>,
  | "topics"
  | "itemCount"
  | "page"
  | "perPage"
  | "onPageChange"
  | "topicName"
  | "onClearAllFilters"
  | "onRemoveTopicChip"
  | "onRemoveTopicChips"
  | "onSearchTopic"
>;

export const KafkaTopics = <T extends KafkaTopic>({
  getTopics,
  ...props
}: KafkaTopicsProps<T>) => {
  const { t } = useTranslation("topic");

  const labels: { [field in KafkaTopicField]: string } = {
    topic_name: t("topic_name"),
    partitions: t("partitions"),
    retention_time: t("retention_time"),
    retention_size: t("retention_size"),
  };

  const [topics, setTopics] = useState<T[] | undefined>(undefined);

  const [count, setCount] = useState<number | undefined>(undefined);

  const { page, perPage, setPagination, setPaginationQuery } =
    usePaginationSearchParams();

  const resetPaginationQuery = useCallback(
    () => setPaginationQuery(1, perPage),
    [perPage, setPaginationQuery]
  );

  const namesChips = useURLSearchParamsChips("topicName", resetPaginationQuery);

  const [isColumnSortable, sort, sortDirection] = useSortableSearchParams(
    SortableColumns,
    labels,
    null,
    "asc"
  );

  const previousFetchArgs = useRef([
    page,
    perPage,
    {
      names: namesChips.chips,
    },
    sort,
    sortDirection,
  ] as const);

  const onClearAllFilters = useCallback(() => {
    setTopics(undefined);
    namesChips.clearChained(setPaginationQuery(1, perPage), true);
  }, [namesChips, perPage, setPaginationQuery]);

  const fetchData = useCallback(() => {
    const fetchArgs = [
      page,
      perPage,
      {
        names: namesChips.chips,
      },
      sort,
      sortDirection,
    ] as const;
    if (
      JSON.stringify(fetchArgs) !== JSON.stringify(previousFetchArgs.current)
    ) {
      setTopics(undefined);
    }
    previousFetchArgs.current = fetchArgs;
    return getTopics(...fetchArgs)
      .then(({ topics, count }) => {
        setTopics(topics);
        setCount(count);
      })
      .catch((e) => console.error(e));
  }, [getTopics, namesChips.chips, page, perPage, sort, sortDirection]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return (
    <TopicsTable
      topics={topics}
      itemCount={count}
      topicName={namesChips.chips}
      page={page}
      perPage={perPage}
      isColumnSortable={isColumnSortable}
      onPageChange={setPagination}
      onSearchTopic={namesChips.add}
      onRemoveTopicChip={namesChips.remove}
      onRemoveTopicChips={namesChips.clear}
      onClearAllFilters={onClearAllFilters}
      {...props}
    />
  );
};
