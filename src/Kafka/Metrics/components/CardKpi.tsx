import {
  Bullseye,
  Card,
  CardBody,
  CardTitle,
  Skeleton,
  Title,
} from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import { ChartPopover } from "./ChartPopover";
import { EmptyStateNoMetricsData } from "./EmptyStateNoMetricsData";

type CardKpiProps = {
  metric: string | number | undefined;
  name: string;
  popover: string;
  isLoading: boolean;
};

export const CardKpi: VoidFunctionComponent<CardKpiProps> = ({
  metric,
  name,
  popover,
  isLoading,
}) => {
  return (
    <Card isFullHeight data-testid={name}>
      <CardTitle component="h3">
        {name} <ChartPopover title={name} description={popover} />
      </CardTitle>
      <CardBody>
        {!isLoading &&
          (metric === undefined ? (
            <Bullseye>
              <EmptyStateNoMetricsData />
            </Bullseye>
          ) : (
            <Title
              headingLevel="h3"
              size="4xl"
              aria-valuetext={`${metric} ${name}`}
            >
              {metric}
            </Title>
          ))}
        {isLoading && <Skeleton width="50px" shape="square" />}
      </CardBody>
    </Card>
  );
};
