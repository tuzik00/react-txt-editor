import { css } from '@emotion/react';
import styled from '@emotion/styled';

export interface TextInfoStyledPropsType {
    isVisible: boolean;
}

const getTextInfoStyles = ({
    isVisible = false,
}: TextInfoStyledPropsType) => css`
    font-size: 12px;
    line-height: 25px;
    color: #151528;
    margin: 0 0 0 25px;
    opacity: ${isVisible ? 1 : 0};
    white-space: nowrap;
    display: flex;
    align-items: center;
`;

export default styled('p')(getTextInfoStyles);
