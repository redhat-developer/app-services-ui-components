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
import { ExternalLink } from "../../shared";
import "./KafkaInstanceDrawer.css";

export type KafkaConnectionTabP2Props = {
  isKafkaPending?: boolean;
  externalServer?: string;
  tokenEndPointUrl: string;
  linkToServiceAccount: string;
  linkToAccessTab: string;
  adminAPIUrl: string | undefined;
  showCreateServiceAccountModal: () => void;
  kafkaFleetManagerUrl: string;
  linkToDocPortal: string;
};

export const KafkaConnectionTabP2: FunctionComponent<
  KafkaConnectionTabP2Props
> = ({
  isKafkaPending,
  externalServer,
  tokenEndPointUrl,
  linkToServiceAccount,
  linkToAccessTab,
  adminAPIUrl,
  kafkaFleetManagerUrl,
  showCreateServiceAccountModal,
  linkToDocPortal,
}) => {
  const { t } = useTranslation();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const onChangeExpandedSection = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mas--details__drawer--tab-content">
      <TextContent className="pf-u-pb-sm">
        <Text component={TextVariants.small}>
          {t("connection-tab:drawer_resource_tab_body_description_1")}
        </Text>
        <Text component={TextVariants.h3} className="pf-u-mt-xl">
          {t("connection-tab:bootstrap_server")}
        </Text>
        <Text component={TextVariants.small}>
          {t("connection-tab:bootstrap_server_description")}
        </Text>
        {isKafkaPending ? (
          <Skeleton fontSize="2xl" />
        ) : (
          <ClipboardCopy
            data-testid="drawerStreams-copyBootstrapURL"
            textAriaLabel={t("connection-tab:bootstrap_server")}
            isReadOnly
          >
            {externalServer}
          </ClipboardCopy>
        )}
      </TextContent>
      <TextContent className="pf-u-pb-sm">
        <Text component={TextVariants.h3} className="pf-u-mt-xl">
          {t("connection-tab:service_accounts_small")}
        </Text>
        <Text component={TextVariants.small}>
          {
            <Trans
              i18nKey={
                "connection-tab:create_service_account_to_generate_credentials"
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
        {t("connection-tab:create_service_account")}
      </Button>
      <TextContent className="pf-u-pt-sm">
        <Text component={TextVariants.small}>
          {
            <Trans
              i18nKey={"connection-tab:current_instance"}
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
                {t("connection-tab:rest_api_header")}
              </Text>
            </div>
          }
          isExpanded={isExpanded}
          onToggle={onChangeExpandedSection}
          className="pf-u-mt-lg"
        >
          <TextContent className="pf-u-pb-sm">
            <Text component={TextVariants.small}>
              {t("connection-tab:rest_api_description")}
            </Text>
          </TextContent>
          <TextContent>
            <strong>
              {t("connection-tab:kafka_instance_url_label")}
              <Popover
                headerContent={
                  <div>
                    {t("connection-tab:kafka_instance_url_popover_label")}
                  </div>
                }
                bodyContent={
                  <TextContent>
                    <p>{t("connection-tab:kafka_instance_url_popover_body")}</p>
                    <p>
                      <Trans
                        ns={"connection-tab"}
                        i18nKey={"popover_helper_text"}
                        components={[
                          <Button
                            isInline
                            variant={ButtonVariant.link}
                            component="a"
                            href="https://console.redhat.com/docs/api"
                          />,
                          <ExternalLink
                            testId={"customerPortal-link"}
                            href={linkToDocPortal}
                            className={"pf-u-ml-xs"}
                          />,
                        ]}
                      />
                    </p>
                  </TextContent>
                }
              >
                <Button
                  variant={ButtonVariant.plain}
                  aria-label={t(
                    "connection-tab:kafka_instance_url_button_aria_label"
                  )}
                >
                  <HelpIcon />
                </Button>
              </Popover>
            </strong>
            {adminAPIUrl ? (
              <ClipboardCopy
                textAriaLabel={t("connection-tab:kafka_instance_url_label")}
                isReadOnly
              >
                {adminAPIUrl}
              </ClipboardCopy>
            ) : (
              <Skeleton fontSize="2xl" />
            )}
            <TextContent className="pf-u-pt-sm">
              <Text component={TextVariants.small}>
                {t("connection-tab:kafka_instance_url_description")}
              </Text>
            </TextContent>
          </TextContent>
          <TextContent className="pf-u-mt-md">
            <strong>
              {t("connection-tab:kafka_management_url")}
              <Popover
                headerContent={
                  <div>
                    {t("connection-tab:kafka_management_popover_header")}
                  </div>
                }
                bodyContent={
                  <TextContent>
                    <p>{t("connection-tab:kafka_management_popover_body")}</p>
                    <p>
                      <Trans
                        ns={"connection-tab"}
                        i18nKey={"popover_helper_text"}
                        components={[
                          <Button
                            isInline
                            variant={ButtonVariant.link}
                            component="a"
                            href="https://console.redhat.com/docs/api"
                          />,
                          <ExternalLink
                            testId={"customerPortal-link"}
                            href={linkToDocPortal}
                            className={"pf-u-ml-xs"}
                          />,
                        ]}
                      />
                    </p>
                  </TextContent>
                }
              >
                <Button
                  variant={ButtonVariant.plain}
                  aria-label={t(
                    "connection-tab:kafka_management_button_aria_label"
                  )}
                >
                  <HelpIcon />
                </Button>
              </Popover>
            </strong>
            {isKafkaPending ? (
              <Skeleton fontSize="2xl" />
            ) : (
              <ClipboardCopy
                textAriaLabel={t("connection-tab:kafka_management_url")}
                isReadOnly
              >
                {kafkaFleetManagerUrl}
              </ClipboardCopy>
            )}
            <TextContent className="pf-u-pt-sm">
              <Text component={TextVariants.small}>
                {t("connection-tab:kafka_management_description")}
              </Text>
            </TextContent>
          </TextContent>
        </ExpandableSection>
      </TextContent>
      <TextContent className="pf-u-pb-sm">
        <Text component={TextVariants.h3} className="pf-u-mt-xl">
          {t("connection-tab:authentication_method")}
        </Text>
        <Text component={TextVariants.h4} className="pf-u-mt-md">
          {t("connection-tab:sasl_oauthbearer")}{" "}
          <Label color="green">{t("connection-tab:recommended")}</Label>
          <Popover
            aria-label={t("connection-tab:sasl_oauthbearer")}
            bodyContent={
              <div>{t("connection-tab:sasl_oauthbearer_popover_content")}</div>
            }
          >
            <Button
              variant={ButtonVariant.plain}
              aria-label={t("connection-tab:more_info_about_sasl_oauthbearer")}
            >
              <HelpIcon />
            </Button>
          </Popover>
        </Text>
        <Text component={TextVariants.small}>
          {t("connection-tab:sasl_oauthbearer_description")}
        </Text>
        <strong>{t("connection-tab:token_endpoint_url")}</strong>
        {isKafkaPending ? (
          <Skeleton fontSize="2xl" />
        ) : (
          <ClipboardCopy
            textAriaLabel={t("connection-tab:token_endpoint_url")}
            isReadOnly
          >
            {tokenEndPointUrl}
          </ClipboardCopy>
        )}
      </TextContent>
      <TextContent className="pf-u-pb-sm">
        <Text component={TextVariants.h4} className="pf-u-mt-md">
          {t("connection-tab:sasl_plain")}
        </Text>
        <Text component={TextVariants.small}>
          {t("connection-tab:sasl_plain_description")}
        </Text>
      </TextContent>
    </div>
  );
};
