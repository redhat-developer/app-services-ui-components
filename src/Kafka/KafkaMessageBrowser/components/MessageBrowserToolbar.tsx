import { VoidFunctionComponent } from "react";
import {
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";
import { RefreshButton } from "../../../shared";
import { OffsetRange } from "./OffsetRange";
import { PartitionSelector } from "./PartitionSelector";

export type MessageBrowserToolbarProps = {
  partition: number;
  partitions: number;
  offset: number;
  isRefreshing: boolean;
  onPartitionChange: (partition: number | undefined) => void;
  onRefresh: () => void;
};

export const MessageBrowserToolbar: VoidFunctionComponent<
  MessageBrowserToolbarProps
> = ({
  partition,
  partitions,
  onPartitionChange,
  onRefresh,
  isRefreshing,
  offset,
}) => {
  return (
    <Toolbar>
      <ToolbarContent>
        <ToolbarGroup>
          <ToolbarItem>
            <PartitionSelector
              value={partition}
              partitions={partitions}
              onChange={onPartitionChange}
            />
          </ToolbarItem>
          <ToolbarItem>
            <RefreshButton
              ariaLabel={"Refresh"}
              onClick={onRefresh}
              isRefreshing={isRefreshing}
            />
          </ToolbarItem>
        </ToolbarGroup>
        <ToolbarGroup alignment={{ default: "alignRight" }}>
          <OffsetRange offset={offset} />
        </ToolbarGroup>
      </ToolbarContent>
    </Toolbar>
  );
};
