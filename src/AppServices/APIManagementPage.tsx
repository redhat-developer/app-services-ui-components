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
  GridItem,
  List,
  ListItem,
  Stack,
  StackItem,
  Text,
  TextContent,
  Title,
  TitleSizes,
} from "@patternfly/react-core";
import { ExternalLinkAltIcon } from "@patternfly/react-icons/dist/js/icons/external-link-alt-icon";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { ApiManagementMechApiFullColorPink } from "../images";
import {
  MarketingPageHero,
  MarketingPageSection,
  MarketingPageVideoCard,
} from "./components";

export const APIManagementPage: FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <>
      <MarketingPageHero
        title={t("apimgmtoverview:heroTitle")}
        tagLine={t("apimgmtoverview:heroTagline")}
        description={t("apimgmtoverview:heroDescription")}
        heroImage={ApiManagementMechApiFullColorPink}
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
                    {t("apimgmtoverview:alreadyHaveCardTitle")}
                  </Title>
                </CardTitle>
              </CardHeaderMain>
            </CardHeader>
            <CardBody>{t("apimgmtoverview:alreadyHaveCardMainText")}</CardBody>
            <CardFooter>
              <Stack hasGutter>
                <StackItem>
                  <Button
                    data-testid="cardHaveRHOAM-buttonGoOCM"
                    variant={ButtonVariant.secondary}
                    component="a"
                    href="https://cloud.redhat.com/openshift/"
                  >
                    {t("apimgmtoverview:alreadyHaveCardCallToActionButton")}
                  </Button>
                </StackItem>
                <StackItem>
                  <Button
                    data-testid="cardHaveRHOAM-linkViewDocs"
                    variant={ButtonVariant.link}
                    component="a"
                    href="https://access.redhat.com/products/red-hat-openshift-api-management"
                    target="_blank"
                  >
                    {t("apimgmtoverview:viewDocumentation")}{" "}
                    <ExternalLinkAltIcon className="pf-u-ml-sm" />
                  </Button>
                </StackItem>
              </Stack>{" "}
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                <Title headingLevel="h3">
                  {t("apimgmtoverview:wantToTryCardTitle")}
                </Title>
              </CardTitle>
            </CardHeader>
            <CardBody>{t("apimgmtoverview:wantToTryCardMainText")}</CardBody>
            <CardFooter>
              <Stack hasGutter>
                <StackItem>
                  <Button
                    data-testid="cardTryRHOAM-buttonGetStarted"
                    variant={ButtonVariant.secondary}
                    component="a"
                    href="https://developers.redhat.com/products/rhoam/getting-started"
                    target="_blank"
                  >
                    {t("apimgmtoverview:wantToTryCardCallToActionButton")}
                    <ExternalLinkAltIcon className="pf-u-ml-md" />
                  </Button>
                </StackItem>
                <StackItem>
                  <Button
                    data-testid="cardTryRHOAM-linkViewDocs"
                    variant={ButtonVariant.link}
                    component="a"
                    href="https://access.redhat.com/products/red-hat-openshift-api-management"
                    target="_blank"
                  >
                    {t("apimgmtoverview:viewDocumentation")}{" "}
                    <ExternalLinkAltIcon className="pf-u-ml-sm" />
                  </Button>
                </StackItem>
              </Stack>
            </CardFooter>
          </Card>
        </Grid>
      </MarketingPageSection>

      <MarketingPageSection variant="light">
        <Title size={TitleSizes.xl} headingLevel="h3" className="pf-u-mb-lg">
          {t("apimgmtoverview:videoSectionTitle")}
        </Title>
        <Grid hasGutter>
          <GridItem md={7}>
            <MarketingPageVideoCard
              src={"https://www.youtube.com/embed/NzNgc0f75pc"}
              title={t("apimgmtoverview:videoSectionTitle")}
            />
          </GridItem>
          <GridItem md={5}>
            <TextContent>
              <Text className="pf-u-color-200 pf-u-ml-md">
                {t("apimgmtoverview:videoSectionInThisVideo")}
              </Text>
              <List className="app-services-ui--icon-list">
                <ListItem>
                  {t("apimgmtoverview:videoSectionBulletBuild")}
                </ListItem>
                <ListItem>
                  {t("apimgmtoverview:videoSectionBulletImport")}
                </ListItem>
                <ListItem>
                  {t("apimgmtoverview:videoSectionBulletAdd")}
                </ListItem>
              </List>
            </TextContent>
          </GridItem>
        </Grid>
      </MarketingPageSection>
    </>
  );
};

export default APIManagementPage;
