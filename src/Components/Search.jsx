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
import { useHistory } from "react-router-dom";

function Search(props) {
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

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputObj({ ...inputObj, search: value });
  };

  const handleSearch = () => {
    window.location.href = "/details";
  };

  return (
    <div className={classes.root}>
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
                onClick={handleSearch}
                disabled={btnDisable}
              >
                Search
              </Button>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Search;
