import './index.css';

import { isEmpty } from 'lodash-es';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from 'Redux/Store';
import { setModalStatus } from 'Actions/GlobalActions';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@material-ui/core';

const Modal = (props: {
  dialogTitle: string;
  dialogDescription?: string;
  actionDone?: boolean;
  children: React.ReactNode;
  maxWidth?: 'lg' | 'md' | 'sm' | 'xl' | 'xs' | false;
  onConfirm?: () => void;
  modalActionNode?: React.ReactNode;
}): JSX.Element => {
  const { onConfirm, dialogTitle, children, maxWidth, dialogDescription, actionDone, modalActionNode } = props;
  const dispatch = useDispatch();
  const globalStore = useSelector((state: RootStore) => state.global);

  const handleModal = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    dispatch(setModalStatus(!globalStore.isModalOpen));
  };

  return (
    <>
      <Dialog
        open={globalStore.isModalOpen}
        keepMounted
        fullWidth
        maxWidth={maxWidth}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Grid container className="">
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={8}>
                  <div className="title mb-1">{dialogTitle}</div>
                  {!isEmpty(dialogDescription) && dialogDescription}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" />
          <Grid id="modal" container direction="column">
            <Grid>{globalStore.isModalOpen && children}</Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          {onConfirm && (
            <Button
              id="confirm"
              onClick={(event) => {
                onConfirm();
                handleModal(event);
              }}
              className="primary"
            >
              OK
            </Button>
          )}
          <Button id="cancel" onClick={handleModal} className="primary">
            {actionDone ? 'OK' : 'CLOSE'}
          </Button>
        </DialogActions>
      </Dialog>
      <Button id="modal-button" onClick={handleModal} className="primary">
        {modalActionNode}
      </Button>
    </>
  );
};

Modal.defaultProps = {
  dialogDescription: '',
  actionDone: false,
  maxWidth: false,
  onConfirm: null,
  modalActionNode: null,
};

export default Modal;
