import { userEvent } from "@storybook/testing-library";
import { composeStories } from "@storybook/testing-react";
import { renderDialog, waitForI18n } from "../../../test-utils";
import * as stories from "./FormProcessing.stories";

const { LoadingData, CreationInProgress } = composeStories(stories);

describe("CreateKafkaInstance", () => {
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

  it("should show a loading spinner in the create button and a disabled form when waiting for the creation", async () => {
    const comp = renderDialog(<CreationInProgress />);
    await waitForI18n(comp);
    await CreationInProgress.play({ canvasElement: comp.container });

    expect(comp.queryAllByRole("alert")).toHaveLength(0);

    expect(comp.getByLabelText("Name *")).toBeDisabled();
    expect(comp.getByLabelText("Cloud provider *")).toBeDisabled();

    // expect(
    //   within(await comp.findByText("EU, Ireland")).getByRole("img")
    // ).toBeDisabled();

    expect(comp.getByRole("button", { name: "Single" })).toBeDisabled();
    expect(comp.getByRole("button", { name: "Multi" })).toBeDisabled();

    expect(comp.getByRole("progressbar")).toBeInTheDocument();

    expect(comp.getByTestId("modalCreateKafka-buttonSubmit")).toBeDisabled();
  });
});
