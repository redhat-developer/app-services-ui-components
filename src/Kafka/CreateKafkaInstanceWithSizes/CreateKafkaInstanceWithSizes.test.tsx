import { renderDialog, waitForI18n } from "../../test-utils";
import { CreateKafkaInstanceWithSizes } from "./CreateKafkaInstanceWithSizes.stories";

describe("CreateKafkaInstanceWithSizes", () => {
  it("should persist ouiaComponentId of create instance button", async () => {
    const comp = renderDialog(<CreateKafkaInstanceWithSizes />);
    await waitForI18n(comp);

    const btnSubmit = comp.getByRole("button", { name: "Create instance" });

    expect(btnSubmit.dataset.ouiaComponentId).toBe("button-create");
  });
});
