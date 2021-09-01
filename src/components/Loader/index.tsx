import React from 'react';

import { Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  loadingIcon: {
    bottom: '50%',
    left: '55%',
    right: '50%',
    top: '50%',
    zIndex: 9999,
  },
  loadingText: {
    color: 'white',
    marginLeft: '-20px',
  },
  overlay: {
    backgroundColor: '#1010105c',
    bottom: 0,
    display: 'flex',
    height: '100%',
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    width: '100%',
    zIndex: 9998,
  },
  primary: {
    color: '#00deb7',
  },
}));

interface IProps {
  loadingText?: string;
}

const Loader: React.FC<IProps> = (props: IProps) => {
  const { loadingText } = props;
  const classes = useStyles({});
  return (
    <div className={classes.overlay}>
      <Grid container direction="column" justify="center" alignItems="center" className={classes.loadingIcon}>
        <Grid>
          <CircularProgress
            classes={{
              colorPrimary: classes.primary,
            }}
            color="primary"
            size={60}
          />
          {loadingText && <h2 className={classes.loadingText}>{loadingText}</h2>}
        </Grid>
      </Grid>
    </div>
  );
};

Loader.defaultProps = {
  loadingText: '',
};

export default Loader;
