import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Button from '@mui/material/Button';
import type { ThemeOptions } from '@mui/material';

const getContainerStyles = ({ theme, isOpen }: { theme?: ThemeOptions; isOpen?: boolean; }) => css`
    width: auto;
    min-width: 30px;
    height: 30px;
    padding: 0;
    white-space: nowrap;

    svg {
        width: 27px !important;
        height: 27px !important;
        transform: ${isOpen ? 'rotate(45deg)' : 'none'};
        transition: 100ms ease transform;
    }

    ${theme?.breakpoints?.up?.('tablet')} {
        min-width: 50px;
        height: 50px;
    }
`;

export default styled(Button)([
    getContainerStyles,
]);
