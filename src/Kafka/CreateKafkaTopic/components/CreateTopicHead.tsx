import type { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import {
  PageSection,
  PageSectionVariants,
  Title,
  Switch,
  Breadcrumb,
  BreadcrumbItem,
} from "@patternfly/react-core";
import { Link } from "react-router-dom";

export type CreateTopicProps = {
  showAllOptions: boolean;
  kafkaName: string;
  kafkaPageLink: string;
  kafkaInstanceLink: string;
  onShowAllOptions: (value: boolean) => void;
};

export const CreateTopicHead: VoidFunctionComponent<CreateTopicProps> = ({
  showAllOptions,
  onShowAllOptions,
  kafkaName,
  kafkaPageLink,
  kafkaInstanceLink,
}) => {
  const { t } = useTranslation(["common", "topic"]);

  const mainBreadcrumbs = (
    <Breadcrumb ouiaId={"breadcrumb"}>
      <BreadcrumbItem
        render={() => (
          <Link to={kafkaPageLink}>{t("common:kafka_instance")}</Link>
        )}
      />
      <BreadcrumbItem
        render={() => <Link to={kafkaInstanceLink}>{kafkaName}</Link>}
      />
      <BreadcrumbItem isActive>{t("topic:create_topic")}</BreadcrumbItem>
    </Breadcrumb>
  );
  return (
    <>
      <section className="pf-c-page__main-breadcrumb">
        {mainBreadcrumbs}
      </section>
      <PageSection variant={PageSectionVariants.light}>
        <Title headingLevel="h1" size="2xl">
          {t("topic:create_topic")}
        </Title>
        <br />
        <Switch
          ouiaId={"toggle-switch-off"}
          id="id-show-all-options"
          label={t("topic:show_all_options")}
          labelOff={t("topic:show_all_options")}
          isChecked={showAllOptions}
          onChange={onShowAllOptions}
          className="topic-wizard"
        />
      </PageSection>
    </>
  );
};
