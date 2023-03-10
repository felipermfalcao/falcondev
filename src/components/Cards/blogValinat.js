import React, {useState} from "react";
import { Card, Col, Row, Button, Text, Link, Modal, Image, Grid, Popover } from "@nextui-org/react";

import { GitHubIcon } from "../Icons/github";
import { LinkIcon } from "../Icons/link";

import styles from '@/styles/Projetos.module.css'

export default function BlogValiant (){
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
                Desenvolvimento de site
                </Text>
                <Row justify="space-between">
                    <Text h3 color="##ffffff">
                        Blog Valiant Seguros
                    </Text>

                    <div style={{justifySelf: 'flex-end'}}>                    
                    {/* <Image
                        width={45}
                        height={45}
                        css={{borderRadius: 10}}
                        src="img/projects/astro/icon.png"
                    /> */}
                    </div>
                </Row>
            </Col>
            </Card.Header>
            <Card.Body css={{ p: 0, overflow: 'hidden' }}>
            <Card.Image
                className={styles.project4}
                src="img/projects/blogValiant/blogValiant_bg.png"
                srcSet="img/projects/blogValiant/blogValiant_bg.webp"
                objectFit="cover"
                width="100%"
                height="100%"
                alt="Blog Valiant"
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
                <Link href="https://blog.valiantseguros.com/" target={'_blank'}>
                    <Button
                    css={{marginRight: 5, paddingLeft: 10, paddingRight: 10}}
                    auto
                    flat                    
                    color="primary"
                    alt="Link para o blog da Valiant Seguros"
                    icon={<LinkIcon fill="currentColor" filled />}
                    >Website</Button>
                </Link>
                

                </Row>
                </Col>
                <Col>
                <Row justify="flex-end">
                <Popover
                isBordered
                placement="top"
                >
                <Popover.Trigger>
                    <Button
                    auto
                    flat                    
                    color="secondary"
                    alt="Link para GitHub n??o dispon??vel"
                    icon={<GitHubIcon fill="currentColor" filled />}
                    />
                </Popover.Trigger>
                    <Popover.Content>
                        <Text css={{ p: "$5" }}>N??o dispon??vel</Text>
                    </Popover.Content>
                </Popover>
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
        <Modal.Body style={{padding: 0}}>

            <Image
                height={571}
                showSkeleton
                src="img/projects/blogValiant/blogv1.png"
                srcSet="img/projects/blogValiant/blogv1.webp"
                alt="Blog Valiant"
            />

        </Modal.Body>
        <Modal.Footer>
        <Button auto flat color="primary" alt="Fechar Modal" onPress={fecharModalPokedex}>
            Fechar
          </Button>
        </Modal.Footer>
        </Modal>
        </div>
  );
}
