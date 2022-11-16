import { action } from "@storybook/addon-actions";
import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { fakeApi } from "../../shared/storiesHelpers";
import { KafkaTopics as KafkaTopicsComp } from "./KafkaTopics";
import type { KafkaTopic } from "./types";

const getTopicsAction = action("getTopics");

const topics: KafkaTopic[] = [
  {
    topic_name: "foo",
    partitions: 1,
    retention_size: "-1",
    retention_time: "	86400000 ms",
  },
  {
    topic_name: "bar",
    partitions: 3,
    retention_size: "1099511600000 bytes",
    retention_time: "1500000",
  },
  {
    topic_name: "buzz",
    partitions: 2,
    retention_size: "80000 bytes",
    retention_time: "-1",
  },
];

export default {
  component: KafkaTopicsComp,
  args: {
    getUrlFortopic: (row) => `/${row.topic_name}`,
  },
} as ComponentMeta<typeof KafkaTopicsComp>;

const randomData = new Array(50).fill(0).map((_, index) => {
  const i = topics[index % topics.length];
  return {
    ...i,
    topic_name: `${i.topic_name}-${index}`,
  };
});

const Template: ComponentStory<typeof KafkaTopicsComp> = (args) => {
  return (
    <KafkaTopicsComp
      {...args}
      getTopics={(page, perPage, query, sort, sortDirection) => {
        const allData = randomData.filter((i) => {
          return query.names.length > 0
            ? query.names.find((n) => i.topic_name.includes(n))
            : true;
        });
        const data = allData.slice(page, perPage);
        const count = allData.length;
        getTopicsAction(
          ...Object.entries({
            page,
            perPage,
            sort,
            sortDirection,
          }).flat(),
          ...Object.entries(query)
            .map(([k, v]) => [k, v.length > 0 ? v.join(",") : null])
            .flat()
        );
        return fakeApi({ topics: data, count });
      }}
    />
  );
};

export const KafkaTopics = Template.bind({});
KafkaTopics.args = {};
