import {
  Button,
  ButtonVariant,
  ClipboardCopy,
  Label,
  Popover,
  Skeleton,
  Text,
  TextContent,
  TextVariants,
} from "@patternfly/react-core";
import { HelpIcon } from "@patternfly/react-icons";
import type { FunctionComponent } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export type KafkaConnectionTabProps = {
  isKafkaPending?: boolean;
  externalServer?: string;
  tokenEndPointUrl: string;
  linkToServiceAccount: string;
  linkToAccessTab: string;
  adminAPIUrl: string;
  showCreateServiceAccountModal: () => void;
  kafkaFleetManagerUrl: string;
};

export const KafkaConnectionTab: FunctionComponent<KafkaConnectionTabProps> = ({
  isKafkaPending,
  externalServer,
  tokenEndPointUrl,
  linkToServiceAccount,
  linkToAccessTab,
  adminAPIUrl,
  kafkaFleetManagerUrl,
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
          {t("kafka:connection_tab.rest_api")}
          <Popover
            headerContent={
              <div>{t("kafka:connection_tab.rest_api_popover_header")}</div>
            }
            bodyContent={
              <div>{t("kafka:connection_tab.rest_api_popover_body")}</div>
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
        <Text component={TextVariants.h3} className="pf-u-mt-xl">
          {t("kafka:connection_tab.admin_url_label")}
          <Popover
            headerContent={
              <div>{t("kafka:connection_tab.admin_url_popover_label")}</div>
            }
            bodyContent={
              <div>
                <Trans
                  i18nKey={"kafka:connection_tab.admin_url_popover_body"}
                  components={{
                    value: (
                      <Link
                        to={{ pathname: "https://console.redhat.com/docs/api" }}
                        target="_blank"
                      />
                    ),
                  }}
                />
              </div>
            }
          >
            <Button
              variant={ButtonVariant.plain}
              aria-label={t("kafka:connection_tab.admin_utl_button_aria_label")}
            >
              <HelpIcon />
            </Button>
          </Popover>
        </Text>
        {isKafkaPending ? (
          <Skeleton fontSize="2xl" />
        ) : (
          <ClipboardCopy
            data-testid="drawerStreams-copyRestApiURL"
            textAriaLabel={t("kafka:connection_tab.rest_api")}
            isReadOnly
          >
            {adminAPIUrl}
          </ClipboardCopy>
        )}
        <TextContent className="pf-u-pt-sm">
          <Text component={TextVariants.small}>
            {t("kafka:connection_tab.admin_url_description")}
          </Text>
        </TextContent>
        <Text component={TextVariants.h3} className="pf-u-mt-xl">
          {t("kafka:connection_tab.kafka_service_fleet_manager_url")}
          <Popover
            headerContent={
              <div>
                {t(
                  "kafka:connection_tab.kafka_service_fleet_manager_popover_header"
                )}
              </div>
            }
            bodyContent={
              <div>
                {t(
                  "kafka:connection_tab.kafka_service_fleet_manager_popover_body"
                )}
              </div>
            }
          >
            <Button
              variant={ButtonVariant.plain}
              aria-label={t(
                "kafka:connection_tab.kafka_service_fleet_manager_button_aria_label"
              )}
            >
              <HelpIcon />
            </Button>
          </Popover>
        </Text>
        {isKafkaPending ? (
          <Skeleton fontSize="2xl" />
        ) : (
          <ClipboardCopy
            data-testid="drawerStreams-copyRestApiURL"
            textAriaLabel={t("kafka:connection_tab.rest_api")}
            isReadOnly
          >
            {kafkaFleetManagerUrl}
          </ClipboardCopy>
        )}
        <TextContent className="pf-u-pt-sm">
          <Text component={TextVariants.small}>
            {t("kafka:connection_tab.kafka_service_fleet_manager_description")}
          </Text>
        </TextContent>
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
