import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  TextField,
  InputAdornment,
  Typography,
} from "@material-ui/core";

function Details(props) {
  const [paidStatus, setPaidStatus] = useState("PAID");
  const [inpObj, setInptObj] = useState({
    hiNo: "D2340",
    plotNo: "D240",
    ptinNo: "15420ABCD",
    hNo: "6-4-323/A",
    ownerName: "John Deo",
    relationName: "James Wilson",
    builtUpArea: "500",
    landArea: "400",
    houseTaxArears: "4002.34",
    houseTaxCurrent: "4000.45",
    libraryTaxArears: "4500.45",
    libraryTaxCurrent: "3434.33",
    totalTaxArears: "3434.54",
    totalTaxCurrent: "4344.45",
    grandTotal: "3434.45",
  });
  return (
    <div className="details-pane">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <div className="box">
          <Grid container spacing={3}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <h5 className="text-primary">HID No</h5>
                <p>{inpObj.hiNo}</p>
              </Grid>
              <Grid item className="text-center">
                <p className="">Payment Status</p>
                {paidStatus && paidStatus == "PAID" ? (
                  <Button className="btn btn-primary">PAID</Button>
                ) : (
                  <Button className="btn btn-due">DUE</Button>
                )}
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <h5>Plot No</h5>
              <p>{inpObj.plotNo}</p>
            </Grid>
            <Grid item xs={4}>
              <h5>PTIN No.</h5>
              <p>{inpObj.ptinNo}</p>
            </Grid>
            <Grid item xs={4}>
              <h5>H No</h5>
              <p>{inpObj.hNo}</p>
            </Grid>
            <Grid item xs={4}>
              <h5>Name of Owner</h5>
              <p>{inpObj.ownerName}</p>
            </Grid>
            <Grid item xs={4}>
              <h5>S/o, W/o, D/o</h5>
              <p>{inpObj.relationName}</p>
            </Grid>
            <Grid item xs={4}>
              <h5>Built Up Area</h5>
              <p>{inpObj.builtUpArea} Sq.yards</p>
            </Grid>
            <Grid item xs={4}>
              <h5>Land Area</h5>
              <p>{inpObj.landArea} Sq.yards</p>
            </Grid>
            <Grid item xs={4}>
              <h5>House Tax Arrears</h5>
              <p>Rs. {inpObj.houseTaxArears}</p>
            </Grid>
            <Grid item xs={4}>
              <h5>House Tax Present</h5>
              <p>Rs. {inpObj.houseTaxCurrent}</p>
            </Grid>
            <Grid item xs={4}>
              <h5>Library Tax Arrears</h5>
              <p>Rs. {inpObj.libraryTaxArears}</p>
            </Grid>
            <Grid item xs={4}>
              <h5>Library Tax Present</h5>
              <p>Rs. {inpObj.libraryTaxCurrent}</p>
            </Grid>
            <Grid item xs={4}>
              <h5>Total Tax Arrears</h5>
              <p>Rs. {inpObj.totalTaxArears}</p>
            </Grid>
            <Grid item xs={4}>
              <h5>Total Tax Present</h5>
              <p>Rs. {inpObj.totalTaxCurrent}</p>
            </Grid>
            <Grid item xs={4}>
              <h5>Grand Total</h5>
              <p>Rs. {inpObj.grandTotal}</p>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            className="mt-30"
          >
            {paidStatus && paidStatus == "PAID" ? (
              <Button className="btn btn-primary btn-medium">
                Click To pay
              </Button>
            ) : (
              <Button className="btn btn-due btn-medium">
                Download Receipt
              </Button>
            )}
          </Grid>
        </div>
      </Grid>
    </div>
  );
}

export default Details;
