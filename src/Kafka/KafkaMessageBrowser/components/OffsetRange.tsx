import { VoidFunctionComponent } from "react";
import { Text, TextContent } from "@patternfly/react-core";
import { useTranslation } from "react-i18next";

export const OffsetRange: VoidFunctionComponent<{ offset: number }> = ({
  offset,
}) => {
  const { t } = useTranslation("message-browser");
  return (
    <TextContent className="pf-u-font-size">
      <Text>
        {t("offset")} <Text className="custom-text">0</Text> -{" "}
        <Text className="custom-text">{offset}</Text>
      </Text>
    </TextContent>
  );
};
