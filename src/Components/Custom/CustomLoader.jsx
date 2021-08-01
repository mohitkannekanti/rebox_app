import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function CustomLoader(props) {
  const { handleLoaderOpen, handleLoaderClose, ...otherProps } = props;
  const classes = useStyles();
  return (
    <>
      <Backdrop
        className={classes.backdrop}
        open={handleLoaderOpen}
        onClick={handleLoaderClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default CustomLoader;
