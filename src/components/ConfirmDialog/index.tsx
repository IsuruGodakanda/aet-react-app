import './index.css';

import Button from 'Components/InputFields/Button';
import React from 'react';

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

interface IProps {
  title: string;
  content: string;
  onClose?: (() => void) | undefined;
  onConfirm?: (() => void) | undefined;
  confirmDialogActionNode?: React.ReactNode;
}

const ConfirmDialog: React.FC<IProps> = (props: IProps) => {
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

  const openDialog = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault();
    setOpen(true);
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
          <Button id="cancel-button" onClick={handleClose} type="button" value="Cancel" theme="primary" />
          <Button id="cancel-button" onClick={handleConfirm} type="button" value="Confirm" theme="dangour" />
        </DialogActions>
      </Dialog>
      <a id="modal-button" onClick={(e) => openDialog(e)} role="button" href="/#">
        {confirmDialogActionNode}
      </a>
    </>
  );
};

ConfirmDialog.defaultProps = {
  onClose: undefined,
  onConfirm: undefined,
  confirmDialogActionNode: null,
};

export default ConfirmDialog;
