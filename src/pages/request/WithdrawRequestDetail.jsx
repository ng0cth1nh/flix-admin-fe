import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Typography, Button, TextareaAutosize } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import "./WithdrawRequestDetail.scss";
import ConfirmDialog from "../../components/dialog/ConfirmDialog";
import useAxios from "../../hooks/useAxios";
import ApiContants from "../../constants/Api";
import Loading from "../../components/loading/Loading";
import getErrorMessage from "../../utils/getErrorMessage";
const requestInfoField = [
  { id: "repairerName", label: "Tên thợ sửa", value: "" },
  { id: "repairerPhone", label: "Số điện thoại", value: "" },
  {
    id: "withdrawType",
    label: "Loại rút tiền",
    value: "",
  },
  { id: "transactionCode", label: "Mã giao dịch", value: "" },
  {
    id: "amount",
    label: "Số tiền",
    value: "",
    format: (value) => parseInt(value).toLocaleString("en-US") + " vnđ",
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
  const [rejectReason, setRejectReason] = useState("");
  const [requestInfo, setRequestInfo] = useState(requestInfoField);
  const [vnPayInfo, setVnPayInfo] = useState(vnpayInfoField);
  const [loading, setLoading] = useState(false);
  const [acceptButtonEnable, setAcceptButtonEnable]= useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleConfirm = async () => {
    try {
      await userAPI.put(ApiContants.REJECT_WITHDRAW, {
        transactionId: withdrawId,
        reason:rejectReason
      });
      alert("Yêu cầu rút tiền được từ chối thành công!");
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
              acceptButtonEnable={acceptButtonEnable}
            >
              <div
                style={{ width: "85%", marginTop: "10px", alignSelf: "center" }}
              >
                <Typography sx={{ fontSize: "14px" }}>Lý do</Typography>
                <TextareaAutosize
                  minRows={5}
                  maxRows={7}
                  aria-label="maximum height"
                  placeholder="Nội dung"
                  value={rejectReason}
                  onChange={(e) => {
                    if(!e.target.value.trim()||e.target.value.length>2500){
                      setAcceptButtonEnable(false);
                    }else{
                      setAcceptButtonEnable(true);
                    }
                    setRejectReason(e.target.value);
                  }}
                  style={{
                    width: "97%",
                    marginTop: "5px",
                    padding: "10px",
                    resize: "none",
                  }}
                />
                {rejectReason.length>2500&&<span style={{
                    fontSize: "12px",
                    padding: "3px",
                    color: "red",
                }}>Lý do nhập quá dài</span>}
              </div>
            </ConfirmDialog>
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawRequestDetail;
