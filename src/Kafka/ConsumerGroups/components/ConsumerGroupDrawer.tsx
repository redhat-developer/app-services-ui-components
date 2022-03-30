import {
  Button,
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
import { createRef, FunctionComponent, useState } from "react";
import { ConsumerGroupState, Consumer } from "../types";
import { ConsumerGroupDetails } from "./ConsumerGroupDetails";
import { useTranslation } from "react-i18next";
import "./ConsumerGroup.css";
import { EllipsisVIcon } from "@patternfly/react-icons";

export type ConsumerGroupDrawerProps = {
  consumerGroupByTopic: boolean;
  state: ConsumerGroupState;
  activeMembers: number;
  partitionsWithLag: number;
  consumers: Consumer[];
  groupId: string;
  onSelectDeleteConsumerGroup: () => void;
  onSelectResetOffsetConsumerGroup: () => void;
};

export const ConsumerGroupDrawer: FunctionComponent<
  ConsumerGroupDrawerProps
> = ({
  consumerGroupByTopic,
  state,
  activeMembers,
  partitionsWithLag,
  consumers,
  groupId,
  onSelectDeleteConsumerGroup,
  onSelectResetOffsetConsumerGroup,
}) => {
  const { t } = useTranslation(["kafka"]);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onToggle = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };
  const onSelect = () => {
    setIsOpen(!isOpen);
  };

  const onClickClose = () => {
    setIsExpanded(!isExpanded);
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
          >
            <EllipsisVIcon />
          </Dropdown>
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

  const onClick = () => {
    setIsExpanded(!isExpanded);
  };

  const drawerRef = createRef();

  const onExpand = () => {
    drawerRef.current;
  };

  return (
    <>
      <Button aria-expanded={isExpanded} onClick={onClick}>
        Toggle drawer
      </Button>
      <Drawer isExpanded={isExpanded} onExpand={onExpand}>
        <DrawerContent panelContent={panelContent}></DrawerContent>
      </Drawer>
    </>
  );
};
