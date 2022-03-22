import { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  ButtonVariant,
  Grid,
  GridItem,
  Skeleton,
  Card,
  CardBody,
  CardTitle,
  Stack,
  StackItem,
  DescriptionList,
  DescriptionListTerm,
  DescriptionListGroup,
  DescriptionListDescription,
} from "@patternfly/react-core";

import ClockIcon from "@patternfly/react-icons/dist/js/icons/outlined-clock-icon";

export type InstanceInfoProps = {
  isLoading: boolean;
  isTrial: boolean;
  onClickQuickStart: () => void;
};

export type InstanceInfoLimitsProps = {
  trialDurationInHours: number;
  ingresEgress: number;
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
  streamingUnits: number;
};

export const InstanceInfo: VoidFunctionComponent<
  InstanceInfoProps & InstanceInfoLimitsProps
> = ({
  isLoading,
  isTrial,
  trialDurationInHours,
  ingresEgress,
  storage,
  maxPartitions,
  connections,
  connectionRate,
  messageSize,
  onClickQuickStart,
  streamingUnits,
}) => {
  const { t } = useTranslation("create-kafka-instance");

  return (
    <Stack hasGutter>
      <StackItem>
        <Card isFlat>
          <CardTitle component="h2">{t("instance_information")}</CardTitle>
          <CardBody>
            <DescriptionList isCompact>
              <DescriptionListGroup>
                {!isLoading && (
                  <Grid sm={6} lg={12} hasGutter>
                    {!isTrial && (
                      <GridItem>
                        <DescriptionListTerm>{t("size")}</DescriptionListTerm>
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
                          value: ingresEgress,
                        })}
                      </DescriptionListDescription>
                    </GridItem>
                    <GridItem>
                      <DescriptionListTerm>
                        {t("kafka:egress")}
                      </DescriptionListTerm>
                      <DescriptionListDescription>
                        {t("egress_value", {
                          value: ingresEgress,
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
                  </Grid>
                )}
                {isLoading && (
                  <Grid sm={6} lg={12} hasGutter>
                    <GridItem>
                      <Skeleton
                        width="75%"
                        screenreaderText="Loading contents"
                      />
                    </GridItem>
                    <GridItem>
                      <Skeleton width="66%" />
                    </GridItem>
                    <GridItem>
                      <Skeleton width="66%" />
                    </GridItem>
                    <GridItem>
                      <Skeleton width="50%" />
                    </GridItem>
                    <GridItem>
                      <Skeleton width="33%" />
                    </GridItem>
                    <GridItem>
                      <Skeleton width="25%" />
                    </GridItem>
                    <GridItem>
                      <Skeleton width="55%" />
                    </GridItem>
                    <GridItem>
                      <Skeleton width="35%" />
                    </GridItem>
                  </Grid>
                )}
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
              {t("quick_start_guide_message")}
            </Button>
          </CardBody>
        </Card>
      </StackItem>
    </Stack>
  );
};
