import { render, waitForI18n } from "../../test-utils";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./Settings.stories";
import { userEvent } from "@storybook/testing-library";

const {
  TurningOnConnectionReauthentication,
  TurnOnConnectionFailure,
  InteractiveExample,
} = composeStories(stories);

describe("Settings", () => {
  it("Connection re-authentication turned on", async () => {
    const comp = render(<TurningOnConnectionReauthentication />);
    await waitForI18n(comp);

    expect(
      comp.getByRole("checkbox", { name: "Connection re-authentication" })
    ).not.toBeChecked();

    userEvent.click(
      comp.getByRole("checkbox", { name: "Connection re-authentication" })
    );
    setTimeout(() => {
      expect(
        comp.findByText("Connection re-authentication turned on")
      ).toBeInTheDocument();

      userEvent.click(
        comp.getByRole("button", {
          name: "Success Alert close",
        })
      );

      expect(
        comp.queryByText("Connection re-authentication turned on")
      ).not.toBeInTheDocument();

      expect(
        comp.getByRole("checkbox", { name: "Connection re-authentication" })
      ).toBeChecked();
    }, 4000);
  });

  it("Connection re-authentication updation failed", async () => {
    const comp = render(<TurnOnConnectionFailure />);
    await waitForI18n(comp);
    userEvent.click(
      comp.getByRole("checkbox", { name: "Connection re-authentication" })
    );
    setTimeout(() => {
      expect(
        comp.findByText(
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
    }, 4000);
  });

  it("Connection re-authentication turned off", async () => {
    const comp = render(<InteractiveExample />);
    await waitForI18n(comp);

    expect(
      comp.getByRole("checkbox", { name: "Connection re-authentication" })
    ).toBeChecked();
    userEvent.click(
      comp.getByRole("checkbox", { name: "Connection re-authentication" })
    );
    expect(
      await comp.findByText("Turn off re-authentication?")
    ).toBeInTheDocument();
    expect(
      await comp.findByText(
        "There are potential risks associated with turning off re-authentication, where attackers could stay connected indefinitely."
      )
    ).toBeInTheDocument();
    userEvent.click(comp.getByRole("button", { name: "Turn off" }));
    setTimeout(() => {
      expect(
        comp.findByText("Connection re-authentication turned off")
      ).toBeInTheDocument();

      expect(
        comp.getByRole("checkbox", { name: "Connection re-authentication" })
      ).not.toBeChecked();
    }, 4000);
  });
});
