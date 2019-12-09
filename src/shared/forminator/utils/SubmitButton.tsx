import { Button, Omit } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';
import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { useSubmitContext } from '../core/submit/SubmitContext';

interface OwnProps extends Omit<ButtonProps, 'onclick'> {}

type Props = FCProps<OwnProps>;

function SubmitButton(props: Props) {
  const onClick = useSubmitContext();
  return <Button {...props} onClick={onClick} />;
}

export default SubmitButton;