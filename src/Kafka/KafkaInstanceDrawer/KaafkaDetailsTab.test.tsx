import { render, waitForI18n } from "../../test-utils";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./KafkaDetailsTab.stories";

const {
  TrialInstanceJustCreated,
  TrialInstanceNearExpiration,
  TrialIntsanceRecentlyCreated,
  StandardInstanceCreated,
} = composeStories(stories);

describe("Details Tab", () => {
  it("renders standard instance", async () => {
    const comp = render(<StandardInstanceCreated />);
    await waitForI18n(comp);
    expect(comp.baseElement).toMatchSnapshot();
  });
  it("renders trial instance just created", async () => {
    const comp = render(<TrialInstanceJustCreated />);
    await waitForI18n(comp);
    expect(await comp.findByText("Info alert:")).toBeInTheDocument();
  });

  it("renders trial instance recently created", async () => {
    const comp = render(<TrialIntsanceRecentlyCreated />);
    await waitForI18n(comp);
    expect(await comp.findByText("Warning alert:")).toBeInTheDocument();
  });

  it("renders trial instance about to expire", async () => {
    const comp = render(<TrialInstanceNearExpiration />);
    await waitForI18n(comp);
    expect(await comp.findByText("Danger alert:")).toBeInTheDocument();
  });
});
