import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    outline: 0,
    width: 250,
  },
}));

export default function CustomModal({
  handleOpen,
  handleClose,
  title,
  children,
  modalTitle,
  ...props
}) {
  const classes = useStyles();
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={handleOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={handleOpen}>
          <div className={classes.paper}>
            {children}
            {/*  <div className="modal-header">
              <h4 className="text-primary">{modalTitle}</h4>
              <span className="close-icon" onClick={handleClose}>
                <CloseIcon />
              </span>
            </div>
            <div className="modal-body">{children}</div>
 */}
            {/* <div className="modal-footer">
              <Button variant="contained" className="btn btn-primary btn-small">
                {btnValue}
              </Button>
            </div> */}
          </div>
        </Fade>
      </Modal>
    </>
  );
}

CustomModal.propTypes = {
  handleOpen: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  handleClose: PropTypes.bool.isRequired,
  dialogTile: PropTypes.string,
};