import styled from '@emotion/styled';
import { css } from '@emotion/react';

const getContainerStyles = css`
    padding: 10px 15px;
    box-sizing: border-box;
    color: #5D5D64;
    font-family: PTRootUIWeb, Arial, sans-serif;
    font-size: 16px;
    line-height: 23px;
    cursor: pointer;
    display: flex;
    align-items: center;

    :hover {
        color: rgb(254, 114, 0);
    }

    span {
        width: 20px;
        height: 20px;
        margin-right: 5px;
    }
`;

export default styled('div')([
    getContainerStyles,
]);
