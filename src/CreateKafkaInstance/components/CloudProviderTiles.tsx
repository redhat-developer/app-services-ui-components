import { Skeleton, Tile } from "@patternfly/react-core";
import { AzureIcon } from "@patternfly/react-icons";
import AwsIcon from "@patternfly/react-icons/dist/esm/icons/aws-icon";
import React, { Fragment, VoidFunctionComponent } from "react";
import { Provider, ProviderInfo } from "../machines";

export type CloudProvidersTileProps = {
  providers: ProviderInfo[];
  value: Provider | undefined;
  onChange: (provider: Provider) => void;
  isDisabled?: boolean;
};
export const CloudProvidersTiles: VoidFunctionComponent<CloudProvidersTileProps> =
  ({ providers, value, onChange, isDisabled }) => {
    if (providers.length === 0) {
      return (
        <Skeleton
          className="pf-m-text-4xl"
          screenreaderText="Loading contents"
        />
      );
    }

    return (
      <>
        {providers.map(({ id, displayName }) => (
          <Fragment key={id}>
            <Tile
              title={displayName}
              icon={tiles[id]}
              isSelected={value === id}
              isDisabled={isDisabled}
              onClick={() => onChange(id)}
            />{" "}
          </Fragment>
        ))}
      </>
    );
  };

const tiles: { [id: Provider]: JSX.Element } = {
  aws: (
    <AwsIcon
      size="lg"
      color="black"
      className="mk--create-instance__tile--icon"
    />
  ),
  azure: (
    <AzureIcon
      size="lg"
      color="black"
      className="mk--create-instance__tile--icon"
    />
  ),
};
