import { Button, ButtonProps, ButtonVariant } from "@patternfly/react-core";
import { ExternalLinkAltIcon } from "@patternfly/react-icons/dist/js/icons/external-link-alt-icon";
import { FunctionComponent } from "react";

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
    <ExternalLinkAltIcon className="pf-u-ml-xs" />
  </Button>
);
