import { composeStories } from "@storybook/testing-react";
import { render, waitForI18n } from "../../../test-utils";
import * as stories from "./DetailsTab.stories";

const {
  TrialInstanceJustCreated,
  TrialInstanceNearExpiration,
  TrialInstanceRecentlyCreated,
  StandardInstanceCreated,
  MissingDataShownAsSkeletonLoaders,
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
    const comp = render(<TrialInstanceRecentlyCreated />);
    await waitForI18n(comp);
    expect(await comp.findByText("Warning alert:")).toBeInTheDocument();
  });

  it("renders trial instance about to expire", async () => {
    const comp = render(<TrialInstanceNearExpiration />);
    await waitForI18n(comp);
    expect(await comp.findByText("Danger alert:")).toBeInTheDocument();
  });

  it("renders prepaid billing option", async () => {
    const comp = render(<StandardInstanceCreated billing={"prepaid"} />);
    await waitForI18n(comp);
    expect(comp.getByText("Red Hat prepaid"));
  });

  it("renders aws marketplace billing option", async () => {
    const comp = render(
      <StandardInstanceCreated
        billing={{ marketplace: "aws", subscription: "aws-123" }}
      />
    );
    await waitForI18n(comp);

    expect(comp.getByText("AWS Marketplace", { exact: false }));
    expect(comp.getByText("aws-123", { exact: false }));
  });

  it("renders azure marketplace billing option", async () => {
    const comp = render(
      <StandardInstanceCreated
        billing={{ marketplace: "azure", subscription: "azure-123" }}
      />
    );
    await waitForI18n(comp);
    expect(comp.getByText("Azure Marketplace", { exact: false }));
    expect(comp.getByText("azure-123", { exact: false }));
  });

  it("renders red hat marketplace billing option", async () => {
    const comp = render(
      <StandardInstanceCreated
        billing={{ marketplace: "rhm", subscription: "rhm-123" }}
      />
    );
    await waitForI18n(comp);
    expect(comp.getByText("Red Hat Marketplace", { exact: false }));
    expect(comp.getByText("rhm-123", { exact: false }));
  });

  it("renders loaders for undefined data", async () => {
    const comp = render(<MissingDataShownAsSkeletonLoaders />);
    await waitForI18n(comp);

    expect(comp.getByText("Loading Size"));
    expect(comp.getByText("Loading Ingress"));
    expect(comp.getByText("Loading Egress"));
    expect(comp.getByText("Loading Storage"));
    expect(comp.getByText("Loading Partitions"));
    expect(comp.getByText("Loading Client connections"));
    expect(comp.getByText("Loading Connection rate"));
    expect(comp.getByText("Loading Message size"));
    expect(comp.getByText("Loading Billing"));
  });
});
