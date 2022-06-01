import { userEvent } from "@storybook/testing-library";
import { composeStories } from "@storybook/testing-react";
import { render, waitForI18n } from "../../../test-utils";
import * as stories from "./ResourcePermission.stories";

const { WorksWithModal, InitialState } = composeStories(stories);

describe("Resource type", () => {
  it("should render a select component for resource permission", async () => {
    const onChangeValue = jest.fn();
    const comp = render(<WorksWithModal onChangeValue={onChangeValue} />);
    await waitForI18n(comp);
    const permissionValue = comp.getAllByText("Allow");
    expect(permissionValue[0]).toBeInTheDocument();
    expect(permissionValue[1]).toBeInTheDocument();
    expect(await comp.findByText("Deny")).toBeInTheDocument();
    userEvent.click(await comp.findByText("Deny"));
    expect(await comp.findByText("Allow")).toBeInTheDocument();
    expect(comp.queryByText("Deny")).not.toBeInTheDocument();
  });
  it("should show a select component for resource type in initial state ", async () => {
    const onChangeValue = jest.fn();
    const comp = render(<InitialState onChangeValue={onChangeValue} />);
    await waitForI18n(comp);
    expect(await comp.findByText("Allow")).toBeInTheDocument();
    userEvent.click(await comp.findByText("Allow"));
    expect(await comp.findByText("Deny")).toBeInTheDocument();
    const permissionValue = comp.getAllByText("Allow");
    expect(permissionValue[0]).toBeInTheDocument();
    expect(permissionValue[1]).toBeInTheDocument();
    userEvent.click(await comp.findByText("Deny"));
    expect(await comp.findByText("Allow")).toBeInTheDocument();
    expect(comp.queryByText("Deny")).not.toBeInTheDocument();
  });
});
