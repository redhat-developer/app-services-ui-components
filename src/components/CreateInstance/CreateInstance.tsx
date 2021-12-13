import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Button,
  Divider,
  Flex,
  FlexItem,
  Modal,
  ModalVariant,
  AlertVariant
} from '@patternfly/react-core'
import { QuotaValue,Quota } from "@rhoas/app-services-ui-shared";
import './CreateInstance.css'
import { InstanceInfo } from './InstanceInfo'
import {  isKafkaRequestInvalid,NewKafkaRequestPayload,CloudProvider,CloudRegion } from './utils'
import { QuotaAlert } from './QuotaAlert'
import { CreateInstanceForm } from './CreateInstanceForm'

type QuotaAlert = {
  titleKey: string;
  messageKey: string;
  variant: AlertVariant;
};

export type CreateInstanceProps={
  hideModal: () => void;
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
  onClickQuickStart: () => void
  isModalOpen:boolean
  disableFocusTrap?:boolean

}

export const CreateInstance: React.FunctionComponent<CreateInstanceProps> = ({
  isKasTrial,
  cloudProviders,
  quota,
  kasQuota,
  kasTrial,
  hasKafkaCreationFailed,
  userHasTrialInstance,
  loadingQuota,
  hideModal,
  isCreationInProgress,
  kafkaRequest,
  formSubmitted,
  submit,
  setName,
  selectAz,
  selectCloudProvider,
  selectCloudRegion,
  cloudRegions,
  getModalAppendTo,
  onClickQuickStart,
  isModalOpen,
  disableFocusTrap
}) => {
  const FORM_ID = 'create_instance_-form';
  const { t } = useTranslation()
  const handleModalToggle = () => {
    hideModal()
  }

  return (
    <Modal
      id="modalCreateKafka"
      variant={ModalVariant.medium}
      title={'create_instance_title'}
      disableFocusTrap={disableFocusTrap}
      isOpen={isModalOpen}
      onClose={handleModalToggle}
      appendTo={getModalAppendTo}
      actions={[
        <Button
          key="submit"
          variant="primary"
          type="submit"
          form={FORM_ID}
          isDisabled={
            isKafkaRequestInvalid(kafkaRequest) ||
            isCreationInProgress ||
            loadingQuota ||
            userHasTrialInstance ||
            hasKafkaCreationFailed ||
            (kasQuota && kasQuota?.remaining === 0) ||
            (!kasQuota && !kasTrial)
          }
          spinnerAriaValueText={t('submitting_request')}
          isLoading={isCreationInProgress}
          data-testid="modalCreateKafka-buttonSubmit"
        >
          {t('create_instance')}
        </Button>,
        <Button
          key="cancel"
          variant="link"
          onClick={handleModalToggle}
          data-testid="modalCreateKafka-buttonCancel"
        >
          {t('cancel')}
        </Button>,
      ]}
    >
      <QuotaAlert
        quota={quota}
        userHasTrialInstance={userHasTrialInstance}
        hasKafkaCreationFailed={hasKafkaCreationFailed}
        kasTrial={kasTrial}
        kasQuota={kasQuota}
        
      />
      <Flex direction={{ default: 'column', lg: 'row' }}>
        <FlexItem flex={{ default: 'flex_2' }}>
          <CreateInstanceForm
            kafkaRequest={kafkaRequest}
            cloudProviders={cloudProviders}
            id={FORM_ID}
            formSubmitted={formSubmitted}
            submit={submit}
            setName={setName}
            selectCloudProvider={selectCloudProvider}
            selectCloudRegion={selectCloudRegion}
            selectAz={selectAz}
            cloudRegions={cloudRegions}

          />
        </FlexItem>
        <Divider isVertical />
        <FlexItem
          flex={{ default: 'flex_1' }}
          className="mk--create-instance-modal__sidebar--content"
        >
          <InstanceInfo isKasTrial={isKasTrial} onClickQuickStart={onClickQuickStart} />
        </FlexItem>
      </Flex>
    </Modal>
  )
}
