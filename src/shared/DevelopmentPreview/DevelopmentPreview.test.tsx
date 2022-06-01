import { composeStories } from "@storybook/testing-react";
import { render } from "../../test-utils";
import * as stories from "./DevelopmentPreview.stories";

const testCases = Object.values(composeStories(stories)).map((Story) => [
  Story.storyName!,
  Story,
]);

// Batch snapshot testing
test.each(testCases)("Renders %s story", (_storyName, Story) => {
  const tree = render(<Story />);
  expect(tree.baseElement).toMatchSnapshot();
});
