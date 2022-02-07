import { Grid, GridItem, PageSection } from "@patternfly/react-core";
import React, { ReactElement, FunctionComponent } from "react";

type MetricsLayoutProps = {
  topicsKpi: ReactElement;
  topicPartitionsKpi: ReactElement;
  consumerGroupKpi: ReactElement;
  diskSpaceMetrics: ReactElement;
  topicMetrics: ReactElement;
};
export const MetricsLayout: FunctionComponent<MetricsLayoutProps> = ({
  topicsKpi,
  topicPartitionsKpi,
  consumerGroupKpi,
  diskSpaceMetrics,
  topicMetrics,
}) => {
  return (
    <PageSection>
      <Grid hasGutter>
        <GridItem sm={4}>{topicsKpi}</GridItem>
        <GridItem sm={4}>{topicPartitionsKpi}</GridItem>
        <GridItem sm={4}>{consumerGroupKpi}</GridItem>
        <GridItem lg={6}>{diskSpaceMetrics}</GridItem>
        <GridItem lg={6}>{topicMetrics}</GridItem>
      </Grid>
    </PageSection>
  );
};
