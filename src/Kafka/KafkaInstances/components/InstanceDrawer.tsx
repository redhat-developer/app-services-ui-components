import {
  Drawer,
  DrawerActions,
  DrawerCloseButton,
  DrawerContent,
  DrawerContentBody,
  DrawerHead,
  DrawerPanelContent,
  Tab,
  TabContentBody,
  Tabs,
  TabTitleText,
  Text,
  TextContent,
  Title,
} from "@patternfly/react-core";
import type { FunctionComponent } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { KafkaInstance } from "../../types";
import { ConnectionTab } from "./ConnectionTab";
import { DetailsTab } from "./DetailsTab";

const TabDetails = "details" as const;
const TabConnections = "connections" as const;
const PanelTabs = [TabDetails, TabConnections] as const;
type PanelTab = typeof PanelTabs[number];

export type InstanceDrawerProps = {
  instance: KafkaInstance | undefined;
  onClose: () => void;
};

export const InstanceDrawer: FunctionComponent<InstanceDrawerProps> = ({
  instance,
  children,
  onClose,
}) => {
  const { t } = useTranslation("kafka");
  const [activeTab, setActiveTab] = useState<PanelTab>("details");
  const hasInstance = instance !== undefined;
  return (
    <Drawer isExpanded={hasInstance} isInline={true}>
      <DrawerContent
        panelContent={
          hasInstance && (
            <DrawerPanelContent isResizable={true} minSize={"400px"}>
              <DrawerHead>
                <TextContent>
                  <Text>
                    <small className={"pf-u-mb-0"}>{t("common:name")}</small>
                    <Title
                      headingLevel={"h2"}
                      size={"xl"}
                      className={"pf-u-mt-0"}
                    >
                      {instance.name}
                    </Title>
                  </Text>
                </TextContent>
                <DrawerActions>
                  <DrawerCloseButton onClick={onClose} />
                </DrawerActions>
              </DrawerHead>
              <DrawerContentBody>
                <Tabs
                  activeKey={activeTab}
                  onSelect={(_, value) => setActiveTab(value as PanelTab)}
                  aria-label={t("drawer-tabs.tabs-aria-label")}
                >
                  <Tab
                    eventKey={TabDetails}
                    title={
                      <TabTitleText>{t("drawer-tabs.details")}</TabTitleText>
                    }
                  >
                    <TabContentBody hasPadding={true}>
                      <DetailsTab {...instance} />
                    </TabContentBody>
                  </Tab>
                  <Tab
                    eventKey={TabConnections}
                    title={
                      <TabTitleText>
                        {t("drawer-tabs.connections")}
                      </TabTitleText>
                    }
                  >
                    <TabContentBody hasPadding={true}>
                      <ConnectionTab
                        tokenEndPointUrl={""}
                        linkToServiceAccount={""}
                        linkToAccessTab={""}
                        adminAPIUrl={undefined}
                        onCreateServiceAccount={function (): void {
                          throw new Error("Function not implemented.");
                        }}
                        kafkaFleetManagerUrl={""}
                      />
                    </TabContentBody>
                  </Tab>
                </Tabs>
              </DrawerContentBody>
            </DrawerPanelContent>
          )
        }
      >
        {children}
      </DrawerContent>
    </Drawer>
  );
};
