import './index.css';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { logo } from 'Utils/assetUtil';

import { Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  logo: {
    width: '300px',
    height: 'auto',
    margin: '0 auto',
    display: 'block',
  },
});
interface Props {
  children: ReactNode;
  classes;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  onClickHandle = (): void => {
    window.location.reload();
  };

  render() {
    const { classes, children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return (
        <Grid container id="fileNotFound" justify="center" alignItems="center" className="text-center">
          <Grid item xs={12} md={4} lg={3}>
            <img src={logo} className={classes.logo} alt="logo" />
            <h2 className="title">Whoops!</h2>
            <h3 className="title2" style={{ lineHeight: 'inherit' }}>
              Something broke
            </h3>
          </Grid>
          <Grid item xs={12} md={5} lg={3}>
            <h4 className="subtitle">Hmmmm...</h4>
            <h4 className="subtitle2">Don&apos;t worry, it wasn&apos;t you.</h4>
            <Button
              onClick={this.onClickHandle}
              style={{ width: '228px', height: '56px' }}
              variant="contained"
              color="primary"
            >
              Let&apos;s try again
            </Button>
          </Grid>
        </Grid>
      );
    }

    return children;
  }
}

export default withStyles(styles)(ErrorBoundary);
