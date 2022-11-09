import { Th, Thead, Tr } from "@patternfly/react-table";
import { useTranslation } from "react-i18next";

export const ShortcutsTableHead: React.FC = () => {
  const { t } = useTranslation(["manage-kafka-permissions"]);
  return (
    <Thead>
      <Tr>
        <Th>{t("table.resource_column_title")}</Th>
        <Th />

        <Th />

        <Th>{t("table.permissions_column_title")}</Th>
        <Th />
        <Th />
      </Tr>
    </Thead>
  );
};
