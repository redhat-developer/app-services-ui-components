import type { ButtonProps } from "@patternfly/react-core";
import { Button, ButtonVariant } from "@patternfly/react-core";
import type { FunctionComponent } from "react";
import { ExternalLinkAltIcon } from "@patternfly/react-icons";

export type ExternaLinkProps = {
  testId: string;
  target?: ButtonProps["target"];
  href: NonNullable<ButtonProps["href"]>;
  className?: string;
  ouiaId?: ButtonProps["ouiaId"];
};

export const ExternalLink: FunctionComponent<ExternaLinkProps> = ({
  testId,
  target = "_blank",
  href,
  className,
  ouiaId,
  children,
}) => (
  <Button
    data-testid={testId}
    isInline
    ouiaId={ouiaId}
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
