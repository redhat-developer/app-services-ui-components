import { Flex, FlexItem, Skeleton } from "@patternfly/react-core";
import React, { VoidFunctionComponent } from "react";
import { chartHeight, chartPadding } from "../consts";

export const ChartSkeletonLoader: VoidFunctionComponent = () => (
  <Flex direction={{ default: "column" }} data-chromatic="ignore">
    <FlexItem>
      <Skeleton height={`${chartHeight - chartPadding.bottom}px`} />
    </FlexItem>
    <FlexItem>
      <Skeleton height={`${chartPadding.bottom / 2 - 12.5}px`} width="20%" />
    </FlexItem>
    <FlexItem>
      <Skeleton height={`${chartPadding.bottom / 2 - 12.5}px`} width="40%" />
    </FlexItem>
  </Flex>
);
