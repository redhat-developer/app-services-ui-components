import { userEvent } from "@storybook/testing-library";
import { composeStories } from "@storybook/testing-react";
import { render, waitForI18n } from "../../../test-utils";
import * as stories from "./ResourcePrefixRule.stories";

const { WorksWithModal, InitialState } = composeStories(stories);

describe("Resource type", () => {
  it("should render a select component for resource prefix rule", async () => {
    const onChangeValue = jest.fn();
    const comp = render(<WorksWithModal onChangeValue={onChangeValue} />);
    await waitForI18n(comp);
    const permissionValue = comp.getAllByText("Starts with");
    expect(permissionValue[0]).toBeInTheDocument();
    expect(permissionValue[1]).toBeInTheDocument();
    expect(await comp.findByText("Is")).toBeInTheDocument();
    expect(
      await comp.findByText("Refers to the prefix of the name in the API")
    ).toBeInTheDocument();
    expect(
      await comp.findByText("Refers to the literal name in the API")
    ).toBeInTheDocument();

    userEvent.click(await comp.findByText("Is"));
    expect(await comp.findByText("Starts with")).toBeInTheDocument();
    expect(comp.queryByText("Is")).not.toBeInTheDocument();
  });
  it("should show a select component for resource prefix rule in initial state ", async () => {
    const onChangeValue = jest.fn();
    const comp = render(<InitialState onChangeValue={onChangeValue} />);
    await waitForI18n(comp);
    expect(await comp.findByText("Starts with")).toBeInTheDocument();
    userEvent.click(await comp.findByText("Starts with"));
    expect(await comp.findByText("Is")).toBeInTheDocument();
    const permissionValue = comp.getAllByText("Starts with");
    expect(permissionValue[0]).toBeInTheDocument();
    expect(permissionValue[1]).toBeInTheDocument();
    userEvent.click(await comp.findByText("Is"));
    expect(await comp.findByText("Starts with")).toBeInTheDocument();
    expect(comp.queryByText("Is")).not.toBeInTheDocument();
  });
});
