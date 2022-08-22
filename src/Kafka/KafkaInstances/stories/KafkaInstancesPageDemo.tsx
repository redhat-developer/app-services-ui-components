import { KafkaInstancesPage } from "../KafkaInstancesPage";
import { useInstances } from "./support";

export const KafkaInstancesPageDemo = () => {
  const { instances } = useInstances();

  return (
    <KafkaInstancesPage
      instances={instances}
      itemCount={instances?.length}
      page={1}
      getUrlForInstance={(row) => `/streams/${row.id}`}
      onChangeOwner={() => {}}
      onClickConnectionTabLink={() => {}}
      onClickSupportLink={() => {}}
      onConnection={() => {}}
      onCreate={() => {}}
      onDelete={() => {}}
      onDetails={() => {}}
      onPageChange={() => {}}
      onQuickstartGuide={() => {}}
    />
  );
};

export default KafkaInstancesPageDemo;
