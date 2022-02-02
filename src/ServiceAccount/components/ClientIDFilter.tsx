import { FilterProps } from './FilterProps';
import React, { useRef } from 'react';
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

export type ClientIDFilterProps = FilterProps;

export const ClientIDFilter: React.FunctionComponent<ClientIDFilterProps> = ({
  getSelectionForFilter,
  onDeleteChipGroup,
  onDeleteChip,
  filterSelected,
  isMaxFilter,
  updateFilter,
  value,
  setValue
}) => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const tooltipContent = TooltipContent(isMaxFilter, 'clientid');

  const validate = (value?: string) => {
    return value ? !/["$^<>|+%/;:,\s*=~#()]/.test(value.trim()) : true;
  };

  const onFilter = () => {
    if (value && value.trim() != '') {
      if (validate(value)) {
        updateFilter('clientid', { value: value, isExact: false }, false);
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

  const renderClientInput = () => {
    if (filterSelected?.toLowerCase() === 'clientid') {
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
            name='clientID'
            id='filterClient'
            type='search'
            aria-label='Search filter input'
            placeholder={t('kafka:filter_by_client_id')}
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
            aria-label='Search clientID'
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
      chips={getSelectionForFilter('clientid')}
      deleteChip={(_category, chip) => onDeleteChip('clientid', chip)}
      deleteChipGroup={() => onDeleteChipGroup('clientid')}
      categoryName={t('kafka:clientID')}
      showToolbarItem={filterSelected?.toLowerCase() === 'clientid'}
    >
      {renderClientInput()}
    </ToolbarFilter>
  );
};
