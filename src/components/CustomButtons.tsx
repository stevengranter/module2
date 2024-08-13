import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';

import { ButtonProps } from '@mantine/core';

import { ReactNode } from 'react';

interface ButtonLinkProps extends ButtonProps {
  to: string;
  children: ReactNode;
}

export function ButtonLink({ to, children, ...rest }: ButtonLinkProps) {
  return (
    <Link to={to}>
      <Button {...rest}>{children}</Button>
    </Link>
  );
}
