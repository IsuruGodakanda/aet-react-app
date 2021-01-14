import './index.css';

import React from 'react';

import { Box, Grid } from '@material-ui/core';

const Dashboard = (): JSX.Element => {
  return (
    <Grid container id="dashboardContent">
      <Grid item xs={12}>
        <Box className="mt-3 mb-2 pl-5">
          <Grid container direction="row">
            <Grid item xs={9}>
              <h1>YOUR ARE IN THE DASHBOARD</h1>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
