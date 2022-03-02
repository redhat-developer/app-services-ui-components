import { composeStories } from "@storybook/testing-react";

import * as stories from "./PermissionsModalSubmitButton.stories";
import { userEvent } from "@storybook/testing-library";
import { render, waitForI18n } from "../../../test-utils";

const { ButtonDisabled, ButtonEnabled, ButtonStepTwo, InteractiveExample } =
  composeStories(stories);

describe("ManagePermissionsModal", () => {
  it("should render a button that is disabled", async () => {
    const onChangeStep = jest.fn();
    const comp = render(<ButtonDisabled onChangeStep={onChangeStep} />);

    await waitForI18n(comp);
    const button = await comp.findByText("Next");
    expect(button).toBeDisabled();
  });

  it("should render a button that is enabled", async () => {
    const onChangeStep = jest.fn();
    const comp = render(<ButtonEnabled onChangeStep={onChangeStep} />);
    await waitForI18n(comp);
    const button = await comp.findByText("Next");
    expect(button).toBeEnabled();
    userEvent.click(await comp.findByText("Next"));
    expect(onChangeStep).toBeCalledTimes(1);
  });
  it("should render a save button that is enabled", async () => {
    const onChangeStep = jest.fn();
    const comp = render(<ButtonStepTwo onChangeStep={onChangeStep} />);
    await waitForI18n(comp);
    const button = await comp.findByText("Save");
    expect(button).toBeEnabled();
  });
  it("should render a button that is enabled", async () => {
    const onChangeStep = jest.fn();
    const comp = render(<InteractiveExample onChangeStep={onChangeStep} />);
    await waitForI18n(comp);
    const button = await comp.findByText("Next");
    expect(button).toBeEnabled();
    userEvent.click(button);
    expect(await comp.findByText("Save")).toBeInTheDocument();
  });
});
