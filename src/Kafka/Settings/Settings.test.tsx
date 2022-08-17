import { render, waitForI18n } from "../../test-utils";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./Settings.stories";
import { userEvent } from "@storybook/testing-library";

const {
  DefaultSettings,
  TurnOffConnectionReauthentication,
  OnClickTurnOffSwitch,
  TurningOffConnectionReauthentication,
  TurningONConnectionReauthentication,
  TurnONConnectionReauthentication,
  TurnOnConnectionFailure,
} = composeStories(stories);

describe("Consumer Group empty state", () => {
  it("Connection re-authentication turned on", async () => {
    const onClickSwitch = jest.fn();
    const comp = render(<DefaultSettings onSwitchClick={onClickSwitch} />);
    await waitForI18n(comp);
    expect(
      comp.getByRole("checkbox", { name: "Connection re-authentication" })
    ).toBeChecked();
    userEvent.click(
      comp.getByRole("checkbox", { name: "Connection re-authentication" })
    );
    expect(onClickSwitch).toHaveBeenCalledTimes(1);
  });

  it("Connection re-authentication turned off", async () => {
    const onClickSwitch = jest.fn();
    const comp = render(
      <TurnOffConnectionReauthentication onSwitchClick={onClickSwitch} />
    );
    await waitForI18n(comp);
    expect(
      comp.getByRole("checkbox", { name: "Connection re-authentication" })
    ).not.toBeChecked();
    userEvent.click(
      comp.getByRole("checkbox", { name: "Connection re-authentication" })
    );
    expect(onClickSwitch).toHaveBeenCalledTimes(1);
    expect(
      await comp.findByText("Connection re-authentication turned off")
    ).toBeInTheDocument();
  });

  it("Open modal while turning off Connection re-authentication", async () => {
    const onClickTurnOff = jest.fn();
    const onClickClose = jest.fn();
    const comp = render(
      <OnClickTurnOffSwitch
        onClickTurnOff={onClickTurnOff}
        onClickClose={onClickClose}
      />
    );
    await waitForI18n(comp);
    expect(
      await comp.findByText("Turn off re-authentication?")
    ).toBeInTheDocument();
    expect(
      await comp.findByText(
        "There are potential risks associated with turning off re-authentication, where attackers could stay connected indefinitely."
      )
    ).toBeInTheDocument();

    userEvent.click(comp.getByRole("button", { name: "Cancel" }));
    expect(onClickClose).toHaveBeenCalledTimes(1);

    userEvent.click(comp.getByRole("button", { name: "Close" }));
    expect(onClickClose).toHaveBeenCalledTimes(2);

    userEvent.click(comp.getByRole("button", { name: "Turn off" }));
    expect(onClickTurnOff).toHaveBeenCalledTimes(1);
  });

  it("Connection re-authentication turning off", async () => {
    const comp = render(<TurningOffConnectionReauthentication />);
    await waitForI18n(comp);
    expect(
      comp.getByRole("checkbox", { name: "Connection re-authentication" })
    ).toBeDisabled();
  });

  it("Connection re-authentication turning on", async () => {
    const comp = render(<TurningONConnectionReauthentication />);
    await waitForI18n(comp);
    expect(
      comp.getByRole("checkbox", { name: "Connection re-authentication" })
    ).toBeDisabled();
  });

  it("Connection re-authentication turned on", async () => {
    const onClickSwitch = jest.fn();
    const comp = render(
      <TurnONConnectionReauthentication onSwitchClick={onClickSwitch} />
    );
    await waitForI18n(comp);
    expect(
      comp.getByRole("checkbox", { name: "Connection re-authentication" })
    ).toBeChecked();
    expect(
      await comp.findByText("Connection re-authentication turned on")
    ).toBeInTheDocument();

    userEvent.click(
      comp.getByRole("button", {
        name: "Close Success alert: alert: [object Object]",
      })
    );
    expect(
      comp.queryByText("Connection re-authentication turned on")
    ).not.toBeInTheDocument();
  });

  it("Connection re-authentication updation failed", async () => {
    const comp = render(<TurnOnConnectionFailure />);
    await waitForI18n(comp);
    expect(await comp.findByText("Something went wrong")).toBeInTheDocument();
    expect(
      await comp.findByText(
        "We're unable to update connection re-authentication at this time, Try again later."
      )
    ).toBeInTheDocument();

    userEvent.click(
      comp.getByRole("button", {
        name: "Close Danger alert: alert: Something went wrong",
      })
    );
    expect(
      comp.queryByText(
        "We're unable to update connection re-authentication at this time, Try again later."
      )
    ).not.toBeInTheDocument();
  });
});
