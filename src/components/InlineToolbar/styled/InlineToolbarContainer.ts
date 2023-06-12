import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Stack from '@mui/material/Stack';

const baseStyles = css`
    display: inline-flex;
    position: relative;
    padding: 5px 15px;
    border-radius: 3px;
    box-shadow: 0 5px 25px rgba(30, 31, 33, 0.12);
    background: #FFF;
    transition: top 250ms ease-in-out, left 250ms ease-in-out;
`;

export default styled(Stack)([
    baseStyles,
]);
