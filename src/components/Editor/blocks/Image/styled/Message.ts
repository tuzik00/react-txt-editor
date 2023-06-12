import styled from '@emotion/styled';

import { css } from '@mui/material';
import type { ThemeOptions } from '@mui/material';

export default styled.div(({ theme }: { theme?: ThemeOptions; }) => css`
    width: 100%;
    text-align: center;
    font-size: 14px;
    color: ${theme?.palette?.grey?.[600]};
    pointer-events: none;
`);
