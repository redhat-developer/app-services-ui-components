import { Flex, FlexItem, Skeleton } from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import { chartHeight, chartPadding } from "../consts";
import { useTranslation } from "react-i18next";

export const ChartSkeletonLoader: VoidFunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <Flex direction={{ default: "column" }} data-chromatic="ignore">
      <FlexItem>
        <Skeleton
          height={`${chartHeight - chartPadding.bottom}px`}
          screenreaderText={t("common:skeleton_loader_screenreader_text")}
        />
      </FlexItem>
      <FlexItem>
        <Skeleton height={`${chartPadding.bottom / 2 - 12.5}px`} width="20%" />
      </FlexItem>
      <FlexItem>
        <Skeleton height={`${chartPadding.bottom / 2 - 12.5}px`} width="40%" />
      </FlexItem>
    </Flex>
  );
};
