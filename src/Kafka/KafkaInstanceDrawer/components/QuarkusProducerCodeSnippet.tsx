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

export const QuarkusProducerCodeSnippet: VoidFunctionComponent = () => {
  const codeBlock = `package org.acme.kafka;
  import java.time.Duration;
  import java.util.Random;
  
  import javax.enterprise.context.ApplicationScoped;
  
  import io.smallrye.mutiny.Multi;
  import org.eclipse.microprofile.reactive.messaging.Outgoing;
  
  /**
   * A bean producing random prices every 5 seconds.
   * The prices are written to a Kafka topic (prices). The Kafka configuration is specified in the application configuration.
   */
  @ApplicationScoped
  public class PriceGenerator {
  
      private Random random = new Random();
  
      @Outgoing("generated-price")
      public Multi<Integer> generate() {
          return Multi.createFrom().ticks().every(Duration.ofSeconds(5))
                  .onOverflow().drop()
                  .map(tick -> random.nextInt(100));
      }
  
  }`;

  const code = `package org.acme.kafka;
  import java.time.Duration;
  import java.util.Random;
  
  import javax.enterprise.context.ApplicationScoped;
  
  import io.smallrye.mutiny.Multi;
  import org.eclipse.microprofile.reactive.messaging.Outgoing;
   `;

  const expandedCode = `/**
  * A bean producing random prices every 5 seconds.
  * The prices are written to a Kafka topic (prices). The Kafka configuration is specified in the application configuration.
  */
 @ApplicationScoped
 public class PriceGenerator {
 
     private Random random = new Random();
 
     @Outgoing("generated-price")
     public Multi<Integer> generate() {
         return Multi.createFrom().ticks().every(Duration.ofSeconds(5))
                 .onOverflow().drop()
                 .map(tick -> random.nextInt(100));
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
