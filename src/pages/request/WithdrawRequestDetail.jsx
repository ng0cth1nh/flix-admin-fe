import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Typography, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import "./WithdrawRequestDetail.scss";
import ConfirmDialog from "../../components/dialog/ConfirmDialog";
import useAxios from "../../hooks/useAxios";
import ApiContants from "../../constants/Api";
import Loading from "../../components/loading/Loading";
import getErrorMessage from "../../utils/getErrorMessage";
import { getMoneyFormat } from "../../utils/util";
import MuiTextAreaInput from "../../components/formInput/MuiTextAreaInput";
const requestInfoField = [
  { id: "repairerName", label: "Tên thợ sửa", value: "" },
  { id: "repairerPhone", label: "Số điện thoại", value: "" },
  {
    id: "withdrawType",
    label: "Loại rút tiền",
    value: "",
    format: (value) => (value === "BANKING" ? "Chuyển khoản" : "Tiền mặt"),
  },
  { id: "transactionCode", label: "Mã giao dịch", value: "" },
  {
    id: "amount",
    label: "Số tiền",
    value: "",
    format: (value) => getMoneyFormat(value),
  },
];
const vnpayInfoField = [
  { id: "bankCode", label: "Ngân hàng", value: "" },
  { id: "bankAccountNumber", label: "Số tài khoản", value: "" },
  {
    id: "bankAccountName",
    label: "Tên tài khoản",
    value: "",
  },
];
const WithdrawRequestDetail = () => {
  const navigate = useNavigate();
  const userAPI = useAxios();
  const { withdrawId } = useParams();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    rejectReason: {
      value: "",
      error: "",
    },
  });
  const [requestInfo, setRequestInfo] = useState(requestInfoField);
  const [vnPayInfo, setVnPayInfo] = useState(vnpayInfoField);
  const [loading, setLoading] = useState(false);
  const onChange = (id, text, error) => {
    setValues({ ...values, [id]: { value: text, error } });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleConfirm = async () => {
    if (values.rejectReason.error !== "") return;
    try {
      await userAPI.put(ApiContants.REJECT_WITHDRAW, {
        transactionId: withdrawId,
        reason: values.rejectReason.value,
      });
      alert("Yêu cầu rút tiền được từ chối thành công!");
      navigate("/withdraws");
    } catch (error) {
      alert(
        "Yêu cầu rút tiền từ chối bị thất bại do : " + getErrorMessage(error)
      );
    }
    setOpen(false);
  };
  const handleAccept = async () => {
    try {
      await userAPI.put(ApiContants.APPROVE_WITHDRAW, {
        transactionId: withdrawId,
      });
      alert("Yêu cầu rút tiền được chấp nhận thành công!");
      navigate("/withdraws");
    } catch (error) {
      alert(
        "Yêu cầu rút tiền chấp nhận bị thất bại do : " + getErrorMessage(error)
      );
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userAPI.get(
          ApiContants.VIEW_WITHDRAW_DETAIL + `?transactionId=${withdrawId}`
        );
        const data = response.data;
        console.log(data);
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
    <div className="withdraw-detail">
      <Sidebar />
      <div className="withdraw-detail-container">
        <Navbar />
        {loading ? (
          <Loading />
        ) : (
          <div className="body" style={{ paddingBottom: "100px" }}>
            <Typography variant="h4">Yêu cầu rút tiền</Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginTop: "40px",
              }}
            >
              <div style={{ width: "45%", flexWrap: "wrap" }}>
                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  Thông tin rút tiền
                </Typography>
                {requestInfo &&
                  requestInfo.map((field) => (
                    <div className="row-field" key={field.id}>
                      <Typography
                        className="row-title"
                        sx={{ fontWeight: "bold", fontSize: "15px" }}
                      >
                        {field.label}
                      </Typography>
                      <Typography sx={{ width: "45%" }}>
                        {field.value ? field.value : "Không có"}
                      </Typography>
                    </div>
                  ))}
              </div>
              <div style={{ width: "45%", flexWrap: "wrap" }}>
                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  Thông tin VN pay
                </Typography>
                {vnPayInfo &&
                  vnPayInfo.map((field) => (
                    <div className="row-field" key={field.id}>
                      <Typography
                        className="row-title"
                        sx={{ fontWeight: "bold", fontSize: "15px" }}
                      >
                        {field.label}
                      </Typography>
                      <Typography sx={{ width: "45%" }}>
                        {field.value ? field.value : "Không có"}
                      </Typography>
                    </div>
                  ))}
              </div>
            </div>
            <div style={{ float: "right", marginTop: "40px" }}>
              <Button
                variant="contained"
                sx={{ textTransform: "none", marginRight: "30px" }}
                size="small"
                color="success"
                onClick={handleAccept}
              >
                Chấp nhận
              </Button>
              <Button
                variant="contained"
                sx={{ textTransform: "none" }}
                size="small"
                color="error"
                onClick={() => {
                  setOpen(true);
                }}
              >
                Từ chối
              </Button>
            </div>
            <ConfirmDialog
              open={open}
              title="Bạn có muốn hủy yêu cầu rút tiền này không?"
              handleClose={handleClose}
              handleConfirm={handleConfirm}
            >
              <div style={{ width: "85%", margin: "auto" }}>
                <MuiTextAreaInput
                  label="Lý do*"
                  item={values.rejectReason}
                  id="rejectReason"
                  onChange={onChange}
                  isRequired={true}
                />
              </div>
            </ConfirmDialog>
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawRequestDetail;
