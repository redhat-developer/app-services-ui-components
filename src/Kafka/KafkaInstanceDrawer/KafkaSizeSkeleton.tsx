import {
  DescriptionList,
  DescriptionListGroup,
  Skeleton,
  Stack,
  StackItem,
} from "@patternfly/react-core";
import { VoidFunctionComponent } from "react";

export const KafkaSizeSkeleton: VoidFunctionComponent = () => {
  return (
    <Stack hasGutter data-testid="size-info">
      <StackItem>
        <DescriptionList isCompact>
          <DescriptionListGroup>
            <Skeleton width="50%" screenreaderText="Loading contents" />
            <Skeleton width="50%" />
            <Skeleton width="50%" />
            <Skeleton width="50%" />
            <Skeleton width="50%" />
            <Skeleton width="50%" />
            <Skeleton width="50%" />
            <Skeleton width="50%" />
          </DescriptionListGroup>
        </DescriptionList>
      </StackItem>
    </Stack>
  );
};
