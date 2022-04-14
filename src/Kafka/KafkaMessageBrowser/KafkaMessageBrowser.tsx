import { VoidFunctionComponent } from "react";
import { ResponsiveTable } from "../../shared/Table/ResponsiveTable";
import { useTranslation } from "react-i18next";
import { Message } from "./types";
import { MessageBrowserMachine } from "./MessageBrowserMachine";
import { useMachine } from "@xstate/react";
import { FormatDate, Loading } from "../../shared";
import { MessageBrowserToolbar } from "./components";

const columns = [
  "partition",
  "offset",
  "timestamp",
  "key",
  "value",
  "header",
] as const;

export type GetMessagesCb = (props: {
  offset: number;
  timestamp: number;
}) => Promise<{ messages: Message[]; partitions: number }>;
export type KafkaMessageBrowserProps = {
  getMessages: GetMessagesCb;
};
export const KafkaMessageBrowser: VoidFunctionComponent<
  KafkaMessageBrowserProps
> = ({ getMessages }) => {
  const { t } = useTranslation("message-browser");
  const state = useMessageBrowserMachine(getMessages);

  const columnLabels: { [key: string]: string } = {
    partition: t("columns.partition"),
    offset: t("columns.offset"),
    timestamp: t("columns.timestamp"),
    key: t("columns.key"),
    value: t("columns.value"),
    header: t("columns.header"),
  };

  switch (true) {
    case state.isFirstLoad:
      return <Loading />;
    case state.isNoData:
      return <>TODO: no data empty state</>;
    default:
      return (
        <>
          <MessageBrowserToolbar
            partition={state.partition}
            partitions={(state.partitions || 1) - 1}
            onPartitionChange={state.setPartition}
            isRefreshing={state.isRefreshing}
            offset={state.offset}
            onRefresh={state.refresh}
          />
          <ResponsiveTable
            ariaLabel={t("TODO")}
            columns={columns}
            data={state.isRefreshing ? undefined : state.messages}
            expectedLength={state.messages?.length}
            renderHeader={({ column, Th, key }) => (
              <Th key={key}>{columnLabels[column]}</Th>
            )}
            renderCell={({ column, rowData, colIndex, Td, key }) => (
              <Td key={key} dataLabel={columnLabels[column]}>
                {(() => {
                  switch (colIndex) {
                    case 0:
                      return rowData.partition;
                    case 1:
                      return rowData.offset;
                    case 2:
                      return (
                        rowData.timestamp && (
                          <FormatDate
                            date={rowData.timestamp}
                            format={"distanceToNow"}
                          />
                        )
                      );
                    case 3:
                      return rowData.key;
                    case 4:
                      return rowData.value;
                    case 5:
                      return JSON.stringify(rowData.headers);
                    default:
                      return;
                  }
                })()}
              </Td>
            )}
          />
        </>
      );
  }
};

function useMessageBrowserMachine(api: GetMessagesCb) {
  const [state, send] = useMachine(() => MessageBrowserMachine, {
    devTools: true,
    services: {
      api: () => {
        return (send) => {
          api({ offset: 9, timestamp: Date.now() })
            .then(({ messages, partitions }) =>
              send({ type: "fetchSuccess", messages, partitions })
            )
            .catch(() => send({ type: "fetchFail" }));
        };
      },
    },
  });

  return {
    isFirstLoad: state.matches("initialLoading"),
    isNoData: state.matches("noData"),
    isRefreshing: state.matches("refreshing"),
    messages: state.context.messages,
    lastUpdated: state.context.lastUpdated,
    partition: state.context.partition,
    partitions: state.context.partitions,
    offset: state.context.offset,
    timestamp: state.context.timestamp,
    setPartition: (value: number | undefined) =>
      send({ type: "setPartition", value }),
    setOffset: (value: number | undefined) =>
      send({ type: "setOffset", value }),
    setTimestamp: (value: Date | undefined) =>
      send({ type: "setTimestamp", value }),
    setEpoch: (value: number | undefined) => send({ type: "setEpoch", value }),
    setLatest: () => send({ type: "setLatest" }),
    refresh: () => send({ type: "refresh" }),
  };
}
