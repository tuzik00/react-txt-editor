import type {
    Theme,
    ThemeOptions,
} from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xs: false;
        sm: false;
        md: false;
        lg: false;
        xl: false;
        mobile: true;
        tablet: true;
        laptop: true;
        desktop: true;
    }

    export function createTheme(options?: ThemeOptions): Theme;
}
