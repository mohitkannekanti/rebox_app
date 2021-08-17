import React, { useState, useEffect } from "react";
import { downloadReceiptApi } from "../Api/Main.api";

const DownloadReceipt = (props) => {
  console.log("props", props);
  const hid = props.hid;
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [paidStatus, setPaidStatus] = useState("");
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
  });

  useEffect(() => {
    getDownloadContent();
  }, [hid]);

  const getDownloadContent = () => {
    let reqObj = {
      hid: hid,
    };
    console.log(reqObj);
    downloadReceiptApi(reqObj)
      .then(async (res) => {
        console.log(res, "res");
        if (res.code === 1000) {
          let data = res.result[0];
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
          });
          setPaidStatus(data.payment_status_name);
          setPaymentDate(data.payment_date);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  console.log("inpObj", inpObj);

  return (
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
              <th>House No</th>
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
              <th>Transaction Reference No</th>
              <td>{inpObj.transactionRefNo}</td>
            </tr>
            {/*  <tr>
                <th>Payment Date</th>
                <td>{paymentDate}</td>
              </tr> */}
            <tr>
              <th>Grand Total</th>
              <td>{inpObj.grandTotal}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DownloadReceipt;
