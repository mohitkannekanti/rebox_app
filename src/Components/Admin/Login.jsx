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

function Login() {
  const [inputObj, setInputObj] = useState({
    username: "",
    password: "",
  });

  const [btnDisable, setBtnDisable] = useState(true);

  const handleInputChange = (e, name) => {
    const value = e.target.value;
    console.log(name, value, "inputs");
    setInputObj({ ...inputObj, [name]: value });
  };

  const handleAdminLogin = () => {
    console.log("login clicked");
  };

  const handleValidation = () => {
    if (
      inputObj.username != null &&
      inputObj.username != "" &&
      inputObj.password != null &&
      inputObj.password != ""
    ) {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  };

  useEffect(() => {
    handleValidation();
  }, [inputObj]);

  return (
    <div className="admin-login">
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
                id="username"
                name="username"
                placeholder="Enter Username"
                className="form-input"
                onChange={(e) => handleInputChange(e, "username")}
                value={inputObj.username}
                fullWidth
                type="text"
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
                className={`btn ${btnDisable ? "btn-disable" : "btn-primary"}`}
                onClick={handleAdminLogin}
                disabled={btnDisable}
              >
                Login
              </Button>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Login;
