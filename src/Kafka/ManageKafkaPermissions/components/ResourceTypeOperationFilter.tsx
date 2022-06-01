import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import type { TreeViewDataItem } from "@patternfly/react-core";
import {
  Menu,
  MenuContent,
  MenuGroup,
  MenuList,
  MenuToggle,
  Popper,
  TreeView,
} from "@patternfly/react-core";
import { ResourceTypeLabel } from "./ResourceTypeLabel";
import type { AclOperation, AclResourceType } from "../types";

export type ResourceTypeDataItem = TreeViewDataItem & {
  id: `${AclResourceType}` | `${AclResourceType}-${AclOperation}`;
  children?: ResourceTypeDataItem[];
};

export type ResourceTypeOperationFilterProps = {
  onCheckedItemsChange: (items: ResourceTypeDataItem[]) => void;
  checkedItems: ResourceTypeDataItem[];
};

export const ResourceTypeOperationFilter: React.VFC<
  ResourceTypeOperationFilterProps
> = ({ onCheckedItemsChange, checkedItems = [] }) => {
  const { t } = useTranslation("manage-kafka-permissions");

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const consumerGroupOptions: ResourceTypeDataItem[] = [
    {
      name: (
        <>
          <ResourceTypeLabel variant={"GROUP"} /> {t("consumer_group")}
        </>
      ),
      id: "GROUP",
      checkProps: { checked: false },
      children: [
        {
          name: t("operations.all"),
          id: `GROUP-ALL`,
          checkProps: { checked: false },
        },
        {
          name: t("operations.read"),
          id: `GROUP-READ`,
          checkProps: { checked: false },
        },
        {
          name: t("operations.delete"),
          id: `GROUP-DELETE`,
          checkProps: { checked: false },
        },
        {
          name: t("operations.describe"),
          id: `GROUP-DESCRIBE`,
          checkProps: { checked: false },
        },
      ],
    },
  ];

  const kafkaInstanceOptions: ResourceTypeDataItem[] = [
    {
      name: (
        <>
          <ResourceTypeLabel variant={"CLUSTER"} /> {t("kafka_instance")}
        </>
      ),
      id: "CLUSTER",
      checkProps: { checked: false },
      children: [
        {
          name: t("operations.alter"),
          id: `CLUSTER-ALTER`,
          checkProps: { checked: false },
        },
        {
          name: t("operations.describe"),
          id: `CLUSTER-DESCRIBE`,
          checkProps: { checked: false },
        },
      ],
    },
  ];

  const topicOptions: ResourceTypeDataItem[] = [
    {
      name: (
        <>
          <ResourceTypeLabel variant={"TOPIC"} /> {t("topic")}
        </>
      ),
      id: "TOPIC",
      checkProps: { checked: false },
      children: [
        {
          name: t("operations.all"),
          id: `TOPIC-ALL`,
          checkProps: { checked: false },
        },
        {
          name: t("operations.alter"),
          id: `TOPIC-ALTER`,
          checkProps: { checked: false },
        },
        {
          name: t("operations.alter_configs"),
          id: `TOPIC-ALTER_CONFIGS`,
          checkProps: { checked: false },
        },
        {
          name: t("operations.create"),
          id: `TOPIC-CREATE`,
          checkProps: { checked: false },
        },
        {
          name: t("operations.delete"),
          id: `TOPIC-DELETE`,
          checkProps: { checked: false },
        },
        {
          name: t("operations.describe"),
          id: `TOPIC-DESCRIBE`,
          checkProps: { checked: false },
        },
        {
          name: t("operations.describe_configs"),
          id: `TOPIC-DESCRIBE_CONFIGS`,
          checkProps: { checked: false },
        },
        {
          name: t("operations.read"),
          id: `TOPIC-READ`,
          checkProps: { checked: false },
        },
        {
          name: t("operations.write"),
          id: `TOPIC-WRITE`,
          checkProps: { checked: false },
        },
      ],
    },
  ];

  const transactionalIdOptions: ResourceTypeDataItem[] = [
    {
      name: (
        <>
          <ResourceTypeLabel variant={"TRANSACTIONAL_ID"} />{" "}
          {t("transactional_id")}
        </>
      ),
      id: "TRANSACTIONAL_ID",
      checkProps: { checked: false },
      children: [
        {
          name: t("operations.all"),
          id: `TRANSACTIONAL_ID-ALL`,
          checkProps: { checked: false },
        },
        {
          name: t("operations.alter"),
          id: `TRANSACTIONAL_ID-ALTER`,
          checkProps: { checked: false },
        },
        {
          name: t("operations.describe"),
          id: `TRANSACTIONAL_ID-DESCRIBE`,
          checkProps: { checked: false },
        },
      ],
    },
  ];

  const isChecked = (dataItem: TreeViewDataItem) =>
    checkedItems.some((item) => item.id === dataItem.id);

  const areAllDescendantsChecked = (dataItem: TreeViewDataItem): boolean =>
    dataItem.children
      ? dataItem.children.every((child) => areAllDescendantsChecked(child))
      : isChecked(dataItem);

  const areSomeDescendantsChecked = (dataItem: TreeViewDataItem): boolean =>
    dataItem.children
      ? dataItem.children.some((child) => areSomeDescendantsChecked(child))
      : isChecked(dataItem);

  const flattenTree = (tree: ResourceTypeDataItem[]) => {
    let result: ResourceTypeDataItem[] = [];

    tree.forEach((item) => {
      result.push(item);
      if (item.children) {
        result = result.concat(flattenTree(item.children));
      }
    });

    return result;
  };

  const mapTree = (item: TreeViewDataItem): TreeViewDataItem => {
    const hasCheck = areAllDescendantsChecked(item);
    // Reset checked properties to be updated
    const checkProps = item?.checkProps;
    if (checkProps?.checked !== undefined && checkProps?.checked !== null)
      checkProps.checked = false;

    if (hasCheck) {
      if (checkProps?.checked !== undefined && checkProps?.checked !== null)
        checkProps.checked = true;
    } else {
      const hasPartialCheck = areSomeDescendantsChecked(item);
      if (hasPartialCheck) {
        if (checkProps?.checked !== undefined) checkProps.checked = null;
      }
    }

    if (item.children) {
      return {
        ...item,
        children: item.children.map(mapTree),
      };
    }

    return item;
  };

  const filterItems = (
    item: TreeViewDataItem,
    checkedItem: TreeViewDataItem
  ): TreeViewDataItem | boolean => {
    if (item.id === checkedItem.id) {
      return true;
    }

    if (item.children) {
      return (
        (item.children = item.children
          .map((opt) => Object.assign({}, opt))
          .filter((child) => filterItems(child, checkedItem))).length > 0
      );
    }

    return false;
  };

  const onCheck = (
    evt: React.ChangeEvent,
    treeViewItem: TreeViewDataItem,
    treeType: AclResourceType
  ) => {
    const checked = (evt.target as HTMLInputElement).checked;
    let options: ResourceTypeDataItem[] = [];

    switch (treeType) {
      case "GROUP":
        options = consumerGroupOptions;
        break;
      case "CLUSTER":
        options = kafkaInstanceOptions;
        break;
      case "TOPIC":
        options = topicOptions;
        break;
      case "TRANSACTIONAL_ID":
        options = transactionalIdOptions;
        break;
      default:
        break;
    }

    const checkedItemTree = options
      .map((opt) => Object.assign({}, opt))
      .filter((item) => filterItems(item, treeViewItem));

    const flatCheckedItems = flattenTree(checkedItemTree);

    const newCheckedItems = checked
      ? checkedItems.concat(
          flatCheckedItems.filter(
            (item) => !checkedItems.some((i) => i.id === item.id)
          )
        )
      : checkedItems.filter(
          (item) => !flatCheckedItems.some((i) => i.id === item.id)
        );

    onCheckedItemsChange(newCheckedItems);
  };

  const handleMenuKeys = React.useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen) {
        return;
      }
      if (
        menuRef?.current?.contains(event.target as Node) ||
        toggleRef?.current?.contains(event.target as Node)
      ) {
        if (event.key === "Escape" || event.key === "Tab") {
          setIsOpen(!isOpen);
          toggleRef?.current?.focus();
        }
      }
    },
    [isOpen]
  );

  const handleClickOutside = React.useCallback(
    (event: MouseEvent) => {
      if (isOpen && !menuRef?.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    },
    [isOpen]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleMenuKeys);
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleMenuKeys);
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, menuRef, handleMenuKeys, handleClickOutside]);

  const onToggleClick = (ev: React.MouseEvent) => {
    ev.stopPropagation(); // Stop handleClickOutside from handling
    setTimeout(() => {
      if (menuRef.current) {
        const firstElement = menuRef.current.querySelector(
          "li > button:not(:disabled)"
        );
        firstElement && (firstElement as HTMLElement).focus();
      }
    }, 0);
    setIsOpen(!isOpen);
  };

  const toggle = (
    <MenuToggle
      ref={toggleRef}
      onClick={onToggleClick}
      isExpanded={isOpen}
      data-testid="acls-treeview-menu-toggle"
    >
      {t("resource_type_operation_filter_placeholder")}
    </MenuToggle>
  );

  const consumerGroupsMapped = consumerGroupOptions.map(mapTree);
  const kafkaInstanceMapped = kafkaInstanceOptions.map(mapTree);
  const topicMapped = topicOptions.map(mapTree);
  const transactionalIdMapped = transactionalIdOptions.map(mapTree);

  const menu = (
    <Menu ref={menuRef} data-testid="acls-treeview-menu">
      <MenuContent>
        <MenuList>
          <MenuGroup>
            <TreeView
              data-testid="acls-consumer-group"
              data={consumerGroupsMapped}
              hasChecks
              onCheck={(event, item) => onCheck(event, item, "GROUP")}
            />
          </MenuGroup>
          <MenuGroup>
            <TreeView
              data={kafkaInstanceMapped}
              hasChecks
              onCheck={(event, item) => onCheck(event, item, "CLUSTER")}
            />
          </MenuGroup>
          <MenuGroup>
            <TreeView
              data={topicMapped}
              hasChecks
              onCheck={(event, item) => onCheck(event, item, "TOPIC")}
            />
          </MenuGroup>
          <MenuGroup>
            <TreeView
              data={transactionalIdMapped}
              hasChecks
              onCheck={(event, item) =>
                onCheck(event, item, "TRANSACTIONAL_ID")
              }
            />
          </MenuGroup>
        </MenuList>
      </MenuContent>
    </Menu>
  );

  return (
    <Popper
      trigger={toggle}
      popper={menu}
      isVisible={isOpen}
      popperMatchesTriggerWidth={true}
    />
  );
};
