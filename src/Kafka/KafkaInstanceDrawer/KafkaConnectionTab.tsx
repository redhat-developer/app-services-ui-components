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
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export type KafkaConnectionTabProps = {
  isKafkaPending?: boolean;
  externalServer?: string;
  tokenEndPointUrl: string;
  linkToServiceAccount: string;
  linkToAccessTab: string;
  linkToAPIDocumentation: string;
  restAPIUrl: string;
  showCreateServiceAccountModal: () => void;
  linkToLearnMore: string;
};

export const KafkaConnectionTab: FunctionComponent<KafkaConnectionTabProps> = ({
  isKafkaPending,
  externalServer,
  tokenEndPointUrl,
  linkToServiceAccount,
  linkToAccessTab,
  linkToAPIDocumentation,
  restAPIUrl,
  linkToLearnMore,
  showCreateServiceAccountModal,
}) => {
  const { t } = useTranslation();

  return (
    <div className="mas--details__drawer--tab-content">
      <TextContent className="pf-u-pb-sm">
        <Text component={TextVariants.small}>
          {t("kafka:connection_tab.drawer_resource_tab_body_description_1")}
        </Text>
        <Text component={TextVariants.h3} className="pf-u-mt-xl">
          {t("kafka:connection_tab.bootstrap_server")}
        </Text>
        <Text component={TextVariants.small}>
          {t("kafka:connection_tab.bootstrap_server_description")}
        </Text>
        {isKafkaPending ? (
          <Skeleton fontSize="2xl" />
        ) : (
          <ClipboardCopy
            data-testid="drawerStreams-copyBootstrapURL"
            textAriaLabel={t("kafka:connection_tab.bootstrap_server")}
            isReadOnly
          >
            {externalServer}
          </ClipboardCopy>
        )}
      </TextContent>
      <TextContent className="pf-u-pb-sm">
        <Text component={TextVariants.h3} className="pf-u-mt-xl">
          {t("kafka:connection_tab.rest_api")}{" "}
          <Popover
            aria-label={t("kafka:connection_tab.rest_api_popover_label")}
            bodyContent={
              <TextContent>
                <p>
                  {
                    <Trans
                      i18nKey={
                        "kafka:connection_tab.rest_api_popover_content_1"
                      }
                      components={{
                        value: <Link to={linkToAPIDocumentation}></Link>,
                      }}
                    />
                  }
                </p>
                <p>
                  {
                    <Trans
                      i18nKey={
                        "kafka:connection_tab.rest_api_popover_content_2"
                      }
                      components={{
                        value: <Link to={linkToLearnMore}></Link>,
                      }}
                    />
                  }
                </p>
              </TextContent>
            }
          >
            <Button
              variant={ButtonVariant.plain}
              aria-label={t("kafka:connection_tab.rest_api_help_button_label")}
            >
              <HelpIcon />
            </Button>
          </Popover>
        </Text>
        <Text component={TextVariants.small}>
          {
            <Trans
              i18nKey={"kafka:connection_tab.rest_api_url_description"}
              components={{
                value: <Link to={linkToAPIDocumentation}></Link>,
              }}
            />
          }
        </Text>
        {isKafkaPending ? (
          <Skeleton fontSize="2xl" />
        ) : (
          <ClipboardCopy
            data-testid="drawerStreams-copyRestApiURL"
            textAriaLabel={t("kafka:connection_tab.rest_api")}
            isReadOnly
          >
            {restAPIUrl}
          </ClipboardCopy>
        )}
      </TextContent>
      <TextContent className="pf-u-pb-sm">
        <Text component={TextVariants.h3} className="pf-u-mt-xl">
          {t("service-account:service_accounts_small")}
        </Text>
        <Text component={TextVariants.small}>
          {
            <Trans
              i18nKey={
                "kafka:connection_tab.create_service_account_to_generate_credentials"
              }
              components={{
                value: <Link to={linkToServiceAccount}></Link>,
              }}
            />
          }
        </Text>
      </TextContent>
      <Button
        variant={ButtonVariant.secondary}
        isInline
        onClick={showCreateServiceAccountModal}
      >
        {t("service-account:create_service_account")}
      </Button>
      <TextContent className="pf-u-pt-sm">
        <Text component={TextVariants.small}>
          {
            <Trans
              i18nKey={"kafka:connection_tab.current_instance"}
              components={{
                value: <Link to={linkToAccessTab}></Link>,
              }}
            />
          }
        </Text>
      </TextContent>
      <TextContent className="pf-u-pb-sm">
        <Text component={TextVariants.h3} className="pf-u-mt-xl">
          {t("kafka:connection_tab.authentication_method")}
        </Text>
        <Text component={TextVariants.h4} className="pf-u-mt-md">
          {t("kafka:connection_tab.sasl_oauthbearer")}{" "}
          <Label color="green">{t("kafka:connection_tab.recommended")}</Label>
          <Popover
            aria-label={t("kafka:connection_tab.sasl_oauthbearer")}
            bodyContent={
              <div>
                {t("kafka:connection_tab.sasl_oauthbearer_popover_content")}
              </div>
            }
          >
            <Button
              variant={ButtonVariant.plain}
              aria-label={t(
                "kafka:connection_tab.more_info_about_sasl_oauthbearer"
              )}
            >
              <HelpIcon />
            </Button>
          </Popover>
        </Text>
        <Text component={TextVariants.small}>
          {t("kafka:connection_tab.sasl_oauthbearer_description")}
        </Text>
        <Text component={TextVariants.h6} className="pf-u-mt-md">
          {t("kafka:connection_tab.token_endpoint_url")}
        </Text>
        {isKafkaPending ? (
          <Skeleton fontSize="2xl" />
        ) : (
          <ClipboardCopy
            textAriaLabel={t("kafka:connection_tab.token_endpoint_url")}
            isReadOnly
          >
            {tokenEndPointUrl}
          </ClipboardCopy>
        )}
      </TextContent>
      <TextContent className="pf-u-pb-sm">
        <Text component={TextVariants.h4} className="pf-u-mt-md">
          {t("kafka:connection_tab.sasl_plain")}
        </Text>
        <Text component={TextVariants.small}>
          {t("kafka:connection_tab.sasl_plain_description")}
        </Text>
      </TextContent>
    </div>
  );
};
