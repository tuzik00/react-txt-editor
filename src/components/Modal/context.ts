import { createContext } from 'react';

import type { ModalContextType } from './types';

export default createContext<ModalContextType>({
    setModal: () => {},
    show: () => {},
    hide: () => {},
});
