import {
    useEffect,
    useState,
} from 'react';

import { getVisibleSelectionRect } from 'draft-js';

import { getSelection } from '../../utils/selection';

import { EDITOR_ROOT_CLASSNAME } from '../../constants';

import type {
    UseInlineToolbarPositionType,
    UseInlineToolbarPositionPropsType,
} from './types';

const useInlineToolbarPosition: UseInlineToolbarPositionPropsType = (
    editorState,
    toolbarRef,
) => {
    const [
        position,
        setPosition,
    ] = useState<UseInlineToolbarPositionType>({
        left: 0,
        top: 0,
    });

    useEffect(() => {
        const nativeSelection = getSelection(window);

        if (!nativeSelection?.rangeCount || nativeSelection?.isCollapsed) {
            return;
        }

        const toolbarNode = toolbarRef.current;
        const parentNode = toolbarNode?.parentNode as HTMLElement;
        const editorRootNode = toolbarNode?.closest(`.${EDITOR_ROOT_CLASSNAME}`) as HTMLElement;

        if (!toolbarNode || !parentNode) {
            return;
        }

        const selectionBoundary = getVisibleSelectionRect(window);
        const parentBoundary = parentNode.getBoundingClientRect();
        const rootBoundary = editorRootNode.getBoundingClientRect();

        const left = () => {
            const realLeft = (
                selectionBoundary.left
                + selectionBoundary.width / 2
                - rootBoundary.left
                - toolbarNode.offsetWidth / 2
            );

            if (realLeft < 0) {
                return 0;
            }

            if (realLeft + toolbarNode.offsetWidth > parentBoundary.right) {
                return parentBoundary.right - toolbarNode.offsetWidth;
            }

            return realLeft;
        };

        // Проверка, если селект контента вне редактора
        if (!selectionBoundary) {
            return;
        }

        const top = (
            parentNode.offsetTop
            - toolbarNode.offsetHeight
            + (
                selectionBoundary.top
                - parentBoundary.top
            )
        );

        setPosition({
            top,
            left: left(),
        });
    }, [
        editorState,
        toolbarRef,
    ]);

    return position;
};

export default useInlineToolbarPosition;
