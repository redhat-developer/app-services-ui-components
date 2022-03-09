import { render, waitForI18n } from "../../test-utils";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./KafkaConnectionTab.stories";

const { ConnectionTab, ConnectionTabWhenkafkaCreationPending } =
  composeStories(stories);

describe("OverviewPage", () => {
  it("renders", async () => {
    const comp = render(<ConnectionTab />);
    await waitForI18n(comp);
    expect(comp.baseElement).toMatchSnapshot();
  });

  it("CopyClipboard Disabled when the kafka creating is pending", async () => {
    const comp = render(<ConnectionTab />);
    await waitForI18n(comp);
    expect(await comp.findByLabelText("Bootstrap server")).toBeEnabled;
    expect(await comp.findByLabelText("Token endpoint URL")).toBeEnabled;
  });

  it("CopyClipboard Disabled when the kafka creating is pending", async () => {
    const comp = render(<ConnectionTabWhenkafkaCreationPending />);
    await waitForI18n(comp);
    expect(await comp.queryByLabelText("Token endpoint URL")).toBe(null);
  });
});
