import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Button, Switch, Typography, FormControlLabel } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import "./CustomerProfile.scss";
import useAxios from "../../hooks/useAxios";
import ApiContants from "../../constants/Api";
import Loading from "../../components/loading/Loading";
import { formatFromDate, formatFromDateTime } from "../../utils/getFormatDate";
import BanModal from "../../components/modal/BanModal";
const titleStyle = { fontWeight: "bold", fontSize: "15px" };
const CustomerProfile = () => {
  const { customerId } = useParams();
  const customerAPI = useAxios();
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState(null);
  const [open, setOpen] = useState(false);
  const [banReason, setBanReason] = useState({
    value: "",
    error: "",
  });
  const [isEdited, setIsEdited] = useState(false);
  const saveCustomer = async () => {
    if (isEdited && banReason.error === "") {
      try {
        if (status) {
          await customerAPI.delete(
            ApiContants.BAN_USER + `?phone=${customer.customerPhone}`
          );
        } else {
          await customerAPI.post(ApiContants.BAN_USER, {
            phone: customer.customerPhone,
            banReason: banReason.value,
          });
        }
        setOpen(false);
        alert("Cập nhật thông tin thành công!");
        navigate("/customers");
      } catch (error) {
        setOpen(false);
        alert("Cập nhật thông tin không thành công.Vui lòng thử lại sau!");
      }
    }
  };
  const handleSave = (e) => {
    e.preventDefault();
    saveCustomer();
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSwitchChange = (event) => {
    if (!isEdited) {
      setStatus(event.target.checked);
      setIsEdited(true);
    }
  };
  const handleSaveCustomer = async () => {
    if (!status) {
      setOpen(true);
    } else {
      saveCustomer();
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isNaN(customerId)) throw new Error();
        setLoading(true);
        const response = await customerAPI.get(
          ApiContants.VIEW_CUSTOMER_INFO + `?customerId=${customerId}`
        );
        setCustomer(response.data);
        setStatus(response.data.status === "ACTIVE");
        setLoading(false);
      } catch (error) {
        navigate("/error");
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="customer-profile">
      <Sidebar />
      <div className="customer-profile-container">
        <Navbar />
        {loading ? (
          <Loading />
        ) : (
          <div className="body" style={{ flexWrap: "wrap" }}>
            <div className="avatar-container">
              <img src={customer.avatar} alt="" className="avatar" />
              <div
                style={{
                  display: "flex",
                  width: "300px",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={titleStyle}>Ngày tạo tài khoản</Typography>
                <Typography>
                  {formatFromDateTime(customer.createdAt)}
                </Typography>
              </div>
            </div>
            <div className="category-information">
              <Typography variant="h4">{customer.customerName}</Typography>
              <Typography>{customer.customerPhone}</Typography>
              <div
                style={{
                  display: "flex",
                  marginTop: "30px",
                  height: "60px",
                  width: "150px",
                  alignItems: "center",
                  borderBottom: "1px solid black",
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  Thông tin tài khoản
                </Typography>
              </div>
              <div className="row-field">
                <Typography className="row-title" sx={titleStyle}>
                  Ngày sinh
                </Typography>
                <Typography className="row-content">
                  {customer.dateOfBirth
                    ? formatFromDate(customer.dateOfBirth)
                    : "Không có"}
                </Typography>
              </div>
              <div className="row-field">
                <Typography className="row-title" sx={titleStyle}>
                  Giới tính
                </Typography>
                <Typography className="row-content">
                  {customer.gender ? "Nam" : "Nữ"}
                </Typography>
              </div>
              <div className="row-field">
                <Typography className="row-title" sx={titleStyle}>
                  Email
                </Typography>
                <Typography className="row-content">
                  {customer.email || "Không có"}
                </Typography>
              </div>
              <div className="row-field">
                <Typography className="row-title" sx={titleStyle}>
                  Địa chỉ
                </Typography>
                <Typography className="row-content">
                  {customer.address}
                </Typography>
              </div>

              <div className="row-field">
                <Typography
                  sx={{
                    alignSelf: "center",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                  className="row-title"
                >
                  Trạng thái:{" "}
                </Typography>
                <FormControlLabel
                  control={
                    <Switch checked={status} onChange={handleSwitchChange} />
                  }
                  label={status ? "Hoạt động" : "Vô hiệu hóa"}
                />
              </div>
              <div style={{ width: "100%", display: "flex" }}>
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    margin: "40px 20px 0px auto",
                  }}
                  onClick={handleSaveCustomer}
                >
                  Lưu
                </Button>
              </div>
              <BanModal
                open={open}
                handleClose={handleClose}
                banReason={banReason}
                setBanReason={setBanReason}
                handleSave={handleSave}
                phone={customer.customerPhone}
                userType="Khách hàng"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerProfile;
