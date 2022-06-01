import {
  Button,
  ButtonVariant,
  InputGroup,
  TextInput,
  Toolbar,
  ToolbarContent,
  ToolbarFilter,
  ToolbarItem,
  ToolbarToggleGroup,
} from "@patternfly/react-core";
import { FilterIcon, SearchIcon } from "@patternfly/react-icons";
import type { FunctionComponent } from "react";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import type { PaginationProps } from "../../../shared";
import { Pagination } from "../../../shared";

export type ConsumerGroupToolbarProps = {
  onSearch: (value: string) => void;
} & PaginationProps;

export const ConsumerGroupToolbar: FunctionComponent<
  ConsumerGroupToolbarProps
> = ({ onSearch, page, perPage, itemCount, onChange }) => {
  const { t } = useTranslation(["kafka"]);

  const [value, setValue] = useState<string>("");

  const canSearch = value.length !== 0;

  const [search, setSearch] = useState<string>("");

  const onClickSearch = useCallback(() => {
    if (canSearch) {
      onSearch(value);
      setSearch(value);
      setValue("");
    }
  }, [onSearch, value, canSearch]);

  const onDeleteChip = () => {
    setSearch("");
  };

  const onClear = () => {
    setSearch("");
  };

  return (
    <Toolbar clearAllFilters={onClear}>
      <ToolbarContent>
        <ToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint="md">
          <ToolbarFilter
            categoryName={""}
            chips={search ? [search] : []}
            deleteChip={onDeleteChip}
          >
            <InputGroup>
              <TextInput
                name="searchConsumerGroups"
                id="search-consumer-groups-input"
                type="search"
                aria-label={t("consumerGroup.consumer_group_search_input")}
                placeholder={t("common:search_button_label")}
                value={value}
                onChange={setValue}
              />
              <Button
                isDisabled={!canSearch}
                variant={ButtonVariant.control}
                aria-label={t("consumerGroup.consumer_group_search")}
                onClick={onClickSearch}
              >
                <SearchIcon />
              </Button>
            </InputGroup>
          </ToolbarFilter>
        </ToolbarToggleGroup>
        <ToolbarItem variant="pagination" alignment={{ default: "alignRight" }}>
          <Pagination
            itemCount={itemCount}
            page={page}
            perPage={perPage}
            onChange={onChange}
          />
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );
};
