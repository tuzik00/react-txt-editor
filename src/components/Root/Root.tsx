import React, {
  FC,
  memo,
  lazy,
  Suspense,
} from 'react';

import InputBase from '@mui/material/InputBase';

import type { AppPropsType } from '@/components/App';

const App = lazy(() => import('@/components/App/App'));

const Root: FC<AppPropsType> = (props) => {
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <Suspense fallback={(<InputBase />)}>
      <App {...props} />
    </Suspense>
  );
};

export default memo(Root);
