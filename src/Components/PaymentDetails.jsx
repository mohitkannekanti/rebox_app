import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  TextField,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

function PaymentDetails(props) {
  const [paidStatus, setPaidStatus] = useState(" ");
  const [inpObj, setInptObj] = useState({
    hiNo: "",
    plotNo: "",
    ptinNo: "",
    houseNo: "",
    ownerName: "",
    residentType: "",
    grandTotal: "",
    transcationReferenceNo: "",
  });

  useEffect(() => {
    const data = props.location.state.data[0];
    if (data) {
      setInptObj({
        ...inpObj,
        hiNo: data.hid,
        plotNo: data.plot_no,
        ptinNo: data.asmtno_ptinno,
        houseNo: data.house_no,
        ownerName: data.name_of_owner,
        residentType: "Residental",
        grandTotal: data.grand_total,
        transcationReferenceNo: data.transaction_reference_number,
      });
      setPaidStatus(data.payment_status_name);
    }
  }, []);

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
