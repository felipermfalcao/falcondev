import React, { useState, useEffect, useRef } from "react";

import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { Button } from '@nextui-org/react';
import {useTheme} from 'next-themes'

import Body from '@/components/Body'
import Header from '@/components/Header'
import ContainerPrincipal from '@/components/Container'
import AvatarTop from '@/components/Avatar';
import Projetos from "@/components/Projetos";
import Contato from "@/components/Contato";
import Footer from "@/components/Fotter";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
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
        <AvatarTop /> 
        <Projetos />
        <Contato />
        <Footer />

  
          </ContainerPrincipal>
      </Body>
    </>
  )
}
