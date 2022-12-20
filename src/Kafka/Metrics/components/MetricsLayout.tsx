import { Grid, GridItem, PageSection } from "@patternfly/react-core";
import type { ReactElement, FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

type MetricsLayoutProps = {
  metricsLagAlert: ReactElement;
  topicsKpi: ReactElement;
  topicPartitionsKpi: ReactElement;
  consumerGroupKpi: ReactElement;
  diskSpaceMetrics: ReactElement;
  topicMetrics: ReactElement;
};
export const MetricsLayout: FunctionComponent<MetricsLayoutProps> = ({
  metricsLagAlert,
  topicsKpi,
  topicPartitionsKpi,
  consumerGroupKpi,
  diskSpaceMetrics,
  topicMetrics,
}) => {
  const { t } = useTranslation(["metrics"]);
  return (
    <PageSection hasOverflowScroll={true} aria-label={t("metrics_view")}>
      <Grid hasGutter>
        <GridItem>{metricsLagAlert}</GridItem>
        <GridItem sm={4}>{topicsKpi}</GridItem>
        <GridItem sm={4}>{topicPartitionsKpi}</GridItem>
        <GridItem sm={4}>{consumerGroupKpi}</GridItem>
        <GridItem lg={6}>{diskSpaceMetrics}</GridItem>
        <GridItem lg={6}>{topicMetrics}</GridItem>
      </Grid>
    </PageSection>
  );
};
