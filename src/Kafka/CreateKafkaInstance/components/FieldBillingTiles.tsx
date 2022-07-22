import { FormGroup } from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import type { BillingHelpProps } from "./BillingHelp";
import { BillingHelp } from "./BillingHelp";
import type { BillingTilesProps } from "./BillingTiles";
import { BillingTiles } from "./BillingTiles";

export type FieldBillingTilesProps = {
  isValid: boolean;
  billingType: BillingHelpProps["type"];
  subscriptionOptionsHref: BillingHelpProps["subscriptionOptionsHref"];
} & Omit<BillingTilesProps, "validated">;
export const FieldBillingTiles: VoidFunctionComponent<
  FieldBillingTilesProps
> = ({
  value,
  hasPrepaid,
  subscriptions,
  isPrepaidOverQuota,
  isMarketplaceOverQuota,
  onPrepaid,
  onSubscription,
  isValid,
  billingType,
  subscriptionOptionsHref,
}) => {
  const { t } = useTranslation("create-kafka-instance");

  const validated = !isValid ? "error" : "default";

  return (
    <FormGroup
      label={
        <>
          {t("billing.field_label")}{" "}
          <BillingHelp
            type={billingType}
            subscriptionOptionsHref={subscriptionOptionsHref}
          />
        </>
      }
      fieldId="form-billing-option"
      validated={validated}
      helperTextInvalid={
        isPrepaidOverQuota || isMarketplaceOverQuota
          ? " "
          : t("common:required")
      }
      isRequired
    >
      <BillingTiles
        value={value}
        hasPrepaid={hasPrepaid}
        subscriptions={subscriptions}
        isPrepaidOverQuota={isPrepaidOverQuota}
        isMarketplaceOverQuota={isMarketplaceOverQuota}
        onPrepaid={onPrepaid}
        onSubscription={onSubscription}
        validated={validated}
      />
    </FormGroup>
  );
};
