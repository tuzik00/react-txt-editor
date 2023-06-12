import { EditorState } from 'draft-js';
import { createContext } from 'react';

import { customEntityMap } from '../../customEntityMap';

import type { UseEditorContextType } from './types';

export default createContext<UseEditorContextType>({
    editorState: EditorState.createEmpty(),
    setEditorFocus: () => {},
    handleChangeState: () => {},
    setReadOnly: () => {},
    isReadOnly: false,
    isDisabled: false,
    mergeEntityMap: customEntityMap,
});
