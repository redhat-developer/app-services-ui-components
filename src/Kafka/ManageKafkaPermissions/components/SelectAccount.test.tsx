import { composeStories } from "@storybook/testing-react";

import { render, waitForI18n, waitForPopper } from "../../../test-utils";
import * as stories from "./SelectAccount.stories";
import { userEvent } from "@storybook/testing-library";

const { EmptyState } = composeStories(stories);

describe("SelectAccount", () => {
  it("should render a moal with a select component", async () => {
    const onChangeAccount = jest.fn();
    const onEscapeModal = jest.fn();
    const comp = render(
      <EmptyState
        onChangeAccount={onChangeAccount}
        onEscapeModal={onEscapeModal}
      />
    );

    await waitForI18n(comp);
    userEvent.click(await comp.findByLabelText("Select an account"));
    await waitForPopper();

    expect(await comp.findByText("All accounts")).toBeInTheDocument();
    expect(await comp.findByText("Service accounts")).toBeInTheDocument();
    expect(await comp.findByText("User accounts")).toBeInTheDocument();
    expect(await comp.findByText("id2")).toBeInTheDocument();
  });
});
