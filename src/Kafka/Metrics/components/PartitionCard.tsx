import {
  Alert,
  AlertVariant,
  Bullseye,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Skeleton,
  Text,
  TextContent,
  Title,
} from "@patternfly/react-core";
import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from "@patternfly/react-icons";
import type { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { ChartPopover } from "./ChartPopover";
import { EmptyStateNoMetricsData } from "./EmptyStateNoMetricsData";

type PartitionCardProps = {
  metric: number | undefined;
  isLoading: boolean;
  topicPartitionsLimit: number | undefined;
};

export const PartitionCard: VoidFunctionComponent<PartitionCardProps> = ({
  metric,
  isLoading,
  topicPartitionsLimit = 0,
}) => {
  const { t } = useTranslation();

  return (
    <Card
      isFullHeight
      data-testid={t("metrics:metric_kpi_topicPartitions_name")}
    >
      <CardTitle component="h3">
        {t("metrics:metric_kpi_topicPartitions_name")}{" "}
        <ChartPopover
          title={t("metrics:metric_kpi_topicPartitions_name")}
          description={t("metrics:metric_kpi_topicPartitions_description")}
        />
      </CardTitle>
      <CardBody>
        {!isLoading &&
          (metric === undefined ? (
            <Bullseye>
              <EmptyStateNoMetricsData />
            </Bullseye>
          ) : (
            <>
              <Title
                headingLevel="h3"
                size="4xl"
                aria-valuetext={`${metric} ${t(
                  "metrics:metric_kpi_topicPartitions_name"
                )}`}
              >
                {metric}{" "}
                {(() => {
                  if (metric >= topicPartitionsLimit) {
                    return (
                      <ExclamationCircleIcon color="var(--pf-global--danger-color--100)" />
                    );
                  } else if (metric >= topicPartitionsLimit * 0.95) {
                    return (
                      <ExclamationTriangleIcon color="var(--pf-global--warning-color--100)" />
                    );
                  } else {
                    return "";
                  }
                })()}
              </Title>
              <TextContent>
                <Text>
                  {t("metrics:partition_limit", {
                    topic: topicPartitionsLimit,
                  })}
                </Text>
              </TextContent>
            </>
          ))}
        {isLoading && <Skeleton width="50px" shape="square" />}
      </CardBody>
      {(() => {
        if (metric && metric >= topicPartitionsLimit) {
          return (
            <CardFooter>
              <Alert
                isExpandable
                isInline
                variant={AlertVariant.danger}
                title={t("metrics:partition_limit_reached_title")}
              >
                <p>{t("metrics:partition_limit_reached_description_1")}</p>
                <p>{t("metrics:partition_limit_reached_description_2")}</p>
              </Alert>
            </CardFooter>
          );
        } else if (metric && metric >= topicPartitionsLimit * 0.95) {
          return (
            <CardFooter>
              <Alert
                role={"alert"}
                isExpandable
                isInline
                variant={AlertVariant.warning}
                title={t("metrics:partition_limit_approaching_title")}
              >
                <p>
                  {t("metrics:partition_limit_approaching_description_1", {
                    limit: topicPartitionsLimit,
                  })}
                </p>
                <p>{t("metrics:partition_limit_approaching_description_2")}</p>
              </Alert>
            </CardFooter>
          );
        } else {
          return " ";
        }
      })()}
    </Card>
  );
};
