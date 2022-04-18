import { composeStories } from "@storybook/testing-react";
import * as stories from "./ResourceName.stories";
import { userEvent } from "@storybook/testing-library";
import { render, waitForI18n, waitForPopper } from "../../../test-utils";

const {
  InvalidTopicName,
  InvalidConsumerGroupCharacters,
  InvalidLength,
  InvalidTopicCharacters,
  RequiredField,
} = composeStories(stories);

describe("Resource Name", () => {
  it("should render a select with validation message for invalid topic length", async () => {
    const comp = render(<InvalidTopicName />);
    await waitForI18n(comp);
    const select = comp.getByPlaceholderText("Enter name");
    userEvent.click(select);
    await waitForPopper();
    userEvent.type(select, "..");
    const option = await comp.findByText(
      "A topic name must contain at least 3 periods (...) if periods are the only characters used"
    );
    expect(option).toBeInTheDocument();
  });
  it("should render a select with validation message for invalid consumer group characters", async () => {
    const comp = render(<InvalidConsumerGroupCharacters />);
    await waitForI18n(comp);
    const select = comp.getByPlaceholderText("Enter name");
    userEvent.click(select);
    await waitForPopper();
    userEvent.type(select, "$!");
    const option = await comp.findByText(
      "Valid characters in a consumer group ID include letters (Aa–Zz), numbers, underscores ( _ ), and hyphens ( - )."
    );
    expect(option).toBeInTheDocument();
  });
  xit("should render a select with validation message for invalid length of input value", async () => {
    const comp = render(<InvalidLength />);
    await waitForI18n(comp);
    const select = comp.getByPlaceholderText("Enter name");
    userEvent.click(select);
    await waitForPopper();
    userEvent.type(select, "this-is-a-very-long-and-ivalid-topic-name");
    const option = await comp.findByText("Cannot exceed 32 characters");
    expect(option).toBeInTheDocument();
  });
  it("should render a select with validation message 'Required' for a mandatory field submitted undefined", async () => {
    const comp = render(<RequiredField />);
    await waitForI18n(comp);
    const option = await comp.findByText("Required");
    expect(option).toBeInTheDocument();
  });
  xit("should render a select with validation message for invalid topic characters used", async () => {
    const comp = render(<InvalidTopicCharacters />);
    await waitForI18n(comp);
    const select = comp.getByPlaceholderText("Enter name");
    userEvent.click(select);
    userEvent.type(select, "$!");
    const option = await comp.findByText(
      "Valid characters in a topic name include letters (Aa-Zz), numbers, underscores ( _ ), periods ( . ), and hyphens ( - )."
    );
    expect(option).toBeInTheDocument();
  });
});
