import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import {
  Button,
  Switch,
  Typography,
  FormControlLabel,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import "./CustomerProfile.scss";

const CustomerProfile = () => {
  const [status, setStatus] = useState(false);
  const { search } = useLocation();
  const id = new URLSearchParams(search).get("id");
  return (
    <div className="customer-profile">
      <Sidebar />
      <div className="customer-profile-container">
        <Navbar />
        <div className="body">
          <div className="avatar-container">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
            <div
              style={{
                display: "flex",
                width: "300px",
                justifyContent: "space-between",
              }}
            >
              <Typography>Ngày tạo tài khoản</Typography>
              <Typography sx={{ fontWeight: "bold" }}>13/02/2020</Typography>
            </div>
          </div>
          <div className="category-information">
            <Typography variant="h4">Khách hàng 1</Typography>
            <Typography>0437893549</Typography>
            <div
              style={{
                display: "flex",
                marginTop:"30px",
                height: "60px",
                width: "150px",
                alignItems: "center",
                borderBottom: "1px solid black",
              }}
            >
              <Typography sx={{fontWeight:"bold"}}>Thông tin tài khoản</Typography>
            </div>
            <div className="row-field">
              <Typography className="row-title">Ngày sinh</Typography>
              <Typography>13/02/1992</Typography>
            </div>
            <div className="row-field">
              <Typography className="row-title">Giới tính</Typography>
              <Typography>Nam</Typography>
            </div>
            <div className="row-field">
              <Typography className="row-title">Email</Typography>
              <Typography>HoHoaiNam@gmail.com</Typography>
            </div>
            <div className="row-field">
              <Typography className="row-title">Địa chỉ</Typography>
              <Typography>Hà Tĩnh, Việt Nam</Typography>
            </div>

            <div className="row-field">
              <Typography sx={{alignSelf:"center"}} className="row-title">Trạng thái: </Typography>
              <FormControlLabel
                control={
                  <Switch
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
                  margin:"40px 20px 0px auto"
                }}
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
