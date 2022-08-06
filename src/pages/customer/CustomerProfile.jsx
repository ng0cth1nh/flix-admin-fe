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
const titleStyle = { fontWeight: "bold", fontSize: "15px" };
const CustomerProfile = () => {
  const { customerId } = useParams();
  const customerAPI = useAxios();
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isNaN(customerId)) throw new Error();
        setLoading(true);
        const response = await customerAPI.get(
          ApiContants.VIEW_CUSTOMER_INFO + `?customerId=${customerId}`
        );
        console.log(response.data);
        setCustomer(response.data);
        setStatus(response.data.status === "ACTIVE");
        setLoading(false);
      } catch (error) {
        console.log(error);
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
                <Typography>{formatFromDateTime(customer.createdAt)}</Typography>
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
                    <Switch
                      checked={status}
                      onChange={(event) => {
                        setStatus(event.target.checked);
                      }}
                    />
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
                >
                  Lưu
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerProfile;
