import { render, waitForI18n } from "../../test-utils";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./Settings.stories";
import { userEvent } from "@storybook/testing-library";

const { TurningOnConnectionReauthentication, TurnOnConnectionFailure } =
  composeStories(stories);

describe("Settings", () => {
  it("Connection re-authentication turned on", async () => {
    const comp = render(<TurningOnConnectionReauthentication />);
    await waitForI18n(comp);

    expect(
      comp.getByRole("checkbox", { name: "Connection re-authentication" })
    ).toBeChecked();
    expect(
      await comp.findByText("Connection re-authentication turned on")
    ).toBeInTheDocument();

    userEvent.click(
      comp.getByRole("button", {
        name: "Success Alert close",
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
        "We're unable to update connection re-authentication at this time. Try again later."
      )
    ).toBeInTheDocument();

    userEvent.click(
      comp.getByRole("button", {
        name: "Close Danger alert: alert: Something went wrong",
      })
    );
    expect(
      comp.queryByText(
        "We're unable to update connection re-authentication at this time. Try again later."
      )
    ).not.toBeInTheDocument();
  });
});
