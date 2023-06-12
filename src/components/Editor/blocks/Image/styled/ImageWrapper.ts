import styled from '@emotion/styled';
import type { ThemeOptions } from '@mui/material';

import {
    css,
} from '@mui/material';

export default styled.div(({ theme }: { theme?: ThemeOptions; }) => css`
    pointer-events: none;
    width: auto;
    height: 40px;
    color: ${theme?.palette?.grey?.[600] ?? ''};
    margin-bottom: 7px;

    ${theme?.breakpoints?.up?.('tablet')} {
        width: 50px;
        height: 50px;
        margin-bottom: 10px;
    }

    & > svg {
        width: 100%;
        height: 100%;
    }
`);
