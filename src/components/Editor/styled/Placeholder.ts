import styled from '@emotion/styled';
import { css } from '@emotion/react';

import {
    DRAFT_ROOT_CLASSNAME,
    PLACEHOLDER_HAS_FOCUS_CLASSNAME,
    PLACEHOLDER_ROOT_CLASSNAME,
} from '../constants';

const placeholderStyles = ({
    isShow = true,
}: { isShow?: boolean; }) => css`
    & .${DRAFT_ROOT_CLASSNAME} {
        position: relative;
    }

    & .${PLACEHOLDER_ROOT_CLASSNAME}.${PLACEHOLDER_HAS_FOCUS_CLASSNAME} {
        display: none;
    }

    & .${PLACEHOLDER_ROOT_CLASSNAME} {
        display: ${isShow ? 'block' : 'none'};
        position: absolute;
        pointer-events: none;
        color: #B4B4B4;
        top: 50%;
        transform: translate(5px, -50%);
    }
`;

export default styled('div')([
    placeholderStyles,
]);
