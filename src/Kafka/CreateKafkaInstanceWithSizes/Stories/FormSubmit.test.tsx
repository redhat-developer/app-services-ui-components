import { composeStories } from "@storybook/testing-react";
import { renderDialog, waitForI18n, waitForPopper } from "../../../test-utils";
import * as stories from "./FormSubmit.stories";

const {
  OverQuotaOnFormSubmit,
  TrialUnavailableOnFormSubmit,
  NameTakenOnFormSubmit,
  GenericErrorOnFormSubmit,
  FormErrorsCantSubmit,
} = composeStories(stories);

describe("CreateKafkaInstanceWithSizes", () => {
  it("should show an alert when over quota after submitting the form", async () => {
    const comp = renderDialog(<OverQuotaOnFormSubmit />);
    await waitForI18n(comp);
    await waitForPopper();
    await OverQuotaOnFormSubmit.play({
      canvasElement: comp.container,
    });

    expect(
      await comp.queryByText(
        "The selected size requires more streaming units. Your organization has 3 of 5 streaming units remaining. To deploy a new instance, reduce its size, delete an existing one first",
        { exact: false }
      )
    ).toBeInTheDocument();
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
  });
});
