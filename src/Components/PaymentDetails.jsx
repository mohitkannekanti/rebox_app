import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  TextField,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

function PaymentDetails(props) {
  const [paidStatus, setPaidStatus] = useState(" ");
  const [paymentDate, setPaymentDate] = useState("");
  const [inpObj, setInptObj] = useState({
    hiNo: "",
    plotNo: "",
    ptinNo: "",
    houseNo: "",
    ownerName: "",
    residentType: "",
    grandTotal: "",
    transcationReferenceNo: "",
    mobileNumber: "",
    mandal: "",
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
        mobileNumber: data.phone_number,
        mandal: data.mandal_name,
      });
      setPaidStatus(data.payment_status_name);
      setPaymentDate(data.payment_date);
    }
  }, []);

  const downloadReceipt = () => {
    var doc = new jsPDF();
    const divToDisplay = document.getElementById("downloadContent");
    if (divToDisplay != null) {
      html2canvas(divToDisplay).then((canvas) => {
        const imgData = new Image();
        imgData.src = "logo.png";

        const pdf = new jsPDF("p", "mm", "a4");
        pdf.addImage(imgData, 95, 20, 20, 20, "", "FAST");
        pdf.text("Receipt", 95, 50, 0, 0);
        const dataURL = canvas.toDataURL();
        pdf.addImage(dataURL, "PNG", 0, 55, 0, 0);
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
        pdf.save(inpObj.hiNo + "_Receipt" + `.pdf`);
      });
    }
    // setDownloadReceiptStatus(false);
  };

  return (
    <div className="paymentDetails-pane">
      <Grid container spacing={2} className="text-center">
        <div className="box">
          <Grid item xs={12} className="mb-30">
            <Typography
              className=" text-center text-primary"
              variant="h5"
              component="h5"
            >
              Payment Details
            </Typography>
          </Grid>
          <Grid xs={12}>
            <div>
              {/* {downloadReceiptStatus && downloadReceiptStatus ? (
                <div className="text-center">
                  <img src="logo.png" height={80} width={80} />
                  <h3 className="text-center">Receipt</h3>
                </div>
              ) : (
                ""
              )} */}

              <table id="downloadContent" className="receipt-format">
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
                    <td>{inpObj.residentType}</td>
                  </tr>
                  <tr>
                    <th>PTIN No.</th>
                    <td>{inpObj.ptinNo}</td>
                  </tr>
                  <tr>
                    <th>House Number</th>
                    <td>{inpObj.houseNo}</td>
                  </tr>
                  <tr>
                    <th>Plot No.</th>
                    <td>{inpObj.plotNo}</td>
                  </tr>
                  <tr>
                    <th>Payment Status</th>
                    <td>{paidStatus}</td>
                  </tr>
                  <tr>
                    <th>Payment Date</th>
                    <td>{paymentDate}</td>
                  </tr>
                  <tr>
                    <th>Transcation Reference No.</th>
                    <td>{inpObj.transcationReferenceNo}</td>
                  </tr>
                  <tr>
                    <th>Grand Total</th>
                    <td>{inpObj.grandTotal}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Grid>
          <Grid item xs={12} className="mt-20">
            <Alert severity="success">
              <AlertTitle>Payment Success</AlertTitle>
            </Alert>
          </Grid>
          <Grid item xs={12} className="mt-20">
            <Button
              className="btn btn-due btn-medium"
              onClick={(e) => downloadReceipt(e)}
            >
              Download Receipt
            </Button>
          </Grid>
        </div>
      </Grid>
    </div>
  );
}

export default PaymentDetails;
