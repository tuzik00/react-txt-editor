declare module 'draftjs-utils' {
    import type { EditorState } from 'draft-js';

    export function getSelectionInlineStyle(editorState: EditorState): Record<string, unknown>;
    export function getSelectedBlocksType(editorState: EditorState): string;
    export function getSelectionEntity(editorState: EditorState): string;
    export function insertNewUnstyledBlock(editorState: EditorState): EditorState;
}

declare module '*.svg' {
    import type {
        FC,
        SVGProps,
    } from 'react';

    const value: FC<SVGProps<SVGElement>>;
    export = value;
}
