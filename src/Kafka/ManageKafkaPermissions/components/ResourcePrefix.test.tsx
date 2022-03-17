import { composeStories } from "@storybook/testing-react";
import * as stories from "./ResourcePrefix.stories";
import { userEvent } from "@storybook/testing-library";
import { render, waitForI18n } from "../../../test-utils";

const { InitialState, InvalidInput, ValidInput } = composeStories(stories);

describe("Resource type", () => {
  it("should render a text input for resource prefix", async () => {
    const onChangeValue = jest.fn();
    const comp = render(<InitialState onChangeValue={onChangeValue} />);

    await waitForI18n(comp);

    expect(
      await comp.findByPlaceholderText("Enter prefix")
    ).toBeInTheDocument();
    expect(await comp.queryByText("Required")).not.toBeInTheDocument();
    userEvent.type(comp.getByPlaceholderText("Enter prefix"), "pet");

    expect(await comp.findByDisplayValue("pet")).toBeInTheDocument;
  });
  it("should show a text input with validation error ", async () => {
    const onChangeValue = jest.fn();
    const comp = render(<InvalidInput onChangeValue={onChangeValue} />);
    await waitForI18n(comp);
    expect(
      await comp.findByPlaceholderText("Enter prefix")
    ).toBeInTheDocument();
    expect(await comp.findByText("Required")).toBeInTheDocument();
  });

  it("should show a select component for resource type with a valid value selected ", async () => {
    const onChangeValue = jest.fn();
    const comp = render(<ValidInput onChangeValue={onChangeValue} />);
    await waitForI18n(comp);

    expect(await comp.queryByText("Enter prefix")).not.toBeInTheDocument();
    expect(await comp.queryByText("Required")).not.toBeInTheDocument();
    expect(await comp.findByDisplayValue("pet")).toBeInTheDocument;
  });
});
