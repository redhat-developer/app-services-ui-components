import { Toolbar, ToolbarContent, ToolbarGroup } from "@patternfly/react-core";
import { useMachine } from "@xstate/react";
import type { FunctionComponent } from "react";
import { Loading, Pagination } from "../../shared";
import {
  ConsumerGroupEmptyState,
  ConsumerGroupTable,
  ConsumerGroupToolbar,
} from "./components";
// import { ConsumerGroupDrawer } from './components/ConsumerGroupDrawer';
// import { DeleteConsumerGroup } from './components/DeleteConsumerGroup';
import { ConsumerGroupMachine } from "./ConsumerGroupMachine";
import type { ConsumerGroup, Consumer } from "./types";

// export type ConsumerGroupIntegrateProps = {
//   getConsumer: () => Promise<{ consumers: ConsumerGroup[] }>
// }

// export const ConsumerGroupIntegrate: FunctionComponent<ConsumerGroupIntegrateProps> = ({
//   getConsumer
// }) => {

//   return (
//     <Consumers isLoading={state.matches("initialLodaing")}
//       emptyState={state.matches("noData")}
//       consumerGroups={state.context.response?.consumers}
//       consumer={[]}
//       onClickDeleteModal={function (data: ConsumerGroup): void {
//         throw new Error('Function not implemented.');
//       }}
//       onClickPartitionoffset={function (data: ConsumerGroup): void {
//         throw new Error('Function not implemented.');
//       }} onClickResetoffset={function (data: ConsumerGroup): void {
//         throw new Error('Function not implemented.');
//       }} onSearch={function (value: string): void {
//         throw new Error('Function not implemented.');
//       }} itemCount={0} page={0} perPage={0} onChange={function (page: number, perPage: number): void {
//         throw new Error('Function not implemented.');
//       }} onClickClose={function (): void {
//         throw new Error('Function not implemented.');
//       }} onClickDelete={function (): void {
//         throw new Error('Function not implemented.');
//       }} isModalOpen={false} consumers={[]} selectedConsumer={undefined} consumerGroupByTopic={false} showDrawer={false} />
//   )

// }

export type ConsumerProps = {
  // isLoading: boolean;
  // emptyState: boolean;
  // consumerGroups: ConsumerGroup[] | undefined;
  consumer: Consumer[];
  onClickDeleteModal: (data: ConsumerGroup) => void;
  onClickPartitionoffset: (data: ConsumerGroup) => void;
  onClickResetoffset: (data: ConsumerGroup) => void;
  onSearch: (value: string) => void;
  itemCount: number;
  page: number;
  perPage: number;
  onChange: (page: number, perPage: number) => void;
  onClickClose: () => void;
  onClickDelete: () => void;
  isModalOpen: boolean;
  consumers: Consumer[];
  consumerGroupByTopic: boolean;
  showDrawer: boolean;
  getConsumer: () => Promise<{ consumers: ConsumerGroup[] }>;
};

export const Consumers: FunctionComponent<ConsumerProps> = ({
  // consumerGroups,
  onClickDeleteModal,
  onClickPartitionoffset,
  onClickResetoffset,
  onSearch,
  itemCount,
  page,
  perPage,
  onChange,
  getConsumer,
}) => {
  const [state, send] = useMachine(ConsumerGroupMachine, {
    services: {
      api: () => {
        return (send) => {
          getConsumer()
            .then(({ consumers }) =>
              send({
                type: "fetchSuccess",
                consumers,
              })
            )
            .catch(() => send({ type: "fetchFail" }));
        };
      },
    },
  });

  // console.log(state.context.consumer)

  switch (true) {
    case state.matches("initialLodaing"):
      return <Loading />;
    case state.matches("noData") || state.matches("error"):
      return <ConsumerGroupEmptyState />;
    default:
      return (
        <>
          {/* <ConsumerGroupDrawer consumerGroupByTopic={consumerGroupByTopic} state={selectedConsumer.state} activeMembers={selectedConsumer.activeMembers} partitionsWithLag={selectedConsumer.partitionsWithLag} consumers={consumers} groupId={selectedConsumer.consumerGroupId} onSelectDeleteConsumerGroup={onClickDeleteModal} onSelectResetOffsetConsumerGroup={onClickResetoffset}
            isExpanded={false} onClickClose={onClickClose}> */}
          <ConsumerGroupToolbar
            onSearch={onSearch}
            itemCount={itemCount}
            page={page}
            perPage={perPage}
            onChange={onChange}
          />
          {/* <DeleteConsumerGroup isModalOpen={isModalOpen} onClose={onClickClose} onDeleteConsumer={onClickDeleteModal}
              state={selectedConsumer.state} consumerName={selectedConsumer.consumerGroupId} appendTo={() => document.getElementById("root") ||
                document.body} /> */}
          <ConsumerGroupTable
            consumerGroup={state.context.response?.consumers}
            onClickDeleteModal={onClickDeleteModal}
            onClickPartitionoffset={onClickPartitionoffset}
            onClickResetoffset={onClickResetoffset}
          />
          <Toolbar>
            <ToolbarContent>
              <ToolbarGroup alignment={{ default: "alignRight" }}>
                <Pagination
                  itemCount={itemCount}
                  page={page}
                  perPage={perPage}
                  onChange={onChange}
                />
              </ToolbarGroup>
            </ToolbarContent>
          </Toolbar>
          {/* </ConsumerGroupDrawer> */}
        </>
      );
  }
};
