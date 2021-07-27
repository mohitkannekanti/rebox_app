import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import CustomModal from "./Custom/Modal";

function Details(props) {
  const [paidStatus, setPaidStatus] = useState("DUE");
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [inpObj, setInptObj] = useState({
    hiNo: "D2340",
    plotNo: "D240",
    ptinNo: "15420ABCD",
    houseNo: "6-4-323/A",
    ownerName: "John Deo",
    relationName: "James Wilson",
    builtUpArea: "500",
    landArea: "400",
    residentType: "Residental",
    houseTaxArears: "4002.34",
    houseTaxCurrent: "4000.45",
    libraryTaxArears: "4500.45",
    libraryTaxCurrent: "3434.33",
    totalTaxArears: "3434.54",
    totalTaxCurrent: "4344.45",
    grandTotal: "3434.45",
  });
  const handlePaymentRedirect = () => {
    window.location.href = "/success";
  };
  const handlePaymentModalOpen = () => {
    setIsOpen(true);
  };
  const handlePaymentModalClose = () => {
    setIsOpen(false);
  };
  return (
    <div className="details-pane">
      <div className="box">
        <Grid container spacing={3}>
          <Grid xs={12}>
            <table>
              <tbody>
                <tr>
                  <th>HIN No.</th>
                  <td>{inpObj.hiNo}</td>
                </tr>
                <tr>
                  <th>Payment Status</th>
                  <td>
                    {paidStatus && paidStatus == "PAID" ? (
                      <Button className="btn btn-primary btn-medium">
                        PAID
                      </Button>
                    ) : (
                      <Button className="btn btn-due btn-medium">DUE</Button>
                    )}
                  </td>
                </tr>
                <tr>
                  <th>Owner Name</th>
                  <td>{inpObj.ownerName}</td>
                </tr>
                <tr>
                  <th>S/o , W/o, D/o</th>
                  <td>{inpObj.relationName}</td>
                </tr>
                <tr>
                  <th>Resident Type</th>
                  <td>{inpObj.residentType}</td>
                </tr>
                <tr>
                  <th>House No</th>
                  <td>{inpObj.houseNo}</td>
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
                  <th>Built Up Area</th>
                  <td>{inpObj.builtUpArea}</td>
                </tr>
                <tr>
                  <th>Land Area</th>
                  <td>{inpObj.landArea}</td>
                </tr>
                <tr>
                  <th>House Tax Arears</th>
                  <td>{inpObj.houseTaxArears}</td>
                </tr>
                <tr>
                  <th>House Tax Current</th>
                  <td>{inpObj.houseTaxCurrent}</td>
                </tr>
                <tr>
                  <th>Library Tax Arears</th>
                  <td>{inpObj.libraryTaxArears}</td>
                </tr>
                <tr>
                  <th>Library Tax Current</th>
                  <td>{inpObj.libraryTaxCurrent}</td>
                </tr>
                <tr>
                  <th>Total Tax Arears</th>
                  <td>{inpObj.totalTaxArears}</td>
                </tr>
                <tr>
                  <th>Total Tax Current</th>
                  <td>{inpObj.totalTaxCurrent}</td>
                </tr>
                <tr>
                  <th>Grand Total</th>
                  <td>{inpObj.grandTotal}</td>
                </tr>
              </tbody>
            </table>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          className="mt-30 mb-30"
        >
          {paidStatus && paidStatus == "PAID" ? (
            <Button className="btn btn-due btn-medium">Download Receipt</Button>
          ) : (
            <Button
              className="btn btn-primary btn-medium"
              onClick={handlePaymentRedirect}
            >
              Click To Pay
            </Button>
          )}
        </Grid>
      </div>
      {paymentDialogOpen && (
        <CustomModal
          open={handlePaymentModalOpen}
          close={handlePaymentModalClose}
        >
          <h1>jnfndjnfjdns</h1>
        </CustomModal>
      )}
    </div>
  );
}

export default Details;
