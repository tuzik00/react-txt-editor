import styled from '@emotion/styled';
import { css } from '@emotion/react';
import type { ThemeOptions } from '@mui/material';

const getMenuContainerStyles = ({ theme }: { theme?: ThemeOptions; }) => css`
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;

    ${theme?.breakpoints?.up?.('tablet')} {
        background-color: rgba(21, 21, 40, 0.5);
    }
`;

export default styled('div')([
    getMenuContainerStyles,
]);
