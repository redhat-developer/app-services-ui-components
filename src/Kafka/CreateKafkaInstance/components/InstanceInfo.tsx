import {
  Button,
  ButtonVariant,
  Grid,
  GridItem,
  Skeleton,
  Text,
  TextContent,
  TextList,
  TextListItem,
  TextListItemVariants,
  TextListVariants,
  TextVariants,
} from "@patternfly/react-core";
import { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";

export type InstanceInfoProps = {
  isLoading: boolean;
  isTrial: boolean;
  onClickQuickStart: () => void;
};

export type InstanceInfoLimitsProps = {
  trialDurationInHours: number;
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
};

export const InstanceInfo: VoidFunctionComponent<
  InstanceInfoProps & InstanceInfoLimitsProps
> = ({
  isLoading,
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
}) => {
  const { t } = useTranslation();

  return (
    <TextContent data-testid={"instance-info"}>
      <Text component={TextVariants.h3}>
        {t("create-kafka-instance:instance_information")}
      </Text>
      {!isLoading && (
        <Grid sm={6} lg={12} hasGutter>
          {isTrial && (
            <GridItem>
              <TextList component={TextListVariants.dl}>
                <TextListItem component={TextListItemVariants.dt}>
                  {t("kafka:duration")}
                </TextListItem>
                <TextListItem component={TextListItemVariants.dd}>
                  {t("create-kafka-instance:duration_value", {
                    value: trialDurationInHours,
                  })}
                </TextListItem>
              </TextList>
            </GridItem>
          )}
          <GridItem>
            <TextList component={TextListVariants.dl}>
              <TextListItem component={TextListItemVariants.dt}>
                {t("kafka:ingress")}
              </TextListItem>
              <TextListItem component={TextListItemVariants.dd}>
                {t("create-kafka-instance:ingress_value", {
                  value: ingress,
                })}
              </TextListItem>
            </TextList>
          </GridItem>
          <GridItem>
            <TextList component={TextListVariants.dl}>
              <TextListItem component={TextListItemVariants.dt}>
                {t("kafka:egress")}
              </TextListItem>
              <TextListItem component={TextListItemVariants.dd}>
                {t("create-kafka-instance:egress_value", {
                  value: egress,
                })}
              </TextListItem>
            </TextList>
          </GridItem>
          <GridItem>
            <TextList component={TextListVariants.dl}>
              <TextListItem component={TextListItemVariants.dt}>
                {t("kafka:storage")}
              </TextListItem>
              <TextListItem component={TextListItemVariants.dd}>
                {t("create-kafka-instance:storage_value", {
                  value: storage,
                })}
              </TextListItem>
            </TextList>
          </GridItem>
          <GridItem>
            <TextList component={TextListVariants.dl}>
              <TextListItem component={TextListItemVariants.dt}>
                {t("kafka:partitions")}
              </TextListItem>
              <TextListItem component={TextListItemVariants.dd}>
                {t("create-kafka-instance:partitions_value", {
                  value: maxPartitions,
                })}
              </TextListItem>
            </TextList>
          </GridItem>
          <GridItem>
            <TextList component={TextListVariants.dl}>
              <TextListItem component={TextListItemVariants.dt}>
                {t("kafka:client_connections")}
              </TextListItem>
              <TextListItem component={TextListItemVariants.dd}>
                {t("create-kafka-instance:client_connections_value", {
                  value: connections,
                })}
              </TextListItem>
            </TextList>
          </GridItem>
          <GridItem>
            <TextList component={TextListVariants.dl}>
              <TextListItem component={TextListItemVariants.dt}>
                {t("kafka:connection_rate")}
              </TextListItem>
              <TextListItem component={TextListItemVariants.dd}>
                {t("create-kafka-instance:connection_rate_value", {
                  value: connectionRate,
                })}
              </TextListItem>
            </TextList>
          </GridItem>
          <GridItem>
            <TextList component={TextListVariants.dl}>
              <TextListItem component={TextListItemVariants.dt}>
                {t("kafka:message_size")}
              </TextListItem>
              <TextListItem component={TextListItemVariants.dd}>
                {t("create-kafka-instance:message_size_value", {
                  value: messageSize,
                })}
              </TextListItem>
            </TextList>
          </GridItem>
        </Grid>
      )}
      {isLoading && (
        <Grid sm={6} lg={12} hasGutter>
          <GridItem>
            <Skeleton width="75%" screenreaderText="Loading contents" />
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
      <Button
        isSmall
        isInline
        variant={ButtonVariant.link}
        style={{ marginTop: "20px" }}
        onClick={onClickQuickStart}
      >
        {t("create-kafka-instance:quick_start_guide_message")}
      </Button>
    </TextContent>
  );
};
