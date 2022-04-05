import { FunctionComponent } from "react";

import {
  Pagination as PFPagination,
  PaginationProps as PFPaginationProps,
  PaginationVariant,
} from "@patternfly/react-core";

export type PaginationProps = {
  itemCount: number;
  page: number;
  perPage: number;
  isCompact?: boolean;
  onChange: (page: number, perPage: number) => void;
} & PFPaginationProps;
export const Pagination: FunctionComponent<PaginationProps> = ({
  itemCount,
  page,
  perPage,
  isCompact = false,
  onChange,
  variant = PaginationVariant.top,
}) => {
  return (
    <PFPagination
      itemCount={itemCount}
      page={page}
      perPage={perPage}
      onSetPage={(_, page) => onChange(page, perPage)}
      onPerPageSelect={(_, perPage) => onChange(page, perPage)}
      variant={variant}
      isCompact={isCompact}
    />
  );
};
