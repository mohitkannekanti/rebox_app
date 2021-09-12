import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Typography,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import CustomModal from "./Custom/CustomModal";
import CustomLoader from "./Custom/CustomLoader";
import * as master from "../Api/MasterData.api";
import { updatePropertyStatusApi } from "../Api/Main.api";
import CustomSnackbar from "./Custom/CustomSnackbar";
import { useHistory } from "react-router-dom";
import jsPDF, { jsPDF as JsPDF } from "jspdf";
import html2canvas from "html2canvas";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const __DEV__ = document.domain === "localhost";

function Details(props) {
  const [paidStatus, setPaidStatus] = useState("");
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
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
  const [amount, setAmount] = useState("");
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
    handleClose();
  }, []);

  const openPaymentModal = () => {
    setPaymentDialogOpen(true);
  };

  const handleAmtChange = (e) => {
    const amt = e.target.value;
    setAmount(amt);
  };

  // RazorPay Integration
  async function displayRazorpay(amt) {
    const amountValue = amt * 100;
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    console.log(res, "res");

    const data = await fetch("http://localhost:1337/order", {
      method: "POST",
    }).then((t) => t.json());

    console.log(data, "data");
    const img = <img src="logo.png" />;
    const options = {
      key: __DEV__ ? "rzp_test_WbzJOjvLPnZizO" : "PRODUCTION_KEY",
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: "Amount Paid",
      description: `Complete the payment process for  ${inpObj.hiNo}`,
      image: img,
      handler: function (response) {
        setInptObj({
          ...inpObj,
          transactionRefNo: response.razorpay_payment_id,
        });
        let updateData = {
          hid: inpObj.hiNo,
          payment_status_id: "5",
          transaction_reference: response.razorpay_payment_id,
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
            setSnackBarObj({
              open: !setSnackBarObj.open,
              title: "error",
              message: "Something Wrong. Please Try Again",
            });
            console.error(err, "err");
          });
      },
      prefill: {
        name: inpObj.ownerName,
        email: "rebox@test.com",
        phone_number: inpObj.mobileNumber,
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  /*  const displayRazorpay = (amt) => {
    var amount = amt * 100; //Razorpay consider the amount in paise
    console.log(amount, "amount");

    var options = {
      key: __DEV__ ? "rzp_test_WbzJOjvLPnZizO" : "PRODUCTION_KEY",
      amount: 0, // 2000 paise = INR 20, amount in paisa
      name: "Urban Rebox",
      order_id: "",
      handler: function (response) {
        console.log(response, "response");
        var values = {
          razorpay_signature: response.razorpay_signature,
          razorpay_order_id: response.razorpay_order_id,
          transactionid: response.razorpay_payment_id,
          transactionamount: amount,
        };
        axios
          .post("http://localhost:1337/payment", values)
          .then((res) => {
            alert("Success");
          })
          .catch((e) => console.log(e));
      },
      theme: {
        color: "#528ff0",
      },
    };

    axios
      .post("http://localhost:1337/order", { amount: amount })
      .then((res) => {
        options.order_id = res.data.id;
        options.amount = res.data.amount;
        console.log(options);
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
      })
      .catch((e) => console.log(e));
  }; */

  const handleClose = () => {
    setDownloadReceipt(false);
    setPaymentDialogOpen(false);
    setDownloadReceipt(false);
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
                onClick={displayRazorpay}
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
          handleClose={handleClose}
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
      {paymentDialogOpen && (
        <CustomModal handleOpen={paymentDialogOpen} handleClose={handleClose}>
          <div className="modal-body">
            <TextField
              id="amount"
              name="amount"
              placeholder="Enter Amount in (₹)"
              onChange={handleAmtChange}
              className="form-input"
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₹</InputAdornment>
                ),
              }}
            />
          </div>
          <Button
            className="btn btn-primary btn-medium"
            onClick={displayRazorpay(amount)}
          >
            Submit
          </Button>
        </CustomModal>
      )}
    </div>
  );
}

export default Details;
