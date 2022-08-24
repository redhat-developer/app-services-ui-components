import { userEvent } from "@storybook/testing-library";
import { render, waitForI18n } from "../../../test-utils";
import { FieldSizeHelperTextOverQuota } from "./FieldSizeHelperTextOverQuota";

describe("FieldSizeHelperTextOverQuota", () => {
  it("renders", async () => {
    const clickSpy = jest.fn();

    const comp = render(
      <FieldSizeHelperTextOverQuota remainingQuota={3} onClick={clickSpy} />
    );
    await waitForI18n(comp);

    expect(comp.getByText("Your organization has 3 streaming units remaining"));
    expect(clickSpy).toBeCalledTimes(0);

    userEvent.click(
      comp.getByText("Learn how to add streaming units to your account")
    );
    expect(clickSpy).toBeCalledTimes(1);
  });
});
