import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { CSSProperties } from '@material-ui/styles/withStyles';
import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { NavBarMenuItem } from './NavBarMenuItem';
import { MenuItem } from './types';

interface OwnProps {
  items: MenuItem[];
}

type Props = FCProps<OwnProps> & StyleProps;

export function NavBarMenu(props: Props) {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      {props.items.map((item, index) => (
        <NavBarMenuItem item={item} key={index} />
      ))}
    </div>
  );
}

const styles = (theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'NavBarMenu' });
type StyleProps = Styles<typeof styles>;
