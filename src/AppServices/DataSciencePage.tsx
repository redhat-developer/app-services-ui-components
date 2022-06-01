import {
  Button,
  ButtonVariant,
  Flex,
  Grid,
  GridItem,
  Stack,
  StackItem,
  Text,
  TextContent,
  Title,
  TitleSizes,
} from "@patternfly/react-core";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { RhodsMlTechnology } from "../images";
import {
  MarketingPageHero,
  MarketingPageSection,
  MarketingPageVideoCard,
} from "./components";
import { ExternalLinkAltIcon } from "@patternfly/react-icons";

export const DataSciencePage: FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <>
      <MarketingPageHero
        title={t("datascienceoverview:heroTitle")}
        tagLine={t("datascienceoverview:heroTagline")}
        description={t("datascienceoverview:heroDescription")}
        cta={
          <Flex>
            <Button
              data-testid="hero-buttonTryIt"
              ouiaId="button-rhods-tryit"
              variant={ButtonVariant.secondary}
              component="a"
              target="_blank"
            >
              {t("datascienceoverview:heroTryItButton")}
            </Button>
            <Button
              data-testid="hero-buttonLearnMore"
              variant={ButtonVariant.link}
              component="a"
              href="https://www.redhat.com/en/technologies/cloud-computing/openshift/openshift-data-science"
              target="_blank"
            >
              {t("datascienceoverview:heroCallToActionButton")}{" "}
              <ExternalLinkAltIcon className="pf-u-ml-sm" />
            </Button>
          </Flex>
        }
        heroImage={RhodsMlTechnology}
        heroImageSize={478}
        heroImageCanRepeat={false}
        heroImagePositionY={-99}
      />
      <MarketingPageSection>
        <Grid hasGutter>
          <GridItem md={5}>
            <Stack hasGutter>
              <StackItem>
                <TextContent>
                  <Title
                    size={TitleSizes.xl}
                    headingLevel="h3"
                    className="pf-u-mb-lg"
                  >
                    {t("datascienceoverview:videoSectionTitle")}
                  </Title>
                  <Text className="pf-u-mr-md">
                    {t("datascienceoverview:videoSectionInThisVideo")}
                  </Text>
                </TextContent>
              </StackItem>
              <StackItem>
                <Button
                  data-testid="CTA-videoRHODSDemo"
                  variant={ButtonVariant.secondary}
                  component="a"
                  href="https://www.openshift.com/DataScienceVideoDemo"
                  target="_blank"
                >
                  {t("datascienceoverview:heroViewDemo")}{" "}
                  <ExternalLinkAltIcon className="pf-u-ml-sm" />
                </Button>
              </StackItem>
            </Stack>
          </GridItem>
          <GridItem md={7}>
            <MarketingPageVideoCard
              src={"https://www.youtube.com/embed/joK89xYeuUY"}
              title={t("datascienceoverview:videoSectionTitle")}
            />
          </GridItem>
        </Grid>
      </MarketingPageSection>
    </>
  );
};
