import { Page } from "@patternfly/react-core";
import type { Story } from "@storybook/react";
import type { Meta } from "@storybook/react/dist/ts3.9/client/preview/types-6-0";
import type { ComponentType } from "react";
import { lazy, Suspense } from "react";
import { MemoryRouter as Router, Route, Switch } from "react-router-dom";
import { Loading } from "../../shared";
import { KafkaInstanceDrawer } from "./KafkaInstanceDrawer";

type KafkaInstancesStoryProps = {
  startingPage: number;
};

export default {
  args: {
    startingPage: "instances table" as unknown as number,
  },
  argTypes: {
    startingPage: {
      control: "radio",
      options: ["instances table", "instance dashboard", "instance topics"],
      mapping: {
        "instances table": "0",
        "instance dashboard": 1,
        "instance topics": 2,
      },
    },
  },
  parameters: {
    docs: {
      source: {
        code: "disabled",
      },
    },
  },
} as Meta<KafkaInstancesStoryProps>;

const LazyKafkaInstanceDetailDemo = lazy(
  () =>
    new Promise<{ default: ComponentType<any> }>((resolve) =>
      setTimeout(
        () => resolve(import("./stories/KafkaInstanceDetailDemo")),
        1500
      )
    )
);
const LazyKafkaInstancesPageDemo = lazy(
  () =>
    new Promise<{ default: ComponentType<any> }>((resolve) =>
      setTimeout(
        () => resolve(import("./stories/KafkaInstancesPageDemo")),
        1500
      )
    )
);

const Template: Story<KafkaInstancesStoryProps> = (args) => (
  <Router
    initialEntries={["/streams", "/streams/3", "/streams/3/topics"]}
    initialIndex={args.startingPage}
    key={args.startingPage}
  >
    <Page>
      <KafkaInstanceDrawer>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path={"/streams"} exact={true}>
              <LazyKafkaInstancesPageDemo />
            </Route>
            <Route path={"/streams/:id/:tab?"} exact={true}>
              <LazyKafkaInstanceDetailDemo />
            </Route>
          </Switch>
        </Suspense>
      </KafkaInstanceDrawer>
    </Page>
  </Router>
);

export const WorksWithRouting = Template.bind({});
WorksWithRouting.args = {};
