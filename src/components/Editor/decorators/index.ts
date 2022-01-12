import { CompositeDecorator } from 'draft-js';
import linkDecorator from './link';

export default new CompositeDecorator([
  linkDecorator,
]);
