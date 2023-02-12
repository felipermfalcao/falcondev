import { Html, Head, Main, NextScript } from 'next/document'
import { CssBaseline } from '@nextui-org/react';
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head>

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-FFK2E7447D"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-FFK2E7447D');
        `}
      </Script>

        {CssBaseline.flush()}</Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
