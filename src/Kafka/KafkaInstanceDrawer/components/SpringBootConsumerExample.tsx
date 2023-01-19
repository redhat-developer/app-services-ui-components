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

export const SpringBootConsumerExample: VoidFunctionComponent = () => {
  const codeBlock = `
  package com.example.kafkaconsumer;
  
  import org.springframework.boot.CommandLineRunner;
  import org.springframework.boot.SpringApplication;
  import org.springframework.boot.autoconfigure.SpringBootApplication;
  
  @SpringBootApplication
  public class KafkaConsumerExample implements CommandLineRunner {
  
      public static void main(String[] args) {
          SpringApplication.run(KafkaConsumerExample.class, args);
      }
  
      @Override
      public void run(String... args) throws Exception {
  
         System.exit(0);
  
      }
  
  }`;

  const code = `package com.example.kafkaconsumer;

  import org.springframework.boot.CommandLineRunner;
  import org.springframework.boot.SpringApplication;
  import org.springframework.boot.autoconfigure.SpringBootApplication;
  
  @SpringBootApplication
  public class KafkaConsumerExample implements CommandLineRunner {
   `;

  const expandedCode = `
      public static void main(String[] args) {
          SpringApplication.run(KafkaConsumerExample.class, args);
      }
  
      @Override
      public void run(String... args) throws Exception {
  
         System.exit(0);
  
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
