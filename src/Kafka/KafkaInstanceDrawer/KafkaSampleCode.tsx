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
import { SampleCodeSnippet } from "./components";
import {
  javaConfig,
  javaConsumer,
  javaProducer,
  pythonConfig,
  pythonConsumer,
  pythonProducer,
  quarkusConfig,
  quarkusConsumer,
  quarkusProducer,
  springBootConfig,
  springBootConsumerConfig,
  springBootConsumerExample,
  springBootListener,
  springBootProducer,
} from "./CodeSnippets";

export const KafkaSampleCode: VoidFunctionComponent = () => {
  const { t } = useTranslation("kafka");

  const [clientSelect, setClientSelect] = useState<ClientType>("java");

  console.log(javaConfig.length);

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
              return (
                <SampleCodeSnippet
                  copyCode={javaConfig}
                  codeBlockCode={javaConfig.substring(0, 300)}
                  expandableCode={javaConfig.substring(300)}
                />
              );
            case "python":
              return (
                <SampleCodeSnippet
                  copyCode={pythonConfig}
                  codeBlockCode={pythonConfig.substring(0, 300)}
                  expandableCode={pythonConfig.substring(300)}
                />
              );
            case "quarkus":
              return (
                <SampleCodeSnippet
                  copyCode={quarkusConfig}
                  codeBlockCode={quarkusConfig.substring(0, 300)}
                  expandableCode={quarkusConfig.substring(300)}
                />
              );
            case "springboot":
              return (
                <SampleCodeSnippet
                  copyCode={springBootConfig}
                  codeBlockCode={springBootConfig.substring(0, 300)}
                  expandableCode={springBootConfig.substring(300)}
                />
              );
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
              return (
                <SampleCodeSnippet
                  copyCode={javaProducer}
                  codeBlockCode={javaProducer.substring(0, 300)}
                  expandableCode={javaProducer.substring(300)}
                />
              );
            case "python":
              return (
                <SampleCodeSnippet
                  copyCode={pythonProducer}
                  codeBlockCode={pythonProducer.substring(0, 300)}
                  expandableCode={pythonProducer.substring(300)}
                />
              );
            case "quarkus":
              return (
                <SampleCodeSnippet
                  copyCode={quarkusProducer}
                  codeBlockCode={quarkusProducer.substring(0, 300)}
                  expandableCode={quarkusProducer.substring(300)}
                />
              );
            case "springboot":
              return (
                <SampleCodeSnippet
                  copyCode={springBootProducer}
                  codeBlockCode={springBootProducer.substring(0, 300)}
                  expandableCode={springBootProducer.substring(300)}
                />
              );
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
            <SampleCodeSnippet
              copyCode={springBootConsumerConfig}
              codeBlockCode={springBootConsumerConfig.substring(0, 300)}
              expandableCode={springBootConsumerConfig.substring(300)}
            />
            <Text component={TextVariants.h4} className="pf-u-mt-xl">
              {t("sample_code.spring_boot_listener")}
            </Text>
            <Text component={TextVariants.small}>
              {t("sample_code.spring_boot_listener_description")}
            </Text>
            <SampleCodeSnippet
              copyCode={springBootListener}
              codeBlockCode={springBootListener.substring(0, 300)}
              expandableCode={springBootListener.substring(300)}
            />
            <Text component={TextVariants.h4} className="pf-u-mt-xl">
              {t("sample_code.spring_boot_consumer")}
            </Text>
            <Text component={TextVariants.small}>
              {t("sample_code.spring_boot_consumer_description")}
            </Text>
            <SampleCodeSnippet
              copyCode={springBootConsumerExample}
              codeBlockCode={springBootConsumerExample.substring(0, 300)}
              expandableCode={springBootConsumerExample.substring(300)}
            />
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
                  return (
                    <SampleCodeSnippet
                      copyCode={javaConsumer}
                      codeBlockCode={javaConsumer.substring(0, 300)}
                      expandableCode={javaConsumer.substring(300)}
                    />
                  );
                case "python":
                  return (
                    <SampleCodeSnippet
                      copyCode={pythonConsumer}
                      codeBlockCode={pythonConsumer.substring(0, 300)}
                      expandableCode={pythonConsumer.substring(300)}
                    />
                  );
                case "quarkus":
                  return (
                    <SampleCodeSnippet
                      copyCode={quarkusConsumer}
                      codeBlockCode={quarkusConsumer.substring(0, 300)}
                      expandableCode={quarkusConsumer.substring(300)}
                    />
                  );
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
