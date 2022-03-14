import React from "react";
import { useTranslation } from "react-i18next";
import { ValidatedOptions, LabelGroup, Label } from "@patternfly/react-core";
import { sentenceCase } from "sentence-case";

import {
  AclPermissionType,
  CellProps,
  NewAcl,
  NewAcls,
  SelectOption,
} from "../types";

import { CreateSelect } from "./CreateSelect";

type AclCellProps = CellProps & {
  onChangeAcls: React.Dispatch<React.SetStateAction<NewAcls[] | []>>;
  setEscapeClosesModal: (closes: boolean) => void;
  menuAppendTo:
    | HTMLElement
    | (() => HTMLElement)
    | "parent"
    | "inline"
    | undefined;
};

type PermissionTypeCellProps = AclCellProps;

const PermissionTypeCell: React.VFC<PermissionTypeCellProps> = ({
  acl,
  row,
  childRow = 0,
  onChangeAcls,
  setEscapeClosesModal,
  menuAppendTo,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);

  const update2DArrayAcls = (
    prevAcls: NewAcls[],
    newAcl: NewAcl,
    row: number,
    childRow = 0
  ) => {
    if (Array.isArray(prevAcls[row]) && childRow !== undefined)
      prevAcls[row] = newAcl;
    else prevAcls[row][childRow] = newAcl;
    return prevAcls;
  };
  const handle2DArrayAcls = (acls: NewAcls[], row: number, childRow = 0) => {
    const newAcls = Array.isArray(acls[row]) ? acls[row][childRow] : acls[row];
    return newAcls;
  };
  const createEmptyNewAcl = (): NewAcl => {
    return {
      permission: {
        value: "ALLOW",
      },
      operation: {
        value: undefined,
      },
      resourceType: {
        value: undefined,
      },
      patternType: {
        value: "PREFIXED",
      },
      resource: {
        value: undefined,
      },
      aclShortcutType: undefined,
    } as NewAcl;
  };

  const onSetPermissionType = (
    row: number,
    value?: AclPermissionType,
    childRow?: number
  ) => {
    onChangeAcls((prevState) =>
      prevState.map((v, k) => {
        if (k === row) {
          if (Array.isArray(v) && childRow !== undefined)
            v[childRow].permission = { value };
          if (!Array.isArray(v)) v.permission = { value };
        }
        return v;
      })
    );
  };

  const onSelect = (value: string) => {
    onChangeAcls((prevState) => {
      const newPrevState = handle2DArrayAcls(prevState, row, childRow);
      if (value === undefined) {
        newPrevState.permission.validated = ValidatedOptions.error;
        newPrevState.permission.errorMessage = t("common:required");
      } else {
        newPrevState.permission.validated = ValidatedOptions.default;
      }
      return update2DArrayAcls(prevState, newPrevState, row, childRow);
    });
  };

  if (acl.aclShortcutType) {
    return (
      <>
        {Array.isArray(acl?.operations) && (
          <LabelGroup numLabels={4}>
            <Label
              variant="outline"
              color={acl.permission.value === "DENY" ? "red" : undefined}
            >
              {sentenceCase(acl.permission.value || "")}
            </Label>
            {acl?.operations?.map((operation) => (
              <Label variant="outline" key={operation}>
                {sentenceCase(operation)}
              </Label>
            ))}
          </LabelGroup>
        )}
      </>
    );
  }

  return (
    <CreateSelect
      options={["ALLOW", "DENY"].map((value) => {
        return {
          value,
          title: sentenceCase(value),
        } as SelectOption<AclPermissionType>;
      })}
      selected={acl.permission}
      setSelected={onSetPermissionType}
      row={row}
      value="permission_type"
      setEscapeClosesModal={setEscapeClosesModal}
      menuAppendTo={menuAppendTo}
      onClear={() => createEmptyNewAcl().permission.value}
      onSelect={onSelect}
    />
  );
};

export { PermissionTypeCell };
