import React, {useState} from "react";
import { Card, Col, Row, Button, Text, Link, Modal, Image, Grid, Popover } from "@nextui-org/react";

import { GitHubIcon } from "../Icons/github";
import { PlayStoreIcon } from "../Icons/playStore";
import { AppStoreIcon } from "../Icons/appStore";

import styles from '@/styles/Projetos.module.css'

export default function Pokedex (){
    const [visiblePokedex, setVisiblePokedex] = useState(false);
    const abrirModalPokedex = () => setVisiblePokedex(true);
    const fecharModalPokedex = () => {
        setVisiblePokedex(false);
    };

    return (
        <div>
        <Card
        isPressable
        variant="bordered"
        onPress={abrirModalPokedex}
        css={{ w: "100%", h: "400px", background: 'transparent', border: 'none' }}>
            <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
            <Col>
            {/* color="#9E9E9E" */}
                <Text size={12} weight="bold" transform="uppercase" color="##ffffff">
                Desenvolvimento de aplicativo
                </Text>
                <Row justify="space-between">
                    <Text h3 color="##ffffff">
                        Pokélist
                    </Text>

                    <div style={{justifySelf: 'flex-end'}}>                    
                    <Image
                        width={45}
                        height={45}
                        css={{borderRadius: 10}}
                        src="img/projects/pokedex/icon.jpg"
                        alt="app Pokedex"
                    />
                    </div>
                </Row>
            </Col>
            </Card.Header>
            <Card.Body css={{ p: 0, overflow: 'hidden' }}>
            <Card.Image
                className={styles.project1}
                src="img/projects/pokedex/pokedex_bg.png"
                objectFit="cover"
                width="100%"
                height="100%"
                alt="App pokedex"
            />
            </Card.Body>
            <Card.Footer
            isBlurred
            css={{
                position: "absolute",
                bgBlur: "#0f111466",
                // borderTop: "$borderWeights$light solid $gray800",
                borderTop: "none",
                bottom: 0,
                zIndex: 1,
                background: 'transparent',
                backdropFilter: 'none'
            }}
            >
            <Row>
                <Col>
                <Row justify="space-evenly">
                <Popover
                isBordered
                placement="top"
                >
                <Popover.Trigger>
                    <Button
                    css={{marginRight: 5, paddingLeft: 10, paddingRight: 10}}
                    auto
                    flat                    
                    color="primary"
                    icon={<PlayStoreIcon fill="currentColor" filled />}
                    >Play Store</Button>
                    </Popover.Trigger>
                    <Popover.Content>
                        <Text css={{ p: "$5" }}>Em aprovação na loja...</Text>
                    </Popover.Content>
                </Popover>
                
                <Popover
                isBordered
                placement="top"
                >
                <Popover.Trigger>
                    <Button
                    css={{paddingLeft: 10, paddingRight: 10}}
                    auto
                    flat                    
                    color="primary"
                    icon={<AppStoreIcon fill="currentColor" filled />}
                    >App Store</Button>
                    </Popover.Trigger>
                    <Popover.Content>
                        <Text css={{ p: "$5" }}>Não disponível</Text>
                    </Popover.Content>
                </Popover>

                </Row>
                </Col>
                <Col>
                <Row justify="flex-end">
                <Link href="https://github.com/felipermfalcao/App-Pokedex" target={'_blank'}> 
                    <Button
                    auto
                    flat                    
                    color="secondary"
                    icon={<GitHubIcon fill="currentColor" filled />}
                    />
                </Link>
                </Row>
                </Col>
            </Row>
            </Card.Footer>
        </Card>

        <Modal
        width="95%"
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visiblePokedex}
        onClose={fecharModalPokedex}
        >
        <Modal.Header>
        </Modal.Header>
        <Modal.Body>

        <Grid.Container gap={0.5} justify="center">
        <Grid xs={11} sm={3}>
            <Image
                showSkeleton
                src="img/projects/pokedex/pokedex1.jpg"
                alt="app Pokedex"
            />
        </Grid>

        <Grid xs={11} sm={3}>
            <Image
                showSkeleton
                src="img/projects/pokedex/pokedex2.jpg"
                alt="app Pokedex"
            />
        </Grid>

        <Grid xs={11} sm={3}>
            <Image
                showSkeleton
                src="img/projects/pokedex/pokedex3.jpg"
                alt="app Pokedex"
            />
        </Grid>

        <Grid xs={11} sm={3}>
            <Image
                showSkeleton
                src="img/projects/pokedex/pokedex4.jpg"
                alt="app Pokedex"
            />
        </Grid>
        </Grid.Container>

        </Modal.Body>
        <Modal.Footer>
        <Button auto flat color="primary" onPress={fecharModalPokedex}>
            Fechar
          </Button>
        </Modal.Footer>
        </Modal>
        </div>
  );
}
