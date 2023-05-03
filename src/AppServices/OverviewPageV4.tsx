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
  Stack,
  StackItem,
  Title,
} from "@patternfly/react-core";
import { ExternalLinkAltIcon } from "@patternfly/react-icons";
import type { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import {
  AppServicesOverviewIconPattern,
  LogoRedHatOpenShiftApiManagementAStandardRgb,
  LogoRedHatOpenShiftDataScienceAStandardRgb,
} from "../images";
import { MarketingPageHero, MarketingPageSection } from "./components";

export const OverviewPageV4: FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <>
      <MarketingPageHero
        title={t("overview-v4:heroTitle")}
        tagLine={t("overview-v4:heroTagline")}
        description={t("overview-v4:heroDescription")}
        heroImage={AppServicesOverviewIconPattern}
        heroImageSize={678}
        variant="dark"
      />
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
                {t("overview-v4:rhoamTitle")}
              </Title>
            </CardTitle>
            <CardBody>
              <Stack hasGutter>
                <StackItem>{t("overview-v4:rhoamMainText")}</StackItem>
                <StackItem className="pf-u-color-200">
                  {t("overview-v4:rhoamSecondaryText")}{" "}
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
                {t("overview-v4:getStarted")}{" "}
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
                {t("overview-v4:rhodsTitle")}
              </Title>
            </CardTitle>
            <CardBody>
              <Stack hasGutter>
                <StackItem>{t("overview-v4:rhodsMainText")}</StackItem>
                <StackItem className="pf-u-color-200">
                  {t("overview-v4:rhodsSecondaryText")}{" "}
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
                {t("overview-v4:tryIt")}
              </Button>
            </CardFooter>
          </Card>
        </Grid>
      </MarketingPageSection>
    </>
  );
};
