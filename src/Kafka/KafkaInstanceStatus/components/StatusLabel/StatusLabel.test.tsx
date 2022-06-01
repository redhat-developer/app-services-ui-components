import { composeStories } from "@storybook/testing-react";
import { render, waitForI18n } from "../../../../test-utils";
import * as stories from "./StatusLabel.stories";

const testCases = Object.values(composeStories(stories)).map((Story) => [
  Story.storyName!,
  Story,
]);

// Batch snapshot testing
test.each(testCases)("Renders %s story", async (_storyName, Story) => {
  const tree = render(<Story />);
  await waitForI18n(tree);
  expect(tree.baseElement).toMatchSnapshot();
});
