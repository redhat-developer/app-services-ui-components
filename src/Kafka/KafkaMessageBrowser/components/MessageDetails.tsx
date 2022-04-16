import { VoidFunctionComponent } from "react";
import { Message } from "../types";
import { useTranslation } from "react-i18next";
import {
  ClipboardCopy,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  DrawerActions,
  DrawerCloseButton,
  DrawerContentBody,
  DrawerHead,
  DrawerPanelContent,
  Flex,
  FlexItem,
  Tab,
  Tabs,
  TabTitleText,
  Text,
  TextContent,
  TextVariants,
} from "@patternfly/react-core";
import { FormatDate } from "../../../shared";
import { beautifyUnknownValue } from "../utils";

export type MessageDetailsProps = {
  onClose: () => void;
  message: Message | undefined;
  defaultTab: MessageDetailsBodyProps["defaultTab"];
};
export const MessageDetails: VoidFunctionComponent<MessageDetailsProps> = ({
  message,
  defaultTab,
  onClose,
}) => {
  const { t } = useTranslation("message-browser");

  return (
    <DrawerPanelContent isResizable={true} minSize={"400px"}>
      <DrawerHead>
        <TextContent>
          <Text component={TextVariants.h2}>{t("message")}</Text>
        </TextContent>
        <DrawerActions>
          <DrawerCloseButton onClick={onClose} />
        </DrawerActions>
      </DrawerHead>
      <DrawerContentBody>
        {message && (
          <MessageDetailsBody message={message} defaultTab={defaultTab} />
        )}
        {!message && "TODO: empty state"}
      </DrawerContentBody>
    </DrawerPanelContent>
  );
};

export type MessageDetailsBodyProps = {
  message: Message;
  defaultTab: "value" | "headers";
};
const MessageDetailsBody: VoidFunctionComponent<MessageDetailsBodyProps> = ({
  message,
  defaultTab,
}) => {
  const { t } = useTranslation("message-browser");

  return (
    <Flex direction={{ default: "column" }}>
      <FlexItem>
        <DescriptionList isHorizontal isCompact>
          <DescriptionListGroup>
            <DescriptionListTerm>{t("field.partition")}</DescriptionListTerm>
            <DescriptionListDescription>
              {message.partition}
            </DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup>
            <DescriptionListTerm>{t("field.offset")}</DescriptionListTerm>
            <DescriptionListDescription>
              {message.offset}
            </DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup>
            <DescriptionListTerm>{t("field.timestamp")}</DescriptionListTerm>
            <DescriptionListDescription>
              {message.timestamp && (
                <FormatDate date={message.timestamp} format={"long"} />
              )}
            </DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup>
            <DescriptionListTerm>{t("field.epoch")}</DescriptionListTerm>
            <DescriptionListDescription>
              {message.timestamp && (
                <FormatDate date={message.timestamp} format={"epoch"} />
              )}
            </DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup>
            <DescriptionListTerm>{t("field.key")}</DescriptionListTerm>
            <DescriptionListDescription>
              {message.key}
            </DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup>
            <DescriptionListTerm>{t("field.size")}</DescriptionListTerm>
            <DescriptionListDescription>
              {message.value?.length || 0} bytes
            </DescriptionListDescription>
          </DescriptionListGroup>
        </DescriptionList>
      </FlexItem>
      <FlexItem>
        {/* set key to be a random number to force redraw the tabs in order to change the active tab from the outside */}
        <Tabs defaultActiveKey={defaultTab} key={Math.random()}>
          <Tab
            eventKey={"value"}
            title={<TabTitleText>{t("field.value")}</TabTitleText>}
          >
            <ClipboardCopy isCode={true} isExpanded={true} isReadOnly={true}>
              {beautifyUnknownValue(message.value || "")}
            </ClipboardCopy>
          </Tab>
          <Tab
            eventKey={"headers"}
            title={<TabTitleText>{t("field.headers")}</TabTitleText>}
          >
            <ClipboardCopy isCode={true} isExpanded={true} isReadOnly={true}>
              {beautifyUnknownValue(JSON.stringify(message.headers) || "")}
            </ClipboardCopy>
          </Tab>
        </Tabs>
      </FlexItem>
    </Flex>
  );
};
