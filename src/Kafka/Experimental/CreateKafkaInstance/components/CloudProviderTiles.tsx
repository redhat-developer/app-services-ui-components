import {
  FormSelect,
  FormSelectOption,
  SelectProps,
  Skeleton,
  Tile,
} from "@patternfly/react-core";
import { AzureIcon } from "@patternfly/react-icons";
import AwsIcon from "@patternfly/react-icons/dist/esm/icons/aws-icon";
import { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { Provider, ProviderInfo } from "../types";
import "./CloudProviderTiles.css";

export type CloudProvidersTilesProps = {
  providers: ProviderInfo[];
  value: Provider | undefined;
  onChange: (provider: Provider) => void;
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
