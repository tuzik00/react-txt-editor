import { EditorState, RichUtils } from 'draft-js';

import { EntityTypes } from '@/constants/EntityTypes';
import { MutabilityTypes } from '@/constants/MutabilityTypes';

export const toggleEntityLink = (
  editorState: EditorState,
  url: string | unknown,
): EditorState => {
  if (!url) {
    return RichUtils.toggleLink(
      editorState,
      editorState.getSelection(),
      null,
    );
  }

  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(
    EntityTypes.LINK,
    MutabilityTypes.MUTABLE,
    { url },
  );

  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = EditorState.set(editorState, {
    currentContent: contentStateWithEntity,
  });

  return RichUtils.toggleLink(
    newEditorState,
    newEditorState.getSelection(),
    entityKey,
  );
};
