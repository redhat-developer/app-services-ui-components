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
import { Trans, useTranslation } from "react-i18next";
import type { VoidFunctionComponent } from "react";
import { useState } from "react";
import type { ClientType } from "./types";
import { SampleCodeSelect } from "./components/SampleCodeSelect";

export type KafkaSampleCodeProps = {
  value: ClientType;
  onChange: (value: ClientType) => void;
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
          {t("sample_code.code_snippet_description")}
        </Text>

        <ToggleGroup>
          <ToggleGroupItem
            text={t("sample_code.clients.java")}
            value="java"
            buttonId="java"
            isSelected={value === "java"}
            onChange={() => onChange("java")}
          />
          <ToggleGroupItem
            text={t("sample_code.clients.python")}
            value="python"
            buttonId="python"
            isSelected={value === "python"}
            onChange={() => onChange("python")}
          />
          <ToggleGroupItem
            text={t("sample_code.clients.quarkus")}
            value="quarkus"
            buttonId="quarkus"
            isSelected={value === "quarkus"}
            onChange={() => onChange("quarkus")}
          />
          <ToggleGroupItem
            text={t("sample_code.clients.spring_boot")}
            value="springboot"
            buttonId="springboot"
            isSelected={value === "springboot"}
            onChange={() => onChange("springboot")}
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
        <CodeBlock actions={actions}>
          <CodeBlockCode>
            <SampleCodeSelect client={value} codeSnippet={"config"} />
          </CodeBlockCode>
        </CodeBlock>
        <Text component={TextVariants.h3} className="pf-u-mt-xl">
          {t("sample_code.sample_producer_code")}
        </Text>
        <Text component={TextVariants.small}>
          <Trans
            ns={"kafka"}
            i18nKey={"sample_code.sample_producer_code_description"}
            values={{
              client_type: value,
            }}
          />
        </Text>
        <Text component={TextVariants.small}>
          {t("sample_code.bracket_text")}
        </Text>
        <CodeBlock actions={actions}>
          <CodeBlockCode>
            <SampleCodeSelect client={value} codeSnippet={"producer"} />
          </CodeBlockCode>
        </CodeBlock>
        <Text component={TextVariants.h3} className="pf-u-mt-xl">
          {t("sample_code.sample_consumer_code")}
        </Text>
        {value === "springboot" ? (
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
            <CodeBlock actions={actions}>
              <CodeBlockCode id="code-content">
                <SampleCodeSelect
                  client={value}
                  codeSnippet={"consumer"}
                  springBootConsumer={"consumerConfig"}
                />
              </CodeBlockCode>
            </CodeBlock>
            <Text component={TextVariants.h4} className="pf-u-mt-xl">
              {t("sample_code.spring_boot_listener")}
            </Text>
            <Text component={TextVariants.small}>
              {t("sample_code.spring_boot_listener_description")}
            </Text>
            <CodeBlock actions={actions}>
              <CodeBlockCode id="code-content">
                <SampleCodeSelect
                  client={value}
                  codeSnippet={"consumer"}
                  springBootConsumer={"listener"}
                />
              </CodeBlockCode>
            </CodeBlock>
            <Text component={TextVariants.h4} className="pf-u-mt-xl">
              {t("sample_code.spring_boot_consumer")}
            </Text>
            <Text component={TextVariants.small}>
              {t("sample_code.spring_boot_consumer_description")}
            </Text>
            <CodeBlock actions={actions}>
              <CodeBlockCode id="code-content">
                <SampleCodeSelect
                  client={value}
                  codeSnippet={"consumer"}
                  springBootConsumer={"consumer"}
                />
              </CodeBlockCode>
            </CodeBlock>
          </>
        ) : (
          <>
            <Text component={TextVariants.small}>
              <Trans
                ns={"kafka"}
                i18nKey={"sample_code.sample_consumer_code_description"}
                values={{
                  client_type: value,
                }}
              />
            </Text>
            <CodeBlock actions={actions}>
              <CodeBlockCode id="code-content">
                <SampleCodeSelect client={value} codeSnippet={"consumer"} />
              </CodeBlockCode>
            </CodeBlock>
          </>
        )}
      </TextContent>
    </div>
  );
};
