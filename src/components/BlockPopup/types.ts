import type { ReactNode } from 'react';

export type BlockPopupPropsType = {
    children: ReactNode;
    content?: ReactNode;
    isOpen: boolean;
    onOverlayClick?: () => void;
};
