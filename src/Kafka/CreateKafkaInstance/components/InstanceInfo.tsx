import {
  Button,
  ButtonVariant,
  Card,
  CardBody,
  CardTitle,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Grid,
  GridItem,
  Stack,
  StackItem,
} from "@patternfly/react-core";

import { ClockIcon } from "@patternfly/react-icons";
import type { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import type { MarketplaceSubscription } from "../types";
import type { BillingHelpProps } from "./BillingHelp";
import { BillingHelp } from "./BillingHelp";

export type InstanceInfoProps = {
  isTrial: boolean;
  onClickQuickStart: () => void;

  trialDurationInHours: number | undefined;
  ingress: number;
  egress: number;
  /**
   * Max storage in GiB
   */
  storage: number;
  maxPartitions: number;
  connections: number;
  /**
   * Max connections/second
   */
  connectionRate: number;
  /**
   * Message size in MiB
   */
  messageSize: number;
  streamingUnits: string | undefined;

  billing:
    | ({
        value: "prepaid" | MarketplaceSubscription;
      } & BillingHelpProps)
    | undefined;
};

export const InstanceInfo: VoidFunctionComponent<InstanceInfoProps> = ({
  isTrial,
  trialDurationInHours,
  ingress,
  egress,
  storage,
  maxPartitions,
  connections,
  connectionRate,
  messageSize,
  onClickQuickStart,
  streamingUnits,
  billing,
}) => {
  const { t } = useTranslation("create-kafka-instance");

  return (
    <Stack hasGutter data-testid={"instance-info"}>
      <StackItem>
        <Card isFlat>
          <CardTitle component="h2">{t("instance_information")}</CardTitle>
          <CardBody>
            <DescriptionList isCompact>
              <DescriptionListGroup>
                <Grid sm={6} lg={12} hasGutter>
                  {!isTrial && (
                    <GridItem data-testid={"instance-size"}>
                      <DescriptionListTerm>
                        {t("common:size")}
                      </DescriptionListTerm>
                      <DescriptionListDescription>
                        {t("stream_unit_value", { size: streamingUnits })}
                      </DescriptionListDescription>
                    </GridItem>
                  )}
                  {isTrial && (
                    <GridItem>
                      <DescriptionListTerm>
                        {t("kafka:duration")}
                      </DescriptionListTerm>
                      <DescriptionListDescription>
                        <ClockIcon color="var(--pf-global--info-color--100)" />{" "}
                        {t("duration_value", {
                          value: trialDurationInHours,
                        })}
                      </DescriptionListDescription>
                    </GridItem>
                  )}
                  <GridItem>
                    <DescriptionListTerm>
                      {t("kafka:ingress")}
                    </DescriptionListTerm>
                    <DescriptionListDescription>
                      {t("ingress_value", {
                        value: ingress,
                      })}
                    </DescriptionListDescription>
                  </GridItem>
                  <GridItem>
                    <DescriptionListTerm>
                      {t("kafka:egress")}
                    </DescriptionListTerm>
                    <DescriptionListDescription>
                      {t("egress_value", {
                        value: egress,
                      })}
                    </DescriptionListDescription>
                  </GridItem>
                  <GridItem>
                    <DescriptionListTerm>
                      {t("kafka:storage")}
                    </DescriptionListTerm>
                    <DescriptionListDescription>
                      {t("storage_value", {
                        value: storage,
                      })}
                    </DescriptionListDescription>
                  </GridItem>
                  <GridItem>
                    <DescriptionListTerm>
                      {t("kafka:partitions")}
                    </DescriptionListTerm>
                    <DescriptionListDescription>
                      {t("partitions_value", {
                        value: maxPartitions,
                      })}
                    </DescriptionListDescription>
                  </GridItem>
                  <GridItem>
                    <DescriptionListTerm>
                      {t("kafka:client_connections")}
                    </DescriptionListTerm>
                    <DescriptionListDescription>
                      {t("client_connections_value", {
                        value: connections,
                      })}
                    </DescriptionListDescription>
                  </GridItem>
                  <GridItem>
                    <DescriptionListTerm>
                      {t("kafka:connection_rate")}
                    </DescriptionListTerm>
                    <DescriptionListDescription>
                      {t("connection_rate_value", {
                        value: connectionRate,
                      })}
                    </DescriptionListDescription>
                  </GridItem>
                  <GridItem>
                    <DescriptionListTerm>
                      {t("kafka:message_size")}
                    </DescriptionListTerm>
                    <DescriptionListDescription>
                      {t("message_size_value", {
                        value: messageSize,
                      })}
                    </DescriptionListDescription>
                  </GridItem>
                  {billing && (
                    <GridItem>
                      <DescriptionListTerm>
                        {t("billing.field_label")}&nbsp;
                        <BillingHelp
                          type={billing.type}
                          subscriptionOptionsHref={
                            billing.subscriptionOptionsHref
                          }
                        />
                      </DescriptionListTerm>
                      <DescriptionListDescription>
                        {(() => {
                          if (billing.value === "prepaid") {
                            return t("billing.prepaid_option");
                          }
                          switch (billing.value.marketplace) {
                            case "aws":
                              return (
                                <>
                                  {t("billing.marketplace_aws")}
                                  <br />
                                  {billing.value.subscription}
                                </>
                              );
                            case "azure":
                              return (
                                <>
                                  {t("billing.marketplace_azure")}
                                  <br />
                                  {billing.value.subscription}
                                </>
                              );
                            case "rhm":
                              return (
                                <>
                                  {t("billing.marketplace_rh")}
                                  <br />
                                  {billing.value.subscription}
                                </>
                              );
                          }
                        })()}
                      </DescriptionListDescription>
                    </GridItem>
                  )}
                </Grid>
              </DescriptionListGroup>
            </DescriptionList>
          </CardBody>
        </Card>
      </StackItem>
      <StackItem>
        <Card isFlat isCompact>
          <CardTitle component="h2">{t("quick_start_guide_title")}</CardTitle>
          <CardBody>
            <Button
              isSmall
              isInline
              variant={ButtonVariant.link}
              onClick={onClickQuickStart}
            >
              {t("quick_start_guide_message_exp")}
            </Button>
          </CardBody>
        </Card>
      </StackItem>
    </Stack>
  );
};
