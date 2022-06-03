import type {
  ButtonProps,
  EmptyStateBodyProps,
  EmptyStateIconProps,
  EmptyStateProps as PFEmptyStateProps,
  TitleProps,
} from "@patternfly/react-core";
import {
  Button,
  ButtonVariant,
  EmptyState as PFEmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant as PFEmptyStateVariant,
  Title,
  TitleSizes,
} from "@patternfly/react-core";
import {
  ExclamationCircleIcon,
  LockIcon,
  PlusCircleIcon,
  SearchIcon,
  SpaceShuttleIcon,
} from "@patternfly/react-icons";
import classNames from "classnames";
import type {
  ComponentType,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  VoidFunctionComponent,
} from "react";
import { NotFoundIcon } from "../../images";
import "./EmptyState.css";

export enum EmptyStateVariant {
  GettingStarted = "GettingStarted",
  NoAccess = "NoAccess",
  NoResult = "NoResult",
  NoItems = "NoItems",
  UnexpectedError = "UnexpectedError",
  PageNotFound = "PageNotFound",
}

export type EmptyStateProps = {
  titleProps?: Omit<TitleProps, "children" | "headingLevel"> & {
    headingLevel?: TitleProps["headingLevel"];
  };
  emptyStateProps?: Omit<PFEmptyStateProps, "children" | "variant"> & {
    variant?: EmptyStateVariant | PFEmptyStateVariant;
  };
  emptyStateIconProps?: EmptyStateIconProps;
  emptyStateBodyProps?: Omit<EmptyStateBodyProps, "children"> & {
    body?: string | ReactNode;
  };
  buttonProps?: Omit<ButtonProps, "children"> & {
    title?: string;
    onClick?: (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => void;
    "data-testid"?: string;
  };
  children?: ReactNode;
};

export const EmptyState: VoidFunctionComponent<EmptyStateProps> = ({
  titleProps,
  buttonProps,
  emptyStateIconProps,
  emptyStateProps,
  emptyStateBodyProps,
  children,
}) => {
  const {
    variant: buttonVariant = ButtonVariant.primary,
    onClick,
    ...restButtonProps
  } = buttonProps || {};
  const { title, ...restTitleProps } = titleProps || {};
  const { body, ...restEmptyStateBodyProps } = emptyStateBodyProps || {};
  const {
    variant: masEmptyStateVariant = EmptyStateVariant.GettingStarted,
    className,
    ...restEmptyStateProps
  } = emptyStateProps || {};

  const NotFoundImg = () => (
    <img src={NotFoundIcon} alt="Not found page" width="128px" />
  );

  const getVariantConfig = () => {
    let variantConfig: {
      variant: PFEmptyStateVariant;
      icon?:
        | ComponentType<unknown>
        | typeof SpaceShuttleIcon
        | typeof LockIcon
        | typeof PlusCircleIcon
        | typeof SearchIcon
        | typeof ExclamationCircleIcon
        | typeof NotFoundImg;
      titleSize: TitleProps["size"];
      headingLevel: TitleProps["headingLevel"];
    };
    switch (masEmptyStateVariant) {
      case EmptyStateVariant.GettingStarted:
        variantConfig = {
          variant: PFEmptyStateVariant.xl,
          icon: SpaceShuttleIcon,
          titleSize: TitleSizes["4xl"],
          headingLevel: "h1",
        };
        break;
      case EmptyStateVariant.NoAccess:
        variantConfig = {
          variant: PFEmptyStateVariant.large,
          icon: LockIcon,
          titleSize: TitleSizes.xl,
          headingLevel: "h2",
        };
        break;
      case EmptyStateVariant.NoItems:
        variantConfig = {
          variant: PFEmptyStateVariant.large,
          icon: PlusCircleIcon,
          titleSize: TitleSizes.xl,
          headingLevel: "h2",
        };
        break;
      case EmptyStateVariant.NoResult:
        variantConfig = {
          variant: PFEmptyStateVariant.large,
          icon: SearchIcon,
          titleSize: TitleSizes.lg,
          headingLevel: "h2",
        };
        break;
      case EmptyStateVariant.UnexpectedError:
        variantConfig = {
          variant: PFEmptyStateVariant.full,
          icon: ExclamationCircleIcon,
          titleSize: TitleSizes.lg,
          headingLevel: "h1",
        };
        break;
      case EmptyStateVariant.PageNotFound:
        variantConfig = {
          variant: PFEmptyStateVariant.full,
          icon: NotFoundImg,
          titleSize: TitleSizes.lg,
          headingLevel: "h1",
        };
        break;
      default:
        variantConfig = {
          variant: masEmptyStateVariant || PFEmptyStateVariant.full,
          icon: emptyStateIconProps?.icon,
          titleSize: titleProps?.size || TitleSizes.lg,
          headingLevel: titleProps?.headingLevel || "h2",
        };
        break;
    }
    return variantConfig;
  };

  const { variant, icon, titleSize, headingLevel } = getVariantConfig();

  return (
    <PFEmptyState
      variant={variant}
      className={classNames("pf-u-pt-2xl pf-u-pt-3xl-on-md", className)}
      {...restEmptyStateProps}
    >
      <EmptyStateIcon icon={icon} {...emptyStateIconProps} />
      {title && (
        <Title headingLevel={headingLevel} size={titleSize} {...restTitleProps}>
          {title}
        </Title>
      )}
      {body && (
        <EmptyStateBody {...restEmptyStateBodyProps}>{body}</EmptyStateBody>
      )}
      {buttonProps?.title && (
        <Button variant={buttonVariant} onClick={onClick} {...restButtonProps}>
          {buttonProps?.title}
        </Button>
      )}
      {children}
    </PFEmptyState>
  );
};
