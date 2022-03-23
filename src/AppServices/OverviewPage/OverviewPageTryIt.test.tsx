import { composeStories } from "@storybook/testing-react";
import { render, waitForI18n, waitForPopper, within } from "../../test-utils";

import * as stories from "./OverviewPage.stories";

const { Example } = composeStories(stories);

describe("TryIt", () => {
  it("should persist ouiaComponentId of Try it button", async () => {
    const comp = render(<Example />);
    await waitForI18n(comp);

    const btnSubmit = comp.getByTestId("cardRHODS-buttonTryIt");

    expect(btnSubmit.dataset.ouiaComponentId).toBe("button-rhods-tryit");
  });
});
