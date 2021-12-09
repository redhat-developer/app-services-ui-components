import {
    Toolbar,
    ToolbarContent,
    ToolbarItem,
    InputGroup,
    TextInput,
    Button,
    ButtonVariant,
    ToolbarFilter,
} from '@patternfly/react-core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchIcon } from '@patternfly/react-icons';

export type TopicsToolbarProps = {
    setFilteredValue: (value: string) => void;
    filteredValue: string;
    onCreateTopic?: () => void;
}

export const TopicsToolbar: React.FC<TopicsToolbarProps> = ({
    setFilteredValue,
    filteredValue = '',
    onCreateTopic
}) => {


    const { t } = useTranslation();

    const [topicInputValue, setTopicInputValue] = useState<string>('');

    const onChangeInput = (value: string) => {
        setTopicInputValue(value);
    }

    const onSearch = () => {
        setTopicInputValue('');
    }
    const onClear = () => {
        setFilteredValue('');
    };

    const onDeleteChip = () => {
        setFilteredValue('');
    };

    return (
        <Toolbar id="toolbar" clearAllFilters={onClear}>
            <ToolbarContent>
                <ToolbarItem>
                    <ToolbarFilter
                        chips={filteredValue ? [filteredValue] : []}
                        deleteChip={onDeleteChip}
                        categoryName={''}>
                        <InputGroup>
                            <TextInput
                                name='searchName'
                                id='search-topics-input'
                                type='search'
                                aria-label={t('topic.topic_search_input')}
                                placeholder={t('topic.search')}
                                value={topicInputValue}
                                onChange={onChangeInput} />
                            <Button
                                variant={ButtonVariant.control}
                                isDisabled={topicInputValue.length ? false : true}
                                onClick={onSearch}
                                aria-label={t('topic.topic_search')}>
                                <SearchIcon />
                            </Button>
                        </InputGroup>
                    </ToolbarFilter>
                </ToolbarItem>
                <ToolbarItem>
                    <Button
                        id='topic-list-create-topic-button'
                        className='topics-per-page'
                        data-testid='actionCreateTopic'
                        onClick={onCreateTopic}
                    >
                        {t('topic.create_topic')}
                    </Button>
                </ToolbarItem>
            </ToolbarContent>
        </Toolbar >
    );
}