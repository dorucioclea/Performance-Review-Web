import createMuiTheme, { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { Direction, PaletteType } from '@material-ui/core';
import { TypographyOptions } from '@material-ui/core/styles/createTypography';
import { deepOrange, grey, red } from '@material-ui/core/colors';

export function getThemeOptions(base: ThemeOptions, direction: Direction, paletteType: PaletteType): ThemeOptions {
  const fontFamily =
    direction === 'ltr'
      ? 'Shabnam, "Roboto", "Helvetica", "Arial", sans-serif'
      : '"Shabnam FD", "Roboto", "Helvetica", "Arial", sans-serif';

  const typography: TypographyOptions = {
    fontFamily,
    h1: { fontSize: '36px', fontWeight: 'bold' },
    h2: { fontSize: '30px', fontWeight: 'bold' },
    h3: { fontSize: '24px', fontWeight: 'bold' },
    h4: { fontSize: '20px', fontWeight: 'bold' },
    h5: { fontSize: '18px', fontWeight: 'bold' },
    h6: { fontSize: '16px', fontWeight: 'bold' },
    subtitle1: { fontSize: '12px' },
    subtitle2: { fontSize: '11px', fontWeight: 'bold' },
    body1: { fontSize: 14 },
    body2: { fontSize: '12px' },
    button: { fontSize: '14px', fontWeight: 'bold' },
    caption: { fontSize: '12px', fontWeight: 'lighter' },
    overline: { fontSize: '13px', fontWeight: 'lighter' },
  };
  return {
    ...base,
    direction,
    palette: {
      ...base.palette,
      type: paletteType,
      background: { default: grey[100] },
    },
    typography,
    overrides: {
      MuiTypography: {
        colorTextPrimary: {
          color: '#212121',
        },
        colorTextSecondary: {
          color: '#616161',
        },
      },
      MuiOutlinedInput: {
        notchedOutline: {
          '.MuiFormLabel-filled:not(.Mui-focused) + .MuiInputBase-root:not(:hover) > &': {
            borderColor: 'rgba(0, 0, 0, 0.40)',
          },
        },
      },
      MuiInputBase: {
        root: {
          fontSize: typography?.body1?.fontSize,
        },
        multiline: {
          lineHeight: '1.5em',
        },
      },
    },
  };
}

export const baseThemeOptions: ThemeOptions = {
  palette: {
    primary: {
      dark: '#0F7DAA',
      main: '#1297CE',
      light: '#27B2EC',
    },
    secondary: {
      dark: deepOrange[600],
      main: deepOrange[500],
      light: deepOrange[300],
    },
    error: red,
  },
};

export const rtlTheme = createMuiTheme(getThemeOptions(baseThemeOptions, 'rtl', 'light'));
export const ltrTheme = createMuiTheme(getThemeOptions(baseThemeOptions, 'ltr', 'light'));

export const darkRtlTheme = createMuiTheme(getThemeOptions(baseThemeOptions, 'rtl', 'dark'));
export const darkLtrTheme = createMuiTheme(getThemeOptions(baseThemeOptions, 'ltr', 'dark'));
