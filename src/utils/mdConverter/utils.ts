import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';

import type {
    ParseDirectiveFnTypeCallbackFnType,
    ParseDirectiveNodeType,
} from './types';

export const strlen = (str: string): number => Array.from(str).length;

let idCounter = -1;

export const generateUniqueKey = (): number => {
    idCounter += 1;
    return idCounter;
};

export const parseDirective = (
    str: string,
    fn: ParseDirectiveFnTypeCallbackFnType,
): void => {
    const astString = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkDirective);

    const ast = astString.parse(str);

    const parseUnifiedStr = (
        children: ParseDirectiveNodeType[],
    ): any => {
        if (children?.length > 0) {
            children.forEach((child) => {
                const childType = child.type || '';

                if (
                    childType === 'textDirective'
                    || childType === 'leafDirective'
                ) {
                    const text = child?.children[0]?.value || '';
                    const offset = child?.position?.start?.offset || 0;

                    fn({
                        text,
                        name: child?.name || '',
                        attrs: child?.attributes || {},
                        offset,
                        length: strlen(text),
                    });
                }

                if (child?.children?.length > 0) {
                    parseUnifiedStr(child.children);
                }
            });
        }
    };

    parseUnifiedStr(ast.children as unknown as ParseDirectiveNodeType[]);
};
