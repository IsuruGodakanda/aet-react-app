import './index.css';

import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { SessionKey, removeSession } from 'Services/securityService';

import { Box, Grid } from '@material-ui/core';

const Dashboard = (): JSX.Element => {
  const history = useHistory();

  const onLogout = (): void => {
    removeSession([SessionKey.AUTH_TOKEN]);
    history.push('/');
  };

  return (
    <Grid container id="dashboardContent">
      <Grid item xs={12}>
        <Box className="mt-3 mb-2 pl-5">
          <Grid container direction="row">
            <Grid item xs={9}>
              <h1>YOUR ARE IN TH DASHBOARD</h1>
              <Link to="/#" onClick={onLogout}>
                Logout
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
