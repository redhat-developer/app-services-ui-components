import { userEvent } from "@storybook/testing-library";
import { render, waitForI18n } from "../../test-utils";
import { TermsAndConditionModal } from "./TermsAndConditionModal";

describe("TermsAndConditionModal", () => {
  it("should open terms and conditions modal and close on click cancel button", async () => {
    const onClick = jest.fn();
    const onCancel = jest.fn();

    const comp = render(
      <TermsAndConditionModal
        isModalOpen={true}
        serviceName="Kafka"
        onClickViewTermsConditions={onClick}
        onCancel={onCancel}
      />
    );

    await waitForI18n(comp);

    userEvent.click(comp.getByText("Cancel"));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("should open terms and conditions modal and click on 'View Terms and Conditions' button", async () => {
    const onClickViewTermsConditions = jest.fn();
    const onCancel = jest.fn();

    const comp = render(
      <TermsAndConditionModal
        isModalOpen={true}
        serviceName="Kafka"
        onClickViewTermsConditions={onClickViewTermsConditions}
        onCancel={onCancel}
      />
    );

    await waitForI18n(comp);

    userEvent.click(comp.getByText("View Terms and Conditions"));
    expect(onClickViewTermsConditions).toHaveBeenCalledTimes(1);
  });
});
