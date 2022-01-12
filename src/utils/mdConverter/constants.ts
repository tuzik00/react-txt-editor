import { BlockTypes } from '@/constants/BlockTypes';
import { InlineStyleTypes } from '@/constants/InlineStyleTypes';

export const BlockStyleDict: Record<string, string> = {
  [BlockTypes.UNSTYLED]: '',
  [BlockTypes.OL]: '1. ',
  [BlockTypes.UL]: '- ',
  [BlockTypes.H1]: '# ',
  [BlockTypes.H2]: '## ',
  [BlockTypes.H3]: '### ',
  [BlockTypes.H4]: '#### ',
  [BlockTypes.H5]: '##### ',
  [BlockTypes.H6]: '###### ',
  [BlockTypes.BLOCKQUOTE]: '> ',
};

export const InlineStyleDict: Record<string, string> = {
  [InlineStyleTypes.BOLD]: '**',
  [InlineStyleTypes.ITALIC]: '*',
  [InlineStyleTypes.STRIKETHROUGH]: '~~',
};
