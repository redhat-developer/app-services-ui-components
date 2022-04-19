import {
  Button,
  Drawer,
  DrawerContent,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
  ToolbarToggleGroup,
} from "@patternfly/react-core";
import FilterIcon from "@patternfly/react-icons/dist/esm/icons/filter-icon";
import SearchIcon from "@patternfly/react-icons/dist/js/icons/search-icon";
import { BaseCellProps } from "@patternfly/react-table";
import { useMachine } from "@xstate/react";
import { useMemo, useState, VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import {
  FormatDate,
  Loading,
  RefreshButton,
  ResponsiveTable,
} from "../../shared";
import {
  FilterGroup,
  MessageDetails,
  MessageDetailsProps,
  OffsetRange,
  PartitionSelector,
  UnknownValuePreview,
} from "./components";
import { MessageBrowserMachine } from "./MessageBrowserMachine";
import { Message } from "./types";
import { beautifyUnknownValue, isSameMessage } from "./utils";

const columns = [
  "partition",
  "offset",
  "timestamp",
  "key",
  "headers",
  "value",
] as const;

const columnWidths: BaseCellProps["width"][] = [10, 10, 15, 10, undefined, 30];

export type KafkaMessageBrowserProps = {
  getMessages: (props: {
    partition: number;
    offset?: number;
    timestamp?: number;
  }) => Promise<{ messages: Message[]; partitions: number }>;
};
export const KafkaMessageBrowser: VoidFunctionComponent<
  KafkaMessageBrowserProps
> = ({ getMessages }) => {
  const [state, send] = useMachine(() => MessageBrowserMachine, {
    devTools: true,
    services: {
      api: (context) => {
        return (send) => {
          getMessages({
            partition: context.partition,
            offset: context.offset || undefined,
            timestamp: context.timestamp || undefined,
          })
            .then(({ messages, partitions }) =>
              send({
                type: "fetchSuccess",
                messages,
                partitions,
                offsetMin: context.offset || 0,
                offsetMax: messages.reduce(
                  (max, m) => Math.max(max, m.offset || 0),
                  0
                ),
              })
            )
            .catch(() => send({ type: "fetchFail" }));
        };
      },
    },
  });

  return (
    <KafkaMessageBrowserConnected
      isFirstLoad={state.matches("initialLoading")}
      isNoData={state.matches("noData")}
      isRefreshing={state.matches("refreshing")}
      requiresSearch={state.hasTag("dirty")}
      selectedMessage={state.context.selectedMessage}
      response={state.context.response}
      lastUpdated={state.context.response?.lastUpdated}
      partition={state.context.partition}
      filterOffset={state.context.offset}
      filterTimestamp={state.context.timestamp}
      setPartition={(value: number) => send({ type: "setPartition", value })}
      setOffset={(value: number | undefined) =>
        send({ type: "setOffset", value })
      }
      setTimestamp={(value: Date | undefined) =>
        send({ type: "setTimestamp", value })
      }
      setEpoch={(value: number | undefined) =>
        send({ type: "setEpoch", value })
      }
      setLatest={() => send({ type: "setLatest" })}
      refresh={() => send({ type: "refresh" })}
      selectMessage={(message: Message) =>
        send({ type: "selectMessage", message })
      }
      deselectMessage={() => send({ type: "deselectMessage" })}
    />
  );
};

export type KafkaMessageBrowserConnectedProps = {
  isFirstLoad: boolean;
  isNoData: boolean;
  isRefreshing: boolean;
  requiresSearch: boolean;
  selectedMessage: Message | undefined;
  lastUpdated: Date | undefined;
  response:
    | {
        messages: Message[];
        partitions: number;
        offsetMin: number;
        offsetMax: number;
      }
    | undefined;
  partition: number;
  filterOffset: number | undefined;
  filterTimestamp: number | undefined;
  setPartition: (value: number) => void;
  setOffset: (value: number) => void;
  setTimestamp: (value: Date | undefined) => void;
  setEpoch: (value: number | undefined) => void;
  setLatest: () => void;
  refresh: () => void;
  selectMessage: (message: Message) => void;
  deselectMessage: () => void;
};
export const KafkaMessageBrowserConnected: VoidFunctionComponent<
  KafkaMessageBrowserConnectedProps
> = ({
  isFirstLoad,
  isNoData,
  isRefreshing,
  requiresSearch,
  selectedMessage,
  response,
  partition,
  filterOffset,
  filterTimestamp,
  setPartition,
  setOffset,
  setTimestamp,
  setEpoch,
  setLatest,
  refresh,
  selectMessage,
  deselectMessage,
}) => {
  const { t } = useTranslation("message-browser");
  const [defaultTab, setDefaultTab] =
    useState<MessageDetailsProps["defaultTab"]>("value");

  const columnLabels: { [key in typeof columns[number]]: string } = useMemo(
    () =>
      ({
        partition: t("field.partition"),
        offset: t("field.offset"),
        timestamp: t("field.timestamp"),
        key: t("field.key"),
        value: t("field.value"),
        headers: t("field.headers"),
      } as const),
    [t]
  );

  switch (true) {
    case isFirstLoad:
      return <Loading />;
    case isNoData:
      return <>TODO: no data empty state</>;
    default:
      return (
        <Drawer isInline={true} isExpanded={selectedMessage !== undefined}>
          <DrawerContent
            panelContent={
              <MessageDetails
                message={selectedMessage}
                defaultTab={defaultTab}
                onClose={deselectMessage}
              />
            }
          >
            <Toolbar>
              <ToolbarContent>
                <ToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint="xl">
                  <ToolbarGroup variant="filter-group">
                    <ToolbarItem>
                      <PartitionSelector
                        value={partition}
                        partitions={response?.partitions || 0}
                        onChange={setPartition}
                        isDisabled={isRefreshing}
                      />
                    </ToolbarItem>
                  </ToolbarGroup>
                  <ToolbarGroup variant="filter-group">
                    <FilterGroup
                      isDisabled={isRefreshing}
                      offset={filterOffset}
                      timestamp={filterTimestamp}
                      onOffsetChange={setOffset}
                      onTimestampChange={setTimestamp}
                      onEpochChange={setEpoch}
                      onLatest={setLatest}
                    />
                  </ToolbarGroup>
                </ToolbarToggleGroup>
                <ToolbarGroup>
                  <ToolbarItem>
                    <Button
                      variant={"plain"}
                      isDisabled={!requiresSearch || isRefreshing}
                      aria-label={t("common:search_button_label")}
                      onClick={refresh}
                    >
                      <SearchIcon />
                    </Button>
                  </ToolbarItem>
                  <ToolbarItem>
                    <RefreshButton
                      onClick={refresh}
                      isRefreshing={isRefreshing}
                      isDisabled={requiresSearch}
                    />
                  </ToolbarItem>
                </ToolbarGroup>
                <ToolbarGroup alignment={{ default: "alignRight" }}>
                  <OffsetRange
                    min={response?.offsetMin || 0}
                    max={response?.offsetMax || 0}
                  />
                </ToolbarGroup>
              </ToolbarContent>
            </Toolbar>
            <ResponsiveTable
              ariaLabel={t("table_aria_label")}
              columns={columns}
              data={response?.messages}
              expectedLength={response?.messages?.length}
              renderHeader={({ column, Th, key }) => (
                <Th key={key}>{columnLabels[column]}</Th>
              )}
              renderCell={({ column, row, colIndex, Td, key }) => (
                <Td
                  key={key}
                  dataLabel={columnLabels[column]}
                  width={columnWidths[colIndex]}
                >
                  {(() => {
                    switch (column) {
                      case "partition":
                        return row.partition;
                      case "offset":
                        return row.offset;
                      case "timestamp":
                        return (
                          row.timestamp && (
                            <FormatDate date={row.timestamp} format={"long"} />
                          )
                        );
                      case "key":
                        return (
                          <UnknownValuePreview
                            value={row.key || ""}
                            truncateAt={40}
                          />
                        );
                      case "headers":
                        return (
                          <UnknownValuePreview
                            value={beautifyUnknownValue(
                              JSON.stringify(row.headers)
                            )}
                            onClick={() => {
                              setDefaultTab("headers");
                              selectMessage(row);
                            }}
                          />
                        );
                      case "value":
                        return (
                          <UnknownValuePreview
                            value={beautifyUnknownValue(row.value || "")}
                            onClick={() => {
                              setDefaultTab("value");
                              selectMessage(row);
                            }}
                          />
                        );
                    }
                  })()}
                </Td>
              )}
              isRowSelected={({ row }) =>
                selectedMessage !== undefined &&
                isSameMessage(row, selectedMessage)
              }
              onRowClick={({ row }) => {
                setDefaultTab("value");
                selectMessage(row);
              }}
            />
          </DrawerContent>
        </Drawer>
      );
  }
};
