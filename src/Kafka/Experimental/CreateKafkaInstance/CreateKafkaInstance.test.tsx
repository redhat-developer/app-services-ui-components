import { composeStories } from "@storybook/testing-react";
import {
  renderDialog,
  waitForI18n,
  waitForPopper,
  within,
} from "../../../test-utils";
import * as stories from "./CreateKafkaInstance.stories";
import { userEvent } from "@storybook/testing-library";

const {
  Default,
  LoadingData,
  QuotaAvailableOnFormLoad,
  TrialAvailableOnFormLoad,
  OverQuotaOnFormLoad,
  OverQuotaOnFormSubmit,
  TrialUnavailableOnFormLoad,
  TrialUnavailableOnFormSubmit,
  TrialUsedOnFormLoad,
  SomeRegionsDisabledOnFormLoad,
  AllRegionsDisabledOnFormLoad,
  NoRegionsReturnedFromApiForAProviderOnFormLoad,
  NoRegionsReturnedFromApiOnFormLoad,
  ErrorOnFormLoad,
  CreationInProgress,
  NameTakenOnFormSubmit,
  GenericErrorOnFormSubmit,
  FormErrorsCantSubmit,
  VariantCanCustomizeDefaultProvider,
  VariantSingleProvider,
  VariantBothAvailabilityZonesEnabledWithNoTooltip,
  VariantOnlySingleAZEnabledWithRightTooltip,
  VariantNoDefaultsRequired,
  TrialSomeRegionsDisabledOnFormLoad,
  TrialAllRegionsDisabledOnFormLoad,
} = composeStories(stories);

describe("CreateKafkaInstance", () => {
  it("should persist ouiaComponentId of create instance button", async () => {
    const comp = renderDialog(<Default />);
    await waitForI18n(comp);

    const btnSubmit = comp.getByRole("button", { name: "Create instance" });

    expect(btnSubmit.dataset.ouiaComponentId).toBe("button-create");
  });

  it("should show a skeleton loader while waiting for the data", async () => {
    const spy = jest.fn();

    const comp = renderDialog(<LoadingData onClickQuickStart={spy} />);
    await waitForI18n(comp);

    expect(
      comp.getByText("Checking if new Kafka instances are available")
    ).toBeInTheDocument();

    expect(comp.getByTestId("modalCreateKafka-buttonSubmit")).toBeDisabled();

    userEvent.click(comp.getByText("Follow our quick start guide."));

    expect(spy).toBeCalledTimes(1);
  });

  it("should show a form for standard instances with no alerts", async () => {
    const comp = renderDialog(<QuotaAvailableOnFormLoad />);
    await waitForI18n(comp);

    expect(await comp.queryAllByRole("alert")).toHaveLength(0);
    expect(comp.getByLabelText("Name *")).toBeEnabled();
    expect(comp.getByLabelText("Cloud provider *")).toBeEnabled();
    expect(comp.getByLabelText("Cloud region *")).toBeEnabled();
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
    expect(comp.getByLabelText("Cloud region *")).toBeEnabled();
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
    expect(comp.getByLabelText("Cloud region *")).toBeDisabled();
    expect(comp.getByRole("button", { name: "Single" })).toBeDisabled();
    expect(comp.getByRole("button", { name: "Multi" })).toBeDisabled();
  });

  it("should show an alert when over quota after submitting the form", async () => {
    const comp = renderDialog(<OverQuotaOnFormSubmit />);
    await waitForI18n(comp);
    await waitForPopper();
    await OverQuotaOnFormSubmit.play({
      canvasElement: comp.container,
    });

    expect(
      await comp.queryByText(
        "Your organization reached the limit of Kafka instances available for creation."
      )
    ).toBeInTheDocument();

    expect(comp.getByLabelText("Name *")).toBeEnabled();
    expect(comp.getByLabelText("Cloud provider *")).toBeEnabled();
    expect(comp.getByLabelText("Cloud region *")).toBeEnabled();
    expect(comp.getByRole("button", { name: "Single" })).toBeDisabled();
    expect(comp.getByRole("button", { name: "Multi" })).toBeEnabled();
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
    expect(comp.getByLabelText("Cloud region *")).toBeDisabled();
    expect(comp.getByRole("button", { name: "Single" })).toBeDisabled();
    expect(comp.getByRole("button", { name: "Multi" })).toBeDisabled();
  });

  it("should show an alert when trial instances are unavailable after submitting the form", async () => {
    const comp = renderDialog(<TrialUnavailableOnFormSubmit />);
    await waitForI18n(comp);
    await waitForPopper();
    await TrialUnavailableOnFormSubmit.play({
      canvasElement: comp.container,
    });

    expect(
      await comp.queryByText(
        "You can create a trial instance to evaluate this service."
      )
    ).toBeInTheDocument();

    expect(comp.getByLabelText("Name *")).toBeEnabled();
    expect(comp.getByLabelText("Cloud provider *")).toBeEnabled();
    expect(comp.getByLabelText("Cloud region *")).toBeEnabled();
    expect(comp.getByRole("button", { name: "Single" })).toBeDisabled();
    expect(comp.getByRole("button", { name: "Multi" })).toBeEnabled();
  });

  it("should show an alert when a trial instance has been already created, and a disabled form", async () => {
    const comp = renderDialog(<TrialUsedOnFormLoad />);
    await waitForI18n(comp);

    expect(
      await comp.queryByText(
        "You can deploy 1 instance at a time. To deploy a new instance, delete your existing one first."
      )
    ).toBeInTheDocument();

    expect(comp.getByLabelText("Name *")).toBeDisabled();
    expect(comp.getByLabelText("Cloud provider *")).toBeDisabled();
    expect(comp.getByLabelText("Cloud region *")).toBeDisabled();
    expect(comp.getByRole("button", { name: "Single" })).toBeDisabled();
    expect(comp.getByRole("button", { name: "Multi" })).toBeDisabled();
  });

  it("should show 'EU, Ireland' as disabled", async () => {
    const comp = renderDialog(<SomeRegionsDisabledOnFormLoad />);
    await waitForI18n(comp);

    userEvent.click(comp.getByLabelText("Cloud region *"));

    expect(comp.getByText("EU, Ireland")).toBeDisabled();
  });

  it("should show 'EU, Ireland' as disabled and show inline warning message for region for trial kafka", async () => {
    const comp = renderDialog(<TrialSomeRegionsDisabledOnFormLoad />);
    await waitForI18n(comp);

    expect(
      await comp.queryByText(
        "More options are available with a subscription.",
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
    expect(comp.getByLabelText("Cloud region *")).toBeEnabled();
    expect(comp.getByRole("button", { name: "Single" })).toBeDisabled();
    expect(comp.getByRole("button", { name: "Multi" })).toBeEnabled();

    userEvent.click(comp.getByLabelText("Cloud region *"));

    expect(comp.getByText("EU, Ireland")).toBeDisabled();
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
    expect(comp.getByLabelText("Cloud region *")).toBeEnabled();
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
    expect(comp.getByLabelText("Cloud region *")).toBeEnabled();
    expect(comp.getByRole("button", { name: "Single" })).toBeDisabled();
    expect(comp.getByRole("button", { name: "Multi" })).toBeEnabled();
  });

  it("should show a invalid helper text for AWS", async () => {
    const comp = renderDialog(
      <NoRegionsReturnedFromApiForAProviderOnFormLoad />
    );
    await waitForI18n(comp);

    userEvent.click(comp.getByLabelText("Cloud region *"));

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
    expect(comp.getByLabelText("Cloud region *")).toBeEnabled();
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
    expect(comp.getByLabelText("Cloud region *")).toBeDisabled();
    expect(comp.getByRole("button", { name: "Single" })).toBeDisabled();
    expect(comp.getByRole("button", { name: "Multi" })).toBeDisabled();
  });

  it("should show a loading spinner in the create button and a disabled form when waiting for the creation", async () => {
    const comp = renderDialog(<CreationInProgress />);
    await waitForI18n(comp);
    await CreationInProgress.play({ canvasElement: comp.container });

    expect(await comp.queryAllByRole("alert")).toHaveLength(0);

    expect(comp.getByLabelText("Name *")).toBeDisabled();
    expect(comp.getByLabelText("Cloud provider *")).toBeDisabled();
    expect(comp.getByLabelText("Cloud region *")).toBeDisabled();
    expect(comp.getByRole("button", { name: "Single" })).toBeDisabled();
    expect(comp.getByRole("button", { name: "Multi" })).toBeDisabled();

    expect(comp.getByRole("progressbar")).toBeInTheDocument();

    expect(comp.getByTestId("modalCreateKafka-buttonSubmit")).toBeDisabled();
  });

  it("should show a error alert if the instance name is already taken", async () => {
    const comp = renderDialog(<NameTakenOnFormSubmit />);
    await waitForI18n(comp);
    await NameTakenOnFormSubmit.play({ canvasElement: comp.container });

    expect(
      await comp.queryByText("Address form errors to proceed.")
    ).toBeInTheDocument();

    expect(comp.getByLabelText("Name *")).toBeInvalid();
  });

  it("should show a error alert if an error occurred while processing the creation", async () => {
    const comp = renderDialog(<GenericErrorOnFormSubmit />);
    await waitForI18n(comp);
    await GenericErrorOnFormSubmit.play({ canvasElement: comp.container });

    expect(
      await comp.queryByText(
        "There was a problem processing the request. Please try again."
      )
    ).toBeInTheDocument();
  });

  it("should show highlight all fields as invalid", async () => {
    const comp = renderDialog(<FormErrorsCantSubmit />);
    await waitForI18n(comp);
    await FormErrorsCantSubmit.play({ canvasElement: comp.container });

    expect(
      await comp.queryByText("Address form errors to proceed.")
    ).toBeInTheDocument();

    expect(comp.getByLabelText("Name *")).toBeInvalid();
    expect(comp.getByLabelText("Cloud provider *")).toBeInvalid();
    expect(comp.getByLabelText("Cloud region *")).toBeInvalid();
    expect(
      await within(comp.getByTestId("az")).findByText("Required")
    ).toBeInTheDocument();
  });

  it("should show the right default cloud provider", async () => {
    const comp = renderDialog(<VariantCanCustomizeDefaultProvider />);
    await waitForI18n(comp);

    expect(comp.getByDisplayValue("Microsoft Azure"));
  });

  it("should show a single cloud provider", async () => {
    const comp = renderDialog(<VariantSingleProvider />);
    await waitForI18n(comp);

    expect(comp.queryByDisplayValue("Microsoft Azure")).toBeNull();
  });

  it("should show both AZ enabled", async () => {
    const comp = renderDialog(
      <VariantBothAvailabilityZonesEnabledWithNoTooltip />
    );
    await waitForI18n(comp);

    expect(comp.getByRole("button", { name: "Single" })).toBeEnabled();
    expect(comp.getByRole("button", { name: "Multi" })).toBeEnabled();
  });

  it("should show both only Single AZ enabled", async () => {
    const comp = renderDialog(<VariantOnlySingleAZEnabledWithRightTooltip />);
    await waitForI18n(comp);

    expect(comp.getByRole("button", { name: "Single" })).toBeEnabled();
    expect(comp.getByRole("button", { name: "Multi" })).toBeDisabled();
  });

  it("should work with no defaults", async () => {
    const comp = renderDialog(<VariantNoDefaultsRequired />);
    await waitForI18n(comp);

    expect(comp.getByDisplayValue("Select cloud provider"));
    expect(comp.getByDisplayValue("Select region"));
    expect(comp.getByRole("button", { name: "Single" })).toHaveAttribute(
      "aria-pressed",
      "false"
    );
    expect(comp.getByRole("button", { name: "Multi" })).toHaveAttribute(
      "aria-pressed",
      "false"
    );
  });
});
