import type { SelectProps } from "@patternfly/react-core";
import {
  Flex,
  FlexItem,
  FormSelect,
  FormSelectOption,
  Skeleton,
  Tile,
} from "@patternfly/react-core";
import { AwsIcon, AzureIcon } from "@patternfly/react-icons";
import type { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import type { CloudProvider, CloudProviderInfo } from "../types";

export type CloudProvidersTilesProps = {
  providers: CloudProviderInfo[];
  value: CloudProvider | undefined;
  onChange: (provider: CloudProvider) => void;
  isDisabled: boolean;
  validated?: SelectProps["validated"];
};
export const CloudProvidersTiles: VoidFunctionComponent<
  CloudProvidersTilesProps
> = ({ providers, value, onChange, isDisabled, validated }) => {
  const { t } = useTranslation();
  return (
    <>
      {providers.length === 0 && (
        <Skeleton
          className="pf-m-text-4xl"
          screenreaderText="Loading contents"
        />
      )}
      <div
        role="listbox"
        aria-label={t("create-kafka-instance:select_cloud_provider")}
      >
        <Flex
          justifyContent={{ default: "justifyContentSpaceBetween" }}
          spacer={{ default: "spacerNone" }}
          spaceItems={{ default: "spaceItemsXs" }}
        >
          {providers.map(({ id, displayName }) => (
            <FlexItem grow={{ default: "grow" }} key={id}>
              <Tile
                className={"pf-u-w-100"}
                title={displayName}
                icon={tiles[id]}
                isStacked={true}
                isSelected={value === id}
                isDisabled={isDisabled}
                onClick={() => onChange(id)}
              />
            </FlexItem>
          ))}
        </Flex>
      </div>
      <FormSelect
        className={"pf-u-display-none"}
        value={value}
        id="form-cloud-provider-option"
        name="cloud-provider"
        isDisabled={isDisabled}
        validated={validated}
      >
        {[
          <FormSelectOption
            value=""
            key="placeholder"
            label={t("create-kafka-instance:select_cloud_provider")}
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
  azure: <AzureIcon size="lg" color="black" />,
};
