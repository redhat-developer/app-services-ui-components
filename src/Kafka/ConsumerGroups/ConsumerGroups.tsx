import {
  Card,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
} from "@patternfly/react-core";
import type { FunctionComponent } from "react";
import { Loading, Pagination } from "../../shared";
import {
  ConsumerGroupEmptyState,
  ConsumerGroupTable,
  ConsumerGroupToolbar,
} from "./components";
import type { ConsumerGroup } from "./types";

export type ConsumerGroupsProps = {
  isLoading: boolean;
  emptyState: boolean;
  consumerGroup: ConsumerGroup[];
  onClickDeleteModal: (data: ConsumerGroup) => void;
  onClickPartitionoffset: (data: ConsumerGroup) => void;
  onClickResetoffset: (data: ConsumerGroup) => void;
  onSearch: (value: string) => void;
  itemCount: number;
  page: number;
  perPage: number;
  onChange: (page: number, perPage: number) => void;
};

export const ConsumerGroups: FunctionComponent<ConsumerGroupsProps> = ({
  isLoading,
  emptyState,
  consumerGroup,
  onClickDeleteModal,
  onClickPartitionoffset,
  onClickResetoffset,
  onSearch,
  itemCount,
  page,
  perPage,
  onChange,
}) => {
  switch (true) {
    case isLoading:
      return <Loading />;
    case emptyState:
      return <ConsumerGroupEmptyState />;
    default:
      return (
        <Card>
          <ConsumerGroupToolbar
            onSearch={onSearch}
            itemCount={itemCount}
            page={page}
            perPage={perPage}
            onChange={onChange}
          />
          <ConsumerGroupTable
            consumerGroup={consumerGroup}
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
        </Card>
      );
  }
};
