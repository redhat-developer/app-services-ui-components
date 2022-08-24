import {
  Button,
  ButtonVariant,
  ClipboardCopy,
  ExpandableSection,
  Label,
  Popover,
  Skeleton,
  Text,
  TextContent,
  TextVariants,
} from "@patternfly/react-core";
import { HelpIcon } from "@patternfly/react-icons";
import { useState } from "react";
import type { FunctionComponent } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./KafkaInstanceDrawer.css";

export type KafkaConnectionTabP1Props = {
  isKafkaPending?: boolean;
  externalServer?: string;
  tokenEndPointUrl: string;
  linkToServiceAccount: string;
  linkToAccessTab: string;
  adminAPIUrl: string | undefined;
  showCreateServiceAccountModal: () => void;
  kafkaFleetManagerUrl: string;
};

export const KafkaConnectionTabP1: FunctionComponent<
  KafkaConnectionTabP1Props
> = ({
  isKafkaPending,
  externalServer,
  tokenEndPointUrl,
  linkToServiceAccount,
  linkToAccessTab,
  adminAPIUrl,
  kafkaFleetManagerUrl,
  showCreateServiceAccountModal,
}) => {
  const { t } = useTranslation("connection-tab-p1");

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const onChangeExpandedSection = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mas--details__drawer--tab-content">
      <TextContent className="pf-u-pb-sm">
        <Text component={TextVariants.small}>
          {t("drawer_resource_tab_body_description_1")}
        </Text>
        <Text component={TextVariants.h3} className="pf-u-mt-xl">
          {t("bootstrap_server")}
        </Text>
        <Text component={TextVariants.small}>
          {t("bootstrap_server_description")}
        </Text>
        {isKafkaPending ? (
          <Skeleton fontSize="2xl" />
        ) : (
          <ClipboardCopy
            data-testid="drawerStreams-copyBootstrapURL"
            textAriaLabel={t("bootstrap_server")}
            isReadOnly
          >
            {externalServer}
          </ClipboardCopy>
        )}
      </TextContent>
      <TextContent className="pf-u-pb-sm">
        <Text component={TextVariants.h3} className="pf-u-mt-xl">
          {t("service_accounts_small")}
        </Text>
        <Text component={TextVariants.small}>
          {
            <Trans
              i18nKey={
                "connection-tab-p1:create_service_account_to_generate_credentials"
              }
              components={{
                value: (
                  <Link
                    to={linkToServiceAccount}
                    data-testid="tableStreams-linkKafka"
                  ></Link>
                ),
              }}
            />
          }
        </Text>
      </TextContent>
      <Button
        variant={ButtonVariant.secondary}
        isInline
        onClick={showCreateServiceAccountModal}
        data-testid="drawerStreams-buttonCreateServiceAccount"
      >
        {t("create_service_account")}
      </Button>
      <TextContent className="pf-u-pt-sm">
        <Text component={TextVariants.small}>
          {
            <Trans
              i18nKey={"connection-tab-p1:current_instance"}
              components={{
                value: <Link to={linkToAccessTab}></Link>,
              }}
            />
          }
        </Text>
      </TextContent>
      <TextContent className="pf-u-pb-sm">
        <ExpandableSection
          toggleContent={
            <div className="pf-c-content">
              <Text component={TextVariants.h3} className={"pf-c-content"}>
                {t("rest_api_header")}
              </Text>
            </div>
          }
          isExpanded={isExpanded}
          onToggle={onChangeExpandedSection}
          className="pf-u-mt-lg"
        >
          <TextContent className="pf-u-pb-sm">
            <Text component={TextVariants.small}>
              {t("rest_api_description")}
            </Text>
          </TextContent>
          <TextContent>
            <strong>
              {t("kafka_instance_url_label")}
              <Popover
                headerContent={
                  <div>{t("kafka_instance_url_popover_label")}</div>
                }
                bodyContent={
                  <TextContent>
                    <p>{t("kafka_instance_url_popover_body")}</p>
                    <p>
                      <Trans
                        ns={"connection-tab-p1"}
                        i18nKey={"popover_helper_text"}
                        components={[
                          <Button
                            isInline
                            variant={ButtonVariant.link}
                            component="a"
                            href="https://console.redhat.com/docs/api/kafkainstance?github-owner=redhat-developer&github-repo=app-services-sdk-core&github-content=kafka-admin-rest.yaml%3Fref%3Ddoc-portal&readonly=true"
                          />,
                        ]}
                      />
                    </p>
                  </TextContent>
                }
              >
                <Button
                  variant={ButtonVariant.plain}
                  aria-label={t("kafka_instance_url_button_aria_label")}
                >
                  <HelpIcon />
                </Button>
              </Popover>
            </strong>
            {adminAPIUrl ? (
              <ClipboardCopy
                textAriaLabel={t("kafka_instance_url_label")}
                isReadOnly
              >
                {adminAPIUrl}
              </ClipboardCopy>
            ) : (
              <Skeleton fontSize="2xl" />
            )}
            <TextContent className="pf-u-pt-sm">
              <Text component={TextVariants.small}>
                {t("kafka_instance_url_description")}
              </Text>
            </TextContent>
          </TextContent>
          <TextContent className="pf-u-mt-md">
            <strong>
              {t("kafka_management_url")}
              <Popover
                headerContent={
                  <div>{t("kafka_management_popover_header")}</div>
                }
                bodyContent={
                  <TextContent>
                    <p>{t("kafka_management_popover_body")}</p>
                    <p>
                      <Trans
                        ns={"connection-tab-p1"}
                        i18nKey={"popover_helper_text"}
                        components={[
                          <Button
                            isInline
                            variant={ButtonVariant.link}
                            component="a"
                            href="https://console.redhat.com/docs/api/kafkamgmt?github-owner=redhat-developer&github-repo=app-services-sdk-core&github-content=kas-fleet-manager.yaml%3Fref%3Ddoc-portal"
                          />,
                        ]}
                      />
                    </p>
                  </TextContent>
                }
              >
                <Button
                  variant={ButtonVariant.plain}
                  aria-label={t("kafka_management_button_aria_label")}
                >
                  <HelpIcon />
                </Button>
              </Popover>
            </strong>
            {isKafkaPending ? (
              <Skeleton fontSize="2xl" />
            ) : (
              <ClipboardCopy
                textAriaLabel={t("kafka_management_url")}
                isReadOnly
              >
                {kafkaFleetManagerUrl}
              </ClipboardCopy>
            )}
            <TextContent className="pf-u-pt-sm">
              <Text component={TextVariants.small}>
                {t("kafka_management_description")}
              </Text>
            </TextContent>
          </TextContent>
        </ExpandableSection>
      </TextContent>
      <TextContent className="pf-u-pb-sm">
        <Text component={TextVariants.h3} className="pf-u-mt-xl">
          {t("authentication_method")}
        </Text>
        <Text component={TextVariants.h4} className="pf-u-mt-md">
          {t("sasl_oauthbearer")}{" "}
          <Label color="green">{t("recommended")}</Label>
          <Popover
            aria-label={t("sasl_oauthbearer")}
            bodyContent={<div>{t("sasl_oauthbearer_popover_content")}</div>}
          >
            <Button
              variant={ButtonVariant.plain}
              aria-label={t("more_info_about_sasl_oauthbearer")}
            >
              <HelpIcon />
            </Button>
          </Popover>
        </Text>
        <Text component={TextVariants.small}>
          {t("sasl_oauthbearer_description")}
        </Text>
        <strong>{t("token_endpoint_url")}</strong>
        {isKafkaPending ? (
          <Skeleton fontSize="2xl" />
        ) : (
          <ClipboardCopy textAriaLabel={t("token_endpoint_url")} isReadOnly>
            {tokenEndPointUrl}
          </ClipboardCopy>
        )}
      </TextContent>
      <TextContent className="pf-u-pb-sm">
        <Text component={TextVariants.h4} className="pf-u-mt-md">
          {t("sasl_plain")}
        </Text>
        <Text component={TextVariants.small}>
          {t("sasl_plain_description")}
        </Text>
      </TextContent>
    </div>
  );
};
