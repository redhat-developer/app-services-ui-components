import React from "react";
import { useTranslation } from "react-i18next";

export const TooltipContent = (
    isMaxFilter: boolean,
    fieldName?: string
): React.ReactElement => {
    const { t } = useTranslation();
    if (isMaxFilter) {
        return <div>{t('kafka:max_filter_message')}</div>;
    }
    if (fieldName === 'owner') {
        return <div>{t('owner_field_invalid_message', { name: fieldName })}</div>;
    }
    return <div>{t('kafka:input_field_invalid_message', { name: fieldName })}</div>;
}