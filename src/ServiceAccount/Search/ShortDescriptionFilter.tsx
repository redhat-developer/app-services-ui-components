import { FilterProps } from './FilterProps';
import React, { useCallback, useRef, useState } from 'react';
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

export type ShortDescriptionFilterProps = FilterProps;

export const ShortDescriptionFilter: React.FunctionComponent<ShortDescriptionFilterProps> = ({
  getSelectionForFilter,
  onDeleteChip,
  onDeleteChipGroup,
  filterSelected,
  isMaxFilter,
  updateFilter,
  value,
  setValue
}) => {
  const { t } = useTranslation();

  const inputRef = useRef<HTMLInputElement>(null);
  const tooltipContent = TooltipContent(isMaxFilter, 'description');

  const change = (input: string) => {
    setValue(input);
  };

  const validate = (value?: string) => {
    return value
      ? /^([a-zA-Z0-9-_%]*[a-zA-Z0-9-_%])?$/.test(value.trim())
      : true;
  };

  const onKeyPress = (event) => {
    if (event.key === 'Enter' && !isMaxFilter) {
      onFilter();
    }
  };

  const onFilter = () => {
    if (value && value.trim() != '') {
      if (validate(value)) {
        updateFilter('description', { value: value, isExact: false }, false);
        setValue('');
      }
    }
  };

  const renderShortDescriptionInput = () => {
    const v = !validate(value) || isMaxFilter;
    const FilterTooltip = useCallback(
      () => {
        if (v) {
          return (
            <Tooltip
              isVisible={isMaxFilter || !validate(value)}
              content={tooltipContent}
              reference={inputRef}
            />
          );
        }
        return <></>;
      }, [v]
    )

    if (filterSelected?.toLowerCase() === 'description') {
      return (
        <InputGroup>
          <TextInput
            name='description'
            id='filterText'
            type='search'
            aria-label='Search filter input'
            validated={v ? ValidatedOptions.error : ValidatedOptions.default}
            placeholder={t('kafka:filter_by_short_description')}
            onChange={change}
            onKeyPress={onKeyPress}
            value={value}
            ref={inputRef}
          />
          <Button
            variant={ButtonVariant.control}
            isDisabled={v}
            onClick={() => onFilter()}
            aria-label='Search instances'
          >
            <SearchIcon />
          </Button>
          {FilterTooltip()}
        </InputGroup>
      );
    }
    return <></>;
  };

  return (
    <ToolbarFilter
      chips={getSelectionForFilter('description')}
      deleteChip={(_category, chip) => onDeleteChip('description', chip)}
      deleteChipGroup={() => onDeleteChipGroup('description')}
      categoryName={t('kafka:short_description')}
      showToolbarItem={filterSelected?.toLowerCase() === 'description'}
    >
      {renderShortDescriptionInput()}
    </ToolbarFilter>
  );
};
