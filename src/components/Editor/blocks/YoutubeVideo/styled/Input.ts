import { css } from '@emotion/react';
import styled from '@emotion/styled';

export interface InputStyledPropsType {
    hasError: boolean;
}

const getDefaultStyles = ({
    hasError,
}: InputStyledPropsType) => css`
    width: 100%;
    border: none;
    max-width: 700px;
    padding: 0;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;

    &::placeholder {
        color: #B3B3B7;
    }

    &:focus{
        outline: none;
    }   

    ${hasError && 'border-bottom: 1px solid #C50B0B;'}
`;

export default styled.input(getDefaultStyles);
