import { Card, CardBody, CardTitle, TextContent } from "@patternfly/react-core";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { CardKpi } from "./CardKpi";
import { MetricsLayout } from "./MetricsLayout";

const SampleKpi = (
  <CardKpi metric={123} isLoading={false} name="Metric" popover="Lorem" />
);
const SampleCard = (
  <Card>
    <CardTitle>Lorem dolor</CardTitle>
    <CardBody>
      <TextContent>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
          perferendis animi maxime distinctio mollitia quo excepturi provident
          cum neque. Enim quos minima ipsa hic error repudiandae laboriosam
          dolorum pariatur beatae.
        </p>
      </TextContent>
    </CardBody>
  </Card>
);

export default {
  component: MetricsLayout,
  args: {},
} as ComponentMeta<typeof MetricsLayout>;

const Template: ComponentStory<typeof MetricsLayout> = (args) => (
  <MetricsLayout {...args} />
);

export const Layout = Template.bind({});
Layout.args = {
  topicsKpi: SampleKpi,
  topicPartitionsKpi: SampleKpi,
  consumerGroupKpi: SampleKpi,
  diskSpaceMetrics: SampleCard,
  topicMetrics: SampleCard,
};
