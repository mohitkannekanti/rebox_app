import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  TextField,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

function PaymentDetails() {
  const [paidStatus, setPaidStatus] = useState("PAID");
  const [inpObj, setInptObj] = useState({
    hiNo: "D2340",
    plotNo: "D240",
    ptinNo: "15420ABCD",
    hNo: "6-4-323/A",
    ownerName: "John Deo",
    residentType: "Residental",
    grandTotal: "3434.45",
    transcationReferenceNo: "2334838483848",
  });
  return (
    <div className="paymentDetails-pane">
      <div className="box">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <h5 className="text-primary">HID No</h5>
            <p>{inpObj.hiNo}</p>
          </Grid>
          <Grid item xs={12} sm={4}>
            <h5>Transaction Reference No</h5>
            <p>{inpObj.transcationReferenceNo}</p>
          </Grid>
          <Grid item xs={12} sm={4}>
            <h5>Name of Owner</h5>
            <p>{inpObj.ownerName}</p>
          </Grid>
          <Grid item xs={12} sm={4}>
            <h5>Plot No</h5>
            <p>{inpObj.plotNo}</p>
          </Grid>
          <Grid item xs={12} sm={4}>
            <h5>PTIN No.</h5>
            <p>{inpObj.ptinNo}</p>
          </Grid>
          <Grid item xs={12} sm={4}>
            <h5>H No</h5>
            <p>{inpObj.hNo}</p>
          </Grid>
          <Grid item xs={12} sm={4}>
            <h5 className="text-primary">Type of Residence</h5>
            <p>{inpObj.residentType}</p>
          </Grid>
          <Grid item xs={12} sm={4}>
            <h5>Grand Total</h5>
            <p>Rs. {inpObj.grandTotal}</p>
          </Grid>
        </Grid>
        <Grid container spacing={3} className="text-center">
          <Grid item xs={12}>
            <Alert severity="success">
              <AlertTitle>Payment Success</AlertTitle>
            </Alert>
          </Grid>
          <Grid item xs={12}>
            <Button className="btn btn-due btn-medium">Download Receipt</Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default PaymentDetails;
