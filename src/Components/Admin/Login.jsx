import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  TextField,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import { adminLoginApi } from "../../Api/Admin.api";
import CustomLoader from "../Custom/CustomLoader";
import CustomSnackbar from "../Custom/CustomSnackbar";

function Login() {
  const [inputObj, setInputObj] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [btnDisable, setBtnDisable] = useState(true);
  const [snackBarObj, setSnackBarObj] = useState({
    open: false,
    title: "",
    message: "",
  });

  const handleInputChange = (e, name) => {
    const value = e.target.value;
    setInputObj({ ...inputObj, [name]: value });
  };

  const handleAdminLogin = () => {
    setIsLoading(true);
    let loginObj = {
      email: inputObj.email,
      password: inputObj.password,
    };
    adminLoginApi(loginObj)
      .then(async (res) => {
        setIsLoading(false);
        if (res.code === 1014) {
          setSnackBarObj({
            open: !setSnackBarObj.open,
            title: "success",
            message: "Login Sucess",
          });
          window.location.href = "/dashboard";
        } else {
          setSnackBarObj({
            open: !setSnackBarObj.open,
            title: "error",
            message: "Invalid Credentials",
          });
        }
      })
      .catch((err) => {
        setSnackBarObj({
          open: !setSnackBarObj.open,
          title: "error",
          message: "Invalid Credentials",
        });
        console.error(err, "err");
      });
  };

  const handleValidation = () => {
    if (
      inputObj.email != null &&
      inputObj.email != "" &&
      inputObj.password != null &&
      inputObj.password != ""
    ) {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  };

  const handleClose = () => {
    setTimeout(function () {
      setIsLoading(false);
    }, 5000);
  };

  useEffect(() => {
    handleValidation();
  }, [inputObj]);

  const closeSnackBar = () => {
    setSnackBarObj({ open: !setSnackBarObj.open, title: "", message: "" });
  };

  return (
    <div className="admin-login">
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
                  Admin Login
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  className="form-input"
                  onChange={(e) => handleInputChange(e, "email")}
                  value={inputObj.email}
                  fullWidth
                  type="email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  className="form-input"
                  onChange={(e) => handleInputChange(e, "password")}
                  value={inputObj.password}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item className="mt-30">
                <Button
                  variant="contained"
                  className={`btn ${
                    btnDisable ? "btn-disable" : "btn-primary"
                  }`}
                  onClick={handleAdminLogin}
                  disabled={btnDisable}
                >
                  Login
                </Button>
              </Grid>
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default Login;
