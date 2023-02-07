import styled from '@emotion/styled';
import { Link } from '@nextui-org/react';

import { authorName, defaultUrl } from '../../constants';

export function Footer() {
  const date = new Date();

  return (
    <StyledFooter>
      <span>
        Copyright &copy; 2010-{date.getFullYear()}{' '}
        <Link href={defaultUrl} target="_blank">
          {authorName}
        </Link>{' '}
        Todos os direitos reservados.
      </span>
      <span>
        by{' '}
        <Link href="https://github.com/hyesungoh/comet-land" target="_blank">
          @Comet-land
        </Link>
      </span>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100px;
  padding: 0 1.3125rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  font-size: 0.75rem;
`;
