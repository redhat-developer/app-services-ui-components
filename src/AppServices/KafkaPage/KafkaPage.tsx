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
  Title,
} from "@patternfly/react-core";
import { ExternalLinkAltIcon } from "@patternfly/react-icons/dist/js/icons/external-link-alt-icon";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { MarketingPageHero, MarketingPageSection } from "../components";
import { AppSpeedKeyArt } from "../../images";

export const KafkaPage: FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <>
      <MarketingPageHero
        title={t("kafkaoverview:heroTitle")}
        tagLine={t("kafkaoverview:heroTagline")}
        description={t("kafkaoverview:heroDescription")}
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
                  <Title headingLevel="h3">
                    {t("kafkaoverview:purchaseCardTitle")}
                  </Title>
                </CardTitle>
              </CardHeaderMain>
            </CardHeader>
            <CardBody>{t("kafkaoverview:purchaseCardMainText")}</CardBody>
            <CardFooter>
              <Button
                data-testid="cardPurchase-buttonCTA"
                variant={ButtonVariant.secondary}
                component="a"
                href="https://marketplace.redhat.com/en-us/products/red-hat-openshift-streams-for-apache-kafka"
                target="_blank"
              >
                {t("kafkaoverview:purchaseCardCallToActionButton")}
                <ExternalLinkAltIcon className="pf-u-ml-md" />
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                <Title headingLevel="h3">
                  {t("kafkaoverview:contactSalesCardTitle")}
                </Title>
              </CardTitle>
            </CardHeader>
            <CardBody>{t("kafkaoverview:contactSalesCardMainText")}</CardBody>
            <CardFooter>
              <Button
                data-testid="cardContactSales-buttonCTA"
                variant={ButtonVariant.secondary}
                component="a"
                href="https://www.redhat.com/en/technologies/cloud-computing/openshift/openshift-streams-for-apache-kafka#contact-sales"
                target="_blank"
              >
                {t("kafkaoverview:contactSalesCardCallToActionButton")}
                <ExternalLinkAltIcon className="pf-u-ml-md" />
              </Button>
            </CardFooter>
          </Card>
        </Grid>
      </MarketingPageSection>
    </>
  );
};
