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
});
