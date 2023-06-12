import type { IconSize } from './constants';

export interface IconProps {
    /** className */
    className?: string;
    /** Размер контейнера иконки (s = 16px, m = 20px, l = 30px) */
    size?: IconSize;
    /* Заполнение заднего фона */
    isDisabledFill?: boolean;
    /* Смена цвета обводки */
    isEnabledStrokeColoring?: boolean;
    /* Инлайн стили */
    style?: Record<string, string | number>;
}
