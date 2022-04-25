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
  Grid,
  Title,
  Flex,
  FlexItem,
  Divider,
  TextContent,
  Text,
  Bullseye,
  Stack,
  TextVariants,
} from "@patternfly/react-core";
import { ExternalLinkAltIcon } from "@patternfly/react-icons/dist/js/icons/external-link-alt-icon";
import { FunctionComponent } from "react";
import { Trans, useTranslation } from "react-i18next";
import { MarketingPageHero, MarketingPageSection } from "../components";
import { AppSpeedKeyArt } from "../../images";
import "./KafkaPage.css";
import { KafkaInstanceCapacityTable } from "./component";
import { Link } from "react-router-dom";
import { AWSLogoRGBAWSLogo } from "../../images";

export const KafkaPage: FunctionComponent = () => {
  const { t } = useTranslation(["kafkaoverview"]);
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
          <Card>
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
              >
                {t("purchaseCardCallToActionButton")}
                <ExternalLinkAltIcon className="pf-u-ml-md" />
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                <Title headingLevel="h3">{t("contactSalesCardTitle")}</Title>
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
              >
                {t("contactSalesCardCallToActionButton")}
                <ExternalLinkAltIcon className="pf-u-ml-md" />
              </Button>
            </CardFooter>
          </Card>
        </Grid>
      </MarketingPageSection>
      <MarketingPageSection>
        <Card>
          <CardTitle>
            <Title headingLevel="h3">{t("pricingModalTitle")}</Title>
          </CardTitle>
          <CardBody>
            <Flex>
              <Flex flex={{ default: "flex_1" }}>
                <FlexItem>
                  <DescriptionList
                    isHorizontal
                    className="description-list-spacer"
                  >
                    <DescriptionListGroup className="description-list-spacer">
                      <DescriptionListTerm>
                        {t("steamingUnit")}
                      </DescriptionListTerm>
                      <DescriptionListDescription>
                        {"$1.49/hour"}
                      </DescriptionListDescription>
                    </DescriptionListGroup>
                    <DescriptionListGroup className="description-list-spacer">
                      <DescriptionListTerm>
                        {t("dataTransfer")}
                      </DescriptionListTerm>
                      <DescriptionListDescription>
                        {"$0.09/GB"}
                      </DescriptionListDescription>
                    </DescriptionListGroup>
                    <DescriptionListGroup className="description-list-spacer">
                      <DescriptionListTerm>{t("storage")}</DescriptionListTerm>
                      <DescriptionListDescription>
                        {"$0.10/GB"}
                      </DescriptionListDescription>
                    </DescriptionListGroup>
                  </DescriptionList>
                </FlexItem>
              </Flex>
              <Divider isVertical />
              <Flex flex={{ default: "flex_1" }}>
                <FlexItem>
                  <TextContent>
                    <p>
                      A <strong>Streaming Unit</strong> determines the default
                      maximum capacity of a Kafka Instance. The number Streaming
                      Units that your Kafka Instance has determines its maximum
                      capacity.
                    </p>
                  </TextContent>
                </FlexItem>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </MarketingPageSection>
      <MarketingPageSection>
        <Card>
          <CardTitle>
            <Title headingLevel="h3">{t("kafkaInstanceCapacityTitle")}</Title>
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
            <TextContent>
              <Text>
                {
                  <Trans
                    i18nKey={"kafkaoverview:kafkaInstanceCapacityfooter"}
                    components={{
                      support: (
                        <Link to="https://access.redhat.com/support"></Link>
                      ),
                      value: (
                        <Link to="https://access.redhat.com/documentation/en-us/red_hat_openshift_streams_for_apache_kafka/1/guide/aced8e5e-8229-4cb2-82f9-87a8caa24bb3"></Link>
                      ),
                    }}
                  />
                }
              </Text>
            </TextContent>
          </CardFooter>
        </Card>
      </MarketingPageSection>
      <MarketingPageSection>
        <Card>
          <CardTitle>
            <Title headingLevel="h3">{t("cloudProvidersTitle")}</Title>
          </CardTitle>
          <CardBody>
            <Stack hasGutter>
              <Text component={TextVariants.p}>
                {t("cloudProvidersDescription")}
              </Text>
              <Bullseye>
                <img
                  src={AWSLogoRGBAWSLogo}
                  alt={"Amazon Web Services"}
                  style={{ height: "60px" }}
                />
                <Title headingLevel="h3">{"Amazon Web Services"}</Title>
              </Bullseye>
            </Stack>
          </CardBody>
        </Card>
      </MarketingPageSection>
    </>
  );
};
