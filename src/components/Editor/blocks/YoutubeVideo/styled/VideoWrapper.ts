import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { ThemeOptions } from '@mui/material';

const getDefaultStyles = ({ theme }: { theme?: ThemeOptions; }) => css`
    max-width: 100%;
    width: 688px;
    height: 180px;
    
    & > div {
        height: 100%;
    }

    ${theme?.breakpoints?.up?.('tablet')} {
        height: 388px;
    }
`;

export default styled.div(getDefaultStyles);
