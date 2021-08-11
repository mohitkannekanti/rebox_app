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
import { hidSearchApi, verifyOtpApi } from "../Api/Main.api";
import CustomLoader from "./Custom/CustomLoader";
import CustomSnackbar from "./Custom/CustomSnackbar";
import { useHistory } from "react-router-dom";

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
  const [resData, setResData] = useState({
    phone_number: "",
    otp: "",
  });
  const [otpSubmitDisable, setOtpSubmitDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [snackBarObj, setSnackBarObj] = useState({
    open: false,
    title: "",
    message: "",
  });
  const history = useHistory();

  const handleValidation = () => {
    if (inputObj.search != null && inputObj.search != "") {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  };

  const closeSnackBar = () => {
    setSnackBarObj({ open: !setSnackBarObj.open, title: "", message: "" });
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleOtpModalOpen = (e) => {
    e.preventDefault();
    let reqObj = {
      hid: inputObj.search,
    };
    setIsLoading(true);
    hidSearchApi(reqObj)
      .then(async (res) => {
        setIsLoading(false);

        if (res.code === 1000) {
          let otp = res.result[0].otp;
          alert("otp is " + " " + otp);
          setResData({
            ...resData,
            phone_number: res.result[0].phone_number,
            otp: res.result[0].otp,
          });

          setOtpModal(true);
          setSnackBarObj({
            open: !setSnackBarObj.open,
            title: "success",
            message: "OTP Sent to Registered Phone Number",
          });
        } else {
          setSnackBarObj({
            open: !setSnackBarObj.open,
            title: "error",
            message: "No Data Found",
          });
        }
      })
      .catch((err) => {
        setSnackBarObj({
          open: !setSnackBarObj.open,
          title: "error",
          message: "Something went wrong. Please Try Again",
        });
      });
  };
  const handleOtpValue = (otp) => {
    setOtpValue(otp);
    handleSearch();
  };

  const handleSearch = () => {
    if (otpValue == resData.otp) {
      setIsLoading(true);
      let checkReqObj = {
        mobilenumber: resData.phone_number,
        otp: otpValue,
      };
      verifyOtpApi(checkReqObj)
        .then(async (res) => {
          if (res.code === 1000) {
            setIsLoading(false);
            setResData({
              ...resData,
              phone_number: res.result[0].phone_number,
              otp: res.result[0].otp,
            });
            setOtpModal(false);
            setSnackBarObj({
              open: !setSnackBarObj.open,
              title: "success",
              message: "Verified",
            });
            let result = res.result[0];
            history.push({
              pathname: `/details`,
              state: { data: result },
            });
            // window.location.href = "/details";
          } else {
            setSnackBarObj({
              open: !setSnackBarObj.open,
              title: "error",
              message: "Something Wrong. Please Try Again",
            });
          }
        })
        .catch((err) => {
          setSnackBarObj({
            open: !setSnackBarObj.open,
            title: "error",
            message: "Something Wrong. Please Try again",
          });
        });
    }
  };

  const handleClose = (e) => {
    e.preventDefault();
    setOtpValue("");
    setOtpModal(false);
  };

  return (
    <div className={classes.root}>
      {snackBarObj.title && snackBarObj.open ? (
        <CustomSnackbar
          snackBarObj={snackBarObj}
          closeSnackBar={closeSnackBar}
        />
      ) : (
        ""
      )}
      {isLoading && isLoading ? (
        <CustomLoader
          handleLoaderOpen={isLoading}
          handleLoaderClose={handleClose}
        ></CustomLoader>
      ) : (
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
      )}

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
              numInputs={6}
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
