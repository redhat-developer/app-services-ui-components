import { CardBody, Bullseye, Spinner } from "@patternfly/react-core";
import type { FunctionComponent } from "react";

export const CardBodyLoading: FunctionComponent = () => (
  <CardBody>
    <Bullseye>
      <Spinner isSVG data-chromatic="ignore" />
    </Bullseye>
  </CardBody>
);
