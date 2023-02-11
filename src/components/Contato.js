import React, {useState} from "react";
import { Modal, Input, Row, Link, Button, Text } from "@nextui-org/react";

import { WhatsAppIcon } from "./Icons/whatsapp";
import { EmailIcon } from "./Icons/email";

export default function Contato (){
    const [visible, setVisible] = useState(false);
    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
    };

    return(
        <div style={{position: 'fixed', bottom: 20, right: 30}}>
            <Button auto color="secondary" shadow onPress={handler}>
                Contato
            </Button>
        
        <div>
            <Modal
            closeButton
            blur
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
        >
            <Modal.Header>
            <Text id="modal-title" size={18}>
                Contatos
            </Text>
            </Modal.Header>
            <Modal.Body>
                <Link href="https://bit.ly/devfalcon" isExternal target={'_blank'}>    
                    <Button
                    size='xl'
                    color="primary"
                    icon={<WhatsAppIcon fill="currentColor" filled />}
                    >+55 85 98751-7076</Button>
                </Link>
                
                <Link href="mailto:contato@felipefalcao.com.br" isExternal target={'_blank'}> 
                    <Button
                    auto
                    color="secondary"
                    icon={<EmailIcon fill="currentColor" filled />}
                    >contato@felipefalcao.com.br</Button>
                </Link>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
      </div>
        </div>
    );
}