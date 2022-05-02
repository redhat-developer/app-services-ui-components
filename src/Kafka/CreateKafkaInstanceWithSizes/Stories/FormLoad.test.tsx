import { userEvent } from "@storybook/testing-library";
import { composeStories } from "@storybook/testing-react";
import { renderDialog, waitForI18n, within } from "../../../test-utils";
import * as stories from "./FormLoad.stories";

const {
  QuotaAvailableOnFormLoad,
  TrialAvailableOnFormLoad,
  OverQuotaOnFormLoad,
  TrialUnavailableOnFormLoad,
  TrialUsedOnFormLoad,
  SomeRegionsDisabledOnFormLoad,
  AllRegionsDisabledOnFormLoad,
  NoRegionsReturnedFromApiForAProviderOnFormLoad,
  NoRegionsReturnedFromApiOnFormLoad,
  ErrorOnFormLoad,
  TrialSomeRegionsDisabledOnFormLoad,
  TrialAllRegionsDisabledOnFormLoad,
} = composeStories(stories);

describe("CreateKafkaInstanceWithSizes", () => {
  it("should show a form for standard instances with no alerts", async () => {
    const comp = renderDialog(<QuotaAvailableOnFormLoad />);
    await waitForI18n(comp);

    expect(await comp.queryAllByRole("alert")).toHaveLength(0);
    expect(comp.getByLabelText("Name *")).toBeEnabled();
    expect(comp.getByLabelText("Cloud provider *")).toBeEnabled();
    expect(comp.getByText("Select region")).not.toHaveAttribute("disabled");
    expect(comp.getByRole("button", { name: "Single" })).toBeDisabled();
    expect(comp.getByRole("button", { name: "Multi" })).toBeEnabled();
    expect(comp.getByRole("button", { name: "Single" })).toHaveAttribute(
      "aria-pressed",
      "false"
    );
    expect(comp.getByRole("button", { name: "Multi" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });

  it("should show a form for trial instances with an alert and AZ disabled", async () => {
    const comp = renderDialog(<TrialAvailableOnFormLoad />);
    await waitForI18n(comp);

    expect(
      await comp.queryByText(
        "You can create a trial instance to evaluate this service."
      )
    ).toBeInTheDocument();
    expect(comp.getByLabelText("Name *")).toBeEnabled();
    expect(comp.getByLabelText("Cloud provider *")).toBeEnabled();
    expect(
      within(comp.getByTestId("cloudRegion")).getAllByRole("button")[0]
    ).toBeEnabled();
    expect(comp.getByRole("button", { name: "Single" })).toBeDisabled();
    expect(comp.getByRole("button", { name: "Multi" })).toBeDisabled();
  });

  it("should show an alert when over quota and a disabled form", async () => {
    const comp = renderDialog(<OverQuotaOnFormLoad />);
    await waitForI18n(comp);

    expect(
      await comp.queryByText(
        "Your organization has no streaming units remaining."
      )
    );

    expect(comp.getByLabelText("Name *")).toBeDisabled();
    expect(comp.getByLabelText("Cloud provider *")).toBeDisabled();
    expect(
      within(comp.getByTestId("cloudRegion")).getByRole("button")
    ).toHaveAttribute("disabled");
    expect(comp.getByRole("button", { name: "Single" })).toBeDisabled();
    expect(comp.getByRole("button", { name: "Multi" })).toBeDisabled();
  });

  it("should show an alert when trial instances are unavailable, and a disabled form", async () => {
    const comp = renderDialog(<TrialUnavailableOnFormLoad />);
    await waitForI18n(comp);

    expect(
      await comp.queryByText(
        "All available trial instances are currently in use. Try again later."
      )
    ).toBeInTheDocument();

    expect(comp.getByLabelText("Name *")).toBeDisabled();
    expect(comp.getByLabelText("Cloud provider *")).toBeDisabled();
    expect(
      within(comp.getByTestId("cloudRegion")).getAllByRole("button")[0]
    ).toBeDisabled();
    expect(comp.getByRole("button", { name: "Single" })).toBeDisabled();
    expect(comp.getByRole("button", { name: "Multi" })).toBeDisabled();
  });

  it("should show an alert when a trial instance has been already created, and a disabled form", async () => {
    const comp = renderDialog(<TrialUsedOnFormLoad />);
    await waitForI18n(comp);

    expect(
      await comp.queryByText(
        "You can deploy 1 instance at a time. To deploy a new instance, delete your existing one first.",
        { exact: false }
      )
    ).toBeInTheDocument();

    expect(comp.getByLabelText("Name *")).toBeDisabled();
    expect(comp.getByLabelText("Cloud provider *")).toBeDisabled();
    expect(
      within(comp.getByTestId("cloudRegion")).getAllByRole("button")[0]
    ).toBeDisabled();
    expect(comp.getByRole("button", { name: "Single" })).toBeDisabled();
    expect(comp.getByRole("button", { name: "Multi" })).toBeDisabled();
  });

  it("should show 'EU, Ireland' as disabled", async () => {
    const comp = renderDialog(<SomeRegionsDisabledOnFormLoad />);
    await waitForI18n(comp);
    const selectRegion = comp.getByText("Select region");

    userEvent.click(selectRegion);
    const regionList = comp.getByRole("listbox");
    const regionOptionEuIreland =
      within(regionList).getAllByRole("presentation")[0];

    expect(within(regionOptionEuIreland).getByRole("option")).toHaveClass(
      "pf-m-disabled"
    );
  });

  it("should show 'EU, Ireland' as disabled and show inline warning message for region for trial kafka", async () => {
    const comp = renderDialog(<TrialSomeRegionsDisabledOnFormLoad />);
    await waitForI18n(comp);

    expect(
      await comp.queryByText(
        "More cloud regions are available with a subscription.",
        { exact: false }
      )
    ).toBeInTheDocument();

    expect(
      await comp.queryByText(
        "One or more regions in the selected cloud provider are temporarily unavailable. Select an available region or try again later."
      )
    ).toBeInTheDocument();

    expect(comp.getByLabelText("Name *")).toBeEnabled();
    expect(comp.getByLabelText("Cloud provider *")).toBeEnabled();
    expect(
      within(comp.getByTestId("cloudRegion")).getAllByRole("button")[0]
    ).toBeEnabled();
    expect(comp.getByRole("button", { name: "Single" })).toBeDisabled();
    expect(comp.getByRole("button", { name: "Multi" })).toBeEnabled();

    const selectRegion = comp.getByText("Select region");

    userEvent.click(selectRegion);
    const regionList = comp.getByRole("listbox");
    const regionOptionEuIreland =
      within(regionList).getAllByRole("presentation")[0];

    expect(within(regionOptionEuIreland).getByRole("option")).toHaveClass(
      "pf-m-disabled"
    );
  });

  it("should show an alert when all cloud regions are disabled, and show inline error message for region", async () => {
    const comp = renderDialog(<AllRegionsDisabledOnFormLoad />);
    await waitForI18n(comp);

    expect(
      await comp.queryByText(
        "All regions in the selected cloud provider are temporarily unavailable.",
        { exact: false }
      )
    ).toBeInTheDocument();

    expect(comp.getByLabelText("Name *")).toBeEnabled();
    expect(comp.getByLabelText("Cloud provider *")).toBeEnabled();
    expect(
      within(comp.getByTestId("cloudRegion")).getAllByRole("button")[0]
    ).toBeEnabled();

    const selectRegion = comp.getByText("Regions temporarily unavailable");

    userEvent.click(selectRegion);
    const regionList = comp.getByRole("listbox");
    const regionOption1 = within(regionList).getAllByRole("presentation")[0];
    const regionOption2 = within(regionList).getAllByRole("presentation")[1];

    expect(within(regionOption1).getByRole("option")).toHaveClass(
      "pf-m-disabled"
    );
    expect(within(regionOption2).getByRole("option")).toHaveClass(
      "pf-m-disabled"
    );

    expect(comp.getByRole("button", { name: "Single" })).toBeDisabled();
    expect(comp.getByRole("button", { name: "Multi" })).toBeEnabled();
  });

  it("should show an alert when all cloud regions are disabled, and show inline error message for region for trial kafka", async () => {
    const comp = renderDialog(<TrialAllRegionsDisabledOnFormLoad />);
    await waitForI18n(comp);

    expect(
      await comp.queryByText(
        "All regions in the selected cloud provider are temporarily unavailable.",
        { exact: false }
      )
    ).toBeInTheDocument();

    expect(comp.getByLabelText("Name *")).toBeEnabled();
    expect(comp.getByLabelText("Cloud provider *")).toBeEnabled();
    expect(
      within(comp.getByTestId("cloudRegion")).getAllByRole("button")[0]
    ).toBeEnabled();

    const selectRegion = comp.getByText("Regions temporarily unavailable");

    userEvent.click(selectRegion);
    const regionList = comp.getByRole("listbox");
    const regionOption1 = within(regionList).getAllByRole("presentation")[0];
    const regionOption2 = within(regionList).getAllByRole("presentation")[1];

    expect(within(regionOption1).getByRole("option")).toHaveClass(
      "pf-m-disabled"
    );
    expect(within(regionOption2).getByRole("option")).toHaveClass(
      "pf-m-disabled"
    );

    expect(comp.getByRole("button", { name: "Single" })).toBeDisabled();
    expect(comp.getByRole("button", { name: "Multi" })).toBeEnabled();
  });

  it("should show a invalid helper text for AWS", async () => {
    const comp = renderDialog(
      <NoRegionsReturnedFromApiForAProviderOnFormLoad />
    );
    await waitForI18n(comp);

    expect(
      comp.getByText(
        "All regions in the selected cloud provider are temporarily unavailable.",
        { exact: false }
      )
    ).toBeInTheDocument();
  });

  it("should show an alert when no cloud region is available, and show inline message for cloud region", async () => {
    const comp = renderDialog(<NoRegionsReturnedFromApiOnFormLoad />);
    await waitForI18n(comp);

    expect(
      await comp.queryByText(
        "All regions in the selected cloud provider are temporarily unavailable.",
        { exact: false }
      )
    ).toBeInTheDocument();

    expect(comp.getByLabelText("Name *")).toBeEnabled();
    expect(comp.getByLabelText("Cloud provider *")).toBeEnabled();
    expect(
      within(comp.getByTestId("cloudRegion")).getAllByRole("button")[0]
    ).toBeEnabled();
    expect(comp.getByRole("button", { name: "Single" })).toBeDisabled();
    expect(comp.getByRole("button", { name: "Multi" })).toBeEnabled();
  });

  it("should show an alert when a generic error contacting the API happened when opening the modal, and a disabled form", async () => {
    const comp = renderDialog(<ErrorOnFormLoad />);
    await waitForI18n(comp);

    expect(
      await comp.queryByText(
        "There was a problem processing the request. Please try again."
      )
    ).toBeInTheDocument();

    expect(comp.getByLabelText("Name *")).toBeDisabled();
    expect(comp.getByLabelText("Cloud provider *")).toBeDisabled();
    expect(
      within(comp.getByTestId("cloudRegion")).getByRole("button")
    ).toBeDisabled();
    expect(comp.getByRole("button", { name: "Single" })).toBeDisabled();
    expect(comp.getByRole("button", { name: "Multi" })).toBeDisabled();
  });
});
