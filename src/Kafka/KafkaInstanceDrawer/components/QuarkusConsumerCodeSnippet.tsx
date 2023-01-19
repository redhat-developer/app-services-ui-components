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

export const QuarkusConsumerCodeSnippet: VoidFunctionComponent = () => {
  const codeBlock = `package org.acme.kafka;
  import javax.enterprise.context.ApplicationScoped;
  
  import org.eclipse.microprofile.reactive.messaging.Acknowledgment;
  import org.eclipse.microprofile.reactive.messaging.Incoming;
  import org.eclipse.microprofile.reactive.messaging.Outgoing;
  
  import io.smallrye.reactive.messaging.annotations.Broadcast;
  
  /**
   * A bean consuming data from the "prices" Kafka topic and applying some conversion.
   * The result is pushed to the "my-data-stream" stream which is an in-memory stream.
   */
  @ApplicationScoped
  public class PriceConverter {
  
      private static final double CONVERSION_RATE = 0.88;
  
      // Consume from the \`prices\` channel and produce to the \`my-data-stream\` channel
      @Incoming("prices")
      @Outgoing("my-data-stream")
      // Send to all subscribers
      @Broadcast
      // Acknowledge the messages before calling this method.
      @Acknowledgment(Acknowledgment.Strategy.PRE_PROCESSING)
      public double process(int priceInUsd) {
          return priceInUsd * CONVERSION_RATE;
      }
  
  }`;

  const code = `  package org.acme.kafka;
  import javax.enterprise.context.ApplicationScoped;
  
  import org.eclipse.microprofile.reactive.messaging.Acknowledgment;
  import org.eclipse.microprofile.reactive.messaging.Incoming;
  import org.eclipse.microprofile.reactive.messaging.Outgoing;
  
  import io.smallrye.reactive.messaging.annotations.Broadcast;`;

  const expandedCode = `      
        /**
         * A bean consuming data from the "prices" Kafka topic and applying some conversion.
         * The result is pushed to the "my-data-stream" stream which is an in-memory stream.
         */
        @ApplicationScoped
        public class PriceConverter {
        
            private static final double CONVERSION_RATE = 0.88;
        
            // Consume from the \`prices\` channel and produce to the \`my-data-stream\` channel
            @Incoming("prices")
            @Outgoing("my-data-stream")
            // Send to all subscribers
            @Broadcast
            // Acknowledge the messages before calling this method.
            @Acknowledgment(Acknowledgment.Strategy.PRE_PROCESSING)
            public double process(int priceInUsd) {
                return priceInUsd * CONVERSION_RATE;
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
