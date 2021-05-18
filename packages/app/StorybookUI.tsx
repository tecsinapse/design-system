import { lightTheme, ThemeProvider } from '@tecsinapse/react-core/src';
import React, { FC } from 'react';
import StorybookUIRoot from "./storybook";

export const StorybookUI: FC = () => {
    return (
        <ThemeProvider theme={lightTheme}>
            <StorybookUIRoot/>
        </ThemeProvider>
    )
}