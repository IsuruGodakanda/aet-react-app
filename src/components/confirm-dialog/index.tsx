import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@material-ui/core';

import React from 'react';
import './index.css';

const ConfirmDialog = (props: {
  title: string;
  content: string;
  onClose?: (() => void) | undefined;
  onConfirm?: (() => void) | undefined;
  confirmDialogActionNode?: React.ReactNode;
}): JSX.Element => {
  const { title, content, onClose = () => {}, onConfirm = () => {}, confirmDialogActionNode } = props;
  const [open, setOpen] = React.useState<boolean>(false);

  const handleConfirm = (): void => {
    onConfirm();
    setOpen(false);
  };

  const handleClose = (): void => {
    onClose();
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        keepMounted
        maxWidth="xs"
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} className="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Button id="modal-button" onClick={() => setOpen(true)} className="primary">
        {confirmDialogActionNode}
      </Button>
    </>
  );
};

ConfirmDialog.defaultProps = {
  onClose: undefined,
  onConfirm: undefined,
  confirmDialogActionNode: null,
};

export default ConfirmDialog;
