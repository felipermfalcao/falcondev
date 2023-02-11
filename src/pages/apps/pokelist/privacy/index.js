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
        <title>Falcondev</title>
        <meta name="description" content="Site pessoal e blog construído com React e Next.js, hospedado na plataforma Vercel." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
