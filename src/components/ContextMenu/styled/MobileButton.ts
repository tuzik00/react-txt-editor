import styled from '@emotion/styled';
import { css } from '@emotion/react';

const getMobileMenuStyles = css`
    background-color: white;
    border-radius: 4px;
    margin: 10px 5px 5px 5px;
    cursor: pointer;

    :hover {
        color: rgb(254, 114, 0);
    }

    :last-child {
        margin-right: 10px;
    }

    span {
        width: 18px;
        height: 18px;
    }

    padding: 1px;
    box-sizing: border-box;
`;

export default styled('div')([
    getMobileMenuStyles,
]);
