import { composeStories } from "@storybook/testing-react";
import { render, waitForI18n } from "../test-utils";
import * as stories from "./DataSciencePage.stories";

const { DataSciencePage } = composeStories(stories);

describe("DataSciencePage", () => {
  it("renders", async () => {
    const comp = render(<DataSciencePage />);
    await waitForI18n(comp);
    expect(comp.baseElement).toMatchSnapshot();

    const btnSubmit = comp.getByTestId("hero-buttonTryIt");
    expect(btnSubmit.dataset.ouiaComponentId).toBe("button-rhods-tryit");
  });
});
