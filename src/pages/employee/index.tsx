import './index.css';

import Table from 'Components/table';
import LoaderHOC from 'Services/loaderService';
import React from 'react';
import { setLoaderStatus } from 'Actions/GlobalActions';
import { useDispatch } from 'react-redux';

import { Box, Grid } from '@material-ui/core';
import CreateUpdateEmployeeForm from './create-update-employee';

const Employee = (): JSX.Element => {
  const dispatch = useDispatch();
  const employeeHeaderTitles = [
    { key: 'name', label: 'Name', showColumn: true, sortable: true },
    { key: 'email', label: 'Email', showColumn: true, sortable: true },
    { key: 'role', label: 'Role', showColumn: true, sortable: false },
  ];

  const setLoader = (status: boolean): void => {
    dispatch(setLoaderStatus(status));
  };

  return (
    <Grid container id="managerboardContent">
      <Grid item xs={12}>
        <Box className="mt-3 mb-2 pl-5">
          <Grid container direction="row">
            <Grid item xs={9}>
              <h1>YOUR ARE IN THE MANAGER&apos;S DASHBOARD</h1>
            </Grid>
          </Grid>

          <Grid container className="section">
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={8}>
                  <div className="title mb-1">Employee List</div>
                  <div className="info">Employee list at the office as is below</div>
                </Grid>
                <Grid item xs={10}>
                  <Table
                    url="/users"
                    headerTitles={employeeHeaderTitles}
                    createUpdateForm={CreateUpdateEmployeeForm}
                    setLoader={setLoader}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoaderHOC(Employee);
