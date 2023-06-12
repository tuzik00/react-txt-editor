import type { FC } from 'react';
import React from 'react';
import { ThemeProvider } from '@emotion/react';

import { customTheme } from './constants';
import type { WithCustomThemePropsType } from './types';

export const withCustomTheme = <
    T extends Record<string, unknown>,
>(Component: FC<T>): FC<T & WithCustomThemePropsType> => function ({
        theme = customTheme,
        ...componentProps
    }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...componentProps as T} />
    </ThemeProvider>
  );
};
