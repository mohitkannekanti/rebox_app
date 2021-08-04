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

const list = [
  {
    hidNo: "DIN 2323",
    status: "Paid",
    nameOfOwner: "James Stephen",
    typeOfResidence: "Residental",
    ptinNo: 33434,
    amount: 4000,
    mobileNumber: 9834343434,
  },
  {
    hidNo: "DIN 2323",
    status: "Paid",
    nameOfOwner: "Robert Wilson",
    typeOfResidence: "Residental",
    ptinNo: 33434,
    amount: 4000,
    mobileNumber: 9834343435,
  },
  {
    hidNo: "DIN 2323",
    status: "DUE",
    nameOfOwner: "Srinivasulu A",
    typeOfResidence: "Residental",
    ptinNo: 33434,
    amount: 4000,
    mobileNumber: 9834343436,
  },
  {
    hidNo: "DIN 2323",
    status: "Paid",
    nameOfOwner: "Vijay Malya",
    typeOfResidence: "Residental",
    ptinNo: 33434,
    amount: 4000,
    mobileNumber: 9834787999,
  },
  {
    hidNo: "DIN 2323",
    status: "Paid",
    nameOfOwner: "Ajay Howlya",
    typeOfResidence: "Residental",
    ptinNo: 33434,
    amount: 4000,
    mobileNumber: 9834787991,
  },
  {
    hidNo: "DIN 2323",
    status: "Due",
    nameOfOwner: "Stephen Yoki",
    typeOfResidence: "Residental",
    ptinNo: 33434,
    amount: 4000,
    mobileNumber: 9834787992,
  },
  {
    hidNo: "DIN 2323",
    status: "Paid",
    nameOfOwner: "Mike Tike",
    typeOfResidence: "Residental",
    ptinNo: 33434,
    amount: 4000,
    mobileNumber: 9834787993,
  },
  {
    hidNo: "DIN 2323",
    status: "Paid",
    nameOfOwner: "John Wilson",
    typeOfResidence: "Residental",
    ptinNo: 33434,
    amount: 4000,
    mobileNumber: 9834787994,
  },
  {
    hidNo: "DIN 2323",
    status: "Paid",
    nameOfOwner: "Wilson",
    typeOfResidence: "Residental",
    ptinNo: 33434,
    amount: 4000,
    mobileNumber: 9834789995,
  },
  {
    hidNo: "DIN 2323",
    status: "Paid",
    nameOfOwner: "Renuka P",
    typeOfResidence: "Residental",
    ptinNo: 33434,
    amount: 4000,
    mobileNumber: 9834787996,
  },
  {
    hidNo: "DIN 2323",
    status: "Paid",
    nameOfOwner: "James Wilson",
    typeOfResidence: "Residental",
    ptinNo: 33434,
    amount: 4000,
    mobileNumber: 9834787997,
  },
  {
    hidNo: "DIN 2323",
    status: "Paid",
    nameOfOwner: "James",
    typeOfResidence: "Residental",
    ptinNo: 33434,
    amount: 4000,
    mobileNumber: 9834787998,
  },
  {
    hidNo: "DIN 2323",
    status: "Paid",
    nameOfOwner: "James Wilson",
    typeOfResidence: "Residental",
    ptinNo: 33434,
    amount: 4000,
    mobileNumber: 9834787990,
  },
  {
    hidNo: "DIN 2323",
    status: "Paid",
    nameOfOwner: "James Wilson",
    typeOfResidence: "Residental",
    ptinNo: 33434,
    amount: 4000,
    mobileNumber: 9834787900,
  },
  {
    hidNo: "DIN 2323",
    status: "Paid",
    nameOfOwner: "James Wilson",
    typeOfResidence: "Residental",
    ptinNo: 33434,
    amount: 4000,
    mobileNumber: 9834787901,
  },
  {
    hidNo: "DIN 2323",
    status: "Paid",
    nameOfOwner: "James Wilson",
    typeOfResidence: "Residental",
    ptinNo: 33434,
    amount: 4000,
    mobileNumber: 9834787902,
  },
  {
    hidNo: "DIN 2323",
    status: "Paid",
    nameOfOwner: "James Wilson",
    typeOfResidence: "Residental",
    ptinNo: 33434,
    amount: 4000,
    mobileNumber: 9834787903,
  },
  {
    hidNo: "DIN 2323",
    status: "Paid",
    nameOfOwner: "Raja Wilson",
    typeOfResidence: "Residental",
    ptinNo: 33434,
    amount: 4000,
    mobileNumber: 9834787904,
  },
];

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
  const [data, setData] = useState(list);
  const columns = [
    { title: "HID No", field: "hidNo" },
    {
      title: "Status",
      field: "status",
      render: (row) => (
        <Button className={row.status == "Paid" ? " btn-primary" : "btn-due"}>
          {row.status}
        </Button>
      ),
    },
    { title: "Name of the Owner", field: "nameOfOwner" },
    { title: "Type of Residence", field: "typeOfResidence" },
    { title: "PTIN No", field: "ptinNo" },
    { title: "Amount (in ₹)", field: "amount" },
    { title: "Mobile Number", field: "mobileNumber" },
  ];

  useEffect(() => {
    setData(list);
  }, []);

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
        className="mt-30 "
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
