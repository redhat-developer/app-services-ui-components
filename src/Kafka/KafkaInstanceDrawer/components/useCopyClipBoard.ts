import { useState } from "react";

export function useCopyClipBoard() {
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

  return {
    copied,
    clipboardCopyFunc,
  };
}
