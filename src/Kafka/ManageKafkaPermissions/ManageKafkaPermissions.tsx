import {
  Button,
  ExpandableSection,
  Form,
  FormGroup,
  Modal,
  TextContent,
  TextVariants,
  Text,
  Badge,
  Alert,
  Popover,
} from "@patternfly/react-core";
import { HelpIcon } from "@patternfly/react-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AssignPermissions } from "./components/AssignPermissions";
import { PreCancelModal } from "./components/PreCancelModal";
import { SelectAccount } from "./components/SelectAccount";
import { ViewAccountDetails } from "./components/ViewAccountDetails";
import type { Account, AclBinding, AddAclType } from "./types";
import {
  createEmptyConsumeTopicAcl,
  createEmptyManageAccessAcl,
  createEmptyManualAcl,
  createEmptyProduceTopicAcl,
} from "./types";

export type ManageKafkaPermissionsProps = {
  accounts: Account[];
  onCancel: () => void;
  kafkaName: string;
  onSave: (acls: AddAclType[] | undefined) => Promise<void>;
  existingAcls: AclBinding[];
  onRemoveAcls: (index: number) => void;
  selectedAccount: string | undefined;
  onChangeSelectedAccount: (value: string | undefined) => void;
  topicNameOptions: (filter: string) => string[];
  consumerGroupNameOptions: (filter: string) => string[];
  isAclDeleted: boolean;
  id?: string;
};

export const ManageKafkaPermissions: React.FC<ManageKafkaPermissionsProps> = ({
  onCancel,
  kafkaName,
  accounts,
  existingAcls,
  onRemoveAcls,
  onSave,
  selectedAccount,
  onChangeSelectedAccount,
  topicNameOptions,
  consumerGroupNameOptions,
  isAclDeleted,
  id,
}) => {
  const { t } = useTranslation([
    "manage-kafka-permissions",
    "create-kafka-instance",
  ]);

  const escapeClosesModal = useRef<boolean>(true);
  const [
    isExpandedExistingPermissionSection,
    setIsExpandedExistingPermissionSection,
  ] = useState<boolean>(false);
  const [
    isExpandedAssignPermissionsSection,
    setIsExpandedAssignPermissionsSection,
  ] = useState<boolean>(true);
  const [isNameValid, setIsNameValid] = useState<boolean>(true);
  const [canSave, setCanSave] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isOpenPreCancelModal, setIsOpenPreCancelModal] =
    useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [newAcls, setNewAcls] = useState<AddAclType[]>();

  const checkValidation = useCallback(() => {
    if (newAcls) {
      const isRowInvalid = newAcls?.map((value) =>
        value.type == "manual" &&
        value.resourceType == "kafka-instance" &&
        value.resourceOperation != undefined
          ? false
          : Object.values(value).includes(undefined)
      );
      isRowInvalid.includes(true) ? setCanSave(false) : setCanSave(true);
      if (canSave == true && isNameValid) return true;
      else return false;
    }
    return false;
  }, [canSave, isNameValid, newAcls]);

  useEffect(() => {
    checkValidation();
  }, [checkValidation, newAcls]);

  const onEscapePress = () => {
    if (escapeClosesModal.current) {
      onCancel();
    }
  };

  const onClickSubmit = () => {
    if (step == 1) setStep(2);
    else if (newAcls && newAcls?.length > 0) {
      setSubmitted(true);
      const isAclValid = checkValidation();
      isAclValid && onSave(newAcls);
    } else if (!newAcls || (newAcls.length < 1 && isAclDeleted))
      void onSave(undefined);
  };

  const onAddManualPermissions = () => {
    setSubmitted(false);
    setNewAcls((prevState) =>
      prevState
        ? [...prevState, createEmptyManualAcl()]
        : [createEmptyManualAcl()]
    );
  };
  const onAddProduceTopicShortcut = () => {
    setSubmitted(false);
    setNewAcls((prevState) =>
      prevState
        ? [...prevState, createEmptyProduceTopicAcl()]
        : [createEmptyProduceTopicAcl()]
    );
  };
  const onConsumeTopicShortcut = () => {
    setSubmitted(false);
    setNewAcls((prevState) =>
      prevState
        ? [...prevState, createEmptyConsumeTopicAcl()]
        : [createEmptyConsumeTopicAcl()]
    );
  };
  const onManageAccessShortcut = () => {
    setSubmitted(false);
    setNewAcls((prevState) =>
      prevState
        ? [...prevState, createEmptyManageAccessAcl(kafkaName)]
        : [createEmptyManageAccessAcl(kafkaName)]
    );
  };

  const onDeleteNewAcl = (row: number) => {
    setNewAcls(
      (prevState) => prevState && prevState.filter((_, index) => index !== row)
    );
  };

  const onChangeExpandedExistingPermissionsSection = (value: boolean) => {
    setIsExpandedExistingPermissionSection(value);
  };
  const onChangeExpandedAssignPermissionsSection = (value: boolean) => {
    setIsExpandedAssignPermissionsSection(value);
  };

  const isDisabled =
    step == 1 && (selectedAccount === undefined || selectedAccount === "")
      ? true
      : step == 2 &&
        ((submitted && !canSave) ||
          ((newAcls == undefined || newAcls.length < 1) && !isAclDeleted) ||
          !isNameValid)
      ? true
      : false;
  const onClose = () => {
    step == 1
      ? onCancel()
      : step == 2 && (!isDisabled || (newAcls && newAcls?.length > 0))
      ? setIsOpenPreCancelModal(true)
      : onCancel();
  };

  const closePreCancelModal = () => {
    setIsOpenPreCancelModal(false);
    onCancel();
  };

  const resumeEditingPermissions = () => {
    setIsOpenPreCancelModal(false);
  };
  return (
    <Modal
      id="manage-permissions-modal"
      variant={"large"}
      isOpen={true}
      aria-label={t("dialog_aria_label")}
      position="top"
      title={t("dialog_title")}
      showClose={true}
      aria-describedby="modal-message"
      onClose={onClose}
      onEscapePress={onEscapePress}
      appendTo={() =>
        id ? document.getElementById(id) || document.body : document.body
      }
      actions={[
        <Button
          key={1}
          variant="primary"
          isDisabled={isDisabled}
          onClick={onClickSubmit}
          aria-label={
            step == 1 ? t("step_1_submit_button") : t("step_2_submit_button")
          }
        >
          {step === 1 ? t("step_1_submit_button") : t("step_2_submit_button")}
        </Button>,
        <Button
          onClick={onClose}
          key={2}
          variant="secondary"
          aria-label={t("common:cancel")}
        >
          {t("common:cancel")}
        </Button>,
      ]}
    >
      <PreCancelModal
        isOpen={isOpenPreCancelModal}
        closeModal={closePreCancelModal}
        resumeEditing={resumeEditingPermissions}
      />
      <Form onSubmit={(e) => e.preventDefault()}>
        <FormGroup
          fieldId="kafka-instance-name"
          label={t("kafka_instance")}
          id="modal-message"
        >
          {kafkaName}
        </FormGroup>
        {step == 1 ? (
          <SelectAccount
            value={selectedAccount}
            onChangeAccount={onChangeSelectedAccount}
            accounts={accounts}
          />
        ) : (
          <>
            <FormGroup
              fieldId="account-name"
              label={t("account_id_title")}
              labelIcon={
                <Popover bodyContent={t("account_id_help")}>
                  <button
                    type="button"
                    onClick={(e) => e.preventDefault()}
                    className="pf-c-form__group-label-help"
                    aria-label={t("account_help")}
                  >
                    <HelpIcon noVerticalAlign />
                  </button>
                </Popover>
              }
            >
              {selectedAccount === "All accounts"
                ? t("all_accounts_title")
                : selectedAccount}
            </FormGroup>
            {(!canSave || !isNameValid) && submitted && (
              <Alert
                isInline
                title={t("create-kafka-instance:form_errors.form_invalid")}
                variant={"danger"}
              />
            )}
            <ExpandableSection
              isIndented={true}
              isExpanded={isExpandedExistingPermissionSection}
              onToggle={onChangeExpandedExistingPermissionsSection}
              toggleContent={
                <div>
                  <span>{t("review_existing_title")}</span>{" "}
                  <Badge isRead={existingAcls.length == 0 ? true : false}>
                    {existingAcls.length}
                  </Badge>
                </div>
              }
            >
              <ViewAccountDetails
                accountId={selectedAccount}
                onRemoveAcl={onRemoveAcls}
                existingAcls={existingAcls}
              />
            </ExpandableSection>
            <FormGroup>
              <ExpandableSection
                toggleText={t("assign_permissions_title")}
                isIndented={true}
                isExpanded={isExpandedAssignPermissionsSection}
                onToggle={onChangeExpandedAssignPermissionsSection}
              >
                <FormGroup>
                  <TextContent>
                    <Text component={TextVariants.small}>
                      {selectedAccount === "All accounts"
                        ? t("assign_permissions_all_description")
                        : t("assign_permissions_description", {
                            value: selectedAccount,
                          })}
                    </Text>
                    {newAcls && newAcls?.length > 0 && (
                      <Text component={TextVariants.small}>
                        {t("all_fields_required")}
                      </Text>
                    )}
                  </TextContent>
                </FormGroup>
                <AssignPermissions
                  setIsNameValid={setIsNameValid}
                  submitted={submitted}
                  onAddManualPermissions={onAddManualPermissions}
                  onAddProduceTopicShortcut={onAddProduceTopicShortcut}
                  onConsumeTopicShortcut={onConsumeTopicShortcut}
                  onManageAccessShortcut={onManageAccessShortcut}
                  onDelete={onDeleteNewAcl}
                  topicNameOptions={topicNameOptions}
                  consumerGroupNameOptions={consumerGroupNameOptions}
                  addedAcls={newAcls}
                  kafkaName={kafkaName}
                  setAddedAcls={setNewAcls}
                />
              </ExpandableSection>
            </FormGroup>
          </>
        )}
      </Form>
    </Modal>
  );
};
