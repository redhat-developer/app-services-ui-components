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
} from "@patternfly/react-core";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AssignPermissions } from "./components/AssignPermissions";
import { SelectAccount } from "./components/SelectAccount";
import { ViewAccountDetails } from "./components/ViewAccountDetails";
import type { Account, AclBinding, AddAclType } from "./types";
import {
  createEmptyConsumeTopicAcl,
  createEmptyManageAccessAcl,
  createEmptyManualAcl,
  createEmptyProduceTopicAcl,
} from "./types";

type ManageKafkaPermissionsProps = {
  accounts: Account[];
  onCancel: () => void;
  kafkaName: string;
  onSave: (acls: AddAclType[]) => void;
  existingAcls: AclBinding[];
  onRemoveAcls: (index: number) => void;
  selectedAccount: string | undefined;
  onChangeSelectedAccount: (value: string | undefined) => void;
  resourceNameOptions: (filter: string) => Promise<string[]>;
  fetchConsumeTopicShortcutResourceName: (filter: string) => Promise<string[]>;
  onFetchConsumeTopicShortcutTopicResourceNameOptions: (
    filter: string
  ) => Promise<string[]>;
  onFetchProduceTopicShortcutResourceNameOptions: (
    filter: string
  ) => Promise<string[]>;
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
  resourceNameOptions,
  fetchConsumeTopicShortcutResourceName,
  onFetchConsumeTopicShortcutTopicResourceNameOptions,
  onFetchProduceTopicShortcutResourceNameOptions,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);
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
  const [step, setStep] = useState<number>(1);
  const [newAcls, setNewAcls] = useState<AddAclType[]>();

  const checkValidation = useCallback(() => {
    if (newAcls) {
      const isRowInvalid = newAcls?.map((value) =>
        Object.values(value).includes(undefined)
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
    else if (newAcls) {
      setSubmitted(true);
      const isAclValid = checkValidation();
      isAclValid && onSave(newAcls);
    }
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
      onClose={onCancel}
      onEscapePress={onEscapePress}
      actions={[
        <Button
          key={1}
          variant="primary"
          isDisabled={
            step == 1
              ? selectedAccount === undefined || selectedAccount === ""
              : (!canSave || !isNameValid) && submitted
          }
          onClick={onClickSubmit}
        >
          {step === 1 ? t("step_1_submit_button") : t("step_2_submit_button")}
        </Button>,
        <Button onClick={onCancel} key={2} variant="secondary">
          {t("common:cancel")}
        </Button>,
      ]}
    >
      <Form>
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
                {(!canSave || !isNameValid) && submitted && (
                  <Alert
                    isInline
                    title={t("common:form_invalid_alert")}
                    variant={"danger"}
                  />
                )}
                <FormGroup>
                  <TextContent>
                    <Text component={TextVariants.h2}>
                      {t("assign_permissions_title")}
                    </Text>
                    <Text component={TextVariants.small}>
                      {selectedAccount === "*"
                        ? t("assign_permissions_all_description")
                        : t("assign_permissions_description", {
                            value: selectedAccount,
                          })}
                    </Text>
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
                  resourceNameOptions={resourceNameOptions}
                  fetchConsumeTopicShortcutResourceName={
                    fetchConsumeTopicShortcutResourceName
                  }
                  onFetchConsumeTopicShortcutTopicResourceNameOptions={
                    onFetchConsumeTopicShortcutTopicResourceNameOptions
                  }
                  onFetchProduceTopicShortcutResourceNameOptions={
                    onFetchProduceTopicShortcutResourceNameOptions
                  }
                  fetchConsumeTopicShortcutTopicResourceNameOptions={
                    onFetchConsumeTopicShortcutTopicResourceNameOptions
                  }
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
