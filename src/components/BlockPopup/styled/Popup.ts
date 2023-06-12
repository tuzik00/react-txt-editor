import styled from '@emotion/styled';
import { css } from '@emotion/react';

const getPopupStyles = () => css`
    width: 100%;
    max-width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 16px 24px;
    box-sizing: border-box;
    border-radius: 4px;
    z-index: 1;
`;

export default styled('div')([
    getPopupStyles,
]);
