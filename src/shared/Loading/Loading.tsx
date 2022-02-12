import { FunctionComponent } from "react";
import {
  Bullseye,
  BullseyeProps,
  Spinner,
  SpinnerProps,
} from "@patternfly/react-core";

export type LoadingProps = {
  bullseyeProps?: Omit<BullseyeProps, "children">;
  spinnerProps?: SpinnerProps;
};

export const Loading: FunctionComponent<LoadingProps> = ({
  bullseyeProps,
  spinnerProps,
}: LoadingProps) => {
  return (
    <Bullseye {...bullseyeProps}>
      <Spinner {...spinnerProps} />
    </Bullseye>
  );
};
