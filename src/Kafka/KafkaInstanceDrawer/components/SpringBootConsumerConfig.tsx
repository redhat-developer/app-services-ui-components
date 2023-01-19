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

export const SpringBootConsumerConfig: VoidFunctionComponent = () => {
  const codeBlock = `package com.example.kafkaconsumer.config;

  import java.util.HashMap;
  import java.util.Map;
  
  import com.example.kafkaconfig.KafkaConfig;
  import org.apache.kafka.clients.consumer.ConsumerConfig;
  import org.apache.kafka.common.serialization.StringDeserializer;
  import org.springframework.context.annotation.Bean;
  import org.springframework.context.annotation.Configuration;
  import org.springframework.kafka.annotation.EnableKafka;
  import org.springframework.kafka.core.ConsumerFactory;
  import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
  import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
  
  // Annotations
  @EnableKafka
  @Configuration
  
  public class KafkaConsumerConfig {
  
      @Bean
      public ConsumerFactory<String, String> consumerFactory() {
          Map<String, Object> config = KafkaConfig.Config();
  
          config.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
          config.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
  
          return new DefaultKafkaConsumerFactory<>(config);
      }
  
      @Bean
      public ConcurrentKafkaListenerContainerFactory concurrentKafkaListenerContainerFactory() {
          ConcurrentKafkaListenerContainerFactory<
                  String, String> factory
                  = new ConcurrentKafkaListenerContainerFactory<>();
          factory.setConsumerFactory(consumerFactory());
          return factory;
      }
  }`;

  const code = `package com.example.kafkaconsumer.config;

  import java.util.HashMap;
  import java.util.Map;
  
  import com.example.kafkaconfig.KafkaConfig;
  import org.apache.kafka.clients.consumer.ConsumerConfig;
  import org.apache.kafka.common.serialization.StringDeserializer;
  import org.springframework.context.annotation.Bean;
  import org.springframework.context.annotation.Configuration;
  import org.springframework.kafka.annotation.EnableKafka;
  import org.springframework.kafka.core.ConsumerFactory;
   `;

  const expandedCode = `
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;

// Annotations
@EnableKafka
@Configuration

public class KafkaConsumerConfig {

    @Bean
    public ConsumerFactory<String, String> consumerFactory() {
        Map<String, Object> config = KafkaConfig.Config();

        config.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        config.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);

        return new DefaultKafkaConsumerFactory<>(config);
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory concurrentKafkaListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory<
                String, String> factory
                = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactory());
        return factory;
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
