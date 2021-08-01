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
        <Grid container spacing={2} className="text-center">
          <Grid item xs={12}>
            <Typography
              className=" text-center text-primary"
              variant="h5"
              component="h5"
            >
              Payment Details
            </Typography>
          </Grid>
          <Grid xs={12}>
            <table>
              <tbody>
                <tr>
                  <th>HIN No.</th>
                  <td>{inpObj.hiNo}</td>
                </tr>
                <tr>
                  <th>Owner Name</th>
                  <td>{inpObj.ownerName}</td>
                </tr>
                <tr>
                  <th>Resident Type</th>
                  <td>{inpObj.residentType}</td>
                </tr>
                <tr>
                  <th>Transcation Reference No.</th>
                  <td>{inpObj.transcationReferenceNo}</td>
                </tr>
                <tr>
                  <th>Plot No.</th>
                  <td>{inpObj.plotNo}</td>
                </tr>
                <tr>
                  <th>PTIN No.</th>
                  <td>{inpObj.ptinNo}</td>
                </tr>
                <tr>
                  <th>Grand Total</th>
                  <td>{inpObj.grandTotal}</td>
                </tr>
              </tbody>
            </table>
          </Grid>
          <Grid item xs={12}>
            <Alert severity="success">
              <AlertTitle>Payment Success</AlertTitle>
            </Alert>
          </Grid>
          <Grid item xs={12}>
            <Button className="btn btn-due btn-medium">Download Receipt</Button>
          </Grid>
        </Grid>
        <Grid container spacing={3} className="text-center"></Grid>
      </div>
    </div>
  );
}

export default PaymentDetails;
