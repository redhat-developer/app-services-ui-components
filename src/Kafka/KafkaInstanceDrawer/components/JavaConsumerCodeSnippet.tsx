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

export const JavaConsumerCodeSnippet: VoidFunctionComponent = () => {
  const codeBlock = `package org.example;
 
  import java.util.Arrays;
 
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
 
          //Subscribing
          consumer.subscribe(Arrays.asList("prices"));
 
          //polling
          while(true){
              ConsumerRecords<String,String> records=consumer.poll(Duration.ofMillis(100));
              for(ConsumerRecord<String,String> record: records) {
                  System.out.println("Key: "+ record.key() + ", Value:" +record.value());
                  System.out.println("Partition:" + record.partition()+",Offset:"+record.offset());
              }
          }
      }
  }`;

  const code = `package org.example;
 
  import java.util.Arrays;
 
  import org.apache.kafka.clients.consumer.ConsumerConfig;
  import org.apache.kafka.clients.consumer.KafkaConsumer;
  import org.apache.kafka.common.serialization.StringDeserializer;
  import org.apache.kafka.clients.consumer.ConsumerRecord;
  import org.apache.kafka.clients.consumer.ConsumerRecords;
  import java.time.Duration;`;

  const expandedCode = `public class ConsumerExample {
 
    public static void main(String[] args) {

        var properties= KafkaConfig.properties();

        properties.setProperty(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
        properties.setProperty(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
        properties.setProperty(ConsumerConfig.GROUP_ID_CONFIG,"test_group_2");
        properties.setProperty(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");

        KafkaConsumer<String,String> consumer = new KafkaConsumer<String,String>(properties);

        //Subscribing
        consumer.subscribe(Arrays.asList("prices"));

        //polling
        while(true){
            ConsumerRecords<String,String> records=consumer.poll(Duration.ofMillis(100));
            for(ConsumerRecord<String,String> record: records) {
                System.out.println("Key: "+ record.key() + ", Value:" +record.value());
                System.out.println("Partition:" + record.partition()+",Offset:"+record.offset());
            }
        }
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
