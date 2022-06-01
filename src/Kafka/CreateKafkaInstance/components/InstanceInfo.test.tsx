import { userEvent } from "@storybook/testing-library";
import { composeStories } from "@storybook/testing-react";
import { render, waitForI18n } from "../../../test-utils";
import * as stories from "./InstanceInfo.stories";

const composedStories = composeStories(stories);
const testCases = Object.values(composedStories).map((Story) => [
  Story.storyName!,
  Story,
]);

describe("InstanceInfo", function () {
  // Batch snapshot testing
  test.each(testCases)("Renders %s story", async (_storyName, Story) => {
    const tree = render(<Story />);
    await waitForI18n(tree);
    expect(tree.baseElement).toMatchSnapshot();
  });

  it("should show only a skeleton and a link to the quick start guides when loading", async function () {
    const spy = jest.fn();
    const { Loading } = composedStories;
    const comp = render(<Loading onClickQuickStart={spy} />);
    await waitForI18n(comp);
    const instanceInfo = await comp.findByTestId("instance-info");
    expect(instanceInfo.textContent).toBe(
      "Instance informationLoading contentsNeed help getting started? Follow our quick start guide."
    );

    userEvent.click(
      await comp.findByText(
        "Need help getting started? Follow our quick start guide."
      )
    );

    expect(spy).toBeCalledTimes(1);
  });
});
