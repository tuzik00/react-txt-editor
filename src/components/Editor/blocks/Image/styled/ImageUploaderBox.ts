import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { ThemeOptions } from '@mui/material';

export interface ImageUploaderBoxStyledPropsType {
    theme?: ThemeOptions;
    isDragEntered: boolean;
}

const getDefaultStyles = ({ theme }: ImageUploaderBoxStyledPropsType) => css`
    position: relative;
    height: 395px;
    width: 100%;
    border-radius: 23px;
    background-color: ${theme?.palette?.grey?.[200]};
`;

const getDragEnterStyles = ({
    isDragEntered,
    theme,
}: ImageUploaderBoxStyledPropsType) => isDragEntered && css`
    box-shadow: ${theme?.shadows?.[3]};
`;

export default styled.div([
    getDefaultStyles,
    getDragEnterStyles,
]);
