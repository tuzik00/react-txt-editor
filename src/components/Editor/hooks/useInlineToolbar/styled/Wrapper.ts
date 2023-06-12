import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { ThemeOptions } from '@mui/material';

const getMobileStyles = ({ theme }: { theme?: ThemeOptions; }) => css`
    ${theme?.breakpoints?.down?.('tablet')} {
        width: 100vw;
        overflow-x: scroll;
        text-align: center;

        & > * {
            margin: auto;
        }
    }
`;

export default styled.div(getMobileStyles);
