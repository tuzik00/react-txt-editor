import React, { FC, memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { defaultStyleBlockRenderMap } from './defaultStyleBlockRenderMap';
import { TagTypes } from './constants';

import type { MarkdownPropsType } from './types';

const Markdown: FC<MarkdownPropsType> = ({
  content = '',
  styleBlockRenderMap = {},
}) => (
  <ReactMarkdown
    allowedElements={[
      TagTypes.H1,
      TagTypes.H2,
      TagTypes.H3,
      TagTypes.H4,
      TagTypes.H5,
      TagTypes.H6,
      TagTypes.LINK,
      TagTypes.BOLD,
      TagTypes.ITALIC,
      TagTypes.BLOCKQUOTE,
      TagTypes.STRIKETHROUGH,
      TagTypes.PARAGRAPH,
      TagTypes.LI,
      TagTypes.OL,
      TagTypes.UL,
    ]}
    remarkPlugins={[remarkGfm]}
    components={{
      ...defaultStyleBlockRenderMap,
      ...styleBlockRenderMap,
    }}
  >
    {content}
  </ReactMarkdown>
);

export default memo(Markdown);
