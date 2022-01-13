import React, {
  FC,
  memo,
  useMemo,
} from 'react';

import { RawDraftContentState } from 'draft-js';
import { useDebouncedCallback } from 'use-debounce';

import { GlobalStyles } from '@/components/GlobalStyles';
import { Editor } from '@/components/Editor';
import { ModalProvider } from '@/components/Modal';

import { StateTypes } from '@/constants/StateTypes';

import validator from '@/utils/validator';
import getMdString from '@/utils/getMdString';

import {
  blocksToDraft,
  CONTENT_BLOCK_NAME,
  draftToBlocks,
} from '@/utils/blocksConverter';

import type { AppPropsType } from './types';

const App: FC<AppPropsType> = ({
  state = '',
  stateType = StateTypes.BLOCK,
  onChange = () => {},
  isActive,
  renderInlineToolbar,
  renderBlockToolbar,
  inlineToolbarAllowTypes,
  styleBlockRenderMap,
  blockRenderMap,
}) => {
  const handleDebouncedChangeState = useDebouncedCallback(
    (rawState: RawDraftContentState) => {
      try {
        const blocks = draftToBlocks(rawState);

        if (stateType === StateTypes.MARKDOWN) {
          onChange(getMdString(blocks));
          return;
        }

        onChange(blocks);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(e);
      }
    },
    300,
  );

  const editorState = useMemo<RawDraftContentState | undefined>(
    () => {
      try {
        if (!state?.length) {
          return blocksToDraft([]);
        }

        if (stateType === StateTypes.MARKDOWN) {
          return blocksToDraft([
            {
              type: CONTENT_BLOCK_NAME,
              data: {
                content: state,
              },
            },
          ]);
        }

        const validateState = validator.validateSync(state);

        if (!validateState) {
          return blocksToDraft([]);
        }

        return blocksToDraft(validateState);
      } catch (e) {
        console.warn(e);

        return blocksToDraft([
          {
            type: CONTENT_BLOCK_NAME,
            data: {
              content: 'State error',
            },
          },
        ]);
      }
    },
    [
      stateType,
      state,
    ],
  );

  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <ModalProvider>
      <GlobalStyles />
      <Editor
        isActive={isActive}
        state={editorState}
        stateType={stateType}
        inlineToolbarAllowTypes={inlineToolbarAllowTypes}
        renderBlockToolbar={renderBlockToolbar}
        renderInlineToolbar={renderInlineToolbar}
        styleBlockRenderMap={styleBlockRenderMap}
        blockRenderMap={blockRenderMap}
        onChange={handleDebouncedChangeState}
      />
    </ModalProvider>
  );
};

export default memo(App);
