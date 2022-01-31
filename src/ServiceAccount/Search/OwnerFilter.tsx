import { FilterProps } from './FilterProps';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { TooltipContent } from './TooltipContent'
import {
  Button,
  ButtonVariant,
  InputGroup,
  TextInput,
  ToolbarFilter,
  Tooltip,
  ValidatedOptions,
} from '@patternfly/react-core';
import SearchIcon from '@patternfly/react-icons/dist/js/icons/search-icon';

export type OwnerFilterProps = FilterProps;

export const OwnerFilter: React.FunctionComponent<OwnerFilterProps> = ({
  getSelectionForFilter,
  onDeleteChipGroup,
  onDeleteChip,
  filterSelected,
  isMaxFilter,
  updateFilter,
  value,
  setValue
}) => {
  const { t } = useTranslation(

  );
  const inputRef = useRef<HTMLInputElement>(null);
  const tooltipContent = TooltipContent(isMaxFilter, 'owner');

  const validate = (value?: string) => {
    return value ? !/["$^<>|+%/;:,\s*=~#()]/.test(value.trim()) : true;
  };

  const onFilter = () => {
    if (value && value.trim() != '') {
      if (validate(value)) {
        updateFilter('owner', { value: value, isExact: false }, false);
        setValue('');
      }
    }
  };

  const onKeyPress = (event) => {
    if (event.key === 'Enter' && !isMaxFilter) {
      onFilter();
    }
  };

  const onChange = (input: string) => {
    setValue(input);
  };





  const renderOwnerInput = () => {
    if (filterSelected?.toLowerCase() === 'owner') {
      const v = !validate(value) || isMaxFilter;

      const FilterTooltip = v && (
        <Tooltip
          isVisible={v}
          content={tooltipContent}
          reference={inputRef} />
      )

      return (
        <InputGroup>
          <TextInput
            name='owner'
            id='filterOwners'
            type='search'
            aria-label='Search filter input'
            placeholder={t('kafka:filter_by_owner')}
            validated={v ? ValidatedOptions.error : ValidatedOptions.default}
            onChange={onChange}
            onKeyPress={onKeyPress}
            value={value}
            ref={inputRef}
          />
          <Button
            isDisabled={v}
            variant={ButtonVariant.control}
            onClick={onFilter}
            aria-label='Search owners'
          >
            <SearchIcon />
          </Button>
          {FilterTooltip}
        </InputGroup>
      );
    }
    return <></>;
  };

  return (
    <ToolbarFilter
      chips={getSelectionForFilter('owner')}
      deleteChip={(_category, chip) => onDeleteChip('owner', chip)}
      deleteChipGroup={() => onDeleteChipGroup('owner')}
      categoryName={t('kafka:owner')}
      showToolbarItem={filterSelected?.toLowerCase() === 'owner'}
    >
      {renderOwnerInput()}
    </ToolbarFilter>
  );
};
