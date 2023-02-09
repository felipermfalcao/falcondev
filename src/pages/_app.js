import { createTheme, NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import '@/styles/globals.css'

// 2. Call `createTheme` and pass your custom values
const lightTheme = createTheme({
  type: 'light',
  theme: {

  }
})

const darkTheme = createTheme({
  type: 'dark',
  theme: {
  }
})

export default function App({ Component, pageProps }) {
  return(
    <NextThemesProvider
    defaultTheme="system"
    attribute="class"
    value={{
      light: lightTheme.className,
      dark: darkTheme.className
    }}
  >
      <NextUIProvider>
          <Component {...pageProps} />
      </NextUIProvider>
    </NextThemesProvider>
  );
  
}
