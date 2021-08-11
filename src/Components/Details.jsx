import React, { useState, useEffect } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import CustomModal from "./Custom/Modal";
import CustomLoader from "./Custom/CustomLoader";
import * as master from "../Api/MasterData.api";
import { updatePropertyStatusApi } from "../Api/Main.api";
import CustomSnackbar from "./Custom/CustomSnackbar";
import { useHistory } from "react-router-dom";

function Details(props) {
  const [paidStatus, setPaidStatus] = useState("");
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const [snackBarObj, setSnackBarObj] = useState({
    open: false,
    title: "",
    message: "",
  });

  const [inpObj, setInptObj] = useState({
    hiNo: " ",
    plotNo: " ",
    ptinNo: " ",
    houseNo: " ",
    ownerName: " ",
    relationName: " ",
    builtUpArea: " ",
    landArea: " ",
    residentType: " ",
    houseTaxArears: " ",
    houseTaxCurrent: " ",
    libraryTaxArears: " ",
    libraryTaxCurrent: " ",
    totalTaxArears: " ",
    totalTaxCurrent: " ",
    grandTotal: " ",
  });

  useEffect(() => {
    const data = props.location.state.data;
    if (data) {
      setInptObj({
        ...inpObj,
        hiNo: data.hid,
        plotNo: data.plot_no,
        ptinNo: data.asmtno_ptinno,
        houseNo: data.house_no,
        ownerName: data.name_of_owner,
        relationName: data.rep_by,
        builtUpArea: data.built_up_area,
        landArea: data.land_area,
        residentType: "Residental",
        houseTaxArears: data.house_tax_arrears,
        houseTaxCurrent: data.house_tax_present,
        libraryTaxArears: data.library_tax_arrears,
        libraryTaxCurrent: data.library_tax_present,
        totalTaxArears: data.total_tax_arrears,
        totalTaxCurrent: data.total_tax_present,
        grandTotal: data.grand_total,
      });
      setPaidStatus(data.payment_status_name);
    }
  }, []);

  const closeSnackBar = () => {
    setSnackBarObj({ open: !setSnackBarObj.open, title: "", message: "" });
  };

  useEffect(() => {
    getMasterData();
    handleClose();
  }, []);

  const getMasterData = () => {
    master
      .getMasterDataApi()
      .then(async (res) => {})
      .catch((err) => {
        // alert(err.message);
        console.log(err, "err");
      });
  };
  const handlePaymentRedirect = (e) => {
    e.preventDefault();
    if (paidStatus === "Paid") {
      // paymentDataUpdate();
    } else {
      paymentDataUpdate();
    }
    // window.location.href = "/success";
  };

  const paymentDataUpdate = () => {
    let transactionReference = new Date().valueOf();
    let updateData = {
      hid: inpObj.hiNo,
      payment_status_id: "6",
      transaction_reference: transactionReference,
    };
    updatePropertyStatusApi(updateData)
      .then(async (res) => {
        if (res.code === 1004) {
          alert("paydone");
          setSnackBarObj({
            open: !setSnackBarObj.open,
            title: "success",
            message: "Payment Done Success",
          });
          let result = res.result;
          history.push({
            pathname: `/success`,
            state: { data: result },
          });
        } else {
          setSnackBarObj({
            open: !setSnackBarObj.open,
            title: "warning",
            message: "Payment Failed",
          });
        }
      })
      .catch((err) => {
        // alert(err.message);
        setSnackBarObj({
          open: !setSnackBarObj.open,
          title: "success",
          message: "Something Wrong. Please Try Again",
        });
        console.error(err, "err");
      });
  };

  const handlePaymentModalOpen = () => {
    setPaymentDialogOpen(true);
  };
  const handlePaymentModalClose = () => {
    setPaymentDialogOpen(false);
  };
  const handleClose = () => {
    setTimeout(function () {
      setIsLoading(false);
    }, 5000);
  };

  return (
    <div className="details-pane">
      {snackBarObj.title && snackBarObj.open ? (
        <CustomSnackbar
          snackBarObj={snackBarObj}
          closeSnackBar={closeSnackBar}
        />
      ) : (
        ""
      )}
      {isLoading && isLoading ? (
        <CustomLoader
          handleLoaderOpen={isLoading}
          handleLoaderClose={handleClose}
        ></CustomLoader>
      ) : (
        <div className="box">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography
                className=" text-center text-primary"
                variant="h5"
                component="h5"
              >
                Details
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
                    <th>Payment Status</th>
                    <td>
                      {paidStatus && paidStatus == "Paid" ? (
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
            <Button
              onClick={(e) => handlePaymentRedirect(e)}
              className={`btn btn-medium ${
                paidStatus === "Paid" ? "btn-due" : " btn-primary "
              }`}
              name={
                paidStatus === "Paid" ? "download_receipt" : " click_to_pay "
              }
            >
              {paidStatus === "Paid" ? "Download Receipt" : " Click To Pay"}
            </Button>

            {/*  {paidStatus && paidStatus == "PAID" ? (
              <Button className="btn btn-due btn-medium">
                Download Receipt
              </Button>
            ) : (
              <Button
                className="btn btn-primary btn-medium"
                // onClick={handlePaymentModalOpen}
                onClick={handlePaymentRedirect}
              >
                Click To Pay
              </Button>
            )} */}
          </Grid>
        </div>
      )}
      {paymentDialogOpen && (
        <CustomModal
          handleOpen={handlePaymentModalOpen}
          handleClose={handlePaymentModalClose}
        >
          <h1>Modal Open</h1>
        </CustomModal>
      )}
    </div>
  );
}

export default Details;
