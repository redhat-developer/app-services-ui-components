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

export type SampleCodeSnippetProps = {
  copyCode: string;
  expandableCode?: string;
  codeBlockCode: string;
};

export const SampleCodeSnippet: VoidFunctionComponent<
  SampleCodeSnippetProps
> = ({ copyCode, expandableCode, codeBlockCode }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [copied, setCopied] = useState<boolean>(false);

  const clipboardCopyFunc = (_event: any, text: string) => {
    navigator.clipboard
      .writeText(text.toString())
      .then(() => {
        setCopied(true);
      })
      .catch(() => {
        setCopied(false);
      });
  };

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
        onClick={(e) => clipboardCopyFunc(e, copyCode)}
      >
        {copied ? "Successfully copied to clipboard!" : "Copy to clipboard"}
      </ClipboardCopyButton>
    </CodeBlockAction>
  );

  return (
    <CodeBlock actions={actions}>
      <CodeBlockCode id="code-content">
        {codeBlockCode}

        <ExpandableSection
          isExpanded={isExpanded}
          isDetached
          contentId="code-block-expand"
        >
          {expandableCode}
        </ExpandableSection>
      </CodeBlockCode>
      {copyCode.length >= 300 ? (
        <ExpandableSectionToggle
          isExpanded={isExpanded}
          onToggle={onToggle}
          contentId="code-block-expand"
          direction="up"
        >
          {isExpanded ? "Show Less" : "Show More"}
        </ExpandableSectionToggle>
      ) : null}
    </CodeBlock>
  );
};
