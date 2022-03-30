import { FunctionComponent } from "react";
import { Pagination } from "@patternfly/react-core";
import { useTranslation } from "react-i18next";

export type ConsumerGroupPaginationProps = {
  itemCount: number;
  page: number;
  perPage: number;
  onSetPage: (page: number) => void;
  onPerPageSelect: (perPage: number) => void;
};
export const ConsumerGroupPagination: FunctionComponent<
  ConsumerGroupPaginationProps
> = ({ itemCount, page, perPage, onSetPage, onPerPageSelect }) => {
  const { t } = useTranslation(["common"]);
  return (
    <Pagination
      itemCount={itemCount}
      page={page}
      perPage={perPage}
      onSetPage={(_, page) => onSetPage(page)}
      onPerPageSelect={(_, perPage) => onPerPageSelect(perPage)}
      titles={{
        paginationTitle: t("minimal_pagination"),
        perPageSuffix: t("per_page_suffix"),
        toFirstPage: t("to_first_page"),
        toPreviousPage: t("to_previous_page"),
        toLastPage: t("to_last_page"),
        toNextPage: t("to_next_page"),
        optionsToggle: t("options_toggle"),
        currPage: t("curr_page"),
      }}
    />
  );
};
