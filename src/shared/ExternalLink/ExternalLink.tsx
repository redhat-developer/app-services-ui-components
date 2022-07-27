import type { ButtonProps } from "@patternfly/react-core";
import { Button, ButtonVariant } from "@patternfly/react-core";
import type { FunctionComponent } from "react";
import { ExternalLinkAltIcon } from "@patternfly/react-icons";

export type ExternaLinkProps = {
  testId: string;
  target?: ButtonProps["target"];
  href: NonNullable<ButtonProps["href"]>;
  className: string;
};

export const ExternalLink: FunctionComponent<ExternaLinkProps> = ({
  testId,
  target = "_blank",
  href,
  className,
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
      <ExternalLinkAltIcon className={className} />
    </span>
  </Button>
);
