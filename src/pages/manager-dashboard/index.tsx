import './index.css';

import Modal from 'Components/modal';
import Table from 'Components/table';
import React from 'react';
import { Link } from 'react-router-dom';

import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Grid } from '@material-ui/core';
import CreateUpdateEmployeeForm from './create-update-employee';

const ManagerDashboard = (): JSX.Element => {
  const ModalButton: React.FC = () => (
    <FontAwesomeIcon
      id="viewModal"
      icon={faUserPlus}
      size="lg"
      className="downloadIcon ml-1"
      title="View more detail"
    />
  );

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

          <Grid container className="section">
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={8}>
                  <div className="title mb-1">Employee List</div>
                  <div className="info">Employee list at the office as is below</div>
                </Grid>
                <Grid item xs={4} className="items-end">
                  <Modal
                    dialogTitle="Add Employee"
                    dialogDescription="Add worker or manager into the office"
                    maxWidth="xs"
                    modalActionNode={<ModalButton />}
                  >
                    <CreateUpdateEmployeeForm />
                  </Modal>
                </Grid>
                <Grid item xs={10}>
                  <Table url="/users" headerTitles={{ name: 'Name', email: 'Email', role: 'Role' }} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ManagerDashboard;
