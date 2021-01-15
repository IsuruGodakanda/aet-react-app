import './index.css';

import Modal from 'Components/modal';
import React from 'react';
import { Link } from 'react-router-dom';

import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Grid } from '@material-ui/core';

const ManagerDashboard = (): JSX.Element => {
  const ModalButton: React.FC = () => (
    <FontAwesomeIcon id="viewModal" icon={faEye} size="lg" className="downloadIcon ml-1" title="View more detail" />
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
                  <Modal
                    dialogTitle="Employee List"
                    dialogDescription="Employee list at the office as is below"
                    maxWidth="md"
                    modalActionNode={<ModalButton />}
                  >
                    <Grid item xs={12}>
                      {/* <Table
                          url={`/${orgId}/kryptoniteactualanswers`}
                          showEditColumn={false}
                          showDeleteColumn={false}
                        /> */}
                    </Grid>
                  </Modal>
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
