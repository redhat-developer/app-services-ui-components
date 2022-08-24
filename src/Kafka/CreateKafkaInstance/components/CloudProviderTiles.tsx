import type { SelectProps } from "@patternfly/react-core";
import {
  Flex,
  FlexItem,
  FormSelect,
  FormSelectOption,
  Skeleton,
  Tile,
} from "@patternfly/react-core";
import { AwsIcon, MicrosoftIcon } from "@patternfly/react-icons";
import type { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import type { CloudProvider } from "../../types";
import type { CloudProviderInfo } from "../types";

export type CloudProvidersTilesProps = {
  providers: (CloudProviderInfo & { isDisabled?: boolean })[];
  value: CloudProvider | undefined;
  onChange: (provider: CloudProvider) => void;
  isDisabled: boolean;
  validated?: SelectProps["validated"];
};
export const CloudProvidersTiles: VoidFunctionComponent<
  CloudProvidersTilesProps
> = ({ providers, value, onChange, isDisabled, validated }) => {
  const { t } = useTranslation("create-kafka-instance");
  return (
    <>
      {providers.length === 0 && (
        <Skeleton
          className="pf-m-text-4xl"
          screenreaderText="Loading contents"
        />
      )}
      <div role="listbox" aria-label={t("select_cloud_provider")}>
        <Flex
          justifyContent={{ default: "justifyContentSpaceBetween" }}
          spacer={{ default: "spacerNone" }}
          spaceItems={{ default: "spaceItemsXs" }}
        >
          {providers.map(
            ({ id, displayName, isDisabled: providerDisabled }) => (
              <FlexItem grow={{ default: "grow" }} key={id}>
                <Tile
                  className={"pf-u-w-100"}
                  title={displayName}
                  icon={tiles[id]}
                  isStacked={true}
                  isSelected={value === id}
                  isDisabled={providerDisabled || isDisabled}
                  onClick={() => onChange(id)}
                >
                  {(providerDisabled || isDisabled) &&
                    t("billing.provider_incompatible_with_current_billing")}
                  &nbsp;
                </Tile>
              </FlexItem>
            )
          )}
        </Flex>
      </div>
      <FormSelect
        className={"pf-u-display-none"}
        value={value}
        id="form-cloud-provider-option"
        name="cloud-provider"
        isDisabled={isDisabled}
        validated={validated}
        onChange={(value) => onChange(value as CloudProvider)}
      >
        {[
          <FormSelectOption
            value=""
            key="placeholder"
            label={t("select_cloud_provider")}
          />,
          providers.map(({ id, displayName }, index) => {
            return (
              <FormSelectOption key={index} value={id} label={displayName} />
            );
          }),
        ]}
      </FormSelect>
    </>
  );
};

const tiles: { [id in CloudProvider]: JSX.Element } = {
  aws: <AwsIcon size="lg" color="black" />,
  azure: <MicrosoftIcon size="lg" color="black" />,
};
