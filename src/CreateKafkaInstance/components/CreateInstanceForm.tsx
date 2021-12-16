import React from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Form,
  FormAlert,
  FormGroup,
  TextInput,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
} from "@patternfly/react-core";
import { CloudRegionSelect } from "./CloudRegionsSelect";
import { CloudProvidersTiles } from "./CloudProviderTiles";
import {
  isKafkaRequestInvalid,
  CloudProvidersTileProps,
  NewKafkaRequestPayload,
  CloudProvider,
  CloudRegion,
} from "./utils";

export type CreateInstanceFormProps = Pick<
  CloudProvidersTileProps,
  "cloudProviders"
> & {
  kafkaRequest: NewKafkaRequestPayload;
  id: string;
  submit: (event: any) => void;
  formSubmitted: boolean;
  setName: (name: string) => void;
  selectCloudProvider: (cloudProvider: CloudProvider) => void;
  selectCloudRegion: (region: string) => void;
  selectAz: (selected: boolean) => void;
  cloudRegions?: CloudRegion[];
};

export const CreateInstanceForm: React.FunctionComponent<CreateInstanceFormProps> = ({
  kafkaRequest,
  cloudProviders,
  id,
  submit,
  formSubmitted,
  setName,
  selectCloudProvider,
  selectCloudRegion,
  selectAz,
  cloudRegions,
}) => {
  const { t } = useTranslation();

  const FormValidAlert: React.FunctionComponent = () => {
    if (formSubmitted && isKafkaRequestInvalid(kafkaRequest)) {
      return (
        <FormAlert>
          <Alert
            variant="danger"
            title={t("common:form_invalid_alert")}
            aria-live="polite"
            isInline
          />
        </FormAlert>
      );
    }
    return <></>;
  };

  return (
    <Form onSubmit={submit} id={id}>
      <FormValidAlert />
      <FormGroup
        label={t("create-kafka-instance:instance_name")}
        helperText={t("create-kafka-instance:create_instance_name_helper_text")}
        helperTextInvalid={kafkaRequest.name.errorMessage}
        isRequired
        validated={kafkaRequest.name.validated}
        fieldId="form-instance-name"
      >
        <TextInput
          isRequired
          validated={kafkaRequest.name.validated}
          type="text"
          id="form-instance-name"
          name="instance-name"
          value={kafkaRequest.name.value}
          onChange={setName}
          autoFocus={true}
        />
      </FormGroup>
      <FormGroup
        label={t("create-kafka-instance:cloud_provider")}
        fieldId="form-cloud-provider-name"
      >
        <CloudProvidersTiles
          kafkaRequest={kafkaRequest}
          selectCloudProvider={selectCloudProvider}
          cloudProviders={cloudProviders}
        />
      </FormGroup>
      <FormGroup
        label={t("create-kafka-instance:cloud_region")}
        helperTextInvalid={kafkaRequest.region.errorMessage}
        validated={kafkaRequest.region.validated}
        fieldId="form-cloud-region-option"
        isRequired
      >
        <CloudRegionSelect
          kafkaRequest={kafkaRequest}
          selectCloudRegion={selectCloudRegion}
          cloudRegions={cloudRegions}
        />
      </FormGroup>
      <FormGroup
        label={t("create-kafka-instance:availability_zones")}
        fieldId="availability-zones"
      >
        <ToggleGroup
          aria-label={t("create-kafka-instance:availability_zone_selection")}
        >
          <Tooltip
            content={t(
              "create-kafka-instance:availabilty_zones_tooltip_message"
            )}
          >
            <ToggleGroupItem
              text={t("create-kafka-instance:single")}
              value={"single"}
              isDisabled
              buttonId="single"
              onChange={selectAz}
            />
          </Tooltip>
          <ToggleGroupItem
            text={t("create-kafka-instance:multi")}
            value="multi"
            buttonId="multi"
            isSelected={kafkaRequest.multi_az.value || false}
            onChange={selectAz}
          />
          <Tooltip
            content={t(
              "create-kafka-instance:availabilty_zones_tooltip_message"
            )}
            reference={() =>
              document.getElementById("multi") || document.createElement("span")
            }
          />
        </ToggleGroup>
      </FormGroup>
    </Form>
  );
};
