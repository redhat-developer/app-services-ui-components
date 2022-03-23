import { composeStories } from "@storybook/testing-react";
import { render, waitForI18n } from "../../test-utils";

import * as stories from "./CreateKafkaInstance.stories";

const { Default } = composeStories(stories);

describe("CreateKafkaInstance", () => {
  it("should persist ouiaComponentId of create instance button", async () => {
    const comp = render(<Default />);
    await waitForI18n(comp);

    const btnSubmit = comp.getByTestId("modalCreateKafka-buttonSubmit");

    expect(btnSubmit.dataset.ouiaComponentId).toBe("button-create");
  });
});
