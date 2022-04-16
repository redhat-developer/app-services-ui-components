import { VoidFunctionComponent } from "react";
import { truncate } from "../utils";
import { Flex, FlexItem } from "@patternfly/react-core";
import { useTranslation } from "react-i18next";

const PREVIEW_LENGTH = 170;

export type UnknownValuePreviewProps = {
  value: string;
  truncateAt?: number;
  onClick?: () => void;
};
export const UnknownValuePreview: VoidFunctionComponent<
  UnknownValuePreviewProps
> = ({ value, truncateAt = PREVIEW_LENGTH, onClick }) => {
  const { t } = useTranslation("message-browser");
  const [preview, truncated] = truncate(value, truncateAt);
  return (
    <Flex
      direction={{ default: "column" }}
      spaceItems={{ default: "spaceItemsXs" }}
    >
      <FlexItem>{preview}</FlexItem>
      {truncated && (
        <FlexItem>
          <a
            onClick={
              onClick
                ? (e) => {
                    e.stopPropagation();
                    onClick();
                  }
                : undefined
            }
          >
            {t("show_more")}
          </a>
        </FlexItem>
      )}
    </Flex>
  );
};
