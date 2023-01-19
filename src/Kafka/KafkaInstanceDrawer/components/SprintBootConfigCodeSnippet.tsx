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

export const SpringBootConfigCodeSnippet: VoidFunctionComponent = () => {
  const codeBlock = `package com.example.kafkaconfig;
  import java.util.HashMap;
 import java.util.Map;

 public class KafkaConfig {

     public static Map<String, Object> Config() {

         Map<String, Object> config = new HashMap<>();

         String kafkaHost = System.getenv("<bootstrap_server>");
         String rhoasClientID = System.getenv("<client_id>");
         String rhoasClientSecret = System.getenv("{client_secret}");
         String rhoasOauthTokenUrl = System.getenv("RHOAS_SERVICE_ACCOUNT_OAUTH_TOKEN_URL");

         config.put("bootstrap.servers", kafkaHost);

         config.put("security.protocol", "SASL_SSL");
         config.put("sasl.mechanism", "OAUTHBEARER");

         config.put("sasl.jaas.config", "org.apache.kafka.common.security.oauthbearer.OAuthBearerLoginModule required clientId=\\"" + rhoasClientID + "\\" clientSecret=\\"" + rhoasClientSecret + "\\" oauth.token.endpoint.uri=\\"" + rhoasOauthTokenUrl + "\\";");
         config.put("sasl.login.callback.handler.class", "org.apache.kafka.common.security.oauthbearer.secured.OAuthBearerLoginCallbackHandler");
         config.put("sasl.oauthbearer.token.endpoint.url", rhoasOauthTokenUrl);
         config.put("sasl.oauthbearer.scope.claim.name", "api.iam.service_accounts");

         return config;
     }
 }`;

  const code = `package com.example.kafkaconfig;
  import java.util.HashMap;
 import java.util.Map;

 public class KafkaConfig {

     public static Map<String, Object> Config() {

         Map<String, Object> config = new HashMap<>();
`;

  const expandedCode = `
         String kafkaHost = System.getenv("<bootstrap_server>");
         String rhoasClientID = System.getenv("<client_id>");
         String rhoasClientSecret = System.getenv("{client_secret}");
         String rhoasOauthTokenUrl = System.getenv("RHOAS_SERVICE_ACCOUNT_OAUTH_TOKEN_URL");

         config.put("bootstrap.servers", kafkaHost);

         config.put("security.protocol", "SASL_SSL");
         config.put("sasl.mechanism", "OAUTHBEARER");

         config.put("sasl.jaas.config", "org.apache.kafka.common.security.oauthbearer.OAuthBearerLoginModule required clientId=\\"" + rhoasClientID + "\\" clientSecret=\\"" + rhoasClientSecret + "\\" oauth.token.endpoint.uri=\\"" + rhoasOauthTokenUrl + "\\";");
         config.put("sasl.login.callback.handler.class", "org.apache.kafka.common.security.oauthbearer.secured.OAuthBearerLoginCallbackHandler");
         config.put("sasl.oauthbearer.token.endpoint.url", rhoasOauthTokenUrl);
         config.put("sasl.oauthbearer.scope.claim.name", "api.iam.service_accounts");

         return config;
     }
 }`;

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
