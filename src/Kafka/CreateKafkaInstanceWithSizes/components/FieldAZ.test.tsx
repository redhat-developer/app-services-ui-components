import { userEvent } from "@storybook/testing-library";
import { render, waitForI18n } from "../../../test-utils";
import { FieldAZ } from "./FieldAZ";

describe("FieldAZ", () => {
  it("can change value", async () => {
    const changeSpy = jest.fn();

    const comp = render(
      <FieldAZ
        options={"all"}
        onChange={changeSpy}
        isDisabled={false}
        validity={"valid"}
        value={undefined}
      />
    );
    await waitForI18n(comp);
    expect(changeSpy).toBeCalledTimes(0);
    userEvent.click(comp.getByText("Single"));
    expect(changeSpy).toHaveBeenLastCalledWith("single");
    userEvent.click(comp.getByText("Multi"));
    expect(changeSpy).toHaveBeenLastCalledWith("multi");
  });
});
