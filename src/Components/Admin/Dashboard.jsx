import React, { useState, useEffect } from "react";
import CustomTable from "../Custom/CustomTable";
import {
  Grid,
  Button,
  Typography,
  makeStyles,
  Input,
  InputLabel,
  InputAdornment,
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { getAllPropertiesDataApi } from "../../Api/Main.api";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

function AdminDashboard(props) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const columns = [
    { title: "HID No", field: "hid" },
    {
      title: "Status",
      field: "payment_status_name",
      render: (row) => (
        <Button
          className={
            row.payment_status_name === "Paid" ? " btn-primary" : "btn-due"
          }
        >
          {row.payment_status_name}
        </Button>
      ),
    },
    { title: "Village Name", field: "village_name" },
    { title: "Mandal Name", field: "mandal_name" },
    { title: "District Name", field: "district_name" },
    { title: "Plot No", field: "plot_no" },
    { title: "PTIN No", field: "asmtno_ptinno" },
    { title: "House No", field: "house_no" },
    { title: "Name of the Owner", field: "name_of_owner" },
    { title: "Rep By", field: "rep_by" },
    { title: "Mobile Number", field: "phone_number" },
    { title: "Built Up Area", field: "built_up_area" },
    { title: "Land Area", field: "land_area" },
    { title: "House tax arrears", field: "house_tax_arrears" },
    { title: "House tax Current", field: "house_tax_present" },
    { title: "Library tax arrears", field: "library_tax_arrears" },
    { title: "Library tax Current", field: "library_tax_present" },
    { title: "Total tax arrears", field: "total_tax_arrears" },
    { title: "Total tax Current", field: "total_tax_present" },
    { title: "Amount (in ₹)", field: "grand_total" },
    { title: "Transaction Ref No.", field: "transaction_reference_number" },
    {
      title: "Payment Date",
      field: "payment_date",
      type: "date",
      dateSetting: {
        format: "dd/MM/yyyy h:mm a",
      },
    },

    /* { title: "Type of Residence", field: "typeOfResidence" }, */
  ];

  useEffect(() => {
    getAllPropertiesData();
  }, []);

  const getAllPropertiesData = () => {
    getAllPropertiesDataApi()
      .then(async (res) => {
        setData(res.result);
      })
      .catch((err) => {
        // alert(err.message);
        console.error(err, "err");
      });
  };

  const handleLogout = () => {
    window.location.href = "/adminlogin";
  };

  return (
    <div className="admin-dashboard">
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        className="mt-20 "
      >
        <Grid item>
          <input
            accept="image/*"
            className={classes.input}
            id="upload_excel"
            name="upload_excel"
            type="file"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CloudUploadIcon />
                </InputAdornment>
              ),
            }}
          />
          <label htmlFor="upload_excel">
            <Button
              variant="contained"
              color="primary"
              startIcon={<CloudUploadIcon />}
              component="span"
              className="btn btn-secondary"
            >
              Upload
            </Button>
          </label>
        </Grid>
        {/*  <Grid item>
          <Typography variant="h5" component="h5" className="text-primary">
            Admin Dashboard
          </Typography>
        </Grid> */}
        <Grid item>
          <Button
            variant="contained"
            className="btn btn-primary"
            onClick={handleLogout}
            endIcon={<ExitToAppIcon />}
          >
            Logout
          </Button>
        </Grid>
      </Grid>
      <div className="mt-30">
        <CustomTable data={data} columns={columns} />
      </div>
    </div>
  );
}

export default AdminDashboard;
