import type { VFC } from "react";
import type { LabelProps } from "@patternfly/react-core";
import { Label } from "@patternfly/react-core";
import type { AclResourceType } from "../types";
import "./ResourceTypeLabel.css";

export type SolidLabelProps = {
  variant: AclResourceType;
};

type Variant = {
  labelColor: LabelProps["color"];
  content: string;
};

export const ResourceTypeLabel: VFC<SolidLabelProps> = ({ variant }) => {
  const getVariant = (): Variant => {
    switch (variant) {
      case "GROUP":
        return { labelColor: "green", content: "G" };
      case "CLUSTER":
        return { labelColor: "grey", content: "KI" };
      case "TOPIC":
        return { labelColor: "blue", content: "T" };
      case "TRANSACTIONAL_ID":
        return { labelColor: "orange", content: "TI" };
    }
  };

  const { labelColor, content } = getVariant() || {};

  return (
    <Label color={labelColor} className={`mas-m-solid`}>
      {content}
    </Label>
  );
};
