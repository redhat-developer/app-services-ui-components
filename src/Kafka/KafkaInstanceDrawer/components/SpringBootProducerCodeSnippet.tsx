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

export const SpringBootProducerCodeSnippet: VoidFunctionComponent = () => {
  const codeBlock = `package com.example.kafkademo;
  import org.apache.kafka.clients.producer.ProducerConfig;
  import org.apache.kafka.common.serialization.StringSerializer;
  import org.springframework.boot.ApplicationRunner;
  import org.springframework.boot.CommandLineRunner;
  import org.springframework.boot.SpringApplication;
  import org.springframework.boot.autoconfigure.SpringBootApplication;
  import org.springframework.context.annotation.Bean;
  import org.springframework.kafka.core.DefaultKafkaProducerFactory;
  import org.springframework.kafka.core.KafkaTemplate;
  import org.springframework.kafka.core.ProducerFactory;
  import com.example.kafkaconfig.KafkaConfig;
  
  import java.util.Map;
  
  @SpringBootApplication
  public class KafkaProducerExample implements CommandLineRunner {
  
    public static void main(String[] args) throws Exception {
      SpringApplication.run(KafkaProducerExample.class, args);
  
      SpringApplication app = new SpringApplication(KafkaProducerExample.class);
  
      app.run(args);
    }
  
  
    //access command line arguments
    @Override
    public void run(String... args) throws Exception {
  
      System.exit(0);
  
    }
  
    @Bean
    public ProducerFactory<String, String> producerFactory() {
      Map<String, Object> config = KafkaConfig.Config();
  
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

  const code = `package com.example.kafkademo;
  import org.apache.kafka.clients.producer.ProducerConfig;
  import org.apache.kafka.common.serialization.StringSerializer;
  import org.springframework.boot.ApplicationRunner;
  import org.springframework.boot.CommandLineRunner;
  import org.springframework.boot.SpringApplication;
  import org.springframework.boot.autoconfigure.SpringBootApplication;
  import org.springframework.context.annotation.Bean;
  import org.springframework.kafka.core.DefaultKafkaProducerFactory;
  import org.springframework.kafka.core.KafkaTemplate;
  import org.springframework.kafka.core.ProducerFactory;
  import com.example.kafkaconfig.KafkaConfig;
   `;

  const expandedCode = `import java.util.Map;
  
  @SpringBootApplication
  public class KafkaProducerExample implements CommandLineRunner {
  
    public static void main(String[] args) throws Exception {
      SpringApplication.run(KafkaProducerExample.class, args);
  
      SpringApplication app = new SpringApplication(KafkaProducerExample.class);
  
      app.run(args);
    }
  
  
    //access command line arguments
    @Override
    public void run(String... args) throws Exception {
  
      System.exit(0);
  
    }
  
    @Bean
    public ProducerFactory<String, String> producerFactory() {
      Map<String, Object> config = KafkaConfig.Config();
  
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
        onClick={(e) => clipboardCopyFunc(e, codeBlock)}
        exitDelay={copied ? 1500 : 600}
        maxWidth="110px"
        variant="plain"
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
