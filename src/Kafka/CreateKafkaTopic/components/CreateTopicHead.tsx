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
  isSwitchClicked: boolean;
  kafkaName?: string;
  kafkaPageLink?: string;
  kafkaInstanceLink?: string;
  setIsSwitchClicked: (value: boolean) => void;
};

export const CreateTopicHead: VoidFunctionComponent<CreateTopicProps> = ({
  isSwitchClicked,
  setIsSwitchClicked,
  kafkaName,
  kafkaPageLink,
  kafkaInstanceLink,
}) => {
  const { t } = useTranslation(["kafkaTemporaryFixMe"]);

  const mainBreadcrumbs = (
    <Breadcrumb ouiaId={"breadcrumb"}>
      <BreadcrumbItem
        render={() => (
          <Link to={kafkaPageLink || "#"}>{t("common:kafka_instance")}</Link>
        )}
      />
      <BreadcrumbItem
        render={() => (
          <Link to={kafkaInstanceLink || "#"}>
            {kafkaName || t("common:kafka_instance_name")}
          </Link>
        )}
      />
      <BreadcrumbItem to="#" isActive>
        {t("topic:create_topic")}
      </BreadcrumbItem>
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
          id="simple-switch"
          label={t("topic:show_all_options")}
          labelOff={t("topic:show_all_options")}
          isChecked={isSwitchClicked}
          onChange={setIsSwitchClicked}
          className="create-topic-wizard"
        />
      </PageSection>
    </>
  );
};
