import {
  Button,
  SearchInput,
  ToolbarFilter,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";
import type { IAction } from "@patternfly/react-table";
import { KafkaInstanceStatus } from "../../Kafka";

export const columns = [
  "name",
  "owner",
  "timeCreated",
  "cloudProvider",
  "region",
  "status",
] as const;

export const columnLabels: { [key in typeof columns[number]]: string } = {
  name: "Name",
  owner: "Owner",
  timeCreated: "Time created",
  cloudProvider: "Cloud Provider",
  region: "Region",
  status: "Status",
};
const readySign = (
  <KafkaInstanceStatus
    status={"ready"}
    createdAt={new Date()}
    onClickConnectionTabLink={() => false}
    onClickSupportLink={() => false}
  />
);
const creationPendingSign = (
  <KafkaInstanceStatus
    status={"preparing"}
    createdAt={new Date()}
    onClickConnectionTabLink={() => false}
    onClickSupportLink={() => false}
  />
);
export const deletingSign = (
  <KafkaInstanceStatus
    status={"deleting"}
    createdAt={new Date()}
    onClickConnectionTabLink={() => false}
    onClickSupportLink={() => false}
  />
);
export type SampleDataType = [
  string,
  string,
  string,
  string,
  string,
  typeof readySign | typeof creationPendingSign | typeof deletingSign
];
export const sampleData: Array<SampleDataType> = [
  [
    "kafka-test-instance",
    "username",
    "about 1 hours ago",
    "Amazon Web Services",
    "US East, N. Virginia",
    creationPendingSign,
  ],
  [
    "kafka-test-instance-2",
    "username2",
    "about 2 hours ago",
    "Amazon Web Services 2",
    "US East, N. Virginia 2",
    creationPendingSign,
  ],
  [
    "kafka-test-instance-3",
    "username3",
    "about 3 hours ago",
    "Amazon Web Services 3",
    "US East, N. Virginia 3",
    readySign,
  ],
  [
    "kafka-test-instance-4",
    "username4",
    "about 4 hours ago",
    "Amazon Web Services 4",
    "US East, N. Virginia 4",
    deletingSign,
  ],
  [
    "kafka-test-instance-5",
    "username5",
    "about 5 hours ago",
    "Amazon Web Services 5",
    "US East, N. Virginia 5",
    readySign,
  ],
];
export const defaultActions = (data: any): IAction[] => [
  {
    title: "Some action",
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions
    onClick: () => console.log(`clicked on Some action, on row ${data[0]}`),
  },
  {
    title: <a href="https://www.patternfly.org">Link action</a>,
  },
  {
    isSeparator: true,
  },
  {
    title: "Third action",
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions
    onClick: () => console.log(`clicked on Third action, on row ${data[0]}`),
  },
];

export const sampleToolbarWithFilter = (
  <ToolbarGroup variant="filter-group">
    <ToolbarFilter chips={["this doesn't exist"]} categoryName="Example">
      <ToolbarItem>
        <SearchInput value={"this doesn't exist"} />
      </ToolbarItem>
    </ToolbarFilter>
    <ToolbarItem>
      <Button>Sample</Button>
    </ToolbarItem>
  </ToolbarGroup>
);
