import { composeStories } from "@storybook/testing-react";
import { render, waitForI18n } from "../test-utils";
import * as stories from "./APIManagementPage.stories";

const { APIManagementPage } = composeStories(stories);

describe("ApiManagementPage", () => {
  it("renders", async () => {
    const comp = render(<APIManagementPage />);
    await waitForI18n(comp);
    expect(comp.baseElement).toMatchSnapshot();
  });
});
