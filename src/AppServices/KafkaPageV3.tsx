import {
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
import { AppSpeedKeyArt, LogoAWS, LogoAzure, LogoGCP } from "../images";
import {
  KafkaInstanceCapacityTable,
  MarketingPageHero,
  MarketingPageSection,
} from "./components";
import { ExternalLink } from "../shared";

export const KafkaPageV3: FunctionComponent = () => {
  const { t } = useTranslation(["kafkaoverview-v3"]);
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
                  <Title headingLevel="h2">
                    <Trans
                      ns={"kafkaoverview-v3"}
                      i18nKey={"purchaseCardTitle"}
                    >
                      <span className="pf-u-color-200 pf-u-font-size-sm"></span>
                    </Trans>
                  </Title>
                </CardTitle>
              </CardHeaderMain>
            </CardHeader>
            <CardBody>{t("purchaseCardMainText")}</CardBody>
            <CardFooter>
              <Flex spaceItems={{ default: "spaceItems2xl" }}>
                <FlexItem>
                  <ExternalLink
                    href={
                      "https://marketplace.redhat.com/en-us/products/red-hat-openshift-streams-for-apache-kafka"
                    }
                    testId={"cardPurchase-buttonRH"}
                    className={"pf-u-ml-md "}
                  >
                    <Trans
                      ns={"kafkaoverview-v3"}
                      i18nKey={"purchaseCardCallToActionButtonRedHat"}
                      components={{
                        bold: <strong />,
                        size: <span className="pf-u-font-size-lg" />,
                      }}
                    />
                  </ExternalLink>
                </FlexItem>

                <FlexItem>
                  <ExternalLink
                    href={
                      "https://aws.amazon.com/marketplace/pp/prodview-3xohcoyuwkumc"
                    }
                    testId={"cardPurchase-buttonAWS"}
                    className={"pf-u-ml-md"}
                  >
                    <Trans
                      ns={"kafkaoverview-v3"}
                      i18nKey={"purchaseCardCallToActionButtonAWS"}
                      components={{
                        bold: <strong />,
                        size: <span className="pf-u-font-size-lg" />,
                      }}
                    />
                  </ExternalLink>
                </FlexItem>
              </Flex>
            </CardFooter>
          </Card>
          <Card
            ouiaId="card-overview-contact-sales"
            aria-label={t("kafkaoverview:contactSalesCardTitle")}
          >
            <CardHeader>
              <CardTitle>
                <Title headingLevel="h2">
                  <Trans
                    ns={"kafkaoverview-v3"}
                    i18nKey={"contactSalesCardTitle"}
                  >
                    <span className="pf-u-color-200 pf-u-font-size-sm"></span>
                  </Trans>
                </Title>
              </CardTitle>
            </CardHeader>
            <CardBody>{t("contactSalesCardMainText")}</CardBody>
            <CardFooter>
              <ExternalLink
                href={
                  "https://www.redhat.com/en/technologies/cloud-computing/openshift/openshift-streams-for-apache-kafka#contact-us"
                }
                testId={"cardContactSales-buttonCTA"}
                className={"pf-u-ml-md"}
              >
                <Trans
                  ns={"kafkaoverview-v3"}
                  i18nKey={"contactSalesCardCallToActionButton"}
                  components={{
                    bold: <strong />,
                    size: <span className="pf-u-font-size-lg" />,
                  }}
                />
              </ExternalLink>
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
                      ns={"kafkaoverview-v3"}
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
                ns={"kafkaoverview-v3"}
                i18nKey={"kafkaInstanceCapacityfooter"}
                components={[
                  <ExternalLink
                    href={"https://access.redhat.com/support"}
                    testId={"SupportLink"}
                    className={"pf-u-ml-xs"}
                  />,
                  <ExternalLink
                    href={
                      "https://access.redhat.com/documentation/en-us/red_hat_openshift_streams_for_apache_kafka/1/guide/aced8e5e-8229-4cb2-82f9-87a8caa24bb3"
                    }
                    testId={"MonitoringDiskSpaceLink"}
                    className={"pf-u-ml-xs"}
                  />,
                ]}
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
            <Flex
              spaceItems={{ default: "spaceItemsXl" }}
              direction={{ default: "column", xl: "row" }}
            >
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
              <Divider
                orientation={{ default: "horizontal", xl: "vertical" }}
              />
              <Flex
                justifyContent={{ default: "justifyContentCenter" }}
                flex={{ default: "flex_1" }}
              >
                <FlexItem>
                  <Split hasGutter>
                    <SplitItem>
                      <img src={LogoGCP} alt={""} style={{ height: "60px" }} />
                    </SplitItem>
                    <SplitItem>
                      <Title headingLevel="h2" className={"pf-u-pt-sm"}>
                        {t("googleCloudProviderTitle")}
                      </Title>
                      <Text
                        component={TextVariants.p}
                        className={"pf-u-color-200"}
                      >
                        {t("googleCloudProviderDescription")}
                      </Text>
                    </SplitItem>
                  </Split>
                </FlexItem>
              </Flex>
              <Divider
                orientation={{ default: "horizontal", xl: "vertical" }}
              />
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
