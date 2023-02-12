import React, { useEffect } from "react";

import Head from 'next/head'
import { Inter } from '@next/font/google'
import {useTheme} from 'next-themes'

import Body from "@/components/Body";
import Header from '@/components/Header'
import ContainerPrincipal from '@/components/Container'
import Contato from "@/components/Contato";
import Footer from "@/components/Fotter";
import PrivacyPokelist from "@/components/privacy/pokelist";

const inter = Inter({ subsets: ['latin'] })

export default function AppPokelistPrivacy() {
  const {theme, setTheme} = useTheme('dark');

  return (
    <>
      <Head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-FFK2E7447D"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)}
          gtag('js', new Date());

          gtag('config', 'G-FFK2E7447D');
        </script>

        <title>Falcondev</title>
        <meta name="description" content="Site pessoal e blog construído com React e Next.js, hospedado na plataforma Vercel." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:url" content="https://dev.felipefalcao.com.br" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Falcon Dev" />
        <meta property="og:description" content="Site pessoal e blog construído com React e Next.js, hospedado na plataforma Vercel." />
        <meta property="og:image" content="img/avatar.jpg" />

        <link rel="icon" href="/favicon.png" />
      </Head>

      <Body tema={theme}>
        <ContainerPrincipal>

        <Header />
        
        <PrivacyPokelist />

        <Contato />
        <Footer />

  
          </ContainerPrincipal>
      </Body>
    </>
  )
}
