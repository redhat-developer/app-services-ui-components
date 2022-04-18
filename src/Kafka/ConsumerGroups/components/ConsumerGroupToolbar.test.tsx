import { userEvent } from "@storybook/testing-library";
import { composeStories } from "@storybook/testing-react";
import { render, waitForI18n } from "../../../test-utils";
import * as stories from "./ConsumerGroupToolbar.stories";

const { ConsumerToolbar } = composeStories(stories);

describe("Consumer group Toolbar", () => {
  it("Search button will be disabled when input is not provided", async () => {
    const search = jest.fn();
    const comp = render(<ConsumerToolbar onSearch={search} />);
    await waitForI18n(comp);

    expect(
      comp.getByRole("button", { name: "Search consumer group button" })
    ).toBeDisabled();
    expect(search).toBeCalledTimes(0);
  });

  it("Enable search button when the input text is provided", async () => {
    const search = jest.fn();
    const comp = render(<ConsumerToolbar onSearch={search} />);
    await waitForI18n(comp);
    userEvent.type(
      await comp.findByLabelText("Consumer group search input"),
      "Hema"
    );
    expect(
      await comp.findByLabelText("Consumer group search input")
    ).toHaveValue("Hema");
    expect(
      comp.getByRole("button", { name: "Search consumer group button" })
    ).toBeEnabled();

    userEvent.click(
      comp.getByRole("button", { name: "Search consumer group button" })
    );
    expect(search).toBeCalledTimes(1);
  });
});
