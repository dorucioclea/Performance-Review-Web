import React, { ComponentType } from 'react';
import { AppBar, Theme, Toolbar, makeStyles } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { FCProps } from 'src/shared/types/FCProps';
import { Overlayscrollbars } from 'src/shared/overlayscrollbars';
import { Styles } from 'src/shared/types/Styles';
import { groupChildrenByType } from 'src/shared/utils/groupChildrenByType.utils';

import { brandWidth, headerHeight } from './constants';

// typescript only allows string when it defined at `JSX.IntrinsicElements`
export const ContentRegion = ('ContentRegion' as unknown) as ComponentType<{}>;
export const NavbarRegion = ('NavbarRegion' as unknown) as ComponentType<{}>;
export const BrandRegion = ('BrandRegion' as unknown) as ComponentType<{}>;
export const UserRegion = ('UserRegion' as unknown) as ComponentType<{}>;

const regions = [NavbarRegion, ContentRegion, BrandRegion, UserRegion];

interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

/**
 *
 * create layout structure.
 *
 * children type only can be `NavbarRegion`, `DrawerRegion`, `ContentRegion`
 *
 * @example
 ```js
 <DashboardLayout>
 <NavbarRegion>
 app bar content is here
 </NavbarRegion>
 <ContentRegion>
 main content is here
 </ContentRegion>
 </DashboardLayout>
 ```
 */
export function DashboardLayout(props: Props) {
  const classes = useStyles(props);

  const map = groupChildrenByType(props.children, regions);

  const contentChild = map.get(ContentRegion);
  const navbarChild = map.get(NavbarRegion);
  const brandChild = map.get(BrandRegion);
  const userChild = map.get(UserRegion);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.brandToolbar}>{brandChild}</div>
          {navbarChild}
          <div className={classes.userRegion}>{userChild}</div>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <Overlayscrollbars className={classes.overlayscrollbars}>{contentChild}</Overlayscrollbars>
      </main>
    </div>
  );
}

const styles = (theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  } as CSSProperties,
  appBar: {
    height: headerHeight,
  } as CSSProperties,
  toolbar: {
    paddingLeft: 0,
    height: '100%',
  } as CSSProperties,
  brandToolbar: {
    backgroundColor: theme.palette.primary.dark,
    overflow: 'hidden',
    width: brandWidth,
    display: 'flex',
    alignSelf: 'stretch',
  } as CSSProperties,
  content: {
    flex: 1,
    marginTop: headerHeight,
    overflow: 'auto',
    maxHeight: `calc(100vh - ${headerHeight}px)`,
    position: 'relative',
  } as CSSProperties,
  userRegion: {
    marginRight: theme.spacing(8),
    marginLeft: 'auto',
  } as CSSProperties,
  overlayscrollbars: {
    height: '100%',
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'DashboardLayout' });
type StyleProps = Styles<typeof styles>;
