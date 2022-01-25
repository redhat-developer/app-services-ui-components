import { FilterProps } from './FilterProps';
import React, { useRef, useState } from 'react';
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
}) => {
  const { t } = useTranslation();
  const [valid, setValid] = useState<boolean>(true);
  const [value, setValue] = useState<string | undefined>();
  const inputRef = useRef<HTMLInputElement>(null);
  const tooltipContent = TooltipContent(isMaxFilter, 'description');

  const change = (input?: string) => {
    setValue(input);
    !valid && setValid(true);
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
      } else {
        setValid(false);
      }
    }
  };

  const renderShortDescriptionInput = () => {
    const v = !valid || isMaxFilter;
    const FilterTooltip: React.FunctionComponent = () => {
      if (v) {
        return (
          <Tooltip
            isVisible={isMaxFilter || !valid}
            content={tooltipContent}
            reference={inputRef}
          />
        );
      }
      return <></>;
    };

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
            isDisabled={!valid || isMaxFilter}
            onClick={() => onFilter()}
            aria-label='Search instances'
          >
            <SearchIcon />
          </Button>
          <FilterTooltip />
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
