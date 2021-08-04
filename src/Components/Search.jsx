import React, { useState, useEffect } from "react";
import "./Styles.css";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import {
  Grid,
  Button,
  TextField,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import CustomModal from "./Custom/CustomModal";
import OtpInput from "react-otp-input";
import CloseIcon from "@material-ui/icons/Close";

const Search = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  }));
  const classes = useStyles();
  const [inputObj, setInputObj] = useState({
    search: "",
  });
  const [btnDisable, setBtnDisable] = useState(true);
  const [otpModal, setOtpModal] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [otpSubmitDisable, setOtpSubmitDisable] = useState(true);

  const handleValidation = () => {
    if (inputObj.search != null && inputObj.search != "") {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  };

  useEffect(() => {
    handleValidation();
  }, [inputObj]);

  /*  useEffect(() => {
    if (otpValue != "" && otpValue != undefined) {
      setOtpSubmitDisable(false);
    } else {
      setOtpSubmitDisable(true);
    }
  }, [otpValue]); */

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputObj({ ...inputObj, search: value });
  };

  const handleSearch = () => {
    window.location.href = "/details";
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleOtpModalOpen = (e) => {
    e.preventDefault();
    setOtpModal(true);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setOtpValue("");
    setOtpModal(false);
  };

  const handleOtpValue = (otp) => {
    setOtpValue(otp);
  };
  return (
    <div className={classes.root}>
      <form onSubmit={handleOtpValue}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={9} sm={4}>
            <div className="box">
              <Grid item>
                <Typography
                  variant="h5"
                  component="h5"
                  className="text-center text-primary"
                >
                  Swach Gramam
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="h6"
                  component="h6"
                  className="text-center text-secondary mt-20"
                >
                  Pay Property Tax
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  id="search"
                  name="search"
                  placeholder="Enter HID"
                  className="form-input"
                  onChange={handleInputChange}
                  value={inputObj.search}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  className={`btn mt-30 ${
                    btnDisable ? "btn-disable" : "btn-primary"
                  }`}
                  onClick={handleOtpModalOpen}
                  disabled={btnDisable}
                  type="submit"
                >
                  Search
                </Button>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </form>
      {otpModal && (
        <CustomModal
          handleOpen={handleOtpModalOpen}
          handleClose={handleClose}
          modalTitle="Enter OTP"
          // btnValue="Submit"
        >
          <div className="modal-header">
            <h4 className="text-primary">Enter OTP</h4>
            <span className="close-icon" onClick={handleClose}>
              <CloseIcon />
            </span>
          </div>
          <div className="modal-body">
            <OtpInput
              value={otpValue}
              onChange={handleOtpValue}
              numInputs={4}
              separator={<span>&nbsp;</span>}
              inputStyle="otp-input"
              isInputNum={true}
            />
          </div>
          <div className="modal-footer">
            <Button
              variant="contained"
              className="btn btn-primary btn-small"
              onClick={handleSearch}
              /* className={`btn btn-small ${
                otpSubmitDisable ? "btn-disable" : "btn-primary"
              }`} */
              // disabled={otpSubmitDisable}
              type="submit"
            >
              Submit
            </Button>
          </div>
        </CustomModal>
      )}
    </div>
  );
};

export default Search;
