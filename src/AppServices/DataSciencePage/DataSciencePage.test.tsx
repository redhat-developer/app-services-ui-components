import React from "react";
import { render, waitForI18n } from "../../test-utils";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./DataSciencePage.stories";

const { Example } = composeStories(stories);

describe("DataSciencePage", () => {
  it("renders", async () => {
    const comp = render(<Example />);
    await waitForI18n(comp);
    expect(comp.baseElement).toMatchSnapshot();
  });
});
