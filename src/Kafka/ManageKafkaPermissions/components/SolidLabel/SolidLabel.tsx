import React from "react";
import { Label, LabelProps } from "@patternfly/react-core";
import { AclResourceType } from "../../types";
import "./SolidLabel.css";

export type SolidLabelProps = {
  variant: AclResourceType;
};

type Variant = {
  labelColor: LabelProps["color"];
  content: string;
};

export const SolidLabel: React.VFC<SolidLabelProps> = ({ variant }) => {
  const getVariant = (): Variant => {
    switch (variant) {
      case AclResourceType.Group:
        return { labelColor: "green", content: "G" };
      case AclResourceType.Cluster:
        return { labelColor: "grey", content: "KI" };
      case AclResourceType.Topic:
        return { labelColor: "blue", content: "T" };
      case AclResourceType.TransactionalId:
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
