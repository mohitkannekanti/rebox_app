import React, { useState, useEffect } from "react";
import CustomTable from "../Custom/CustomTable";
import { Grid, Button } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const list = [
  {
    hidNo: "DIN 2323",
    status: "Paid",
    nameOfOwner: "James Wilson",
    typeOfResidence: "Residental",
    ptinNo: 33434,
    amount: 4000,
    mobileNumber: 9834343434,
  },
  {
    hidNo: "DIN 2323",
    status: "Paid",
    nameOfOwner: "James Wilson",
    typeOfResidence: "Residental",
    ptinNo: 33434,
    amount: 4000,
    mobileNumber: 9834343434,
  },
  {
    hidNo: "DIN 2323",
    status: "DUE",
    nameOfOwner: "James Wilson",
    typeOfResidence: "Residental",
    ptinNo: 33434,
    amount: 4000,
    mobileNumber: 9834343434,
  },
  {
    hidNo: "DIN 2323",
    status: "Paid",
    nameOfOwner: "James Wilson",
    typeOfResidence: "Residental",
    ptinNo: 33434,
    amount: 4000,
    mobileNumber: 9834343434,
  },
  {
    hidNo: "DIN 2323",
    status: "Paid",
    nameOfOwner: "James Wilson",
    typeOfResidence: "Residental",
    ptinNo: 33434,
    amount: 4000,
    mobileNumber: 9834343434,
  },
  {
    hidNo: "DIN 2323",
    status: "Paid",
    nameOfOwner: "James Wilson",
    typeOfResidence: "Residental",
    ptinNo: 33434,
    amount: 4000,
    mobileNumber: 9834343434,
  },
  {
    hidNo: "DIN 2323",
    status: "Paid",
    nameOfOwner: "James Wilson",
    typeOfResidence: "Residental",
    ptinNo: 33434,
    amount: 4000,
    mobileNumber: 9834343434,
  },
  {
    hidNo: "DIN 2323",
    status: "Paid",
    nameOfOwner: "James Wilson",
    typeOfResidence: "Residental",
    ptinNo: 33434,
    amount: 4000,
    mobileNumber: 9834343434,
  },
  {
    hidNo: "DIN 2323",
    status: "Paid",
    nameOfOwner: "James Wilson",
    typeOfResidence: "Residental",
    ptinNo: 33434,
    amount: 4000,
    mobileNumber: 9834343434,
  },
  {
    hidNo: "DIN 2323",
    status: "Paid",
    nameOfOwner: "James Wilson",
    typeOfResidence: "Residental",
    ptinNo: 33434,
    amount: 4000,
    mobileNumber: 9834343434,
  },
  {
    hidNo: "DIN 2323",
    status: "Paid",
    nameOfOwner: "James Wilson",
    typeOfResidence: "Residental",
    ptinNo: 33434,
    amount: 4000,
    mobileNumber: 9834343434,
  },
  {
    hidNo: "DIN 2323",
    status: "Paid",
    nameOfOwner: "James",
    typeOfResidence: "Residental",
    ptinNo: 33434,
    amount: 4000,
    mobileNumber: 9834343434,
  },
  {
    hidNo: "DIN 2323",
    status: "Paid",
    nameOfOwner: "James Wilson",
    typeOfResidence: "Residental",
    ptinNo: 33434,
    amount: 4000,
    mobileNumber: 9834343434,
  },
  {
    hidNo: "DIN 2323",
    status: "Paid",
    nameOfOwner: "James Wilson",
    typeOfResidence: "Residental",
    ptinNo: 33434,
    amount: 4000,
    mobileNumber: 9834343434,
  },
  {
    hidNo: "DIN 2323",
    status: "Paid",
    nameOfOwner: "James Wilson",
    typeOfResidence: "Residental",
    ptinNo: 33434,
    amount: 4000,
    mobileNumber: 9834343434,
  },
  {
    hidNo: "DIN 2323",
    status: "Paid",
    nameOfOwner: "James Wilson",
    typeOfResidence: "Residental",
    ptinNo: 33434,
    amount: 4000,
    mobileNumber: 9834343434,
  },
  {
    hidNo: "DIN 2323",
    status: "Paid",
    nameOfOwner: "James Wilson",
    typeOfResidence: "Residental",
    ptinNo: 33434,
    amount: 4000,
    mobileNumber: 9834343434,
  },
  {
    hidNo: "DIN 2323",
    status: "Paid",
    nameOfOwner: "Raja Wilson",
    typeOfResidence: "Residental",
    ptinNo: 33434,
    amount: 4000,
    mobileNumber: 9834343434,
  },
];

function AdminDashboard(props) {
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
          <Button
            variant="contained"
            color="default"
            className="btn"
            startIcon={<CloudUploadIcon />}
          >
            Upload
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" className="btn btn-primary">
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
