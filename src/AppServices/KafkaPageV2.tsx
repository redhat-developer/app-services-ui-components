import {
  Button,
  ButtonVariant,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardHeaderMain,
  CardTitle,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Divider,
  Flex,
  FlexItem,
  Grid,
  Split,
  SplitItem,
  Stack,
  Text,
  TextContent,
  TextVariants,
  Title,
} from "@patternfly/react-core";
import type { FunctionComponent } from "react";
import { Trans, useTranslation } from "react-i18next";
import { AppSpeedKeyArt, LogoAWS, LogoAzure } from "../images";
import {
  KafkaInstanceCapacityTable,
  MarketingPageHero,
  MarketingPageSection,
} from "./components";
import { ExternalLinkAltIcon } from "@patternfly/react-icons";

export const KafkaPageV2: FunctionComponent = () => {
  const { t } = useTranslation(["kafkaoverview-v2"]);
  return (
    <>
      <MarketingPageHero
        title={t("heroTitle")}
        tagLine={t("heroTagline")}
        description={t("heroDescription")}
        heroImage={AppSpeedKeyArt}
        heroImageSize={478}
        heroImageCanRepeat={false}
        heroImagePositionY={-99}
      />
      <MarketingPageSection>
        <Grid hasGutter lg={6}>
          <Card
            ouiaId="card-overview-purchase-now"
            aria-label={t("kafkaoverview:purchaseCardTitle")}
          >
            <CardHeader>
              <CardHeaderMain>
                <CardTitle>
                  <Title headingLevel="h3">{t("purchaseCardTitle")}</Title>
                </CardTitle>
              </CardHeaderMain>
            </CardHeader>
            <CardBody>{t("purchaseCardMainText")}</CardBody>
            <CardFooter>
              <Button
                data-testid="cardPurchase-buttonCTA"
                variant={ButtonVariant.link}
                isLarge
                isInline
                component="a"
                href="https://marketplace.redhat.com/en-us/products/red-hat-openshift-streams-for-apache-kafka"
                target="_blank"
                ouiaId="link-purchase-now"
              >
                {t("purchaseCardCallToActionButton")}
                <ExternalLinkAltIcon className="pf-u-ml-md" />
              </Button>
            </CardFooter>
          </Card>
          <Card
            ouiaId="card-overview-contact-sales"
            aria-label={t("kafkaoverview:contactSalesCardTitle")}
          >
            <CardHeader>
              <CardTitle>
                <Title headingLevel="h2">{t("contactSalesCardTitle")}</Title>
              </CardTitle>
            </CardHeader>
            <CardBody>{t("contactSalesCardMainText")}</CardBody>
            <CardFooter>
              <Button
                data-testid="cardContactSales-buttonCTA"
                variant={ButtonVariant.link}
                isLarge
                isInline
                component="a"
                href="https://www.redhat.com/en/technologies/cloud-computing/openshift/openshift-streams-for-apache-kafka#contact-us"
                target="_blank"
                ouiaId="link-contact-sales"
              >
                {t("contactSalesCardCallToActionButton")}
                <ExternalLinkAltIcon className="pf-u-ml-md" />
              </Button>
            </CardFooter>
          </Card>
        </Grid>
      </MarketingPageSection>
      <MarketingPageSection
        className={"kafka-overview--page-section--marketing"}
      >
        <Card>
          <CardTitle>
            <Title headingLevel="h2">{t("pricingModalTitle")}</Title>
          </CardTitle>
          <CardBody>
            <Flex spaceItems={{ default: "spaceItemsXl" }}>
              <Flex
                alignSelf={{ default: "alignSelfCenter" }}
                justifyContent={{ default: "justifyContentCenter" }}
                flex={{ default: "flex_1" }}
              >
                <FlexItem>
                  <DescriptionList isHorizontal>
                    <DescriptionListGroup>
                      <DescriptionListTerm>
                        {t("steamingUnit")}
                      </DescriptionListTerm>
                      <DescriptionListDescription>
                        {t("streamingUnit_price")}
                      </DescriptionListDescription>
                    </DescriptionListGroup>
                    <DescriptionListGroup>
                      <DescriptionListTerm>
                        {t("dataTransfer")}
                      </DescriptionListTerm>
                      <DescriptionListDescription>
                        {t("dataTransfer_price")}
                      </DescriptionListDescription>
                    </DescriptionListGroup>
                    <DescriptionListGroup>
                      <DescriptionListTerm>{t("storage")}</DescriptionListTerm>
                      <DescriptionListDescription>
                        {t("storage_price")}
                      </DescriptionListDescription>
                    </DescriptionListGroup>
                  </DescriptionList>
                </FlexItem>
              </Flex>
              <Divider isVertical />
              <FlexItem flex={{ default: "flex_1" }}>
                <TextContent>
                  <Text component={TextVariants.p}>
                    <Trans
                      ns={"kafkaoverview-v2"}
                      i18nKey={"streamingUnitText"}
                      components={{ bold: <strong /> }}
                    />
                  </Text>
                </TextContent>
              </FlexItem>
            </Flex>
          </CardBody>
        </Card>
      </MarketingPageSection>
      <MarketingPageSection
        className={"kafka-overview--page-section--marketing"}
      >
        <Card>
          <CardTitle>
            <Title headingLevel="h2">{t("kafkaInstanceCapacityTitle")}</Title>
          </CardTitle>
          <CardBody>
            <Stack hasGutter>
              <Text component={TextVariants.p}>
                {t("kafkaInstanceCapacityDescription")}
              </Text>
              <KafkaInstanceCapacityTable />
            </Stack>
          </CardBody>
          <CardFooter>
            <TextContent className={"pf-u-font-size-sm"}>
              <Trans
                ns={"kafkaoverview-v2"}
                i18nKey={"kafkaInstanceCapacityfooter"}
                components={[<SupportLink />, <MonitoringDiskSpaceLink />]}
              />
            </TextContent>
          </CardFooter>
        </Card>
      </MarketingPageSection>
      <MarketingPageSection
        className={"kafka-overview--page-section--marketing"}
      >
        <Card>
          <CardTitle>
            <Title headingLevel="h2">{t("cloudProvidersTitle")}</Title>
          </CardTitle>
          <CardBody>
            <Flex spaceItems={{ default: "spaceItemsXl" }}>
              <Flex
                justifyContent={{ default: "justifyContentCenter" }}
                flex={{ default: "flex_1" }}
              >
                <FlexItem>
                  <Split hasGutter>
                    <SplitItem>
                      <img src={LogoAWS} alt={""} style={{ height: "60px" }} />
                    </SplitItem>
                    <SplitItem>
                      <Title headingLevel="h2" className={"pf-u-pt-sm"}>
                        {t("awsWebServiceTitle")}
                      </Title>
                    </SplitItem>
                  </Split>
                </FlexItem>
              </Flex>
              <Divider isVertical />
              <Flex
                justifyContent={{ default: "justifyContentCenter" }}
                flex={{ default: "flex_1" }}
              >
                <FlexItem>
                  <Split hasGutter>
                    <SplitItem>
                      <img
                        src={LogoAzure}
                        alt={""}
                        style={{ height: "60px" }}
                      />
                    </SplitItem>
                    <SplitItem>
                      <Title headingLevel="h2" className={"pf-u-pt-sm"}>
                        {t("microsoftAzureTitle")}
                      </Title>
                      <Text
                        component={TextVariants.p}
                        className={"pf-u-color-200"}
                      >
                        {t("microsoftAzureDescription")}
                      </Text>
                    </SplitItem>
                  </Split>
                </FlexItem>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </MarketingPageSection>
    </>
  );
};

const SupportLink: FunctionComponent = ({ children }) => (
  <Button
    data-testid="redhatSupport-buttonCTA"
    isInline
    variant={ButtonVariant.link}
    component="a"
    target="_blank"
    href="https://access.redhat.com/support"
  >
    {children}
    <ExternalLinkAltIcon className="pf-u-ml-xs" />
  </Button>
);

const MonitoringDiskSpaceLink: FunctionComponent = ({ children }) => (
  <Button
    data-testid="diskSpaceMetrics-buttonCTA"
    isInline
    variant={ButtonVariant.link}
    component="a"
    target="_blank"
    href="https://access.redhat.com/documentation/en-us/red_hat_openshift_streams_for_apache_kafka/1/guide/aced8e5e-8229-4cb2-82f9-87a8caa24bb3"
  >
    {children}
    <ExternalLinkAltIcon className="pf-u-ml-xs" />
  </Button>
);
