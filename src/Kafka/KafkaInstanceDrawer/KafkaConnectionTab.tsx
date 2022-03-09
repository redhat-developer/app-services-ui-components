import {
  TextContent,
  Text,
  TextVariants,
  Skeleton,
  ClipboardCopy,
  Button,
  Label,
  Popover,
  ButtonVariant,
} from "@patternfly/react-core";
import { HelpIcon } from "@patternfly/react-icons";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export type KafkaConnectionTabProps = {
  isKafkaPending?: boolean;
  externalServer?: string;
  tokenEndPointUrl: string;
  linkToServiceAccount: string;
  linkToAccessTab: string;
  showCreateServiceAccountModal: () => void;
};

export const KafkaConnectionTab: FunctionComponent<KafkaConnectionTabProps> = ({
  isKafkaPending,
  externalServer,
  tokenEndPointUrl,
  linkToServiceAccount,
  linkToAccessTab,
  showCreateServiceAccountModal,
}) => {
  const { t } = useTranslation();

  return (
    <div className="mas--details__drawer--tab-content">
      <TextContent className="pf-u-pb-sm">
        <Text component={TextVariants.small}>
          {t("common:drawer_resource_tab_body_description_1")}
        </Text>
        <Text component={TextVariants.h3} className="pf-u-mt-lg">
          {t("common:bootstrap_server")}
        </Text>
        <Text component={TextVariants.small}>
          {t("common:bootstrap_server_description")}
        </Text>
        {isKafkaPending ? (
          <Skeleton fontSize="2xl" />
        ) : (
          <ClipboardCopy
            data-testid="drawerStreams-copyBootstrapURL"
            textAriaLabel={t("common:bootstrap_server")}
          >
            {externalServer}
          </ClipboardCopy>
        )}
      </TextContent>
      <TextContent className="pf-u-pb-sm">
        <Text component={TextVariants.h3} className="pf-u-mt-xl">
          {t("kafka:serviceAccount.service_accounts_small")}
        </Text>
        <Text component={TextVariants.small}>
          {t("serviceAccount.create_service_account_to_generate_credentials")}{" "}
          <Link to={linkToServiceAccount} data-testid="tableStreams-linkKafka">
            {t("kafka:serviceAccount.service_accounts")}
          </Link>{" "}
          {t("common:page")}.
        </Text>
      </TextContent>
      <Button
        variant={ButtonVariant.secondary}
        isInline
        onClick={showCreateServiceAccountModal}
      >
        {t("kafka:serviceAccount.create_service_account")}
      </Button>
      <TextContent className="pf-u-pt-sm">
        <Text component={TextVariants.small}>
          {t("kafka:serviceAccount.current_instance")}{" "}
          <Link to={linkToAccessTab}>
            {t("kafka:serviceAccount.access_tab")}
          </Link>{" "}
          {t("kafka:serviceAccount.alter_allow")}.
        </Text>
      </TextContent>
      <TextContent className="pf-u-pb-sm">
        <Text component={TextVariants.h3} className="pf-u-mt-xl">
          {t("common:authentication_method")}
        </Text>
        <Text component={TextVariants.h4} className="pf-u-mt-md">
          {t("common:sasl_oauthbearer")}{" "}
          <Label color="green">{t("recommended")}</Label>
          <Popover
            aria-label={t("common:sasl_oauthbearer")}
            bodyContent={
              <div>
                {t("kafka:serviceAccount.sasl_oauthbearer_popover_content")}
              </div>
            }
          >
            <Button
              variant={ButtonVariant.plain}
              aria-label={t("common:more_info_about_sasl_oauthbearer")}
            >
              <HelpIcon />
            </Button>
          </Popover>
        </Text>
        <Text component={TextVariants.small}>
          {t("kafka:serviceAccount.sasl_oauthbearer_description")}
        </Text>
        <Text component={TextVariants.h6} className="pf-u-mt-md">
          {t("common:token_endpoint_url")}
        </Text>
        {isKafkaPending ? (
          <Skeleton fontSize="2xl" />
        ) : (
          <ClipboardCopy isReadOnly>{tokenEndPointUrl}</ClipboardCopy>
        )}
      </TextContent>
      <TextContent className="pf-u-pb-sm">
        <Text component={TextVariants.h4} className="pf-u-mt-md">
          {t("common:sasl_plain")}
        </Text>
        <Text component={TextVariants.small}>
          {t("kafka:serviceAccount.sasl_plain_description")}
        </Text>
      </TextContent>
    </div>
  );
};
