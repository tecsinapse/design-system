import styled from '@emotion/native'
import { lightTheme, StyleProps, Text, ThemeProvider } from '@tecsinapse/react-core/src'
import React, { FC } from 'react'

export const App: FC = () => {
    return (
        <ThemeProvider theme={lightTheme}>
            <Content>
                <Text typography="h1" color="dark">Hi!</Text>
                <Text typography="h3" color="medium">I'm running inside</Text>
                <Text typography="h3" color="medium">Design System!</Text>
            </Content>
        </ThemeProvider>
    )
}


const Content = styled.View<Partial<StyleProps>>`
    background-color: ${({ theme }) => theme.color.primary.light};
    justify-content: center;
    align-items: center;
    flex: 1;
`