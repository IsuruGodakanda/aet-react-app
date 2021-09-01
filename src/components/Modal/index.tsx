import './index.css';

import { removeOpenModal, setOpenModal } from 'Actions/GlobalActions';
import { isEmpty } from 'lodash-es';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from 'Redux/Store';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@material-ui/core';

interface IProps {
  id: string;
  dialogTitle: string;
  dialogDescription?: string;
  actionDone?: boolean;
  children: React.ReactNode;
  maxWidth?: 'lg' | 'md' | 'sm' | 'xl' | 'xs' | false;
  onConfirm?: (() => void) | undefined;
  modalActionNode?: React.ReactNode;
}

const Modal: React.FC<IProps> = (props: IProps) => {
  const globalStore = useSelector((state: RootStore) => state.global);
  const dispatch = useDispatch();

  const { id, onConfirm, dialogTitle, children, maxWidth, dialogDescription, actionDone, modalActionNode } = props;

  const openModal = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault();
    dispatch(setOpenModal(event.currentTarget.id));
  };

  const closeModal = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    dispatch(removeOpenModal());
  };

  return (
    <>
      <Dialog
        open={id === globalStore.openModal}
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
            <Grid>{id === globalStore.openModal && children}</Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          {onConfirm && (
            <Button
              id="confirm"
              onClick={(event) => {
                onConfirm();
                closeModal(event);
              }}
              className="primary"
            >
              OK
            </Button>
          )}
          <Button id="cancel" onClick={closeModal} className="primary">
            {actionDone ? 'OK' : 'CLOSE'}
          </Button>
        </DialogActions>
      </Dialog>
      <a id={id} className="self-center" onClick={(e) => openModal(e)} role="button" href="/#">
        {modalActionNode}
      </a>
    </>
  );
};

Modal.defaultProps = {
  dialogDescription: '',
  actionDone: false,
  maxWidth: false,
  onConfirm: undefined,
  modalActionNode: null,
};

export default Modal;
