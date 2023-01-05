import {
  TextContent,
  TextVariants,
  Text,
  ToggleGroup,
  ToggleGroupItem,
  CodeBlock,
  CodeBlockAction,
  ClipboardCopyButton,
  CodeBlockCode,
} from "@patternfly/react-core";
import { useTranslation } from "react-i18next";
import { VoidFunctionComponent, useState } from "react";
import { CodeSnippetTypes } from "./types";

export type KafkaSampleCodeProps = {
  value: CodeSnippetTypes;
  onChange: (value: CodeSnippetTypes) => void;
};

export const KafkaSampleCode: VoidFunctionComponent<KafkaSampleCodeProps> = ({
  value,
  onChange,
}) => {
  const { t } = useTranslation("kafka");

  const [copied, setCopied] = useState(false);

  const onClick = () => {
    setCopied(true);
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
        onClick={onClick}
      >
        {copied ? "Successfully copied to clipboard!" : "Copy to clipboard"}
      </ClipboardCopyButton>
    </CodeBlockAction>
  );

  return (
    <div className="mas--details__drawer--tab-content">
      <TextContent className="pf-u-pb-sm">
        <Text component={TextVariants.small}>
          {t("code_snippet_description")}
        </Text>

        <ToggleGroup>
          <ToggleGroupItem
            text={t("clients.java")}
            value="java"
            buttonId="java"
            isSelected={value === "java"}
            onChange={() => onChange("java")}
          />
          <ToggleGroupItem
            text={t("clients.python")}
            value="python"
            buttonId="python"
            isSelected={value === "python"}
            onChange={() => onChange("python")}
          />
          <ToggleGroupItem
            text={t("clients.quarkus")}
            value="quarkus"
            buttonId="quarkus"
            isSelected={value === "quarkus"}
            onChange={() => onChange("quarkus")}
          />
          <ToggleGroupItem
            text={t("clients.spring_boot")}
            value="springboot"
            buttonId="springboot"
            isSelected={value === "springboot"}
            onChange={() => onChange("springboot")}
          />
        </ToggleGroup>
        <Text component={TextVariants.h3} className="pf-u-mt-xl">
          {t("sample_configuration_code")}
        </Text>
        <Text component={TextVariants.small}>
          {t("sample_configuration_code_description")}
        </Text>
        <CodeBlock actions={actions}>
          <CodeBlockCode>
            {(() => {
              switch (value) {
                case "java":
                  return `Import org.apache.kafka.clients.producer.ProducerConfig;

                  import java.util.Properties;
                  
                  public class KafkaConfig {
                  
                      static Properties properties() {
                          var properties= new Properties();
                  
                          properties.setProperty(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG , KAFKA_HOST);
                          properties.setProperty("security.protocol", "SASL_SSL");
                          properties.setProperty("sasl.mechanism", "OAUTHBEARER");
                  
                          properties.setProperty("sasl.jaas.config", "org.apache.kafka.common.security.oauthbearer.OAuthBearerLoginModule required clientId=\"" + RHOAS_SERVICE_ACCOUNT_CLIENT_ID + "\" clientSecret=\"" + RHOAS_SERVICE_ACCOUNT_CLIENT_SECRET + "\" oauth.token.endpoint.uri=\"" + RHOAS_SERVICE_ACCOUNT_OAUTH_TOKEN_URL + "\";");
                  
                          properties.setProperty("sasl.login.callback.handler.class", "org.apache.kafka.common.security.oauthbearer.secured.OAuthBearerLoginCallbackHandler");
                          properties.setProperty("sasl.oauthbearer.token.endpoint.url", "https://sso.redhat.com/auth/realms/redhat-external/protocol/openid-connect/token");
                          properties.setProperty("sasl.oauthbearer.scope.claim.name", "api.iam.service_accounts");
                  
                          return properties;
                      }
                  }`;
                case "python":
                  return `import time
                  import requests
                  
                  def _get_token(config):
                      payload = {"grant_type": "client_credentials", "scope": "api.iam.service_accounts"}
                      resp = requests.post(
                          RHOAS_SERVICE_ACCOUNT_OAUTH_TOKEN_URL,
                          auth=(
                              RHOAS_SERVICE_ACCOUNT_CLIENT_ID,
                              RHOAS_SERVICE_ACCOUNT_CLIENT_SECRET,
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
                  
                  topic=TOPIC`;
                case "quarkus":
                  return "";
                case "springboot":
                  return `package com.example.kafkademo;

                  import org.apache.kafka.clients.producer.ProducerConfig;
                  import org.apache.kafka.common.serialization.StringSerializer;
                  import org.springframework.boot.ApplicationRunner;
                  import org.springframework.boot.SpringApplication;
                  import org.springframework.boot.autoconfigure.SpringBootApplication;
                  import org.springframework.context.annotation.Bean;
                  import org.springframework.kafka.core.DefaultKafkaProducerFactory;
                  import org.springframework.kafka.core.KafkaTemplate;
                  import org.springframework.kafka.core.ProducerFactory;
                  
                  import java.util.Map;
                  
                  @SpringBootApplication
                  public class KafkaProducerExample {
                  
                    public static void main(String[] args) {
                      SpringApplication.run(KafkaProducerExample.class, args);
                    }
                  
                    @Bean
                    public ProducerFactory<String, String> producerFactory() {
                      Map<String, Object> config = KafkaConfig.config();
                  
                      config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
                      config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
                  
                      return new DefaultKafkaProducerFactory<String, String>(config);
                    }
                  
                    @Bean
                    public KafkaTemplate<String, String> kafkaTemplate() {
                      return new KafkaTemplate<>(producerFactory());
                    }
                  
                    @Bean
                    public ApplicationRunner runner(KafkaTemplate<String, String> template) {
                      return args -> {
                        template.send("prices", "Test Message");
                      };
                    }
                  
                  }`;
              }
            })()}
          </CodeBlockCode>
        </CodeBlock>
        <Text component={TextVariants.h3} className="pf-u-mt-xl">
          {t("sample_producer_code")}
        </Text>
        <Text component={TextVariants.small}>
          {t("sample_producer_code_description")}
        </Text>
        <CodeBlock actions={actions}>
          <CodeBlockCode>
            {(() => {
              switch (value) {
                case "java":
                  return `Import org.apache.kafka.clients.producer.ProducerConfig;

                  import java.util.Properties;
                  
                  public class KafkaConfig {
                  
                      static Properties properties() {
                          var properties= new Properties();
                  
                          properties.setProperty(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG , KAFKA_HOST);
                          properties.setProperty("security.protocol", "SASL_SSL");
                          properties.setProperty("sasl.mechanism", "OAUTHBEARER");
                  
                          properties.setProperty("sasl.jaas.config", "org.apache.kafka.common.security.oauthbearer.OAuthBearerLoginModule required clientId=\"" + RHOAS_SERVICE_ACCOUNT_CLIENT_ID + "\" clientSecret=\"" + RHOAS_SERVICE_ACCOUNT_CLIENT_SECRET + "\" oauth.token.endpoint.uri=\"" + RHOAS_SERVICE_ACCOUNT_OAUTH_TOKEN_URL + "\";");
                  
                          properties.setProperty("sasl.login.callback.handler.class", "org.apache.kafka.common.security.oauthbearer.secured.OAuthBearerLoginCallbackHandler");
                          properties.setProperty("sasl.oauthbearer.token.endpoint.url", "https://sso.redhat.com/auth/realms/redhat-external/protocol/openid-connect/token");
                          properties.setProperty("sasl.oauthbearer.scope.claim.name", "api.iam.service_accounts");
                  
                          return properties;
                      }
                  }`;
                case "python":
                  return `import time
                  import requests
                  
                  def _get_token(config):
                      payload = {"grant_type": "client_credentials", "scope": "api.iam.service_accounts"}
                      resp = requests.post(
                          RHOAS_SERVICE_ACCOUNT_OAUTH_TOKEN_URL,
                          auth=(
                              RHOAS_SERVICE_ACCOUNT_CLIENT_ID,
                              RHOAS_SERVICE_ACCOUNT_CLIENT_SECRET,
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
                  
                  topic=TOPIC`;
                case "quarkus":
                  return "";
                case "springboot":
                  return `package com.example.kafkademo;

                  import org.apache.kafka.clients.producer.ProducerConfig;
                  import org.apache.kafka.common.serialization.StringSerializer;
                  import org.springframework.boot.ApplicationRunner;
                  import org.springframework.boot.SpringApplication;
                  import org.springframework.boot.autoconfigure.SpringBootApplication;
                  import org.springframework.context.annotation.Bean;
                  import org.springframework.kafka.core.DefaultKafkaProducerFactory;
                  import org.springframework.kafka.core.KafkaTemplate;
                  import org.springframework.kafka.core.ProducerFactory;
                  
                  import java.util.Map;
                  
                  @SpringBootApplication
                  public class KafkaProducerExample {
                  
                    public static void main(String[] args) {
                      SpringApplication.run(KafkaProducerExample.class, args);
                    }
                  
                    @Bean
                    public ProducerFactory<String, String> producerFactory() {
                      Map<String, Object> config = KafkaConfig.config();
                  
                      config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
                      config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
                  
                      return new DefaultKafkaProducerFactory<String, String>(config);
                    }
                  
                    @Bean
                    public KafkaTemplate<String, String> kafkaTemplate() {
                      return new KafkaTemplate<>(producerFactory());
                    }
                  
                    @Bean
                    public ApplicationRunner runner(KafkaTemplate<String, String> template) {
                      return args -> {
                        template.send("prices", "Test Message");
                      };
                    }
                  
                  }`;
              }
            })()}
          </CodeBlockCode>
        </CodeBlock>
        <Text component={TextVariants.h3} className="pf-u-mt-xl">
          {t("sample_consumer_code")}
        </Text>
        <Text component={TextVariants.small}>
          {t("sample_consumer_code_description")}
        </Text>
        <CodeBlock actions={actions}>
          <CodeBlockCode id="code-content">
            {(() => {
              switch (value) {
                case "java":
                  return `import java.util.Arrays;

                  import org.apache.kafka.clients.consumer.ConsumerConfig;
                  import org.apache.kafka.clients.consumer.KafkaConsumer;
                  import org.apache.kafka.common.serialization.StringDeserializer;
                  import org.apache.kafka.clients.consumer.ConsumerRecord;
                  import org.apache.kafka.clients.consumer.ConsumerRecords;
                  import java.time.Duration;
                  
                  public class ConsumerExample {
                  
                      public static void main(String[] args) {
                  
                          var properties= KafkaConfig.properties();
                  
                          properties.setProperty(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
                          properties.setProperty(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
                          properties.setProperty(ConsumerConfig.GROUP_ID_CONFIG,"test_group_2");
                          properties.setProperty(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
                  
                          KafkaConsumer<String,String> consumer = new KafkaConsumer<String,String>(properties);
                  
                          consumer.subscribe(Arrays.asList(TOPIC));
                  
                          while(true){
                              ConsumerRecords<String,String> records=consumer.poll(Duration.ofMillis(100));
                              for(ConsumerRecord<String,String> record: records) {
                                  System.out.println("Key: "+ record.key() + ", Value:" + record.value());
                                  System.out.println("Partition:" + record.partition() + ",Offset:" + record.offset());
                              }
                          }
                      }
                  }`;
                case "python":
                  return `import time
                  import requests
                  
                  def _get_token(config):
                      payload = {"grant_type": "client_credentials", "scope": "api.iam.service_accounts"}
                      resp = requests.post(
                          RHOAS_SERVICE_ACCOUNT_OAUTH_TOKEN_URL,
                          auth=(
                              RHOAS_SERVICE_ACCOUNT_CLIENT_ID,
                              RHOAS_SERVICE_ACCOUNT_CLIENT_SECRET,
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
                  
                  topic=TOPIC`;
                case "quarkus":
                  return "";
                case "springboot":
                  return `package com.example.kafkademo;

                  import org.apache.kafka.clients.producer.ProducerConfig;
                  import org.apache.kafka.common.serialization.StringSerializer;
                  import org.springframework.boot.ApplicationRunner;
                  import org.springframework.boot.SpringApplication;
                  import org.springframework.boot.autoconfigure.SpringBootApplication;
                  import org.springframework.context.annotation.Bean;
                  import org.springframework.kafka.core.DefaultKafkaProducerFactory;
                  import org.springframework.kafka.core.KafkaTemplate;
                  import org.springframework.kafka.core.ProducerFactory;
                  
                  import java.util.Map;
                  
                  @SpringBootApplication
                  public class KafkaProducerExample {
                  
                    public static void main(String[] args) {
                      SpringApplication.run(KafkaProducerExample.class, args);
                    }
                  
                    @Bean
                    public ProducerFactory<String, String> producerFactory() {
                      Map<String, Object> config = KafkaConfig.config();
                  
                      config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
                      config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
                  
                      return new DefaultKafkaProducerFactory<String, String>(config);
                    }
                  
                    @Bean
                    public KafkaTemplate<String, String> kafkaTemplate() {
                      return new KafkaTemplate<>(producerFactory());
                    }
                  
                    @Bean
                    public ApplicationRunner runner(KafkaTemplate<String, String> template) {
                      return args -> {
                        template.send("prices", "Test Message");
                      };
                    }
                  
                  }`;
              }
            })()}
          </CodeBlockCode>
        </CodeBlock>
      </TextContent>
    </div>
  );
};
