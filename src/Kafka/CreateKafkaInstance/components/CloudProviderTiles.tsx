import type { SelectProps } from "@patternfly/react-core";
import {
  FormSelect,
  FormSelectOption,
  Skeleton,
  Tile,
} from "@patternfly/react-core";
import { AwsIcon, AzureIcon } from "@patternfly/react-icons";
import type { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import type { Provider, ProviderInfo } from "../machines";
import "./CloudProviderTiles.css";

export type CloudProvidersTileProps = {
  providers: ProviderInfo[];
  value: Provider | undefined;
  onChange: (provider: Provider) => void;
  isDisabled?: boolean;
  validated?: SelectProps["validated"];
};
export const CloudProvidersTiles: VoidFunctionComponent<
  CloudProvidersTileProps
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
      {providers.map(({ id, displayName }) => (
        <Tile
          key={id}
          className={"mas--CreateKafkaInstance__CloudProviderTile"}
          title={displayName}
          icon={tiles[id]}
          isSelected={value === id}
          isDisabled={isDisabled}
          onClick={() => onChange(id)}
        />
      ))}
      <FormSelect
        className={"mas--CreateKafkaInstance__CloudProviderTile--select"}
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

const tiles: { [id: Provider]: JSX.Element } = {
  aws: (
    <AwsIcon
      size="lg"
      color="black"
      className="mas--CreateKafkaInstance__CloudProviderTile--Icon"
    />
  ),
  azure: (
    <AzureIcon
      size="lg"
      color="black"
      className="mas--CreateKafkaInstance__CloudProviderTile--Icon"
    />
  ),
};
