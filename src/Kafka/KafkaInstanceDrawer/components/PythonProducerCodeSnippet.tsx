import {
  ClipboardCopyButton,
  CodeBlock,
  CodeBlockAction,
  CodeBlockCode,
} from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import { useCopyClipBoard } from "./useCopyClipBoard";

export const PythonProducerCodeSnippet: VoidFunctionComponent = () => {
  const codeBlock = `from confluent_kafka import Producer
 
  producer = Producer(common_config)
   
  producer.produce(topic=topic, value=b"Sample Message")
  producer.flush()`;

  const { copied, clipboardCopyFunc } = useCopyClipBoard();

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
      <CodeBlockCode id="code-content">{codeBlock}</CodeBlockCode>
    </CodeBlock>
  );
};
