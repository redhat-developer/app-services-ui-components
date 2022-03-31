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
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  AppServicesOverviewIconPattern,
  LogoRedHatOpenShiftDatabaseAccessAStandardRgb,
  LogoRedHatOpenShiftApiManagementAStandardRgb,
  LogoRedHatOpenShiftConnectorsBStandardRgb,
  LogoRedHatOpenShiftDataScienceAStandardRgb,
  LogoRedHatOpenShiftServiceRegistryAStandardRgb,
  LogoRedHatOpenShiftStreamsForApacheKafkaAStandardRgbPng,
} from "../../images";
import {
  MarketingPageBanner,
  MarketingPageHero,
  MarketingPageSection,
} from "../components";

export type OverviewPageProps = {
  toKafkaHref: string;
  toServiceRegistryHref: string;
  toConnectorsHref: string;
};

export const OverviewPage: FunctionComponent<OverviewPageProps> = ({
  toKafkaHref,
  toServiceRegistryHref,
  toConnectorsHref,
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
                <StackItem className="pf-u-mb-lg">
                  <LabelGroup>
                    <Label color="blue">
                      {t("overview:applicationService")}
                    </Label>
                  </LabelGroup>
                </StackItem>
                <StackItem>{t("overview:rhoamMainText")}</StackItem>
                <StackItem className="pf-u-color-200">
                  {t("overview:rhoamSecondaryText")}{" "}
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
                {t("overview:getStarted")}{" "}
                <ExternalLinkAltIcon className="pf-u-ml-sm" />
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
                {t("overview:rhocTitle")}
              </Title>
            </CardTitle>
            <CardBody>
              <Stack hasGutter>
                <StackItem className="pf-u-mb-lg">
                  <LabelGroup>
                    <Label color="blue">
                      {t("overview:applicationService")}
                    </Label>
                    <Label>{t("overview:servicePreview")}</Label>
                  </LabelGroup>
                </StackItem>
                <StackItem>{t("overview:rhocMainText")}</StackItem>
                <StackItem className="pf-u-color-200">
                  {t("overview:rhocSecondaryText")}{" "}
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
                  {t("overview:rhocSecondaryTextContinued")}
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
                {t("overview:getStarted")}
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
                  <LabelGroup>
                    <Label color="green">{t("overview:dataService")}</Label>
                    <Label>{t("overview:fieldTrial")}</Label>
                  </LabelGroup>
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
                {t("overview:tryIt")}
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
                  <LabelGroup>
                    <Label color="blue">
                      {t("overview:applicationService")}
                    </Label>
                  </LabelGroup>
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
                {t("overview:rhosakTitle")}
              </Title>
            </CardTitle>
            <CardBody>
              <Stack hasGutter>
                <StackItem className="pf-u-mb-lg">
                  <LabelGroup>
                    <Label color="blue">
                      {t("overview:applicationService")}
                    </Label>
                  </LabelGroup>
                </StackItem>
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
                  src={LogoRedHatOpenShiftDatabaseAccessAStandardRgb}
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
                  <LabelGroup>
                    <Label color="green">{t("overview:dataService")}</Label>
                    <Label>{t("overview:servicePreview")}</Label>
                  </LabelGroup>
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
