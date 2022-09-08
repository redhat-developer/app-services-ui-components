import { userEvent } from "@storybook/testing-library";
import { composeStories } from "@storybook/testing-react";
import { render, waitForI18n } from "../../../test-utils";
import { RetentionSizeUnits } from "../types";
import * as stories from "./AdvanceTopic.stories";

const { AdvanceTopic } = composeStories(stories);
jest.setTimeout(10000);
describe("Create advance topic", () => {
  it("should render an advanced topic creation page", async () => {
    const comp = render(<AdvanceTopic />);
    await waitForI18n(comp);
    userEvent.type(await comp.findByPlaceholderText("Enter topic name"), "$");
    expect(
      comp.getByText(
        "Must be letters (Aa-Zz), numbers, underscores ( _ ), periods ( . ), or hyphens ( - )"
      )
    ).toBeInTheDocument();
    const input = await comp.findByDisplayValue("$");
    userEvent.clear(input);
    userEvent.type(await comp.findByPlaceholderText("Enter topic name"), "..");
    expect(
      comp.getByText(
        "Must contain at least 3 periods ( ... ) if periods are the only characters used"
      )
    ).toBeInTheDocument();
    userEvent.clear(input);
    userEvent.type(
      await comp.findByPlaceholderText("Enter topic name"),
      "..............................................................................................................................................................................................................................................................."
    );
    expect(comp.getByText("Cannot exceed 249 characters")).toBeInTheDocument();
    userEvent.clear(input);
    userEvent.type(await comp.findByPlaceholderText("Enter topic name"), "as");
    userEvent.click(await comp.findByText("days"));
    userEvent.click(await comp.findByText("hours"));

    const unlimited = await comp.findAllByLabelText("Unlimited");
    userEvent.click(unlimited[0]);
    const custom = await comp.findAllByDisplayValue(RetentionSizeUnits.CUSTOM);
    userEvent.click(custom[0]);
    userEvent.click(await comp.findByText("bytes"));
    userEvent.click(await comp.findByText("tebibytes"));
    //userEvent.click(await comp.findByValue)
  });
});
