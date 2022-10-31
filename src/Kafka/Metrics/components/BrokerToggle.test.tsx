import { userEvent } from "@storybook/testing-library";
import { composeStories } from "@storybook/testing-react";
import { render, waitForI18n } from "../../../test-utils";
import * as stories from "./BrokerToggle.stories";

const { Total } = composeStories(stories);

describe("FieldAZ", () => {
  it("can change value", async () => {
    const changeSpy = jest.fn();

    const comp = render(<Total onChange={changeSpy} />);
    await waitForI18n(comp);
    expect(changeSpy).toBeCalledTimes(0);
    userEvent.click(comp.getByText("Total"));
    expect(changeSpy).toHaveBeenLastCalledWith("total");
    userEvent.click(comp.getByText("Per broker"));
    expect(changeSpy).toHaveBeenLastCalledWith("perBroker");
  });
});
