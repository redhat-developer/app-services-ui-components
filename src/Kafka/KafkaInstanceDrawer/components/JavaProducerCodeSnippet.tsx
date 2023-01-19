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

export const JavaProducerCodeSnippet: VoidFunctionComponent = () => {
  const codeBlock = `package org.example;
 
  import org.apache.kafka.clients.producer.ProducerConfig;
  import org.apache.kafka.clients.producer.ProducerRecord;
  import org.apache.kafka.clients.producer.KafkaProducer;
  import org.apache.kafka.common.serialization.StringSerializer;
   
  public class ProducerExample {
   
     public static void main(String[] args) {
   
         //Creating producer properties
         var properties= KafkaConfig.properties();
         properties.setProperty(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
         properties.setProperty(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
   
         KafkaProducer<String,String> producer= new KafkaProducer<String,String>(properties);
   
         producer.send(new ProducerRecord<>("prices", "Test Message"));
         producer.flush();
         producer.close();
     }
  }`;

  const code = `package org.example;
 
  import org.apache.kafka.clients.producer.ProducerConfig;
  import org.apache.kafka.clients.producer.ProducerRecord;
  import org.apache.kafka.clients.producer.KafkaProducer;
  import org.apache.kafka.common.serialization.StringSerializer;
   
  public class ProducerExample {
   
     public static void main(String[] args) {
   `;

  const expandedCode = `//Creating producer properties
  var properties= KafkaConfig.properties();
  properties.setProperty(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
  properties.setProperty(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());

  KafkaProducer<String,String> producer= new KafkaProducer<String,String>(properties);

  producer.send(new ProducerRecord<>("prices", "Test Message"));
  producer.flush();
  producer.close();
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
