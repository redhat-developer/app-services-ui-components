import { FunctionComponent } from "react";
import { Banner, Bullseye, Button, Popover } from "@patternfly/react-core";
import { useTranslation } from "react-i18next";
import "./DevelopmentPreview.css";

export type DevelopmentPreviewProps = {
  show?: boolean;
};

export const DevelopmentPreview: FunctionComponent<DevelopmentPreviewProps> = ({
  children,
  show,
}) => {
  const { t } = useTranslation();
  if (show) {
    return (
      <div
        id="scrollablePageMain"
        className="pf-c-page__main appserv-devpreview"
        style={{ height: "100%" }}
      >
        <Banner isSticky variant="info">
          <Bullseye>
            <Popover
              aria-label="Service Preview Button"
              hasAutoWidth
              bodyContent={<div>{t("common:servicePreviewTooltip")}</div>}
              position="bottom"
              minWidth="300px"
              maxWidth="25%"
            >
              <Button className="appserv-devpreview__button" variant="link">
                {t("common:servicePreview")}
              </Button>
            </Popover>
          </Bullseye>
        </Banner>
        {children}
      </div>
    );
  }
  return <>{children}</>;
};
