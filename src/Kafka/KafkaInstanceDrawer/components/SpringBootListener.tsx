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

export const SpringBootListenerCodeSnippet: VoidFunctionComponent = () => {
  const codeBlock = `package com.example.kafkaconsumer.listener;

  import com.example.kafkaconfig.KafkaConfig;
  import org.apache.kafka.clients.consumer.ConsumerConfig;
  import org.apache.kafka.common.serialization.StringDeserializer;
  import org.springframework.context.annotation.Bean;
  import org.springframework.kafka.annotation.KafkaListener;
  import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
  import org.springframework.kafka.core.ConsumerFactory;
  import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
  import org.springframework.stereotype.Component;
  
  import java.util.Map;
  
  @Component
  public class Listener {
  
      @KafkaListener(topics = "prices",
              containerFactory = "concurrentKafkaListenerContainerFactory",
              groupId = "group_id")
  
      // Method
      public void consume(String message)
      {
          // Print statement
          System.out.println(message);
      }
  }`;

  const code = `package com.example.kafkaconsumer.listener;

  import com.example.kafkaconfig.KafkaConfig;
  import org.apache.kafka.clients.consumer.ConsumerConfig;
  import org.apache.kafka.common.serialization.StringDeserializer;
  import org.springframework.context.annotation.Bean;
  import org.springframework.kafka.annotation.KafkaListener;
  import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
  import org.springframework.kafka.core.ConsumerFactory;
  import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
  import org.springframework.stereotype.Component;
   `;

  const expandedCode = `
  import java.util.Map;
  
  @Component
  public class Listener {
  
      @KafkaListener(topics = "prices",
              containerFactory = "concurrentKafkaListenerContainerFactory",
              groupId = "group_id")
  
      // Method
      public void consume(String message)
      {
          // Print statement
          System.out.println(message);
      }
  }`;

  const { copied, clipboardCopyFunc } = useCopyClipBoard();
  const [isExpanded, setIsExpanded] = useState(false);

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
