import type React from "react";
import { useTranslation } from "react-i18next";
import { SidebarPanel, JumpLinks, JumpLinksItem } from "@patternfly/react-core";

const TopicAdvanceJumpLinks: React.FC = () => {
  const { t } = useTranslation(["create-topic"]);

  return (
    <SidebarPanel variant="sticky">
      <JumpLinks
        isVertical
        label={t("jump_to_section")}
        scrollableSelector=".pf-c-page__main-section.pf-m-overflow-scroll"
        style={{ position: "sticky" }}
        // offset={-164} // for header
      >
        <JumpLinksItem key={0} href="#core-configuration">
          {t("core_configuration")}
        </JumpLinksItem>
        <JumpLinksItem key={1} href="#messages">
          {t("messages")}
        </JumpLinksItem>
        <JumpLinksItem key={2} href="#log">
          {t("log")}
        </JumpLinksItem>
        <JumpLinksItem key={3} href="#replication">
          {t("replication")}
        </JumpLinksItem>
        <JumpLinksItem key={4} href="#cleanup">
          {t("cleanup")}
        </JumpLinksItem>
        <JumpLinksItem key={5} href="#index">
          {t("index")}
        </JumpLinksItem>
        <JumpLinksItem key={6} href="#flush">
          {t("flush")}
        </JumpLinksItem>
      </JumpLinks>
    </SidebarPanel>
  );
};

export { TopicAdvanceJumpLinks };
