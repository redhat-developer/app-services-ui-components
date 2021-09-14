import React from "react";
import {
  Drawer,
  DrawerProps,
  DrawerContent,
  DrawerPanelContent,
  DrawerHead,
  DrawerPanelBody,
  DrawerActions,
  DrawerCloseButton,
  TextContent,
  Text,
  TextVariants,
  Title,
  TitleSizes,
  DrawerPanelContentProps,
  TextProps,
  TitleProps,
  DrawerContentBody,
} from "@patternfly/react-core";
import { AppServicesLoading } from "../../components";
import "./AppServicesDrawer.css";

export type AppServicesDrawerProps = DrawerProps & {
  children: React.ReactNode;
  panelBodyContent?: React.ReactNode;
  onClose: () => void;
  drawerData?: any;
  isLoading?: boolean;
  drawerPanelContentProps?: Omit<DrawerPanelContentProps, "children">;
  drawerHeaderProps?: {
    text?: Omit<TextProps, "children" | "ref"> & {
      label: string | undefined;
    };
    title?: Omit<TitleProps, "children"> & {
      value: string | undefined;
    };
  };
  ["data-ouia-app-id"]?: string;
  notRequiredDrawerContentBackground?: boolean | undefined;
  inlineAlertMessage?: React.ReactNode;
};

export const AppServicesDrawer: React.FC<AppServicesDrawerProps> = ({
  onClose,
  isLoading = false,
  drawerPanelContentProps,
  drawerHeaderProps,
  isExpanded,
  children,
  panelBodyContent,
  onExpand,
  notRequiredDrawerContentBackground,
  "data-ouia-app-id": dataOuiaAppId,
  inlineAlertMessage,
}: AppServicesDrawerProps) => {
  const { widths, ...restDrawerPanelContentProps } =
    drawerPanelContentProps || {};
  const { text, title } = drawerHeaderProps || {};

  const panelContent = (
    <DrawerPanelContent
      widths={widths || { default: "width_50" }}
      {...restDrawerPanelContentProps}
    >
      {isLoading ? (
        <AppServicesLoading />
      ) : (
        <>
          <DrawerHead>
            <TextContent>
              {text?.label && (
                <Text
                  component={text?.component || TextVariants.small}
                  className={text?.className || "kafka-ui-appServices-drawer__top-label"}
                >
                  {text?.label}
                </Text>
              )}
              {title?.value && (
                <Title
                  headingLevel={title?.headingLevel || "h2"}
                  size={title?.size || TitleSizes["xl"]}
                  className={title?.className || "kafka-ui-appServices-drawer__title"}
                >
                  {title?.value}
                </Title>
              )}
            </TextContent>
            <DrawerActions>
              <DrawerCloseButton onClick={onClose} />
            </DrawerActions>
          </DrawerHead>
          <DrawerPanelBody>
            {inlineAlertMessage}
            {panelBodyContent}
          </DrawerPanelBody>
        </>
      )}
    </DrawerPanelContent>
  );

  return (
    <Drawer
      isExpanded={isExpanded}
      onExpand={onExpand}
      data-ouia-app-id={dataOuiaAppId}
    >
      <DrawerContent
        panelContent={panelContent}
        className={
          notRequiredDrawerContentBackground ? "pf-m-no-background" : ""
        }
      >
        <DrawerContentBody className="kafka-ui-appServices-drawer__drawer-content-body">
          {children}
        </DrawerContentBody>
      </DrawerContent>
    </Drawer>
  );
};
