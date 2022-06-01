import { Text, TextContent } from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";

export const OffsetRange: VoidFunctionComponent<{
  min: number;
  max: number;
}> = ({ min, max }) => {
  const { t } = useTranslation("message-browser");
  return (
    <TextContent className="pf-u-font-size">
      <Text>
        {t("offset")} <span className="custom-text">{min}</span> -{" "}
        <span className="custom-text">{max}</span>
      </Text>
    </TextContent>
  );
};
