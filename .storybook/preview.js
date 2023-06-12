import React from 'react';
import { ThemeProvider } from '@emotion/react';

import { customTheme } from '../src/components/Editor/hocs/withCustomTheme/constants';

export const decorators = [
    (Story) => (
        <ThemeProvider theme={customTheme}>
            <Story />
        </ThemeProvider>
    ),
];

export const parameters = {
    actions: {argTypesRegex: '^on[A-Z].*'},
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};
