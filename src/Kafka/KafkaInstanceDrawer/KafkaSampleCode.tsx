import {
  TextContent,
  TextVariants,
  Text,
  ToggleGroup,
  ToggleGroupItem,
} from "@patternfly/react-core";
import { Trans, useTranslation } from "react-i18next";
import type { VoidFunctionComponent } from "react";
import { useState } from "react";
import type { ClientType } from "./types";
import {
  JavaConfigCodeSnippet,
  PythonConfigCodeSnippet,
  QuarkusConfigCodeSnippet,
  SpringBootConfigCodeSnippet,
  JavaProducerCodeSnippet,
  PythonProducerCodeSnippet,
  QuarkusProducerCodeSnippet,
  SpringBootProducerCodeSnippet,
  SpringBootListenerCodeSnippet,
  SpringBootConsumerConfig,
  SpringBootConsumerExample,
  JavaConsumerCodeSnippet,
  PythonConsumerCodeSnippet,
  QuarkusConsumerCodeSnippet,
} from "./components";

export const KafkaSampleCode: VoidFunctionComponent = () => {
  const { t } = useTranslation("kafka");

  const [clientSelect, setClientSelect] = useState<ClientType>("java");

  return (
    <div className="mas--details__drawer--tab-content">
      <TextContent className="pf-u-pb-sm">
        <Text component={TextVariants.small}>
          {t("sample_code.code_snippet_description")}
        </Text>

        <ToggleGroup>
          <ToggleGroupItem
            text={t("sample_code.clients.java")}
            value="java"
            buttonId="java"
            isSelected={clientSelect === "java"}
            onChange={() => setClientSelect("java")}
          />
          <ToggleGroupItem
            text={t("sample_code.clients.python")}
            value="python"
            buttonId="python"
            isSelected={clientSelect === "python"}
            onChange={() => setClientSelect("python")}
          />
          <ToggleGroupItem
            text={t("sample_code.clients.quarkus")}
            value="quarkus"
            buttonId="quarkus"
            isSelected={clientSelect === "quarkus"}
            onChange={() => setClientSelect("quarkus")}
          />
          <ToggleGroupItem
            text={t("sample_code.clients.spring_boot")}
            value="springboot"
            buttonId="springboot"
            isSelected={clientSelect === "springboot"}
            onChange={() => setClientSelect("springboot")}
          />
        </ToggleGroup>
        <Text component={TextVariants.h3} className="pf-u-mt-xl">
          {t("sample_code.sample_configuration_code")}
        </Text>
        <Text component={TextVariants.small}>
          {t("sample_code.sample_configuration_code_description")}
        </Text>
        <Text component={TextVariants.small}>
          {t("sample_code.bracket_text")}
        </Text>
        {(() => {
          switch (clientSelect) {
            case "java":
              return <JavaConfigCodeSnippet />;
            case "python":
              return <PythonConfigCodeSnippet />;
            case "quarkus":
              return <QuarkusConfigCodeSnippet />;
            case "springboot":
              return <SpringBootConfigCodeSnippet />;
            default:
              return null;
          }
        })()}
        <Text component={TextVariants.h3} className="pf-u-mt-xl">
          {t("sample_code.sample_producer_code")}
        </Text>
        <Text component={TextVariants.small}>
          <Trans
            ns={"kafka"}
            i18nKey={"sample_code.sample_producer_code_description"}
            values={{
              client_type: clientSelect,
            }}
          />
        </Text>
        <Text component={TextVariants.small}>
          {t("sample_code.bracket_text")}
        </Text>
        {(() => {
          switch (clientSelect) {
            case "java":
              return <JavaProducerCodeSnippet />;
            case "python":
              return <PythonProducerCodeSnippet />;
            case "quarkus":
              return <QuarkusProducerCodeSnippet />;
            case "springboot":
              return <SpringBootProducerCodeSnippet />;
            default:
              return null;
          }
        })()}
        <Text component={TextVariants.h3} className="pf-u-mt-xl">
          {t("sample_code.sample_consumer_code")}
        </Text>
        {clientSelect === "springboot" ? (
          <>
            <Text component={TextVariants.small}>
              {t("sample_code.spring_boot_sample_consumer_code_description")}
            </Text>
            <Text component={TextVariants.h4} className="pf-u-mt-xl">
              {t("sample_code.spring_boot_consumer_configuration")}
            </Text>
            <Text component={TextVariants.small}>
              {t("sample_code.spring_boot_consumer_configuration_description")}
            </Text>
            <SpringBootConsumerConfig />
            <Text component={TextVariants.h4} className="pf-u-mt-xl">
              {t("sample_code.spring_boot_listener")}
            </Text>
            <Text component={TextVariants.small}>
              {t("sample_code.spring_boot_listener_description")}
            </Text>
            <SpringBootListenerCodeSnippet />
            <Text component={TextVariants.h4} className="pf-u-mt-xl">
              {t("sample_code.spring_boot_consumer")}
            </Text>
            <Text component={TextVariants.small}>
              {t("sample_code.spring_boot_consumer_description")}
            </Text>
            <SpringBootConsumerExample />
          </>
        ) : (
          <>
            <Text component={TextVariants.small}>
              <Trans
                ns={"kafka"}
                i18nKey={"sample_code.sample_consumer_code_description"}
                values={{
                  client_type: clientSelect,
                }}
              />
            </Text>
            {(() => {
              switch (clientSelect) {
                case "java":
                  return <JavaConsumerCodeSnippet />;
                case "python":
                  return <PythonConsumerCodeSnippet />;
                case "quarkus":
                  return <QuarkusConsumerCodeSnippet />;
                default:
                  return null;
              }
            })()}
          </>
        )}
      </TextContent>
    </div>
  );
};
