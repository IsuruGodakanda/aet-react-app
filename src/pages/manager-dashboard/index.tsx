import './index.css';

import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Grid } from '@material-ui/core';

const ManagerDashboard = (): JSX.Element => {
  return (
    <Grid container id="managerboardContent">
      <Grid item xs={12}>
        <Box className="mt-3 mb-2 pl-5">
          <Grid container direction="row">
            <Grid item xs={9}>
              <h1>YOUR ARE IN THE MANAGER&apos;S DASHBOARD</h1>
            </Grid>
            <Link to="dashboard">Dashboard</Link>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ManagerDashboard;
