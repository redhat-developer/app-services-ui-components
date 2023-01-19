import {
  ClipboardCopyButton,
  CodeBlock,
  CodeBlockAction,
  CodeBlockCode,
  ExpandableSection,
  ExpandableSectionToggle,
} from "@patternfly/react-core";
import { MouseEvent, useState } from "react";
import type { VoidFunctionComponent } from "react";
import { useCopyClipBoard } from "./useCopyClipBoard";

export const JavaConfigCodeSnippet: VoidFunctionComponent = () => {
  const codeBlock = `package org.example;
 
  import org.apache.kafka.clients.producer.ProducerConfig;
 
  import java.util.Properties;
 
  public class KafkaConfig {
 
      static Properties properties() {
 
          String kafkaHost = System.getenv("KAFKA_HOST");
          String rhoasClientID = System.getenv("<client_id>");
          String rhoasClientSecret = System.getenv("<client_secret>");
          String rhoasOauthTokenUrl = System.getenv("RHOAS_SERVICE_ACCOUNT_OAUTH_TOKEN_URL");
 
          var properties= new Properties();
 
          properties.setProperty(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, kafkaHost);
          properties.setProperty("security.protocol", "SASL_SSL");
          properties.setProperty("sasl.mechanism", "OAUTHBEARER");
 
          properties.setProperty("sasl.jaas.config", "org.apache.kafka.common.security.oauthbearer.OAuthBearerLoginModule required clientId=\\"" + rhoasClientID + "\\" clientSecret=\\"" + rhoasClientSecret + "\\" oauth.token.endpoint.uri=\\"" + rhoasOauthTokenUrl + "\\";");
 
          properties.setProperty("sasl.login.callback.handler.class", "org.apache.kafka.common.security.oauthbearer.secured.OAuthBearerLoginCallbackHandler");
          properties.setProperty("sasl.oauthbearer.token.endpoint.url", rhoasOauthTokenUrl);
          properties.setProperty("sasl.oauthbearer.scope.claim.name", "api.iam.service_accounts");
 
          return properties;
      }
  }`;

  const code = `package org.example;
 
  import org.apache.kafka.clients.producer.ProducerConfig;
 
  import java.util.Properties;
 
  public class KafkaConfig {
 
      static Properties properties() {
 
          String kafkaHost = System.getenv("KAFKA_HOST");`;

  const expandedCode = `String rhoasClientID = System.getenv("<client_id>");
String rhoasClientSecret = System.getenv("<client_secret>");
String rhoasOauthTokenUrl = System.getenv("RHOAS_SERVICE_ACCOUNT_OAUTH_TOKEN_URL");

var properties= new Properties();

properties.setProperty(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, kafkaHost);
properties.setProperty("security.protocol", "SASL_SSL");
properties.setProperty("sasl.mechanism", "OAUTHBEARER");

properties.setProperty("sasl.jaas.config", "org.apache.kafka.common.security.oauthbearer.OAuthBearerLoginModule required clientId=\\"" + rhoasClientID + "\\" clientSecret=\\"" + rhoasClientSecret + "\\" oauth.token.endpoint.uri=\\"" + rhoasOauthTokenUrl + "\\";");

properties.setProperty("sasl.login.callback.handler.class", "org.apache.kafka.common.security.oauthbearer.secured.OAuthBearerLoginCallbackHandler");
properties.setProperty("sasl.oauthbearer.token.endpoint.url", rhoasOauthTokenUrl);
properties.setProperty("sasl.oauthbearer.scope.claim.name", "api.iam.service_accounts");

return properties;
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
