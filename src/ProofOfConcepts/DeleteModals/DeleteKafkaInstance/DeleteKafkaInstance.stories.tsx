import { Alert } from "@patternfly/react-core";
import type { PlayFunction } from "@storybook/csf";
import type { ComponentMeta, ComponentStory } from "@storybook/react";
import type { ReactFramework } from "@storybook/react/types-6-0";
import { userEvent, within } from "@storybook/testing-library";
import { useMachine } from "@xstate/react";
import { createMachine } from "xstate";
import type { DeleteModalProps } from "./DeleteKafkaInstance";
import { DeleteModal, DeleteModalConfirmation } from "./DeleteKafkaInstance";

const ResourceName = <b>resource name</b>;

export default {
  component: DeleteModal,
  subcomponents: { DeleteModalConfirmation },
  args: {
    title: "Delete instance?",
    children: (
      <p>
        The {ResourceName} Kafka instance and all topics will be deleted.
        Applications will no longer have access to the topics in this instance.
      </p>
    ),
    disableFocusTrap: true,
  },
  argTypes: {
    ouiaId: { table: { category: "Tracking" } },
    appendTo: { table: { category: "Functional" } },
    onDelete: { table: { category: "Events" } },
    onCancel: { table: { category: "Events" } },
    children: { table: { category: "Appearance" } },
    disableFocusTrap: { table: { category: "Development" } },
    confirmationValue: { table: { category: "Appearance" } },
    isModalOpen: {
      control: {
        type: null,
      },
      table: { category: "States" },
    },
    isDeleting: {
      control: {
        type: null,
      },
      table: { category: "States" },
    },
  },
} as ComponentMeta<typeof DeleteModal>;

const onDelete = [
  {
    cond: (context: { isAsync: boolean }) => context.isAsync,
    target: "deleting",
  },
  {
    cond: (context: { willFail: boolean }) => context.willFail,
    target: "withError",
  },
  { target: "closed" },
];
const makeModalStoryMachine = ({
  id,
  initial = "open",
  isAsync,
  willFail,
}: {
  id: string;
  initial?: string;
  isAsync: boolean;
  willFail: boolean;
}) =>
  createMachine({
    initial,
    id,
    context: {
      isAsync,
      willFail,
    },
    states: {
      closed: {
        on: {
          OPEN: "open",
        },
      },
      open: {
        on: {
          DELETE: onDelete,
        },
      },
      deleting: {
        after: {
          1000: [
            { cond: (context) => context.willFail, target: "withError" },
            { cond: () => initial !== "deleting", target: "closed" },
          ],
        },
        on: {
          CLOSE: "deleting",
        },
      },
      withError: {
        on: {
          DELETE: onDelete,
        },
      },
    },
    on: {
      CLOSE: "closed",
    },
  });

const Template: ComponentStory<typeof DeleteModal> = (
  { onDelete: onDeleteAction, onCancel: onCancelAction, children, ...args },
  { id, parameters }
) => {
  const [state, send] = useMachine(
    () =>
      makeModalStoryMachine({
        id,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        initial: parameters.initialState,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        isAsync: parameters.isDeleteAsync,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        willFail: parameters.willDeleteFail,
      }),
    { devTools: true }
  );

  const onDelete = () => {
    onDeleteAction && onDeleteAction();
    send("DELETE");
  };
  const onCancel = () => {
    onCancelAction && onCancelAction();
    send("CLOSE");
  };

  return (
    <div style={{ minHeight: 500, height: "100%" }}>
      <DeleteModal
        {...args}
        isDeleting={state.value === "deleting"}
        isModalOpen={state.value !== "closed"}
        appendTo={() => {
          return (
            document.getElementById(`story--${id}`) ||
            document.getElementById("root") ||
            document.body
          );
        }}
        onCancel={onCancel}
        onDelete={onDelete}
      >
        {state.value === "withError" && (
          <Alert variant="danger" title="Danger alert title" isInline>
            <p>This should tell the user more information about the alert.</p>
          </Alert>
        )}
        {children}
      </DeleteModal>
      <button onClick={() => send("OPEN")}>Open modal</button>
    </div>
  );
};

const fillConfirmation: PlayFunction<
  ReactFramework,
  DeleteModalProps
> = async ({ canvasElement, args }) => {
  const story = within(canvasElement);
  const confirmationValue = args.confirmationValue || "resource name";
  await userEvent.type(
    await story.findByLabelText(`Type ${confirmationValue} to confirm`),
    confirmationValue
  );
  await userEvent.click(await story.findByText("Delete"));
};

export const DeleteKafkaInstance = Template.bind({});
DeleteKafkaInstance.args = {
  confirmationValue: "resource name",
  ...Template.bind({}).args,
};
DeleteKafkaInstance.parameters = {
  docs: {
    description: {
      story: `It is possible to ask the user to type something to enable the
disable button. In this demo you should be typing \`resource name\`.
      `,
    },
  },
};
DeleteKafkaInstance.play = fillConfirmation;
