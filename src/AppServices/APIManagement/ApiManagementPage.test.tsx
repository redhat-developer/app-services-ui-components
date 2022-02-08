import React from "react";
import { render, suspenseTestId, waitFor } from "../../test-utils";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./APIManagementPage.stories";

const { Example } = composeStories(stories);

describe("APIManagementPage", () => {
  it("renders", async () => {
    const comp = await render(<Example />);
    await waitFor(() => {
      expect(comp.queryByTestId(suspenseTestId)).not.toBeInTheDocument();
    });
    expect(comp.baseElement).toMatchSnapshot();
  });
});
