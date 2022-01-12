import { BlockTypes } from './BlockTypes';

export const ShortcutKeys = {
  '> ': BlockTypes.BLOCKQUOTE,
  '*. ': BlockTypes.UL,
  '* ': BlockTypes.UL,
  '- ': BlockTypes.UL,
  '1. ': BlockTypes.OL,
  '## ': BlockTypes.H2,
  '### ': BlockTypes.H3,
  '==': BlockTypes.UNSTYLED,
};
