import React, { useState, useEffect } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import CustomModal from "./Custom/CustomModal";
import CustomLoader from "./Custom/CustomLoader";
import * as master from "../Api/MasterData.api";
import { updatePropertyStatusApi } from "../Api/Main.api";
import CustomSnackbar from "./Custom/CustomSnackbar";
import { useHistory } from "react-router-dom";
import jsPDF, { jsPDF as JsPDF } from "jspdf";
import html2canvas from "html2canvas";
import DownloadReceipt from "./DownloadReceipt";
import CloseIcon from "@material-ui/icons/Close";

function Details(props) {
  const [paidStatus, setPaidStatus] = useState("");
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const [downloadReceipt, setDownloadReceipt] = useState(false);
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
    mobileNumber: "",
    residentType: " ",
    houseTaxArears: " ",
    houseTaxCurrent: " ",
    libraryTaxArears: " ",
    libraryTaxCurrent: " ",
    totalTaxArears: " ",
    totalTaxCurrent: " ",
    grandTotal: " ",
    amountPaid: " ",
    transactionRefNo: " ",
    mandal: "",
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
        mobileNumber: data.phone_number,
        transactionRefNo: data.transaction_reference_number,
        mandal: data.mandal_name,
      });
      setPaidStatus(data.payment_status_name);
      setPaymentDate(data.payment_date);
    }
  }, []);

  const closeSnackBar = () => {
    setSnackBarObj({ open: !setSnackBarObj.open, title: "", message: "" });
  };

  useEffect(() => {
    // getMasterData();
    handleClose();
  }, []);

  /*  const getMasterData = () => {
    master
      .getMasterDataApi()
      .then(async (res) => {})
      .catch((err) => {
        // alert(err.message);
        console.log(err, "err");
      });
  }; */
  const handlePaymentRedirect = (e) => {
    paymentDataUpdate();
  };

  const paymentDataUpdate = () => {
    let transactionReference = new Date().valueOf();
    let updateData = {
      hid: inpObj.hiNo,
      payment_status_id: "5",
      transaction_reference: transactionReference,
    };
    updatePropertyStatusApi(updateData)
      .then(async (res) => {
        if (res.code === 1004) {
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
    setDownloadReceipt(false);
    setTimeout(function () {
      setIsLoading(false);
    }, 5000);
  };

  const clickForPdf = async () => {
    setDownloadReceipt(true);
  };

  const generatePdf = () => {
    if (downloadReceipt != false) {
      const divToDisplay = document.getElementById("downloadContent");
      if (divToDisplay != null) {
        html2canvas(divToDisplay).then((canvas) => {
          const dataURL = canvas.toDataURL();
          const pdf = new jsPDF("p", "mm", "a4");
          pdf.addImage(dataURL, "PNG", 45, 0, 0, 0);
          const pageCount = pdf.internal.getNumberOfPages();

          // For each page, print the page number and the total pages
          for (var i = 1; i <= pageCount; i++) {
            pdf.setPage(i);
            pdf.addFont("ArialMS", "Arial", "normal");
            pdf.setFont("Arial");
            pdf.setFontSize(10);
            pdf.text(
              "This is an auto generated receipt. Do not require any signature",
              50,
              270,
              null,
              null
            );
            pdf.text(
              "For any Queries. Reach out spport@rebox.com",
              50,
              275,
              null,
              null
            );
          }
          setDownloadReceipt(false);
          pdf.save(inpObj.hiNo + "_Receipt" + `.pdf`);
        });
      }
    }
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
                className=" text-center text-secondary"
                variant="h5"
                component="h5"
              >
                Property Details
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
                        <Button className="btn btn-primary btn-medium" disabled>
                          PAID
                        </Button>
                      ) : (
                        <Button className="btn btn-due btn-medium" disabled>
                          DUE
                        </Button>
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
            {paidStatus && paidStatus == "Paid" ? (
              <Button className="btn btn-due btn-medium" onClick={clickForPdf}>
                Print Receipt
              </Button>
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
      )}

      {downloadReceipt && (
        <CustomModal
          handleOpen={downloadReceipt}
          // btnValue="Submit"
        >
          <div className="modal-header">
            <h4 className="text-secondary">Receipt Format</h4>
            <span className="close-icon" onClick={handleClose}>
              <CloseIcon />
            </span>
          </div>
          <div className="modal-body">
            <div id="downloadContent" className="">
              <div className="text-center">
                <img src="logo.png" height={80} width={80} />
              </div>
              <div className="receipt-format">
                <h3 className="text-center">Receipt</h3>
                <table>
                  <tbody>
                    <tr>
                      <th>HIN No.</th>
                      <td>{inpObj.hiNo}</td>
                    </tr>
                    <tr>
                      <th>Name of the Owner</th>
                      <td>{inpObj.ownerName}</td>
                    </tr>
                    <tr>
                      <th>Mobile Number</th>
                      <td>{inpObj.mobileNumber}</td>
                    </tr>
                    <tr>
                      <th>PTIN No</th>
                      <td>{inpObj.ptinNo}</td>
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
                      <th>Mandal</th>
                      <td>{inpObj.mandal}</td>
                    </tr>
                    <tr>
                      <th>Payment Status</th>
                      <td>{paidStatus}</td>
                    </tr>
                    <tr>
                      <th>Transaction Reference No</th>
                      <td>{inpObj.transactionRefNo}</td>
                    </tr>
                    <tr>
                      <th>Payment Date</th>
                      <td>{paymentDate}</td>
                    </tr>
                    <tr>
                      <th>Grand Total</th>
                      <td>{inpObj.grandTotal}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <Button
              variant="contained"
              className="btn btn-primary btn-medium"
              onClick={(e) => generatePdf()}
              type="submit"
            >
              Download Receipt
            </Button>
          </div>
        </CustomModal>
      )}
    </div>
  );
}

export default Details;
