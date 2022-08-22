import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Typography, TextareaAutosize } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import ApiContants from "../../constants/Api";
import Loading from "../../components/loading/Loading";
import Config from "../../constants/Config";
import { formatFromDate } from "../../utils/getFormatDate";
import "./transactionDetail.scss";
import { getMoneyFormat } from "../../utils/util";
const transactionInfoField = [
  { id: "fullName", label: "Họ và tên", value: "" },
  { id: "phone", label: "Số điện thoại", value: "" },
  {
    id: "transactionCode",
    label: "Mã giao dịch hệ thống",
    value: "",
  },
  {
    id: "amount",
    label: "Số tiền",
    value: "",
    format: (val) => getMoneyFormat(val),
  },
  {
    id: "transactionType",
    label: "Loại giao dịch",
    value: "",
    format: (val) => Config.TX_TYPE[val],
  },
  {
    id: "status",
    label: "Trạng thái",
    value: true,
    format: (val) =>
      val === "PENDING" ? (
        <Typography variant="p" sx={{ color: "orange" }}>
          Đang xử lí
        </Typography>
      ) : val === "SUCCESS" ? (
        <Typography variant="p" sx={{ color: "green" }}>
          Thành công
        </Typography>
      ) : (
        <Typography variant="p" sx={{ color: "red" }}>
          Thất bại
        </Typography>
      ),
  },
  {
    id: "payDate",
    label: "Ngày giao dịch",
    value: "",
    format: (val) => formatFromDate(val),
  },
  { id: "failReason", value: "" },
];
const vnpayTransactionField = [
  { id: "vnpTransactionNo", label: "Mã giao dịch VNPay", value: "" },
  { id: "vnpBankTranNo", label: "Mã giao dịch ngân hàng", value: "" },
  {
    id: "bankCode",
    label: "Ngân hàng",
    value: "",
  },
  { id: "cardType", label: "Loại thẻ/tài khoản", value: "" },
  { id: "orderInfo", value: "" },
];
const TransactionDetailPage = () => {
  const navigate = useNavigate();
  const userAPI = useAxios();
  const [buttonPos, setButtonPos] = useState(0);
  const [requestInfo, setRequestInfo] = useState(transactionInfoField);
  const [vnPayInfo, setVnPayInfo] = useState(vnpayTransactionField);
  const [loading, setLoading] = useState(false);
  const { transactionId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userAPI.get(
          ApiContants.TRANSACTION_DETAIL + `?id=${transactionId}`
        );
        const data = response.data;
        console.log(response.data);
        setRequestInfo(
          requestInfo.map((item) => ({
            ...item,
            value: item.format ? item.format(data[item.id]) : data[item.id],
          }))
        );
        setVnPayInfo(
          vnPayInfo.map((item) => ({
            ...item,
            value: item.format ? item.format(data[item.id]) : data[item.id],
          }))
        );
      } catch (error) {
        setLoading(false);
        navigate("/error");
      }
    };
    fetchData();
  }, []);
  return (
    <div className="transaction-detail">
      <Sidebar />
      <div className="transaction-detail-container">
        <Navbar />
        {loading ? (
          <Loading />
        ) : (
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
              {requestInfo &&
                requestInfo
                  .filter((field) => field.id !== "failReason")
                  .map((field) => (
                    <div className="row-field" key={field.id}>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: "15px",
                          width: "45%",
                        }}
                      >
                        {field.label}
                      </Typography>
                      <Typography sx={{ width: "50%" }}>
                        {field.value ? field.value : "Không có"}
                      </Typography>
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
                  value={requestInfo.failReason || "Không có"}
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
              {vnPayInfo &&
                vnPayInfo
                  .filter((field) => field.id !== "orderInfo")
                  .map((field) => (
                    <div className="row-field" key={field.id}>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: "15px",
                          width: "45%",
                        }}
                      >
                        {field.label}
                      </Typography>
                      <Typography sx={{ width: "50%" }}>
                        {field.value ? field.value : "Không có"}
                      </Typography>
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
                  value={vnPayInfo.orderInfo || "Không có"}
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
        )}
      </div>
    </div>
  );
};

export default TransactionDetailPage;
