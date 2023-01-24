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
  LabelGroup,
  Stack,
  StackItem,
  Title,
} from "@patternfly/react-core";
import { ExternalLinkAltIcon } from "@patternfly/react-icons";
import type { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  AppServicesOverviewIconPattern,
  LogoRedHatOpenShiftApiManagementAStandardRgb,
  LogoRedHatOpenShiftConnectorsBStandardRgb,
  LogoRedHatOpenShiftDatabaseAccessAStandardRgb,
  LogoRedHatOpenShiftDataScienceAStandardRgb,
  LogoRedHatOpenShiftServiceRegistryAStandardRgb,
  LogoRedHatOpenShiftStreamsForApacheKafkaAStandardRgbPng,
} from "../images";
import {
  MarketingPageBanner,
  MarketingPageHero,
  MarketingPageSection,
} from "./components";

export type OverviewPageV3Props = {
  toKafkaHref: string;
  toServiceRegistryHref: string;
  toConnectorsHref: string;
};

export const OverviewPageV3: FunctionComponent<OverviewPageV3Props> = ({
  toKafkaHref,
  toServiceRegistryHref,
  toConnectorsHref,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <MarketingPageHero
        title={t("overview-v3:heroTitle")}
        tagLine={t("overview-v3:heroTagline")}
        description={t("overview-v3:heroDescription")}
        description2={t("overview-v3:heroDescription2")}
        heroImage={AppServicesOverviewIconPattern}
        heroImageSize={678}
        cta={
          <Button
            variant={ButtonVariant.primary}
            ouiaId="button-try-kafka"
            isLarge
            component={(props) => (
              <Link
                {...props}
                data-testid="hero-buttonTryKafka"
                to={toKafkaHref}
              />
            )}
          >
            {t("overview-v3:heroCallToActionButton")}
          </Button>
        }
        variant="dark"
      />
      <MarketingPageBanner>{t("overview-v3:banner")}</MarketingPageBanner>
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
                {t("overview-v3:rhoamTitle")}
              </Title>
            </CardTitle>
            <CardBody>
              <Stack hasGutter>
                <StackItem className="pf-u-mb-lg">
                  <LabelGroup>
                    <Label color="blue">
                      {t("overview-v3:applicationService")}
                    </Label>
                  </LabelGroup>
                </StackItem>
                <StackItem>{t("overview-v3:rhoamMainText")}</StackItem>
                <StackItem className="pf-u-color-200">
                  {t("overview-v3:rhoamSecondaryText")}{" "}
                  <Button
                    data-testid="cardRHOAM-linkOpenShift"
                    isInline
                    variant={ButtonVariant.link}
                    component="a"
                    target="_blank"
                    href="https://openshift.com"
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
                {t("overview-v3:getStarted")}{" "}
                <ExternalLinkAltIcon className="pf-u-ml-sm" />
              </Button>
            </CardFooter>
          </Card>

          {/* Kafka card */}
          <Card ouiaId="card-rhosak">
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
                {t("overview-v3:rhosakTitle")}
              </Title>
            </CardTitle>
            <CardBody>
              <Stack hasGutter>
                <StackItem className="pf-u-mb-lg">
                  <LabelGroup>
                    <Label color="blue">
                      {t("overview-v3:applicationService")}
                    </Label>
                    <Label color="green">{t("overview-v3:dataService")}</Label>
                  </LabelGroup>
                </StackItem>
                <StackItem>{t("overview-v3:rhosakMainText")}</StackItem>
                <StackItem className="pf-u-color-200">
                  {t("overview-v3:rhosakSecondaryText")}
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
                {t("overview-v3:rhosakCallToActionButton")}
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
                {t("overview-v3:rhosrTitle")}
              </Title>
            </CardTitle>
            <CardBody>
              <Stack hasGutter>
                <StackItem className="pf-u-mb-lg">
                  <LabelGroup>
                    <Label color="blue">
                      {t("overview-v3:applicationService")}
                    </Label>
                  </LabelGroup>
                </StackItem>
                <StackItem>{t("overview-v3:rhosrMainText")}</StackItem>
                <StackItem className="pf-u-color-200">
                  {t("overview-v3:rhosrSecondaryText")}
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
                {t("overview-v3:rhosrCallToActionButton")}
              </Button>
            </CardFooter>
          </Card>

          {/* Connectors card */}
          <Card>
            <CardHeader>
              <CardHeaderMain>
                <img
                  src={LogoRedHatOpenShiftConnectorsBStandardRgb}
                  alt="Red Hat OpenShift Connectors logo"
                  style={{ height: "50px" }}
                />
              </CardHeaderMain>
            </CardHeader>
            <CardTitle>
              <Title headingLevel="h2" size="xl">
                {t("overview-v3:rhocTitle")}
              </Title>
            </CardTitle>
            <CardBody>
              <Stack hasGutter>
                <StackItem className="pf-u-mb-lg">
                  <LabelGroup>
                    <Label color="blue">
                      {t("overview-v3:applicationService")}
                    </Label>
                  </LabelGroup>
                </StackItem>
                <StackItem>{t("overview-v3:rhocMainText")}</StackItem>
                <StackItem className="pf-u-color-200">
                  {t("overview-v3:rhocSecondaryText")}{" "}
                  <Button
                    data-testid="cardRHOC-linkOpenShift"
                    isInline
                    variant={ButtonVariant.link}
                    component="a"
                    target="_blank"
                    href="https://openshift.com"
                  >
                    OpenShift
                    <ExternalLinkAltIcon className="pf-u-ml-xs" />
                  </Button>
                  {t("overview-v3:rhocSecondaryTextContinued")}
                </StackItem>
              </Stack>
            </CardBody>
            <CardFooter>
              <Button
                data-testid="cardRHOC-buttonCTA"
                variant={ButtonVariant.secondary}
                target="_blank"
                component={(props) => <Link {...props} to={toConnectorsHref} />}
              >
                {t("overview-v3:getStarted")}
              </Button>
            </CardFooter>
          </Card>

          {/* Database access card */}
          <Card>
            <CardHeader>
              <CardHeaderMain>
                <img
                  src={LogoRedHatOpenShiftDatabaseAccessAStandardRgb}
                  alt="Red Hat OpenShift Data Science logo"
                  style={{ height: "50px" }}
                />
              </CardHeaderMain>
            </CardHeader>
            <CardTitle>
              <Title headingLevel="h2" size="xl">
                {t("overview-v3:dbaasTitle")}
              </Title>
            </CardTitle>
            <CardBody>
              <Stack hasGutter>
                <StackItem className="pf-u-mb-lg">
                  <LabelGroup>
                    <Label color="green">{t("overview:dataService")}</Label>
                    <Label>{t("overview-v3:servicePreview")}</Label>
                  </LabelGroup>
                </StackItem>
                <StackItem>{t("overview-v3:dbaasMainText")}</StackItem>
                <StackItem className="pf-u-color-200">
                  {t("overview-v3:dbaasSecondaryText")}{" "}
                  <Button
                    data-testid="cardRHODS-linkOpenShift"
                    isInline
                    variant={ButtonVariant.link}
                    component="a"
                    target="_blank"
                    href="https://openshift.com"
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
                href="https://console.redhat.com/application-services/databases"
              >
                {t("overview-v3:learnMore")}{" "}
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
                {t("overview-v3:rhodsTitle")}
              </Title>
            </CardTitle>
            <CardBody>
              <Stack hasGutter>
                <StackItem className="pf-u-mb-lg">
                  <LabelGroup>
                    <Label color="green">{t("overview-v3:dataService")}</Label>
                    <Label>{t("overview-v3:fieldTrial")}</Label>
                  </LabelGroup>
                </StackItem>
                <StackItem>{t("overview-v3:rhodsMainText")}</StackItem>
                <StackItem className="pf-u-color-200">
                  {t("overview-v3:rhodsSecondaryText")}{" "}
                  <Button
                    data-testid="cardRHODS-linkOpenShift"
                    isInline
                    variant={ButtonVariant.link}
                    component="a"
                    target="_blank"
                    href="https://openshift.com"
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
                data-testid="cardRHODS-buttonTryIt"
                ouiaId="button-rhods-tryit"
                variant={ButtonVariant.secondary}
                component="a"
                target="_blank"
              >
                {t("overview-v3:tryIt")}
              </Button>
            </CardFooter>
          </Card>
        </Grid>
      </MarketingPageSection>
    </>
  );
};
