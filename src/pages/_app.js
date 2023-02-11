import { createTheme, NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import '@/styles/globals.css'

// 2. Call `createTheme` and pass your custom values
const lightTheme = createTheme({
  type: 'light',
  theme: {
    colors:{
      backgroundFotter: '#DAEBFC',
      background: '#E4E4E7',
      text: '#0F172A',
      whatsApp: '#1AD03F',
    }
  }
})

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors:{
      backgroundFotter: '#421F3F',

      background: '#16181A',
      whatsApp: '#1AD03F',

      gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
    }
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
