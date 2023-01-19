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

export const QuarkusConfigCodeSnippet: VoidFunctionComponent = () => {
  const codeBlock = `# Quarkus config
  quarkus.ssl.native=true
 
  # Configure the Kafka sink (we write to it)
  mp.messaging.outgoing.generated-price.connector=smallrye-kafka
  mp.messaging.outgoing.generated-price.topic=prices
  mp.messaging.outgoing.generated-price.value.serializer=org.apache.kafka.common.serialization.IntegerSerializer
 
  # Configure the Kafka source (we read from it)
  mp.messaging.incoming.prices.connector=smallrye-kafka
  mp.messaging.incoming.prices.topic=prices
  mp.messaging.incoming.prices.value.deserializer=org.apache.kafka.common.serialization.IntegerDeserializer
 
  # Configure docker config
  quarkus.container-image.builder=jib
  quarkus.kubernetes.deployment-target=kubernetes
  quarkus.container-image.build=false
  quarkus.container-image.push=false
 
  ## dev profile using user defined environment variables that uses SASL/OAUTHBEARER
  ## ./mvnw quarkus:dev
  ## ./mvnw package -Dquarkus.profile=dev
 
  %dev.kafka.bootstrap.servers=\${"KAFKA_HOST"}
  %dev.kafka.security.protocol=SASL_SSL
 
  %dev.kafka.sasl.mechanism=OAUTHBEARER
  %dev.kafka.sasl.jaas.config=org.apache.kafka.common.security.oauthbearer.OAuthBearerLoginModule required \\
    oauth.client.id="\${<client_id>}" \\
    oauth.client.secret="\${<client_secret>}" \\
    oauth.token.endpoint.uri="\${RHOAS_SERVICE_ACCOUNT_OAUTH_TOKEN_URL}" ;
  %dev.kafka.sasl.login.callback.handler.class=io.strimzi.kafka.oauth.client.JaasClientOauthLoginCallbackHandler`;

  const code = `# Quarkus config
  quarkus.ssl.native=true
 
  # Configure the Kafka sink (we write to it)
  mp.messaging.outgoing.generated-price.connector=smallrye-kafka
  mp.messaging.outgoing.generated-price.topic=prices
  mp.messaging.outgoing.generated-price.value.serializer=org.apache.kafka.common.serialization.IntegerSerializer
 
  # Configure the Kafka source (we read from it)
  mp.messaging.incoming.prices.connector=smallrye-kafka`;

  const expandedCode = `  mp.messaging.incoming.prices.topic=prices
  mp.messaging.incoming.prices.value.deserializer=org.apache.kafka.common.serialization.IntegerDeserializer
 
  # Configure docker config
  quarkus.container-image.builder=jib
  quarkus.kubernetes.deployment-target=kubernetes
  quarkus.container-image.build=false
  quarkus.container-image.push=false
 
  ## dev profile using user defined environment variables that uses SASL/OAUTHBEARER
  ## ./mvnw quarkus:dev
  ## ./mvnw package -Dquarkus.profile=dev
 
  %dev.kafka.bootstrap.servers=\${"KAFKA_HOST"}
  %dev.kafka.security.protocol=SASL_SSL
 
  %dev.kafka.sasl.mechanism=OAUTHBEARER
  %dev.kafka.sasl.jaas.config=org.apache.kafka.common.security.oauthbearer.OAuthBearerLoginModule required \\
    oauth.client.id="\${<client_id>}" \\
    oauth.client.secret="\${<client_secret>}" \\
    oauth.token.endpoint.uri="\${RHOAS_SERVICE_ACCOUNT_OAUTH_TOKEN_URL}" ;
  %dev.kafka.sasl.login.callback.handler.class=io.strimzi.kafka.oauth.client.JaasClientOauthLoginCallbackHandler`;

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
