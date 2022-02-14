import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import {
  MenuToggle,
  Menu,
  MenuContent,
  MenuGroup,
  MenuList,
  Popper,
  TreeView,
  TreeViewDataItem,
} from "@patternfly/react-core";
import { SolidLabel } from "../SolidLabel";
import { AclResourceType, AclOperation } from "../../types";

export type ResourceTypeOperationFilterProps = {
  onCheckedItemsChange: (items: TreeViewDataItem[]) => void;
  checkedItems: TreeViewDataItem[];
};

export const ResourceTypeOperationFilter: React.VFC<
  ResourceTypeOperationFilterProps
> = ({ onCheckedItemsChange, checkedItems = [] }) => {
  const { t } = useTranslation("manage-kafka-permissions");

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const consumerGroupOptions: TreeViewDataItem[] = [
    {
      name: (
        <>
          <SolidLabel variant={AclResourceType.Group} />{" "}
          {t("acls_treeview.consumer_group")}
        </>
      ),
      id: AclResourceType.Group,
      checkProps: { checked: false },
      children: [
        {
          name: t("acls_treeview.operations.all"),
          id: `${AclResourceType.Group}-${AclOperation.All}`,
          checkProps: { checked: false },
        },
        {
          name: t("acls_treeview.operations.read"),
          id: `${AclResourceType.Group}-${AclOperation.Read}`,
          checkProps: { checked: false },
        },
        {
          name: t("acls_treeview.operations.delete"),
          id: `${AclResourceType.Group}-${AclOperation.Delete}`,
          checkProps: { checked: false },
        },
        {
          name: t("acls_treeview.operations.describe"),
          id: `${AclResourceType.Group}-${AclOperation.Describe}`,
          checkProps: { checked: false },
        },
      ],
    },
  ];

  const kafkaInstanceOptions: TreeViewDataItem[] = [
    {
      name: (
        <>
          <SolidLabel variant={AclResourceType.Cluster} />{" "}
          {t("acls_treeview.kafka_instance")}
        </>
      ),
      id: AclResourceType.Cluster,
      checkProps: { checked: false },
      children: [
        {
          name: t("acls_treeview.operations.alter"),
          id: `${AclResourceType.Cluster}-${AclOperation.Alter}`,
          checkProps: { checked: false },
        },
        {
          name: t("acls_treeview.operations.describe"),
          id: `${AclResourceType.Cluster}-${AclOperation.Describe}`,
          checkProps: { checked: false },
        },
      ],
    },
  ];

  const topicOptions: TreeViewDataItem[] = [
    {
      name: (
        <>
          <SolidLabel variant={AclResourceType.Topic} />{" "}
          {t("acls_treeview.topic")}
        </>
      ),
      id: AclResourceType.Topic,
      checkProps: { checked: false },
      children: [
        {
          name: t("acls_treeview.operations.all"),
          id: `${AclResourceType.Topic}-${AclOperation.All}`,
          checkProps: { checked: false },
        },
        {
          name: t("acls_treeview.operations.alter"),
          id: `${AclResourceType.Topic}-${AclOperation.Alter}`,
          checkProps: { checked: false },
        },
        {
          name: t("acls_treeview.operations.alter_configs"),
          id: `${AclResourceType.Topic}-${AclOperation.AlterConfigs}`,
          checkProps: { checked: false },
        },
        {
          name: t("acls_treeview.operations.create"),
          id: `${AclResourceType.Topic}-${AclOperation.Create}`,
          checkProps: { checked: false },
        },
        {
          name: t("acls_treeview.operations.delete"),
          id: `${AclResourceType.Topic}-${AclOperation.Delete}`,
          checkProps: { checked: false },
        },
        {
          name: t("acls_treeview.operations.describe"),
          id: `${AclResourceType.Topic}-${AclOperation.Describe}`,
          checkProps: { checked: false },
        },
        {
          name: t("acls_treeview.operations.describe_configs"),
          id: `${AclResourceType.Topic}-${AclOperation.DescribeConfigs}`,
          checkProps: { checked: false },
        },
        {
          name: t("acls_treeview.operations.read"),
          id: `${AclResourceType.Topic}-${AclOperation.Read}`,
          checkProps: { checked: false },
        },
        {
          name: t("acls_treeview.operations.write"),
          id: `${AclResourceType.Topic}-${AclOperation.Write}`,
          checkProps: { checked: false },
        },
      ],
    },
  ];

  const transactionalIdOptions: TreeViewDataItem[] = [
    {
      name: (
        <>
          <SolidLabel variant={AclResourceType.TransactionalId} />{" "}
          {t("acls_treeview.transational_id")}
        </>
      ),
      id: AclResourceType.TransactionalId,
      checkProps: { checked: false },
      children: [
        {
          name: t("acls_treeview.operations.all"),
          id: `${AclResourceType.TransactionalId}-${AclOperation.All}`,
          checkProps: { checked: false },
        },
        {
          name: t("acls_treeview.operations.alter"),
          id: `${AclResourceType.TransactionalId}-${AclOperation.Alter}`,
          checkProps: { checked: false },
        },
        {
          name: t("acls_treeview.operations.describe"),
          id: `${AclResourceType.TransactionalId}-${AclOperation.Describe}`,
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

  const flattenTree = (tree: TreeViewDataItem[]) => {
    let result: TreeViewDataItem[] = [];

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
    let options: TreeViewDataItem[] = [];

    switch (treeType) {
      case AclResourceType.Group:
        options = consumerGroupOptions;
        break;
      case AclResourceType.Cluster:
        options = kafkaInstanceOptions;
        break;
      case AclResourceType.Topic:
        options = topicOptions;
        break;
      case AclResourceType.TransactionalId:
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
      {t("acls_treeview.treeview_placeholder")}
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
              data={consumerGroupsMapped}
              hasChecks
              onCheck={(event, item) =>
                onCheck(event, item, AclResourceType.Group)
              }
            />
          </MenuGroup>
          <MenuGroup>
            <TreeView
              data={kafkaInstanceMapped}
              hasChecks
              onCheck={(event, item) =>
                onCheck(event, item, AclResourceType.Cluster)
              }
            />
          </MenuGroup>
          <MenuGroup>
            <TreeView
              data={topicMapped}
              hasChecks
              onCheck={(event, item) =>
                onCheck(event, item, AclResourceType.Topic)
              }
            />
          </MenuGroup>
          <MenuGroup>
            <TreeView
              data={transactionalIdMapped}
              hasChecks
              onCheck={(event, item) =>
                onCheck(event, item, AclResourceType.TransactionalId)
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
