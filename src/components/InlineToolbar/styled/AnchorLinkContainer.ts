import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Box from '@mui/material/Box';

const baseStyles = css`
    display: flex;
    align-items: center;

    & > button {
        margin-right: 15px;
    }
`;

export default styled(Box)([
    baseStyles,
]);
