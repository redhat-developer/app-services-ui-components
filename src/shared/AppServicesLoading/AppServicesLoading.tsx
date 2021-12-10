import React from 'react';
import { Bullseye, BullseyeProps, Spinner, SpinnerProps } from '@patternfly/react-core';

export type AppServicesLoadingProps = {
  bullseyeProps?: Omit<BullseyeProps, 'children'>;
  spinnerProps?: SpinnerProps;
};

export const AppServicesLoading: React.FunctionComponent<AppServicesLoadingProps> = ({
  bullseyeProps,
  spinnerProps,
}: AppServicesLoadingProps) => (
  <Bullseye {...bullseyeProps}>
    <Spinner {...spinnerProps} />
  </Bullseye>
);
