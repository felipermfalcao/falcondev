import { Container, Card, Row, Text, Col, Spacer } from "@nextui-org/react";

export default function ContainerPrincipal({ children }){
    return(
        <Container gap={0} xs>
            { children }
        </Container>
    );
}