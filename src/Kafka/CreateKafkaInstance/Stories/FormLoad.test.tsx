import { userEvent } from "@storybook/testing-library";
import { composeStories } from "@storybook/testing-react";
import { waitFor } from "@testing-library/react";
import {
  renderDialog,
  waitForI18n,
  waitForPopper,
  within,
} from "../../../test-utils";
import * as stories from "./FormLoad.stories";

const {
  QuotaAvailableOnFormLoad,
  TrialAvailableOnFormLoad,
  OutOfQuotaOnFormLoad,
  TrialUnavailableOnFormLoad,
  TrialUsedOnFormLoad,
  SomeRegionsDisabledOnFormLoad,
  AllRegionsDisabledOnFormLoad,
  NoRegionsReturnedFromApiForAProviderOnFormLoad,
  NoRegionsReturnedFromApiOnFormLoad,
  ErrorOnFormLoad,
  TrialSomeRegionsDisabledOnFormLoad,
  TrialAllRegionsDisabledOnFormLoad,
  UnableToRetrieveSizes,
  GotEmptySizes,
  PrepaidAndSingleMarketplaceSubscription,
  PrepaidAndMarketplaceSubscriptions,
  OnlyMarketplaceSubscriptions,
  SingleMarketplace,
  SingleSubscription,
  SingleSubscriptionToRH,
  MarketplaceSubscriptionsAndPrepaidOutOfQuota,
  PrepaidAndMarketplaceSubscriptionsOutOfQuota,
} = composeStories(stories);

describe("CreateKafkaInstance", () => {
  it("should show a form for standard instances with no alerts", async () => {
    const onCreate = jest.fn();
    const comp = renderDialog(<QuotaAvailableOnFormLoad onCreate={onCreate} />);
    await waitForI18n(comp);

    await waitFor(() =>
      expect(
        comp.queryByText("Checking if new Kafka instances are available")
      ).not.toBeInTheDocument()
    );

    expect(comp.queryAllByRole("alert")).toHaveLength(0);
    expect(comp.getByLabelText("Name *")).toBeEnabled();
    expect(comp.getByLabelText("Cloud provider *")).toBeEnabled();
    expect(comp.getByText("Cloud region")).not.toHaveAttribute("disabled");
    expect(comp.getByRole("button", { name: "Single" })).toBeDisabled();
    expect(comp.getByRole("button", { name: "Multi" })).toBeEnabled();
    expect(comp.getByRole("button", { name: "Single" })).toHaveAttribute(
      "aria-pressed",
      "false"
    );
    expect(comp.getByRole("button", { name: "Multi" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );

    await waitFor(() =>
      expect(comp.queryByTestId("size-loading")).not.toBeInTheDocument()
    );

    await waitFor(() =>
      expect(comp.queryByTestId("size-loading")).not.toBeInTheDocument()
    );

    userEvent.type(comp.getByLabelText("Name *"), "test-name");
    userEvent.click(comp.getByRole("button", { name: "Create instance" }));

    await waitFor(() =>
      expect(onCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          billing: "prepaid",
          name: "test-name",
          provider: "aws",
          region: "eu-west-1",
          sizeId: "x1",
        }),
        expect.anything(),
        expect.anything()
      )
    );
  });

  it("should show a form for trial instances with an alert and AZ disabled", async () => {
    const comp = renderDialog(<TrialAvailableOnFormLoad />);
    await waitForI18n(comp);

    await waitFor(() =>
      expect(
        comp.queryByText("Checking if new Kafka instances are available")
      ).not.toBeInTheDocument()
    );

    expect(
      comp.queryByText(
        "You can create a trial instance to evaluate this service."
      )
    ).toBeInTheDocument();
    expect(comp.getByLabelText("Name *")).toBeEnabled();
    expect(comp.getByLabelText("Cloud provider *")).toBeEnabled();
    expect(
      within(comp.getByTestId("cloudRegion")).getAllByRole("button")[0]
    ).toBeEnabled();
    expect(comp.getByRole("button", { name: "Single" })).toBeEnabled();
    expect(comp.getByRole("button", { name: "Multi" })).toBeDisabled();
  });

  it("should show an alert when out of quota and a disabled form", async () => {
    const comp = renderDialog(<OutOfQuotaOnFormLoad />);
    await waitForI18n(comp);

    await waitFor(() =>
      expect(
        comp.getByText("Your organization is out of quota.")
      ).toBeInTheDocument()
    );

    expect(comp.getByLabelText("Name *")).toBeDisabled();
    expect(comp.getByLabelText("Cloud provider *")).toBeDisabled();
    expect(
      within(comp.getByTestId("cloudRegion")).getByRole("button")
    ).toHaveAttribute("disabled");
    expect(comp.getByRole("button", { name: "Single" })).toBeDisabled();
    expect(comp.getByRole("button", { name: "Multi" })).toBeDisabled();
  });

  it("should show an alert when trial instances are unavailable, and a disabled form", async () => {
    const comp = renderDialog(<TrialUnavailableOnFormLoad />);
    await waitForI18n(comp);

    await waitFor(() =>
      expect(
        comp.queryByText("Checking if new Kafka instances are available")
      ).not.toBeInTheDocument()
    );

    await waitFor(() =>
      expect(
        comp.getByText(
          "All available trial instances are currently in use. Please try again later."
        )
      ).toBeInTheDocument()
    );

    expect(comp.getByLabelText("Name *")).toBeDisabled();
    expect(comp.getByLabelText("Cloud provider *")).toBeDisabled();
    expect(
      within(comp.getByTestId("cloudRegion")).getAllByRole("button")[0]
    ).toBeDisabled();
    expect(comp.getByRole("button", { name: "Single" })).toBeDisabled();
    expect(comp.getByRole("button", { name: "Multi" })).toBeDisabled();
  });

  it("should show an alert when a trial instance has been already created, and a disabled form", async () => {
    const comp = renderDialog(<TrialUsedOnFormLoad />);
    await waitForI18n(comp);

    await waitFor(() =>
      expect(
        comp.queryByText("Checking if new Kafka instances are available")
      ).not.toBeInTheDocument()
    );

    expect(
      comp.queryByText(
        "You can deploy 1 trial instance at a time. To deploy a new instance, delete your existing one first.",
        { exact: false }
      )
    ).toBeInTheDocument();

    expect(comp.getByLabelText("Name *")).toBeDisabled();
    expect(comp.getByLabelText("Cloud provider *")).toBeDisabled();
    expect(
      within(comp.getByTestId("cloudRegion")).getAllByRole("button")[0]
    ).toBeDisabled();
    expect(comp.getByRole("button", { name: "Single" })).toBeDisabled();
    expect(comp.getByRole("button", { name: "Multi" })).toBeDisabled();
  });

  it("should show 'EU, Ireland' as disabled", async () => {
    const comp = renderDialog(<SomeRegionsDisabledOnFormLoad />);
    await waitForI18n(comp);

    await waitFor(() =>
      expect(
        comp.queryByText("Checking if new Kafka instances are available")
      ).not.toBeInTheDocument()
    );

    userEvent.click(comp.getByText("Cloud region"));
    const regionOptionEuIreland = comp.getByText("EU, Ireland");
    expect(regionOptionEuIreland.parentElement).toBeDisabled();
  });

  it("should show 'EU, Ireland' as disabled and show inline warning message for region for trial kafka", async () => {
    const comp = renderDialog(<TrialSomeRegionsDisabledOnFormLoad />);
    await waitForI18n(comp);

    await waitFor(() =>
      expect(
        comp.queryByText("Checking if new Kafka instances are available")
      ).not.toBeInTheDocument()
    );

    expect(
      await comp.findByText("The trial has a duration of 48 hours.", {
        exact: false,
      })
    ).toBeInTheDocument();

    expect(
      comp.queryByText(
        "One or more regions in the selected cloud provider are temporarily unavailable. Select an available region or try again later."
      )
    ).toBeInTheDocument();

    expect(comp.getByLabelText("Name *")).toBeEnabled();
    expect(comp.getByLabelText("Cloud provider *")).toBeEnabled();
    expect(
      within(comp.getByTestId("cloudRegion")).getAllByRole("button")[0]
    ).toBeEnabled();
    expect(comp.getByRole("button", { name: "Single" })).toBeEnabled();
    expect(comp.getByRole("button", { name: "Multi" })).toBeDisabled();

    userEvent.click(comp.getByText("Cloud region"));
    await waitForPopper();
    const regionOptionEuIreland = comp.getByText("EU, Ireland");
    expect(regionOptionEuIreland.parentElement).toBeDisabled();
  });

  it("should show an alert when all cloud regions are disabled, and show inline error message for region", async () => {
    const comp = renderDialog(<AllRegionsDisabledOnFormLoad />);
    await waitForI18n(comp);

    await waitFor(() =>
      expect(
        comp.queryByText("Checking if new Kafka instances are available")
      ).not.toBeInTheDocument()
    );

    await waitFor(() =>
      expect(
        comp.getByText(
          "Cloud provider regions are temporarily unavailable. Please try again later."
        )
      ).toBeInTheDocument()
    );

    expect(comp.getByLabelText("Name *")).toBeDisabled();
    expect(comp.getByLabelText("Cloud provider *")).toBeDisabled();
    expect(
      within(comp.getByTestId("cloudRegion")).getAllByRole("button")[0]
    ).toBeDisabled();

    expect(
      comp.getByText("Select region").closest("[disabled]")
    ).not.toBeNull();

    expect(comp.getByRole("button", { name: "Single" })).toBeDisabled();
    expect(comp.getByRole("button", { name: "Multi" })).toBeDisabled();
  });

  it("should show an alert when all cloud regions are disabled, and show inline error message for region for trial kafka", async () => {
    const comp = renderDialog(<TrialAllRegionsDisabledOnFormLoad />);
    await waitForI18n(comp);

    await waitFor(() =>
      expect(
        comp.queryByText("Checking if new Kafka instances are available")
      ).not.toBeInTheDocument()
    );

    expect(
      comp.queryByText(
        "All available trial instances are currently in use. Please try again later.",
        { exact: false }
      )
    ).toBeInTheDocument();

    expect(comp.getByLabelText("Name *")).toBeDisabled();
    expect(comp.getByLabelText("Cloud provider *")).toBeDisabled();
    expect(
      within(comp.getByTestId("cloudRegion")).getAllByRole("button")[0]
    ).toBeDisabled();

    expect(
      comp.getByText("Select region").closest("[disabled]")
    ).not.toBeNull();

    expect(comp.getByRole("button", { name: "Single" })).toBeDisabled();
    expect(comp.getByRole("button", { name: "Multi" })).toBeDisabled();

    expect(
      comp.getByText(
        "Size selection is available with a subscription. Trial instances have limited capacity, and their limits are listed under Details."
      )
    ).toBeInTheDocument();
  });

  it("should show a invalid helper text for AWS", async () => {
    const comp = renderDialog(
      <NoRegionsReturnedFromApiForAProviderOnFormLoad />
    );
    await waitForI18n(comp);

    await waitFor(() =>
      expect(
        comp.queryByText("Checking if new Kafka instances are available")
      ).not.toBeInTheDocument()
    );

    expect(
      comp.getByText(
        "All regions in the selected cloud provider are temporarily unavailable.",
        { exact: false }
      )
    ).toBeInTheDocument();
  });

  it("should show an alert when no cloud region is available, and show inline message for cloud region", async () => {
    const comp = renderDialog(<NoRegionsReturnedFromApiOnFormLoad />);
    await waitForI18n(comp);

    await waitFor(() =>
      expect(
        comp.queryByText("Checking if new Kafka instances are available")
      ).not.toBeInTheDocument()
    );

    expect(
      comp.queryByText(
        "Cloud provider regions are temporarily unavailable. Please try again later",
        { exact: false }
      )
    ).toBeInTheDocument();

    expect(comp.getByLabelText("Name *")).toBeDisabled();
    expect(comp.getByLabelText("Cloud provider *")).toBeDisabled();
    expect(
      comp.getByText("Select region").closest("[disabled]")
    ).not.toBeNull();
    expect(comp.getByRole("button", { name: "Single" })).toBeDisabled();
    expect(comp.getByRole("button", { name: "Multi" })).toBeDisabled();

    expect(
      comp.getByText(
        "Size options display when a cloud provider and region are selected"
      )
    );
  });

  it("should show an alert when a generic error contacting the API happened when opening the modal, and a disabled form", async () => {
    const comp = renderDialog(<ErrorOnFormLoad />);
    await waitForI18n(comp);

    await waitFor(() =>
      expect(
        comp.queryByText("Checking if new Kafka instances are available")
      ).not.toBeInTheDocument()
    );

    expect(
      comp.queryByText(
        "Kafka instances are temporarily available. Please try again in a few hours."
      )
    ).toBeInTheDocument();

    expect(comp.getByLabelText("Name *")).toBeDisabled();
    expect(comp.getByLabelText("Cloud provider *")).toBeDisabled();
    expect(
      within(comp.getByTestId("cloudRegion")).getByRole("button")
    ).toBeDisabled();
    expect(comp.getByRole("button", { name: "Single" })).toBeDisabled();
    expect(comp.getByRole("button", { name: "Multi" })).toBeDisabled();
  });

  it("should show an error when we can't fetch the sizes", async () => {
    const comp = renderDialog(<UnableToRetrieveSizes />);
    await waitForI18n(comp);

    await waitFor(() =>
      expect(
        comp.queryByText("Checking if new Kafka instances are available")
      ).not.toBeInTheDocument()
    );

    await waitFor(() =>
      expect(
        comp.getByText(
          "Something went wrong while fetching the available sizes. Select another cloud provider or cloud region, or try again later."
        )
      ).toBeInTheDocument()
    );
  });

  it("should show an error when we can't fetch the sizes (ok response, empty array)", async () => {
    const comp = renderDialog(<GotEmptySizes />);
    await waitForI18n(comp);

    await waitFor(() =>
      expect(
        comp.queryByText("Checking if new Kafka instances are available")
      ).not.toBeInTheDocument()
    );

    await waitFor(() =>
      expect(
        comp.getByText(
          "Something went wrong while fetching the available sizes. Select another cloud provider or cloud region, or try again later."
        )
      ).toBeInTheDocument()
    );
  });

  it("should show the billing options, with prepaid and a single subscription", async () => {
    const comp = renderDialog(<PrepaidAndSingleMarketplaceSubscription />);
    await waitForI18n(comp);

    await waitFor(() =>
      expect(
        comp.queryByText("Checking if new Kafka instances are available")
      ).not.toBeInTheDocument()
    );

    await waitFor(() => expect(comp.getByText("Billing")).toBeInTheDocument());
    await waitFor(() =>
      expect(comp.getByText("Red Hat prepaid")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(comp.getByText("AWS Marketplace")).toBeInTheDocument()
    );

    userEvent.selectOptions(
      comp.getByLabelText("Cloud provider *"),
      "Microsoft Azure"
    );
    await waitFor(async () =>
      expect(
        (await comp.findByText("AWS Marketplace")).closest("[role=option]")
      ).toHaveAttribute("aria-disabled", "true")
    );
  });

  it("should show the billing options, with prepaid and a single subscription and save the right data", async () => {
    const onCreate = jest.fn();
    const comp = renderDialog(
      <PrepaidAndSingleMarketplaceSubscription onCreate={onCreate} />
    );
    await waitForI18n(comp);

    await waitFor(() =>
      expect(comp.queryByTestId("size-loading")).not.toBeInTheDocument()
    );

    userEvent.type(comp.getByLabelText("Name *"), "test-name");
    userEvent.click(comp.getByText("Red Hat prepaid"));
    userEvent.click(comp.getByRole("button", { name: "Create instance" }));
    await waitFor(() =>
      expect(onCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          billing: "prepaid",
          name: "test-name",
          provider: "aws",
          region: "eu-west-1",
          sizeId: "x1",
        }),
        expect.anything(),
        expect.anything()
      )
    );
  });

  it("should show the billing options, with prepaid and multiple subscriptions", async () => {
    const comp = renderDialog(<PrepaidAndMarketplaceSubscriptions />);
    await waitForI18n(comp);

    await waitFor(() =>
      expect(
        comp.queryByText("Checking if new Kafka instances are available")
      ).not.toBeInTheDocument()
    );

    await waitFor(() => expect(comp.getByText("Billing")).toBeInTheDocument());
    await waitFor(() =>
      expect(comp.getByText("Red Hat prepaid")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(comp.getAllByText("AWS Marketplace")).toHaveLength(2)
    );
    await waitFor(() => {
      const azure = comp.getByText("Azure Marketplace");
      expect(azure).toBeInTheDocument();
      expect(azure.closest("[role=option]")).toHaveAttribute(
        "aria-disabled",
        "true"
      );
    });
    await waitFor(() =>
      expect(comp.getByText("Red Hat Marketplace")).toBeInTheDocument()
    );
  });

  it("should show the billing options, with prepaid and a multiple subscriptions and save the right data", async () => {
    const onCreate = jest.fn();
    const comp = renderDialog(
      <PrepaidAndMarketplaceSubscriptions onCreate={onCreate} />
    );
    await waitForI18n(comp);

    await waitFor(() =>
      expect(comp.queryByTestId("size-loading")).not.toBeInTheDocument()
    );

    userEvent.type(comp.getByLabelText("Name *"), "test-name");
    userEvent.click(comp.getByText("rhm-cmhtMDAwMDAwMA=="));
    userEvent.click(comp.getByRole("button", { name: "Create instance" }));
    await waitFor(() =>
      expect(onCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          billing: { marketplace: "rhm", subscription: "rhm-cmhtMDAwMDAwMA==" },
          name: "test-name",
          provider: "aws",
          region: "eu-west-1",
          sizeId: "x1",
        }),
        expect.anything(),
        expect.anything()
      )
    );
  });

  it("should show the billing options, with only multiple subscriptions", async () => {
    const comp = renderDialog(<OnlyMarketplaceSubscriptions />);
    await waitForI18n(comp);

    await waitFor(() =>
      expect(
        comp.queryByText("Checking if new Kafka instances are available")
      ).not.toBeInTheDocument()
    );

    await waitFor(() => expect(comp.getByText("Billing")).toBeInTheDocument());
    await waitFor(() =>
      expect(comp.queryByText("Red Hat prepaid")).not.toBeInTheDocument()
    );
    await waitFor(() =>
      expect(comp.getAllByText("AWS Marketplace")).toHaveLength(2)
    );
    await waitFor(() => {
      const azure = comp.getByText("Azure Marketplace");
      expect(azure).toBeInTheDocument();
      expect(azure.closest("[role=option]")).toHaveAttribute(
        "aria-disabled",
        "true"
      );
    });
    await waitFor(() =>
      expect(comp.getByText("Red Hat Marketplace")).toBeInTheDocument()
    );
  });

  it("should show the billing options, with a list of subscriptions from a single marketplace", async () => {
    const comp = renderDialog(<SingleMarketplace />);
    await waitForI18n(comp);

    await waitFor(() =>
      expect(
        comp.queryByText("Checking if new Kafka instances are available")
      ).not.toBeInTheDocument()
    );

    await waitFor(() => expect(comp.getByText("Billing")).toBeInTheDocument());
    await waitFor(() =>
      expect(comp.queryByText("Red Hat prepaid")).not.toBeInTheDocument()
    );
    await waitFor(() =>
      expect(comp.getAllByText("AWS Marketplace")).toHaveLength(2)
    );
    await waitFor(() =>
      expect(comp.queryByText("Azure Marketplace")).not.toBeInTheDocument()
    );
    await waitFor(() =>
      expect(comp.queryByText("Red Hat Marketplace")).not.toBeInTheDocument()
    );
  });

  it("should show the billing options, with a list of subscriptions from a single marketplace", async () => {
    const comp = renderDialog(<SingleSubscription />);
    await waitForI18n(comp);

    await waitFor(() =>
      expect(
        comp.queryByText("Checking if new Kafka instances are available")
      ).not.toBeInTheDocument()
    );

    await waitFor(() =>
      expect(comp.queryByText("Billing")).not.toBeInTheDocument()
    );

    await waitFor(() => {
      const azure = comp.getAllByText("Microsoft Azure")[0];
      expect(azure).toBeInTheDocument();
      expect(azure.closest("[role=option]")).toHaveAttribute(
        "aria-disabled",
        "true"
      );
    });
  });

  it("should show the billing options, with a list of subscriptions from a single marketplace", async () => {
    const comp = renderDialog(<SingleSubscriptionToRH />);
    await waitForI18n(comp);

    await waitFor(() =>
      expect(
        comp.queryByText("Checking if new Kafka instances are available")
      ).not.toBeInTheDocument()
    );

    await waitFor(() =>
      expect(comp.queryByText("Billing")).not.toBeInTheDocument()
    );

    await waitFor(() => {
      const azure = comp.getAllByText("Microsoft Azure")[0];
      expect(azure).toBeInTheDocument();
      expect(azure.closest("[role=option]")).not.toHaveAttribute(
        "aria-disabled"
      );
    });
  });

  it("should show a disabled prepaid option in case of out of quota", async () => {
    const comp = renderDialog(<MarketplaceSubscriptionsAndPrepaidOutOfQuota />);
    await waitForI18n(comp);

    await waitFor(() =>
      expect(
        comp.queryByText("Checking if new Kafka instances are available")
      ).not.toBeInTheDocument()
    );

    await waitFor(() =>
      expect(
        comp.queryByText(
          "The selected size exceedes the quota available for the prepaid billing option."
        )
      ).toBeInTheDocument()
    );

    await waitFor(() => {
      const azure = comp.getByText("Red Hat prepaid");
      expect(azure).toBeInTheDocument();
      expect(azure.closest("[role=option]")).toHaveAttribute("aria-disabled");
    });
  });

  it("should show disabled marketplace options in case of out of quota", async () => {
    const comp = renderDialog(<PrepaidAndMarketplaceSubscriptionsOutOfQuota />);
    await waitForI18n(comp);

    await waitFor(() =>
      expect(
        comp.queryByText("Checking if new Kafka instances are available")
      ).not.toBeInTheDocument()
    );

    await waitFor(() =>
      expect(
        comp.queryByText(
          "The selected size exceedes the quota available for the marketplace billing option."
        )
      ).toBeInTheDocument()
    );

    const checkDisabledTitle = async (s: string) => {
      return await waitFor(() => {
        const sub = comp.getByText(s);
        expect(sub).toBeInTheDocument();
        expect(sub.closest("[role=option]")).toHaveAttribute("aria-disabled");
      });
    };

    await checkDisabledTitle("aws-YXdzMDAwMDAwMA==");
    await checkDisabledTitle("aws-YXdzMTExMTExMQ==");
    await checkDisabledTitle("azure-YXp1cmUwMDAwMA==");
    await checkDisabledTitle("rhm-cmhtMDAwMDAwMA==");
  });
});
