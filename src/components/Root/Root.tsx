import React, {
  FC,
  memo,
  lazy,
  Suspense,
} from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import type { AppPropsType } from '@/components/App';

const App = lazy(() => import('@/components/App/App'));

const Root: FC<AppPropsType> = (props) => {
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <Suspense
      fallback={(
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
    >
      <App {...props} />
    </Suspense>
  );
};

export default memo(Root);
