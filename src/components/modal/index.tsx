import './index.css';

import { isEmpty } from 'lodash-es';
import React from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@material-ui/core';

interface IProps {
  dialogTitle: string;
  dialogDescription?: string;
  actionDone?: boolean;
  children: React.ReactNode;
  maxWidth?: 'lg' | 'md' | 'sm' | 'xl' | 'xs' | false;
  onConfirm?: () => void;
  modalActionNode?: React.ReactNode;
}

const Modal: React.FC<IProps> = (props: IProps) => {
  const { onConfirm, dialogTitle, children, maxWidth, dialogDescription, actionDone, modalActionNode } = props;

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const handleModal = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    setModalOpen(!modalOpen);
  };

  const openModal = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault();
    setModalOpen(true);
  };

  return (
    <>
      <Dialog
        open={modalOpen}
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
            <Grid>{modalOpen && children}</Grid>
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
      <a id="modal-button" className="self-center" onClick={(e) => openModal(e)} role="button" href="/#">
        {modalActionNode}
      </a>
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
