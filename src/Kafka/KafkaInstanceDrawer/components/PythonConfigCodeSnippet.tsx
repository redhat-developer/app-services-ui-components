import {
  ClipboardCopyButton,
  CodeBlock,
  CodeBlockAction,
  CodeBlockCode,
  ExpandableSection,
  ExpandableSectionToggle,
} from "@patternfly/react-core";
import { useState } from "react";
import type { VoidFunctionComponent } from "react";
import { useCopyClipBoard } from "./useCopyClipBoard";

export const PythonConfigCodeSnippet: VoidFunctionComponent = () => {
  const codeBlock = `import time
  import requests
 
  def _get_token(config):
      payload = {"grant_type": "client_credentials", "scope": "api.iam.service_accounts"}
      resp = requests.post(
          RHOAS_SERVICE_ACCOUNT_OAUTH_TOKEN_URL,
          auth=(
              <client_id>,
              <client_secret>,
          ),
          data=payload,
      )
      token = resp.json()
      return token["access_token"], time.time() + float(token["expires_in"])
 
  common_config = {
      'bootstrap.servers': KAFKA_HOST,
      'security.protocol': 'SASL_SSL',
      'sasl.mechanisms': 'OAUTHBEARER',
      'oauth_cb': _get_token,
  }
 
  topic=<topic>`;
  const code = `import time
  import requests
 
  def _get_token(config):
      payload = {"grant_type": "client_credentials", "scope": "api.iam.service_accounts"}
      resp = requests.post(
          RHOAS_SERVICE_ACCOUNT_OAUTH_TOKEN_URL,
          auth=(
              <client_id>,
              <client_secret>,
          ),`;

  const expandedCode = `
          data=payload,
      )
      token = resp.json()
      return token["access_token"], time.time() + float(token["expires_in"])
 
  common_config = {
      'bootstrap.servers': KAFKA_HOST,
      'security.protocol': 'SASL_SSL',
      'sasl.mechanisms': 'OAUTHBEARER',
      'oauth_cb': _get_token,
  }
 
  topic=<topic>`;

  const [isExpanded, setIsExpanded] = useState(false);

  const { copied, clipboardCopyFunc } = useCopyClipBoard();

  const onToggle = (isExpanded: boolean) => {
    setIsExpanded(isExpanded);
  };

  const actions = (
    <CodeBlockAction>
      <ClipboardCopyButton
        id="basic-copy-button"
        textId="code-content"
        aria-label="Copy to clipboard"
        exitDelay={600}
        maxWidth="110px"
        variant="plain"
        onClick={(e) => clipboardCopyFunc(e, codeBlock)}
      >
        {copied ? "Successfully copied to clipboard!" : "Copy to clipboard"}
      </ClipboardCopyButton>
    </CodeBlockAction>
  );

  return (
    <CodeBlock actions={actions}>
      <CodeBlockCode id="code-content">
        {code}
        <ExpandableSection
          isExpanded={isExpanded}
          isDetached
          contentId="code-block-expand"
        >
          {expandedCode}
        </ExpandableSection>
      </CodeBlockCode>
      <ExpandableSectionToggle
        isExpanded={isExpanded}
        onToggle={onToggle}
        contentId="code-block-expand"
        direction="up"
      >
        {isExpanded ? "Show Less" : "Show More"}
      </ExpandableSectionToggle>
    </CodeBlock>
  );
};
