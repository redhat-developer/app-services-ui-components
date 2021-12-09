import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Button,
  Divider,
  Flex,
  FlexItem,
  Modal,
  ModalVariant,
} from '@patternfly/react-core'
import './CreateInstance.css'
import { InstanceInfo } from './InstanceInfo'
import { CreateInstanceProps, isKafkaRequestInvalid } from './utils'
import { QuotaAlert } from './QuotaAlert'
import { CreateInstanceForm } from './CreateInstanceForm'


export const CreateInstance: React.FunctionComponent<CreateInstanceProps> = ({
  isKasTrial,
  cloudProviders,
  quota,
  kasQuota,
  kasTrial,
  hasKafkaCreationFailed,
  userHasTrialInstance,
  loadingQuota,
  title,
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
  FORM_ID
}) => {
  const { t } = useTranslation()
  const handleModalToggle = () => {
    hideModal()
  }

  return (
    <Modal
      id="modalCreateKafka"
      variant={ModalVariant.medium}
      title={title}
      isOpen={true}
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
          <InstanceInfo isKasTrial={isKasTrial} />
        </FlexItem>
      </Flex>
    </Modal>
  )
}
