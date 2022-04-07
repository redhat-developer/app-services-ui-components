import { composeStories } from "@storybook/testing-react";
import * as stories from "./ResourcePrefix.stories";
import { userEvent } from "@storybook/testing-library";
import { focusSelect } from "../../../shared";
import { render, waitForI18n } from "../../../test-utils";

const {
  InvalidTopicLength,
  InvalidConsumerGroupCharacters,
  InvalidLength,
  InvalidTopicCharacters,
} = composeStories(stories);

describe("Resource Prefix", () => {
  jest.useFakeTimers();
  xit("should render a select with validation message for invalid topic length", async () => {
    const comp = render(<InvalidTopicLength />);
    await waitForI18n(comp);
    const select = await focusSelect(comp);

    userEvent.type(select, "..");
    const option = await comp.findByText(
      "A topic name must contain at least 3 periods (...) if periods are the only characters used"
    );
    expect(option).toBeInTheDocument();
  });

  xit("should render a typeahead select with a validation error for invalid consumer group characters typed", async () => {
    const comp = render(<InvalidConsumerGroupCharacters />);
    await waitForI18n(comp);
    const select = await focusSelect(comp);

    userEvent.type(select, "$!");
    const option = await comp.findByText(
      "Valid characters in a consumer group ID include letters (Aa–Zz), numbers, underscores ( _ ), and hyphens ( - )."
    );
    expect(option).toBeInTheDocument();
  });

  xit("should render a typeahead select with a validation error for exceeding maximum allowed characters", async () => {
    const comp = render(<InvalidLength />);
    await waitForI18n(comp);
    const select = await focusSelect(comp);

    userEvent.type(
      select,
      "this-is-a-very-long-invalid-name-exceeding--32-characters"
    );
    const option = await comp.findByText("Cannot exceed 32 characters");
    expect(option).toBeInTheDocument();
  });

  it("should render a typeahead select with a validation error for invalid topic characters typed", async () => {
    const comp = render(<InvalidTopicCharacters />);
    await waitForI18n(comp);
    const select = await focusSelect(comp);

    userEvent.type(select, "$!");
    const option = await comp.findByText(
      "Valid characters in a topic name include letters (Aa-Zz), numbers, underscores ( _ ), periods ( . ), and hyphens ( - )."
    );
    expect(option).toBeInTheDocument();
  });
});
