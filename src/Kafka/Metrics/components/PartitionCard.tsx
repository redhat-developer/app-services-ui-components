import {
  Bullseye,
  Card,
  CardBody,
  CardTitle,
  Skeleton,
  TextContent,
  Title,
  Text,
  CardFooter,
  Alert,
  Stack,
  StackItem,
  AlertVariant,
} from "@patternfly/react-core";
import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from "@patternfly/react-icons";
import { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { ChartPopover } from "./ChartPopover";
import { EmptyStateNoMetricsData } from "./EmptyStateNoMetricsData";

type PartitionCardProps = {
  metric: string | number | undefined;
  isLoading: boolean;
};

export const PartitionCard: VoidFunctionComponent<PartitionCardProps> = ({
  metric,
  isLoading,
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
        <Bullseye>
          {!isLoading &&
            (metric === undefined ? (
              <EmptyStateNoMetricsData />
            ) : (
              <Stack hasGutter>
                <StackItem>
                  <Title
                    headingLevel="h3"
                    size="4xl"
                    aria-valuetext={`${metric} ${t(
                      "metrics:metric_kpi_topicPartitions_name"
                    )}`}
                  >
                    {metric}{" "}
                    {(() => {
                      if (metric === 1000) {
                        return (
                          <ExclamationCircleIcon color="var(--pf-global--danger-color--100)" />
                        );
                      } else if (metric >= 950) {
                        return (
                          <ExclamationTriangleIcon color="var(--pf-global--warning-color--100)" />
                        );
                      } else {
                        return "";
                      }
                    })()}
                  </Title>
                </StackItem>
                <StackItem>
                  <TextContent>
                    <Text>{t("metrics:partition_limit")}</Text>
                  </TextContent>
                </StackItem>
              </Stack>
            ))}
          {isLoading && <Skeleton width="50px" shape="square" />}
        </Bullseye>
      </CardBody>
      {(() => {
        if (metric && metric === 1000) {
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
        } else if (metric && metric >= 950) {
          return (
            <CardFooter>
              <Alert
                role={"alert"}
                isExpandable
                isInline
                variant={AlertVariant.warning}
                title={t("metrics:partition_limit_approaching_title")}
              >
                <p>{t("metrics:partition_limit_approaching_description_1")}</p>
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
