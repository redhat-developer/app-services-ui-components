import { composeStories } from "@storybook/testing-react";
import { renderDialog, waitForI18n } from "../../test-utils";
import * as stories from "./CreateKafkaInstanceWithSizes.stories";

const { CreateKafkaInstanceWithSizes } = composeStories(stories);

describe("CreateKafkaInstanceWithSizes", () => {
  it("should persist ouiaComponentId of create instance button", async () => {
    const comp = renderDialog(<CreateKafkaInstanceWithSizes />);
    await waitForI18n(comp);

    const btnSubmit = comp.getByRole("button", { name: "Create instance" });

    expect(btnSubmit.dataset.ouiaComponentId).toBe("button-create");
  });
});
