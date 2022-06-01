import { Button, ButtonProps, ButtonVariant } from "@patternfly/react-core";
import { FunctionComponent } from "react";
import { ExternalLinkAltIcon } from "@patternfly/react-icons";

export type ExternaLinkProps = {
  testId: string;
  target?: ButtonProps["target"];
  href: NonNullable<ButtonProps["href"]>;
};

export const ExternalLink: FunctionComponent<ExternaLinkProps> = ({
  testId,
  target = "_blank",
  href,
  children,
}) => (
  <Button
    data-testid={testId}
    isInline
    variant={ButtonVariant.link}
    component="a"
    target={target}
    href={href}
  >
    {children}
    <span style={{ whiteSpace: "nowrap" }}>
      &nbsp;
      <ExternalLinkAltIcon className="pf-u-ml-xs" />
    </span>
  </Button>
);
