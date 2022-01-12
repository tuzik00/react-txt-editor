import React, { FC } from 'react';

import { Markdown } from '../..';
import initState from './state';

const MarkdownStory: FC = () => (
  <Markdown content={initState} />
);

export default MarkdownStory;
