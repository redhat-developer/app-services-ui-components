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

export const PythonConsumerCodeSnippet: VoidFunctionComponent = () => {
  const codeBlock = `from confluent_kafka import Consumer
 
  consumer_config = {
      "group.id": "test-group",
      'session.timeout.ms': 6000,
      'auto.offset.reset': 'earliest',
  }
 
  consumer = Consumer({ **consumer_config, **common_config })
 
  consumer.subscribe([topic])
 
  while True:
      try:
          msg = consumer.poll(1.0)
          if msg is None:
              continue
 
          print(msg.value())
      except KeyboardInterrupt:
          break
 
  consumer.close()`;

  const code = `from confluent_kafka import Consumer
 
  consumer_config = {
      "group.id": "test-group",
      'session.timeout.ms': 6000,
      'auto.offset.reset': 'earliest',
  }
 
  consumer = Consumer({ **consumer_config, **common_config })
 
  consumer.subscribe([topic])`;

  const expandedCode = `
  while True:
      try:
          msg = consumer.poll(1.0)
          if msg is None:
              continue
 
          print(msg.value())
      except KeyboardInterrupt:
          break
 
  consumer.close()`;

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
