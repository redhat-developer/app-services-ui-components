import { composeStories } from "@storybook/testing-react";
import { renderDialog, waitForI18n } from "../../test-utils";
import * as stories from "./CreateKafkaInstance.stories";

const { CreateKafkaInstance } = composeStories(stories);

describe("CreateKafkaInstance", () => {
  it("should persist ouiaComponentId of create instance button", async () => {
    const comp = renderDialog(<CreateKafkaInstance />);
    await waitForI18n(comp);

    const btnSubmit = comp.getByRole("button", { name: "Create instance" });

    expect(btnSubmit.dataset.ouiaComponentId).toBe("button-create");
  });
});
