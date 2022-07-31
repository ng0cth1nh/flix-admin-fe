import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Typography, TextareaAutosize } from "@mui/material";

import { useParams } from "react-router-dom";
import "./TransactionDetail.scss";
const transactionInfoField = [
  { id: "name", label: "Họ và tên", value: "Lâm đá banh" },
  { id: "phone", label: "Số điện thoại", value: "305784905" },
  {
    id: "txCode",
    label: "Mã giao dịch hệ thống",
    value: "fdsjfsd2452",
  },
  { id: "amount", label: "Số tiền", value: "50000" },
  { id: "txType", label: "Loại giao dịch", value: "Thanh toán hóa đơn" },
  {
    id: "status",
    label: "Trạng thái",
    value: true,
    format: (value) =>
      value ? (
        <Typography sx={{ color: "green" }}>Thành công</Typography>
      ) : (
        <Typography sx={{ color: "red" }}>Thất bại</Typography>
      ),
  },
  { id: "createdDate", label: "Ngày giao dịch", value: "20/10/2022" },
];
const vnpayTransactionField = [
    { id: "vnpayTxCode", label: "Mã giao dịch VNPay", value: "fdkjsdkl7347" },
    { id: "bankTxCode", label: "Mã giao dịch ngân hàng", value: "fff305784905" },
    {
      id: "bankCode",
      label: "Ngân hàng",
      value: "BIDV",
    },
    { id: "cardType", label: "Loại thẻ/tài khoản", value: "ATM" },
];
const TransactionDetail = () => {
  const [buttonPos, setButtonPos] = useState(0);
  const { transactionId } = useParams();
  return (
    <div className="transaction-detail">
      <Sidebar />
      <div className="transaction-detail-container">
        <Navbar />
        <div className="body">
          <Typography variant="h4">Giao dịch</Typography>

          <div style={{ display: "flex", marginBottom: "40px" }}>
            <div
              className="info-button"
              style={{
                marginRight: "30px",
                borderBottom: buttonPos === 0 ? "1px solid black" : "none",
              }}
              onClick={() => setButtonPos(0)}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
                Thông tin giao dịch
              </Typography>
            </div>
            <div
              className="info-button"
              style={{
                marginRight: "30px",
                borderBottom: buttonPos === 1 ? "1px solid black" : "none",
              }}
              onClick={() => setButtonPos(1)}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
                Thông tin giao dịch VNPay
              </Typography>
            </div>
          </div>
          <div
            style={{
              display: buttonPos === 0 ? "flex" : "none",
              overflow: "hidden",
              width: "100%",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {transactionInfoField &&
              transactionInfoField.map((field) => (
                <div className="row-field" key={field.id}>
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: "15px", width: "40%" }}
                  >
                    {field.label}
                  </Typography>
                  <Typography sx={{ width: "55%" }}>{field.format? field.format(field.value) : field.value}</Typography>
                </div>
              ))}
            <div style={{ width: "100%", marginTop: "20px" }}>
              <Typography sx={{ fontWeight: "bold", fontSize: "15px" }}>
                Lý do lỗi
              </Typography>
              <TextareaAutosize
                minRows={5}
                maxRows={7}
                aria-label="maximum height"
                placeholder="Lý do lỗi"
                style={{
                  width: "97%",
                  marginTop: "10px",
                  padding: "10px",
                  resize: "none",
                }}
                disabled
              />
            </div>
          </div>
          <div
            style={{
              display: buttonPos === 1 ? "flex" : "none",
              overflow: "hidden",
              width: "100%",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {vnpayTransactionField &&
              vnpayTransactionField.map((field) => (
                <div className="row-field" key={field.id}>
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: "15px", width: "40%" }}
                  >
                    {field.label}
                  </Typography>
                  <Typography sx={{ width: "55%" }}>{field.format? field.format(field.value) : field.value}</Typography>
                </div>
              ))}
            <div style={{ width: "100%", marginTop: "20px" }}>
              <Typography sx={{ fontWeight: "bold", fontSize: "15px" }}>
                Nội dung giao dịch
              </Typography>
              <TextareaAutosize
                minRows={5}
                maxRows={7}
                aria-label="maximum height"
                placeholder="Nội dung giao dịch"
                style={{
                  width: "97%",
                  marginTop: "10px",
                  padding: "10px",
                  resize: "none",
                }}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;
