import { composeStories } from "@storybook/testing-react";
import { render, waitForI18n } from "../test-utils";
import * as stories from "./OverviewPageV4.stories";

const { OverviewPageV4 } = composeStories(stories);

describe("OverviewPage", () => {
  it("renders", async () => {
    const comp = render(<OverviewPageV4 />);
    await waitForI18n(comp);
    expect(comp.baseElement).toMatchSnapshot();
    expect(comp.getByTestId("cardRHODS-buttonTryIt")).toHaveAttribute(
      "data-ouia-component-id",
      "button-rhods-tryit"
    );
  });
});
