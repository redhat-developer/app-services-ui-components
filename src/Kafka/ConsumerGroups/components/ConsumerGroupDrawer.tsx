import {
  Drawer,
  DrawerActions,
  DrawerCloseButton,
  DrawerContent,
  DrawerHead,
  DrawerPanelBody,
  DrawerPanelContent,
  TextContent,
  Title,
  Text,
  TextVariants,
  Dropdown,
  KebabToggle,
  DropdownPosition,
  DropdownItem,
  DrawerContentBody,
} from "@patternfly/react-core";
import type { FunctionComponent, ReactNode } from "react";
import { useState } from "react";
import type { ConsumerGroupState, Consumer } from "../types";
import { ConsumerGroupDetails } from "./ConsumerGroupDetails";
import { useTranslation } from "react-i18next";
import "./ConsumerGroup.css";

export type ConsumerGroupDrawerProps = {
  children: ReactNode;
  consumerGroupByTopic: boolean;
  state: ConsumerGroupState;
  activeMembers: number;
  partitionsWithLag: number;
  consumers: Consumer[];
  groupId: string;
  onSelectDeleteConsumerGroup: () => void;
  onSelectResetOffsetConsumerGroup: () => void;
  isExpanded: boolean;
  onClickClose: () => void;
};

export const ConsumerGroupDrawer: FunctionComponent<
  ConsumerGroupDrawerProps
> = ({
  children,
  consumerGroupByTopic,
  state,
  activeMembers,
  partitionsWithLag,
  consumers,
  groupId,
  onSelectDeleteConsumerGroup,
  onSelectResetOffsetConsumerGroup,
  isExpanded,
  onClickClose,
}) => {
  const { t } = useTranslation(["kafka"]);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onToggle = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };
  const onSelect = () => {
    setIsOpen(!isOpen);
  };

  const dropdownItems = [
    <DropdownItem key="reset offset" onClick={onSelectResetOffsetConsumerGroup}>
      {t("consumerGroup.reset_offset")}
    </DropdownItem>,
    <DropdownItem key="delete" onClick={onSelectDeleteConsumerGroup}>
      {t("common:delete")}
    </DropdownItem>,
  ];

  const panelContent = (
    <DrawerPanelContent widths={{ default: "width_50" }}>
      <DrawerHead>
        <TextContent>
          <Text
            component={TextVariants.small}
            className={"consumer-group-drawer__top-label"}
          >
            {t("consumerGroup.consumer_group_id")}
          </Text>
          <Title headingLevel={"h1"} className={"consumer-group-drawer__title"}>
            {groupId}
          </Title>
        </TextContent>
        <DrawerActions>
          <Dropdown
            onSelect={onSelect}
            toggle={<KebabToggle onToggle={onToggle} id="toggle-data-plane" />}
            dropdownItems={dropdownItems}
            isOpen={isOpen}
            isPlain
            position={DropdownPosition.right}
          />
          <DrawerCloseButton onClick={onClickClose} />
        </DrawerActions>
      </DrawerHead>
      <DrawerPanelBody>
        <ConsumerGroupDetails
          consumerGroupByTopic={consumerGroupByTopic}
          state={state}
          activeMembers={activeMembers}
          partitionsWithLag={partitionsWithLag}
          consumers={consumers}
        />
      </DrawerPanelBody>
    </DrawerPanelContent>
  );

  return (
    <Drawer
      isExpanded={isExpanded}
      data-ouia-app-id={"dataPlane-consumerGroupDetails"}
    >
      <DrawerContent panelContent={panelContent}>
        <DrawerContentBody className="consumer-group-drawer__drawer-content-body">
          {children}
        </DrawerContentBody>
      </DrawerContent>
    </Drawer>
  );
};
