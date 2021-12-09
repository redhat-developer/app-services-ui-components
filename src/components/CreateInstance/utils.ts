import { AlertVariant } from "@patternfly/react-core";
import { QuotaValue,Quota } from "@rhoas/app-services-ui-shared";
import {
    CloudProvider,
    CloudRegion
  } from '@rhoas/kafka-management-sdk';

export type Validated<T> = {
    value: T;
    validated?: 'success' | 'warning' | 'error' | 'default';
    errorMessage?: string;
  };
  export type CloudProvidersTileProps = {
    cloudProviders?: CloudProvider[];
    kafkaRequest: NewKafkaRequestPayload;
    selectCloudProvider: (cloudProvider: CloudProvider) => void;
  };

  export type NewKafkaRequestPayload = {
    cloud_provider: Validated<string | undefined>;
    multi_az: Validated<boolean | undefined>;
    region: Validated<string | undefined>;
    name: Validated<string | undefined>;
  };

  export type CreateInstanceProps={
      hideModal: () => void;
      title?: string;
      variant?: 'small' | 'medium' | 'large' | 'default';
      isCreationInProgress:boolean
      kafkaRequest:NewKafkaRequestPayload;
      loadingQuota:boolean
      userHasTrialInstance?:boolean
      hasKafkaCreationFailed:boolean
      kasQuota?: QuotaValue 
      kasTrial?: QuotaValue
      quota:Quota
      cloudProviders?:CloudProvider[]
      isKasTrial:boolean
      getModalAppendTo: () => HTMLElement
      formSubmitted:boolean;
      submit: (event: any) => void;
      setName: (name: string) => void;
      selectCloudProvider: (cloudProvider: CloudProvider) => void
      selectCloudRegion: (region: string) => void
      selectAz: (selected: boolean) => void
      cloudRegions?: CloudRegion[] | undefined
      alertProps?: QuotaAlert
      FORM_ID:string

  }
  export type CreateInstanceFormProps = Pick<
  CloudProvidersTileProps,
  'cloudProviders'
> & {
  kafkaRequest: NewKafkaRequestPayload;
  id: string;
  submit: (event: any) => void
  formSubmitted:boolean
  setName: (name: string) => void
  selectCloudProvider: (cloudProvider: CloudProvider) => void
  selectCloudRegion: (region: string) => void
  selectAz: (selected: boolean) => void
  cloudRegions?:CloudRegion[]

};
type QuotaAlert = {
    titleKey: string;
    messageKey: string;
    variant: AlertVariant;
  };

export type QuotaAlertProps = {
    quota: Quota | undefined;
    hasKafkaCreationFailed?:boolean
    userHasTrialInstance?:boolean,
    kasTrial?:QuotaValue,
    kasQuota?:QuotaValue
  };

  export const isKafkaRequestInvalid = (
    value: NewKafkaRequestPayload
  ): boolean => {
    return (
      value.name.validated === 'error' ||
      value.region.validated === 'error' ||
      value.cloud_provider.validated === 'error' ||
      value.multi_az.validated === 'error'
    );
  };