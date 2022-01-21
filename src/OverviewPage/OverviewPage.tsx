import {
  Button,
  ButtonVariant,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardHeaderMain,
  CardTitle,
  Grid,
  Label,
  Stack,
  StackItem,
  Title,
} from "@patternfly/react-core";
import { ExternalLinkAltIcon } from "@patternfly/react-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  AppServicesOverviewIconPattern,
  LogoRedHatDataServicesAStandardRgb,
  LogoRedHatOpenShiftApiManagementAStandardRgb,
  LogoRedHatOpenShiftDataScienceAStandardRgb,
  LogoRedHatOpenShiftServiceRegistryAStandardRgb,
  LogoRedHatOpenShiftStreamsForApacheKafkaAStandardRgbPng,
} from "../images";
import {
  MarketingPageBanner,
  MarketingPageHero,
  MarketingPageSection,
} from "../shared";

export type OverviewPageProps = {
  toKafkaHref: string;
  toServiceRegistryHref: string;
};

export const OverviewPage: React.FunctionComponent<OverviewPageProps> = ({
  toKafkaHref,
  toServiceRegistryHref,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <MarketingPageHero
        title={t("overview:heroTitle")}
        tagLine={t("overview:heroTagline")}
        description={t("overview:heroDescription")}
        description2={t("overview:heroDescription2")}
        heroImage={AppServicesOverviewIconPattern}
        heroImageSize={678}
        cta={
          <Button
            variant={ButtonVariant.primary}
            ouiaId="button-primary"
            isLarge
            component={(props) => (
              <Link
                {...props}
                data-testid="hero-buttonTryKafka"
                to={toKafkaHref}
              />
            )}
          >
            {t("overview:heroCallToActionButton")}
          </Button>
        }
        variant="dark"
      />
      <MarketingPageBanner>{t("overview:banner")}</MarketingPageBanner>
      <MarketingPageSection>
        <Grid md={6} lg={3} hasGutter>
          {/* API Management card */}
          <Card>
            <CardHeader>
              <CardHeaderMain>
                <img
                  src={LogoRedHatOpenShiftApiManagementAStandardRgb}
                  alt="Red Hat OpenShift API Management logo"
                  style={{ height: "50px" }}
                />
              </CardHeaderMain>
            </CardHeader>
            <CardTitle>
              <Title headingLevel="h2" size="xl">
                {t("overview:rhoamTitle")}
              </Title>
            </CardTitle>
            <CardBody>
              <Stack hasGutter>
                <StackItem>{t("overview:rhoamMainText")}</StackItem>
                <StackItem className="pf-u-color-200">
                  {t("overview:rhoamSecondaryText")}{" "}
                  <Button
                    data-testid="cardRHOAM-linkOpenShift"
                    isInline
                    variant={ButtonVariant.link}
                    component="a"
                    target="_blank"
                    href="http://openshift.com"
                  >
                    OpenShift
                    <ExternalLinkAltIcon className="pf-u-ml-xs" />
                  </Button>
                  .
                </StackItem>
              </Stack>
            </CardBody>
            <CardFooter>
              <Button
                variant={ButtonVariant.secondary}
                data-testid="cardRHOAM-buttonCTA"
                component="a"
                target="_blank"
                href="https://developers.redhat.com/products/rhoam/getting-started"
              >
                {t("overview:getStarted")}{" "}
                <ExternalLinkAltIcon className="pf-u-ml-sm" />
              </Button>
            </CardFooter>
          </Card>

          {/* Data science card */}
          <Card>
            <CardHeader>
              <CardHeaderMain>
                <img
                  src={LogoRedHatOpenShiftDataScienceAStandardRgb}
                  alt="Red Hat OpenShift Data Science logo"
                  style={{ height: "50px" }}
                />
              </CardHeaderMain>
            </CardHeader>
            <CardTitle>
              <Title headingLevel="h2" size="xl">
                {t("overview:rhodsTitle")}
              </Title>
            </CardTitle>
            <CardBody>
              <Stack hasGutter>
                <StackItem className="pf-u-mb-lg">
                  <Label>{t("overview:beta")}</Label>
                </StackItem>
                <StackItem>{t("overview:rhodsMainText")}</StackItem>
                <StackItem className="pf-u-color-200">
                  {t("overview:rhodsSecondaryText")}{" "}
                  <Button
                    data-testid="cardRHODS-linkOpenShift"
                    isInline
                    variant={ButtonVariant.link}
                    component="a"
                    target="_blank"
                    href="http://openshift.com"
                  >
                    {" "}
                    OpenShift
                    <ExternalLinkAltIcon className="pf-u-ml-xs" />
                  </Button>
                  .
                </StackItem>
              </Stack>
            </CardBody>
            <CardFooter>
              <Button
                data-testid="cardRHODS-buttonCTA"
                variant={ButtonVariant.secondary}
                component="a"
                target="_blank"
                href="https://www.redhat.com/en/technologies/cloud-computing/openshift/openshift-data-science"
              >
                {t("overview:learnMore")}{" "}
                <ExternalLinkAltIcon className="pf-u-ml-sm" />
              </Button>
            </CardFooter>
          </Card>

          {/* Service Registry card */}
          <Card>
            <CardHeader>
              <CardHeaderMain>
                <img
                  src={LogoRedHatOpenShiftServiceRegistryAStandardRgb}
                  alt="Red Hat OpenShift Service Registry logo"
                  style={{ height: "50px" }}
                />
              </CardHeaderMain>
            </CardHeader>
            <CardTitle>
              <Title headingLevel="h2" size="xl">
                {t("overview:rhosrTitle")}
              </Title>
            </CardTitle>
            <CardBody>
              <Stack hasGutter>
                <StackItem className="pf-u-mb-lg">
                  <Label>{t("overview:developmentPreview")}</Label>
                </StackItem>
                <StackItem>{t("overview:rhosrMainText")}</StackItem>
                <StackItem className="pf-u-color-200">
                  {t("overview:rhosrSecondaryText")}
                </StackItem>
              </Stack>
            </CardBody>
            <CardFooter>
              <Button
                data-testid="cardRHOSR-buttonCTA"
                variant={ButtonVariant.secondary}
                component={(props) => (
                  <Link
                    {...props}
                    data-testid="hero-buttonTryKafka"
                    to={toServiceRegistryHref}
                  />
                )}
              >
                {t("overview:rhosrCallToActionButton")}
              </Button>
            </CardFooter>
          </Card>

          {/* Kafka card */}
          <Card ouiaId='card-rhosak'>
            <CardHeader>
              <CardHeaderMain>
                <img
                  src={LogoRedHatOpenShiftStreamsForApacheKafkaAStandardRgbPng}
                  alt="Red Hat OpenShift Streams for Apache Kafka logo"
                  style={{ height: "50px" }}
                />
              </CardHeaderMain>
            </CardHeader>
            <CardTitle>
              <Title headingLevel="h2" size="xl">
                {t("overview:rhosakTitle")}
              </Title>
            </CardTitle>
            <CardBody>
              <Stack hasGutter>
                <StackItem>{t("overview:rhosakMainText")}</StackItem>
                <StackItem className="pf-u-color-200">
                  {t("overview:rhosakSecondaryText")}
                </StackItem>
              </Stack>
            </CardBody>
            <CardFooter>
              <Button
                data-testid="cardRHOSAK-buttonCreateKafka"
                variant={ButtonVariant.secondary}
                component={(props) => <Link {...props} to={toKafkaHref} />}
                ouiaId="button-create"
              >
                {t("overview:rhosakCallToActionButton")}
              </Button>
            </CardFooter>
          </Card>

          {/* Database access card */}
          <Card>
            <CardHeader>
              <CardHeaderMain>
                <img
                  src={LogoRedHatDataServicesAStandardRgb}
                  alt="Red Hat OpenShift Data Science logo"
                  style={{ height: "50px" }}
                />
              </CardHeaderMain>
            </CardHeader>
            <CardTitle>
              <Title headingLevel="h2" size="xl">
                {t("overview:dbaasTitle")}
              </Title>
            </CardTitle>
            <CardBody>
              <Stack hasGutter>
                <StackItem className="pf-u-mb-lg">
                  <Label>{t("overview:alpha")}</Label>
                </StackItem>
                <StackItem>{t("overview:dbaasMainText")}</StackItem>
                <StackItem className="pf-u-color-200">
                  {t("overview:dbaasSecondaryText")}{" "}
                  <Button
                    data-testid="cardRHODS-linkOpenShift"
                    isInline
                    variant={ButtonVariant.link}
                    component="a"
                    target="_blank"
                    href="http://openshift.com"
                  >
                    {" "}
                    OpenShift
                    <ExternalLinkAltIcon className="pf-u-ml-xs" />
                  </Button>
                  .
                </StackItem>
              </Stack>
            </CardBody>
            <CardFooter>
              <Button
                data-testid="cardRHODS-buttonCTA"
                variant={ButtonVariant.secondary}
                component="a"
                target="_blank"
                href="https://access.redhat.com/documentation/en-us/red_hat_openshift_database_access/1/html-single/quick_start_guide/index"
              >
                {t("overview:learnMore")}{" "}
                <ExternalLinkAltIcon className="pf-u-ml-sm" />
              </Button>
            </CardFooter>
          </Card>
        </Grid>
      </MarketingPageSection>
    </>
  );
};
