import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  InputGroup,
  Select,
  SelectOption,
  SelectVariant,
  TextInput,
  ToolbarFilter,
  ToolbarGroup,
  ToolbarItem,
  ToolbarToggleGroup,
} from "@patternfly/react-core";
import { FilterIcon, SearchIcon } from "@patternfly/react-icons";
import type { VoidFunctionComponent } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { CloudProvider } from "../../types";
import { useKafkaLabels } from "../../useKafkaLabels";

export type InstancesToolbarProps = {
  names: string[];
  owners: string[];
  statuses: string[];
  cloudProviders: CloudProvider[];
  regions: string[];
  availableCloudProviders: CloudProvider[];
  availableRegions: string[];
  onCreate: () => void;
};

export const InstancesToolbar: VoidFunctionComponent<InstancesToolbarProps> = ({
  names,
  owners,
  statuses,
  cloudProviders,
  regions,
  availableRegions,
  availableCloudProviders,
  onCreate,
}) => {
  const { t } = useTranslation("kafka");
  const [openedMenu, setOpenedMenu] = useState<
    "search" | "status" | "cloud-provider" | "region" | false
  >(false);

  const labels = useKafkaLabels();

  return (
    <>
      <ToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint="xl">
        <ToolbarItem variant="search-filter">
          <InputGroup>
            <Dropdown
              aria-label={t("TODO")}
              onSelect={() => {}}
              isOpen={openedMenu === "search"}
              dropdownItems={[
                <DropdownItem key={"name"} value={"name"}>
                  {labels.fields.name}
                </DropdownItem>,
                <DropdownItem key={"owner"} value={"owner"}>
                  {labels.fields.owner}
                </DropdownItem>,
              ]}
              toggle={
                <DropdownToggle
                  onToggle={(opened) => {
                    setOpenedMenu(opened ? "search" : false);
                  }}
                >
                  {labels.fields.name}
                </DropdownToggle>
              }
            />
            <TextInput aria-label="TODO" onChange={() => {}} value={""} />
            <Button variant="control" aria-label="TODO">
              <SearchIcon />
            </Button>
          </InputGroup>
        </ToolbarItem>
        <ToolbarGroup variant="filter-group">
          <ToolbarFilter
            chips={names}
            deleteChip={() => {}}
            deleteChipGroup={() => {}}
            categoryName={labels.fields.name}
          >
            &nbsp;
          </ToolbarFilter>
          <ToolbarFilter
            chips={owners}
            deleteChip={() => {}}
            deleteChipGroup={() => {}}
            categoryName={labels.fields.owner}
          >
            &nbsp;
          </ToolbarFilter>
          <ToolbarFilter
            chips={statuses.map((s) => ({
              key: s,
              node: <>{labels.statuses[s]}</>,
            }))}
            deleteChip={() => {}}
            deleteChipGroup={() => {}}
            categoryName={labels.fields.status}
          >
            <Select
              variant={SelectVariant.checkbox}
              aria-label={labels.fields.status}
              onToggle={(opened) => {
                setOpenedMenu(opened ? "status" : false);
              }}
              onSelect={() => {}}
              selections={statuses}
              isOpen={openedMenu === "status"}
              placeholderText={labels.fields.status}
            >
              {Object.entries(labels.statuses).map(([status, label]) => (
                <SelectOption key={status} value={status}>
                  {label}
                </SelectOption>
              ))}
            </Select>
          </ToolbarFilter>
          <ToolbarFilter
            chips={cloudProviders}
            deleteChip={() => {}}
            deleteChipGroup={() => {}}
            categoryName={labels.fields.provider}
          >
            <Select
              variant={SelectVariant.checkbox}
              aria-label={labels.fields.provider}
              onToggle={(opened) => {
                setOpenedMenu(opened ? "cloud-provider" : false);
              }}
              onSelect={() => {}}
              selections={cloudProviders}
              isOpen={openedMenu === "cloud-provider"}
              placeholderText={labels.fields.provider}
            >
              {availableCloudProviders.map((provider) => (
                <SelectOption key={provider} value={provider}>
                  {labels.providers[provider]}
                </SelectOption>
              ))}
            </Select>
          </ToolbarFilter>
          <ToolbarFilter
            chips={regions}
            deleteChip={() => {}}
            deleteChipGroup={() => {}}
            categoryName={labels.fields.region}
          >
            <Select
              variant={SelectVariant.checkbox}
              aria-label={labels.fields.region}
              onToggle={(opened) => {
                setOpenedMenu(opened ? "region" : false);
              }}
              onSelect={() => {}}
              selections={regions}
              isOpen={openedMenu === "region"}
              placeholderText={labels.fields.region}
            >
              {availableRegions.map((region) => (
                <SelectOption key={region} value={region} />
              ))}
            </Select>
          </ToolbarFilter>
        </ToolbarGroup>
      </ToolbarToggleGroup>
      <Button ouiaId="button-create" variant="primary" onClick={onCreate}>
        {t("create_instance")}
      </Button>
    </>
  );
};
