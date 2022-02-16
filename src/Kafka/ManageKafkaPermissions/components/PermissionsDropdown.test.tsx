import {
  render,
  waitForI18n,
  waitForPopper,
  within,
} from "../../../test-utils";
import { userEvent } from "@storybook/testing-library";
import { PermissionsDropdown } from "./PermissionsDropdown";

describe("PermissionsDropdown", () => {
  it("can click on the add permission directly", async () => {
    const onAddPermission = jest.fn();
    const onOthers = jest.fn();
    const comp = render(
      <PermissionsDropdown
        onAddPermission={onAddPermission}
        onShortcutConsumeTopic={onOthers}
        onShortcutManageAccess={onOthers}
        onShortcutProduceTopic={onOthers}
      />
    );

    await waitForI18n(comp);
    userEvent.click(await comp.findByText("Add permission"));
    expect(onAddPermission).toBeCalled();
    expect(onOthers).not.toBeCalled();
  });

  it("can open the menu and click its options", async () => {
    const onAddPermission = jest.fn();
    const onShortcutConsumeTopic = jest.fn();
    const onShortcutManageAccess = jest.fn();
    const onShortcutProduceTopic = jest.fn();
    const comp = render(
      <PermissionsDropdown
        onAddPermission={onAddPermission}
        onShortcutConsumeTopic={onShortcutConsumeTopic}
        onShortcutManageAccess={onShortcutManageAccess}
        onShortcutProduceTopic={onShortcutProduceTopic}
      />
    );

    await waitForI18n(comp);
    const openMenu = async () => {
      userEvent.click(await comp.findByTestId("permissions-dropdown-toggle"));
      await waitForPopper();
    };

    await openMenu();

    const menubars = await comp.queryAllByRole("menubar");
    const menu = within(menubars[0]);
    userEvent.click(await menu.findByText("Add permission"));
    expect(onAddPermission).toBeCalled();

    await openMenu();
    userEvent.click(await menu.findByText("Consume from a topic"));
    expect(onShortcutConsumeTopic).not.toBeCalled();

    await openMenu();
    userEvent.click(await menu.findByText("Produce to a topic"));
    expect(onShortcutProduceTopic).not.toBeCalled();

    await openMenu();
    userEvent.click(await menu.findByText("Manage access"));
    expect(onShortcutManageAccess).not.toBeCalled();
  });
});
