import {
  Divider,
  Dropdown,
  DropdownItem,
  DropdownSeparator,
  KebabToggle,
  DropdownToggle,
  DropdownToggleAction,
  Menu,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuList,
  MenuProps,
  Popper,
} from "@patternfly/react-core";
import {
  MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  VoidFunctionComponent,
} from "react";
import EllipsisVIcon from "@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon";

export const ActionsDropdown: VoidFunctionComponent<ActionsDropdownProps> = ({
  onAddPermission,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const handleMenuKeys = useCallback((event: KeyboardEvent) => {
    if (
      isOpen &&
      menuRef.current &&
      toggleRef.current &&
      event.target &&
      menuRef.current.contains(event.target as Node)
    ) {
      if (event.key === "Escape" || event.key === "Tab") {
        setIsOpen(!isOpen);
        toggleRef.current.focus();
      }
    }
  });
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      isOpen &&
      menuRef.current &&
      !menuRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  });
  useEffect(() => {
    window.addEventListener("keydown", handleMenuKeys);
    window.addEventListener("click", handleClickOutside);
    return () => {};
  }, [handleClickOutside, handleMenuKeys, isOpen, menuRef]);

  const onToggleClick = useCallback((open: boolean, ev: ReactMouseEvent) => {
    ev.stopPropagation(); // Stop handleClickOutside from handling
    setTimeout(() => {
      if (menuRef.current) {
        const firstElement = menuRef.current.querySelector(
          "li > button,input:not(:disabled)"
        ) as HTMLElement | null;
        firstElement && firstElement.focus();
      }
    }, 0);
    setIsOpen(open);
  }, []);
  const handleSelect: MenuProps["onSelect"] = useCallback((_event, itemId) => {
    setIsOpen(false);
  });
  const menu = (
    <Menu onSelect={handleSelect} key="acls-menu" ref={menuRef}>
      <MenuContent>
        <MenuList>
          <MenuGroup label={"View information"}>
            <MenuList>
              <MenuItem
                itemId={"shortcut_consume_topic"}
                description={"Details"}
              ></MenuItem>
              <MenuItem
                itemId={"shortcut_consume_topic"}
                description={"Connection"}
              ></MenuItem>
            </MenuList>
          </MenuGroup>
          <Divider />
          <MenuGroup>
            <MenuList>
              <MenuItem
                itemId={"shortcut_consume_topic"}
                description={"Delete"}
              ></MenuItem>
            </MenuList>
          </MenuGroup>
        </MenuList>
      </MenuContent>
    </Menu>
  );
  const toggle = (
    <Dropdown
      toggle={
        <KebabToggle
          ref={toggleRef}
          splitButtonVariant="action"
          onToggle={onToggleClick}
        />
      }
    />
  );
  return (
    <Popper
      trigger={toggle}
      popper={menu}
      isVisible={isOpen}
      popperMatchesTriggerWidth={false}
    />
  );
};
