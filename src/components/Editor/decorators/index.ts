import { CompositeDecorator } from 'draft-js';

import linkDecorator from './link';
import directiveLinkDecorator from './directiveLink';

export default new CompositeDecorator([
    linkDecorator,
    directiveLinkDecorator,
]);
