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
  PrefixRuleVariation,
} = composeStories(stories);

describe("Resource Name", () => {
  it("should render a select with validation message for invalid topic name", async () => {
    const onChangeValue = jest.fn();
    const comp = render(<InvalidTopicName onChangeValue={onChangeValue} />);
    await waitForI18n(comp);
    const select = comp.getByPlaceholderText("Enter name");
    expect(select).toBeInTheDocument();
    userEvent.click(select);
    await waitForPopper();
    userEvent.type(select, "..");
    await waitForPopper();
    const inputValue = comp.getByDisplayValue("..");
    expect(inputValue).toBeInTheDocument();
    const option = await comp.findByText(
      "A topic name must contain at least 3 periods (...) if periods are the only characters used."
    );
    expect(option).toBeInTheDocument();
    expect(onChangeValue).toHaveBeenCalledTimes(2);
  });
  it("should render a select with validation message for invalid consumer group characters", async () => {
    const onChange = jest.fn();
    const comp = render(
      <InvalidConsumerGroupCharacters onChangeValue={onChange} />
    );
    await waitForI18n(comp);
    await waitForPopper();
    const placeHolderText = await comp.findByPlaceholderText("Enter name");
    await waitForPopper();
    expect(placeHolderText).toBeInTheDocument();
    userEvent.click(placeHolderText);
    await waitForPopper();
    userEvent.type(placeHolderText, "$!");
    await waitForPopper();
    const invalidConsumerGroupName = await comp.findByDisplayValue("$!");
    await waitForPopper();
    expect(invalidConsumerGroupName).toBeInTheDocument();
    const option = await comp.findByText(
      "Valid characters in a consumer group ID include letters (Aa–Zz), numbers, underscores ( _ ), and hyphens ( - )."
    );
    expect(option).toBeInTheDocument();
  });
  it("should render a select with validation message for invalid length of input value", async () => {
    const onChange = jest.fn();
    const comp = render(<InvalidLength onChangeValue={onChange} />);
    await waitForI18n(comp);
    await waitForPopper();
    const placeHolderText = await comp.findByPlaceholderText("Enter name");
    await waitForPopper();
    expect(placeHolderText).toBeInTheDocument();
    userEvent.click(placeHolderText);
    await waitForPopper();
    userEvent.type(
      placeHolderText,
      "this-is-a-very-long-and-ivalid-topic-name"
    );
    await waitForPopper();
    const invalidLengthName = await comp.findByDisplayValue(
      "this-is-a-very-long-and-ivalid-topic-name"
    );
    await waitForPopper();
    expect(invalidLengthName).toBeInTheDocument();
    const option = await comp.findByText("Cannot exceed 32 characters");
    expect(option).toBeInTheDocument();
  });
  it("should render a select with validation message 'Required' for a mandatory field submitted undefined", async () => {
    const onChange = jest.fn();
    const comp = render(<RequiredField onChangeValue={onChange} />);
    await waitForI18n(comp);
    const option = await comp.findByText("Required");
    expect(option).toBeInTheDocument();
  });
  it("should render a select with validation message for invalid topic characters used", async () => {
    const onChange = jest.fn();
    const comp = render(<InvalidTopicCharacters onChangeValue={onChange} />);
    await waitForI18n(comp);
    await waitForPopper();
    const placeHolderText = await comp.findByPlaceholderText("Enter name");
    await waitForPopper();
    expect(placeHolderText).toBeInTheDocument();
    userEvent.click(placeHolderText);
    await waitForPopper();
    userEvent.type(placeHolderText, "$!");
    await waitForPopper();
    const invalidTopicName = await comp.findByDisplayValue("$!");
    await waitForPopper();
    expect(invalidTopicName).toBeInTheDocument();
    const option = await comp.findByText(
      "Valid characters in a topic name include letters (Aa-Zz), numbers, underscores ( _ ), periods ( . ), and hyphens ( - )."
    );
    expect(option).toBeInTheDocument();
  });
  it("should render a select with placeholder 'Enter prefix' with resource prefix rule: starts-with", async () => {
    const comp = render(<PrefixRuleVariation />);
    await waitForI18n(comp);
    await waitForPopper();
    const placeHolderText = await comp.findByPlaceholderText("Enter prefix");
    await waitForPopper();
    expect(placeHolderText).toBeInTheDocument();
  });
});
