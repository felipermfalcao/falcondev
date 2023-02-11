import { Grid } from "@nextui-org/react";
import { Button, Popover, Text } from '@nextui-org/react';

import Pokedex from "./Cards/pokedex";
import Astro from "./Cards/astro";
import Valiant from "./Cards/valiant_site";
import BlogValiant from "./Cards/blogValinat";

import styles from '@/styles/Projetos.module.css'

import { PlusIcon } from "./Icons/plus";

export default function Projetos (){
    return (
        <div>
            <h1 className={styles.titulo} style={{marginTop: 40, paddingLeft: '1rem'}}>
                Projetos
            </h1>
        
            <Grid.Container gap={0.5} justify="center">
                <Grid xs={11} sm={6}>
                    <Pokedex />
                </Grid> 

                <Grid xs={11} sm={6}>
                    <Astro />
                </Grid>

                <Grid xs={11} sm={6}>
                    <Valiant />
                </Grid>

                <Grid xs={11} sm={6}>
                    <BlogValiant />
                </Grid>  

                <Popover
                isBordered
                placement="top"
                >
                <Popover.Trigger>
                <Button
                    style={{marginTop: 30, marginBottom: 30}}
                    auto
                    color="primary"
                    icon={<PlusIcon fill="currentColor" filled />}
                >
                    Projetos
                </Button>
                </Popover.Trigger>
                    <Popover.Content>
                        <Text css={{ p: "$5" }}>Todos os projetos em breve...</Text>
                    </Popover.Content>
                </Popover>       
            </Grid.Container>
        </div>
    );
}