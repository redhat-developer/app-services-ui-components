import { userEvent } from "@storybook/testing-library";
import { render } from "../../test-utils";
import { RemoveButton } from "./RemoveButton";

describe("Remove Button component", () => {
  it("on Click remove button", () => {
    const onClickButton = jest.fn();

    const comp = render(
      <RemoveButton onClick={onClickButton} tooltip={"Remove"} />
    );
    userEvent.click(comp.getByRole("button"));
    expect(onClickButton).toHaveBeenCalledTimes(1);
  });
});
