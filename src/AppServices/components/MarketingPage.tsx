import {
  Bullseye,
  Card,
  PageSection,
  PageSectionVariants,
  Stack,
  StackItem,
  Text,
  TextVariants,
  Title,
} from "@patternfly/react-core";
import {
  CSSProperties,
  FunctionComponent,
  ReactNode,
  VoidFunctionComponent,
} from "react";
import { css } from "@patternfly/react-styles";
import "./MarketingPage.css";

export type MarketingPageHeroProps = {
  title: string;
  tagLine: string;
  description: string;
  description2?: string;
  heroImage: string;
  heroImageSize: number;
  heroImageCanRepeat?: boolean;
  heroImagePositionY?: number;
  cta?: ReactNode;
  variant?: "light" | "dark";
};

export const MarketingPageHero: VoidFunctionComponent<
  MarketingPageHeroProps
> = ({
  title,
  tagLine,
  description,
  description2,
  heroImage,
  heroImageSize,
  heroImageCanRepeat = true,
  heroImagePositionY = 0,
  cta,
  variant = "light",
}) => {
  const style = {
    "--appsrv-marketing--banner--before--BackgroundImage": `url(${heroImage})`,
    "--appsrv-marketing--banner--before--BackgroundSize": `${heroImageSize}px`,
    "--appsrv-marketing--banner--before--BackgroundRepeat": heroImageCanRepeat
      ? "repeat"
      : "no-repeat",
    "--appsrv-marketing--banner--before--BackgroundPositionY": `${heroImagePositionY}px`,
  } as CSSProperties;
  return (
    <PageSection
      className={css("appsrv-marketing--banner", {
        "pf-u-background-color-dark-100": variant === "dark",
        "pf-u-background-color-100": variant === "light",
      })}
      variant={
        variant === "dark"
          ? PageSectionVariants.dark
          : PageSectionVariants.light
      }
      style={style}
    >
      <Stack hasGutter>
        <Title headingLevel="h1" size="2xl">
          {title}
        </Title>
        <Text
          className={`appsrv-marketing--banner__tagline ${
            variant === "dark" ? "" : "pf-u-color-200"
          }`}
        >
          {tagLine}
        </Text>
        <Text component={TextVariants.p}>{description}</Text>
        {description2 && (
          <Text component={TextVariants.p} className="pf-u-mt-md">
            {description2}
          </Text>
        )}
        {cta && <StackItem>{cta}</StackItem>}
      </Stack>
    </PageSection>
  );
};

export const MarketingPageBanner: FunctionComponent = ({ children }) => {
  return (
    <PageSection
      variant={PageSectionVariants.light}
      className="appsrv-marketing--page-section--marketing pf-u-background-color-100"
    >
      <Bullseye>
        <Text
          component={TextVariants.p}
          className="appsrv-marketing--banner--text-only"
        >
          {children}
        </Text>
      </Bullseye>
    </PageSection>
  );
};

export type MarketingPageSectionProps = {
  className?: string;
};

export const MarketingPageSection: FunctionComponent<
  MarketingPageSectionProps & {
    variant?: "dark" | "light" | "default";
  }
> = ({
  className = "appsrv-marketing--page-section--marketing",
  variant = "default",
  children,
}) => (
  <PageSection
    isWidthLimited
    className={css(className, {
      "pf-u-background-color-dark-100": variant === "dark",
      "pf-u-background-color-100": variant === "light",
    })}
    variant={
      variant === "dark"
        ? PageSectionVariants.dark
        : variant === "light"
        ? PageSectionVariants.light
        : PageSectionVariants.default
    }
  >
    {children}
  </PageSection>
);

export const MarketingPageVideoCard: VoidFunctionComponent<{
  src: string;
  title: string;
}> = ({ src, title }) => (
  <Card className="appsrv-marketing--video">
    <div className="appsrv-marketing--video__wrapper">
      <iframe
        src={src}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  </Card>
);
