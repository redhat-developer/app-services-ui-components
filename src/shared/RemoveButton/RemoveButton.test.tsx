import { userEvent } from "@storybook/testing-library";
import { render, screen } from "../../test-utils";
import { RemoveButton } from "./RemoveButton";

describe("Remove Button component", () => {
  it("on Click remove button", () => {
    const onClickButton = jest.fn();

    const comp = render(
      <RemoveButton
        onButtonClick={onClickButton}
        ToolTipText={"Remove"}
        row={2}
      />
    );
    userEvent.click(comp.getByRole("button"));
    expect(onClickButton).toHaveBeenCalledTimes(1);
  });
});
