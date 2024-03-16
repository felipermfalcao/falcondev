import "../global.css";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";
import Script from 'next/script'

export const metadata: Metadata = {
  title: {
    default: "falcondev",
    template: "%s | falcondev",
  },
  description: "Meu nome é Felipe Falcão, sou desenvolvedor full stack de aplicativos Android e iOS nativos e sistemas web.",
  openGraph: {
    title: "falcondev",
    description:
      "Meu nome é Felipe Falcão, sou desenvolvedor full stack de aplicativos Android e iOS nativos e sistemas web.",
    url: "https://felipefalcao.com.br",
    siteName: "felipefalcao.com.br",
    images: [
      {
        url: "https://felipefalcao.com.br/og.png",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "pt-BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.png",
  },
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className={[inter.variable, calSans.variable].join(" ")}>
      <head>
        <Analytics />

        <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-FFK2E7447D"
      />
      <Script strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-FFK2E7447D');
        `}
      </Script>

      </head>
      <body
        className={`bg-black ${process.env.NODE_ENV === "development" ? "debug-screens" : undefined
          }`}
      >
        {children}
      </body>
    </html>
  );
}
