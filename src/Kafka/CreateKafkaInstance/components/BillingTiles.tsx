import type { SelectProps } from "@patternfly/react-core";
import { Gallery, GalleryItem } from "@patternfly/react-core";
import { HelperText, HelperTextItem } from "@patternfly/react-core";
import {
  Flex,
  FlexItem,
  FormSelect,
  FormSelectOption,
  Tile,
} from "@patternfly/react-core";
import { AwsIcon, MicrosoftIcon, RedhatIcon } from "@patternfly/react-icons";
import type { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import type { MarketPlace } from "../types";

export type BillingTilesProps = {
  value: "prepaid" | string | undefined;
  hasPrepaid: boolean;
  subscriptions: {
    marketplace: MarketPlace;
    subscription: string;
    isDisabled: boolean;
  }[];
  isPrepaidOverQuota: boolean;
  prepaidQuota: number;
  isMarketplaceOverQuota: boolean;
  marketplaceQuota: number;
  onPrepaid: () => void;
  onSubscription: (marketplace: MarketPlace, subscription: string) => void;
  validated?: SelectProps["validated"];
};
export const BillingTiles: VoidFunctionComponent<BillingTilesProps> = ({
  value,
  hasPrepaid,
  subscriptions,
  isPrepaidOverQuota,
  prepaidQuota,
  isMarketplaceOverQuota,
  marketplaceQuota,
  onPrepaid,
  onSubscription,
  validated,
}) => {
  const { t } = useTranslation("create-kafka-instance");
  const marketplaces: { [key in MarketPlace]: string } = {
    aws: t("billing.marketplace_aws"),
    azure: t("billing.marketplace_azure"),
    rhm: t("billing.marketplace_rh"),
  };
  return (
    <>
      <Flex
        role="listbox"
        aria-label={t("select_billing")}
        direction={{ default: "column", md: "row" }}
      >
        {hasPrepaid && (
          <Flex
            flex={{ default: "flex_1" }}
            direction={{ default: "column" }}
            spaceItems={{ default: "spaceItemsSm" }}
          >
            <span className="pf-c-form__label">
              <span className="pf-c-form__label-text">
                {t("billing.prepaid")}
              </span>
            </span>
            <FlexItem flex={{ default: "flex_1" }}>
              <Tile
                className={"pf-u-w-100"}
                title={t("billing.prepaid_option")}
                icon={tiles["rhm"]}
                isDisabled={isPrepaidOverQuota}
                isStacked={true}
                isSelected={value === "prepaid"}
                onClick={onPrepaid}
              >
                &nbsp;
              </Tile>
            </FlexItem>
            {isPrepaidOverQuota && prepaidQuota > 0 && (
              <HelperText className={"pf-c-form__helper-text"}>
                <HelperTextItem variant={"error"}>
                  {t("billing.prepaid_out_of_quota")}
                </HelperTextItem>
              </HelperText>
            )}
            {isPrepaidOverQuota && prepaidQuota === 0 && (
              <HelperText className={"pf-c-form__helper-text"}>
                <HelperTextItem variant={"error"}>
                  {t("billing.prepaid_out_of_quota")}
                </HelperTextItem>
              </HelperText>
            )}
          </Flex>
        )}
        {subscriptions.length > 0 && (
          <Flex
            flex={{ default: "flex_1" }}
            direction={{ default: "column" }}
            spaceItems={{ default: "spaceItemsSm" }}
          >
            {hasPrepaid && (
              <span className="pf-c-form__label">
                <span className="pf-c-form__label-text">
                  {t("billing.marketplace")}
                </span>
              </span>
            )}
            <Gallery hasGutter={true}>
              {subscriptions.map(
                ({ marketplace, subscription, isDisabled }) => (
                  <GalleryItem key={`tile-${subscription}`}>
                    <Tile
                      className={"pf-u-w-100"}
                      title={marketplaces[marketplace]}
                      icon={tiles[marketplace]}
                      isStacked={true}
                      isSelected={value === subscription}
                      isDisabled={isDisabled || isMarketplaceOverQuota}
                      onClick={() => onSubscription(marketplace, subscription)}
                    >
                      {subscription}
                    </Tile>
                  </GalleryItem>
                )
              )}
            </Gallery>
            {isMarketplaceOverQuota && marketplaceQuota > 0 && (
              <HelperText className={"pf-c-form__helper-text"}>
                <HelperTextItem variant={"error"}>
                  {t("billing.marketplace_out_of_quota")}
                </HelperTextItem>
              </HelperText>
            )}
            {isMarketplaceOverQuota && marketplaceQuota === 0 && (
              <HelperText className={"pf-c-form__helper-text"}>
                <HelperTextItem variant={"error"}>
                  {t("billing.marketplace_out_of_quota")}
                </HelperTextItem>
              </HelperText>
            )}
          </Flex>
        )}
      </Flex>
      <FormSelect
        className={"pf-u-display-none"}
        value={value}
        id="form-billing-option"
        name="billing"
        validated={validated}
        onChange={(value) => {
          if (value === "prepaid") {
            onPrepaid();
          } else {
            const s = subscriptions.find((s) => s.marketplace === value);
            if (s) {
              onSubscription(s.marketplace, s.subscription);
            }
          }
        }}
      >
        {[
          <FormSelectOption
            value=""
            key="placeholder"
            label={t("select_billing")}
          />,
          hasPrepaid ? (
            <FormSelectOption
              key={"prepaid"}
              value={"prepaid"}
              label={`prepaid`}
            />
          ) : null,
          subscriptions.map(({ marketplace, subscription, isDisabled }) => {
            return (
              <FormSelectOption
                key={`select-option-${subscription}`}
                value={subscription}
                label={`${marketplace} - ${subscription}`}
                isDisabled={isDisabled}
              />
            );
          }),
        ]}
      </FormSelect>
    </>
  );
};

const tiles: { [id in MarketPlace]: JSX.Element } = {
  aws: <AwsIcon size="md" color="black" />,
  azure: <MicrosoftIcon size="md" color="black" />,
  rhm: <RedhatIcon size="md" color="black" />,
};
