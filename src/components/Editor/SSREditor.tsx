import type { FC } from 'react';

import React, {
    memo,
    lazy,
    Suspense,
} from 'react';

import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import type { TypographyProps } from '@mui/material/Typography';

import type { WithContentAdapterPropsType } from './hocs/withContentAdapter';

const Editor = lazy(() => import('./Editor'));

const SSREditor: FC<WithContentAdapterPropsType> = (props) => {
    if (typeof window === 'undefined') {
        return null;
    }

    const variants = [
        'h1',
        'h3',
        'body1',
        'caption',
    ] as readonly TypographyProps['variant'][];

    return (
      <Suspense
        fallback={(
          <div>
            {variants.map((variant) => (
              <Typography
                key={variant}
                component={'div'}
                variant={variant}
              >
                <Skeleton />
              </Typography>
                    ))}
          </div>
            )}
      >
        <Editor {...props} />
      </Suspense>
    );
};

export default memo(SSREditor);
