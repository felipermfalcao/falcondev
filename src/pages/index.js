import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import {useTheme} from 'next-themes'
import { Button } from '@nextui-org/react';

import Body from '@/components/Body'
import Header from '@/components/Header'
import Container from '@/components/Container'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const {theme, setTheme} = useTheme()

  return (
    <>
      <Head>
        <title>Falcondev</title>
        <meta name="description" content="Site pessoal e blog construído com React e Next.js, hospedado na plataforma Vercel." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Body>
        <Container>

        <Header tema={theme} />       
        
          <h1>
            Hello world!
          </h1>
          <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>TESTE</Button>
          <Button color="secondary" auto>
          Secondary
        </Button>
          </Container>
      </Body>
    </>
  )
}
