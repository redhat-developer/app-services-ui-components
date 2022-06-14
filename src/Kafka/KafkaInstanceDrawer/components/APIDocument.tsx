import { Button, ButtonVariant } from "@patternfly/react-core";
import { ExternalLinkAltIcon } from "@patternfly/react-icons";
import type { FunctionComponent } from "react";

export type APIDocumentLinkProps = {
  linktoDocumentProtal: string;
};

export const APIDocumentLink: FunctionComponent<APIDocumentLinkProps> = ({
  children,
  linktoDocumentProtal,
}) => (
  <Button
    isInline
    variant={ButtonVariant.link}
    component="a"
    target="_blank"
    href={linktoDocumentProtal}
  >
    {children}
    <ExternalLinkAltIcon className="pf-u-ml-xs" />
  </Button>
);
