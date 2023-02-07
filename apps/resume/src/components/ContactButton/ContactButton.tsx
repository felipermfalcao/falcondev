import styled from '@emotion/styled';
import { Button as NextButton, config } from '@nextui-org/react';
import { useMediaQuery } from 'core';
import { useKBar } from 'kbar';

function ContactButton() {
  const { query } = useKBar();
  const isSmallButtonSize = useMediaQuery(650);

  

  return (
    <Div>

      {/* <a href="https://exemple.com.br" target="_blank"> */}
      <Button style={{marginBottom: 10}} shadow color="secondary" auto onClick={() => alert('Em desenvolvimento...')}>
        Blog
      </Button>
      {/* </a> */}

      <Button shadow color="primary" auto onClick={() => query.toggle()} size={isSmallButtonSize ? 'sm' : 'md'}>
        Contato
      </Button>

      
    </Div>
  );
}

export default ContactButton;

const Div = styled.div`
  position: fixed;
  bottom: 1.5rem;
  right: 2rem;

  @media ${config.media.xsMax} {
    bottom: 1rem;
    right: 1.25rem;
  }
`;

const Button = styled(NextButton)`
  font-weight: bold;
`;
