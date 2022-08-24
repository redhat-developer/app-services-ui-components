import { Flex, FlexItem, Form } from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import type { FieldSizeProps } from "./components";
import {
  FieldAZ,
  FieldCloudProvider,
  FieldCloudRegion,
  FieldInstanceName,
  FieldSize,
  InstanceInfoSkeleton,
} from "./components";

export type LoadingFormProps = {
  onLearnHowToAddStreamingUnits: () => void;
  onLearnMoreAboutSizes: () => void;
  onClickQuickStart: () => void;
};

export const LoadingForm: VoidFunctionComponent<LoadingFormProps> = ({
  onLearnHowToAddStreamingUnits,
  onLearnMoreAboutSizes,
  onClickQuickStart,
}) => {
  return (
    <>
      <Flex
        direction={{ default: "column", lg: "row" }}
        alignItems={{ lg: "alignItemsFlexStart" }}
      >
        <FlexItem flex={{ default: "flex_2" }}>
          <Form onSubmit={() => false}>
            <DisabledFieldInstanceName />
            <DisabledFieldCloudProvider />
            <DisabledFieldCloudRegion />
            <DisabledFieldAZ />
            <DisabledFieldSize
              onLearnHowToAddStreamingUnits={onLearnHowToAddStreamingUnits}
              onLearnMoreAboutSizes={onLearnMoreAboutSizes}
            />
          </Form>
        </FlexItem>
        <FlexItem
          flex={{ default: "flex_1" }}
          className="mas--CreateKafkaInstance__sidebar"
        >
          <InstanceInfoSkeleton
            isTrial={false}
            onClickQuickStart={onClickQuickStart}
          />
        </FlexItem>
      </Flex>
    </>
  );
};

export const DisabledFieldInstanceName: VoidFunctionComponent = () => {
  return (
    <FieldInstanceName
      value={""}
      validity={"valid"}
      isDisabled={true}
      onChange={() => false}
    />
  );
};

export const DisabledFieldCloudProvider: VoidFunctionComponent = () => {
  return (
    <FieldCloudProvider
      isValid={true}
      providers={[]}
      value={undefined}
      isDisabled={true}
      onChange={() => false}
    />
  );
};

export const DisabledFieldCloudRegion: VoidFunctionComponent = () => {
  return (
    <FieldCloudRegion
      validity={"valid"}
      regions={undefined}
      value={undefined}
      isDisabled={true}
      isSizeUnavailable={false}
      onChange={() => false}
    />
  );
};

export const DisabledFieldAZ: VoidFunctionComponent = () => {
  return (
    <FieldAZ
      validity={"valid"}
      options={"multi"}
      value={"multi"}
      isDisabled={true}
      onChange={() => false}
    />
  );
};

export const DisabledFieldSize: VoidFunctionComponent<
  Pick<
    FieldSizeProps,
    "onLearnHowToAddStreamingUnits" | "onLearnMoreAboutSizes"
  >
> = ({ onLearnHowToAddStreamingUnits, onLearnMoreAboutSizes }) => {
  return (
    <FieldSize
      value={1}
      sizes={undefined}
      //TODO remainingQuota={capabilities.remainingQuota || 0}
      remainingQuota={0}
      isDisabled={true}
      isLoading={true}
      isError={false}
      isLoadingError={false}
      validity={"disabled"}
      onChange={() => false}
      onLearnHowToAddStreamingUnits={onLearnHowToAddStreamingUnits}
      onLearnMoreAboutSizes={onLearnMoreAboutSizes}
    />
  );
};
