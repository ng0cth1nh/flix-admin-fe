import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import {
  Button,
  Switch,
  Typography,
  FormControlLabel,
  TextareaAutosize,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import { MapInteractionCSS } from "react-map-interaction";

import { useParams } from "react-router-dom";
import "./RepairerProfile.scss";
const listImage = [
  "https://media.conglyxahoi.net/news/2022/07/01/H%E1%BB%93%20Ho%C3%A0i%20Anh%20-%20g%C6%B0%C6%A1ng%20m%E1%BA%B7t%20quen%20thu%E1%BB%99c%20v%E1%BB%9Bi%20kh%C3%A1n%20gi%E1%BA%A3%20Vi%E1%BB%87t.jpg",
  "https://image-us.24h.com.vn/upload/1-2022/images/2022-03-22/1647915882-6fc57fcee4a29bee3a77cc289c352bb5-width660height824.jpg",
  "https://www.invert.vn/media/ar/anh-ong-nano.jpeg",
  "https://www.invert.vn/media/ar/anh-ong-nano.jpeg",
  "https://www.invert.vn/media/ar/anh-ong-nano.jpeg",
  "https://www.invert.vn/media/ar/anh-ong-nano.jpeg",
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const RepairerProfile = () => {
  const [open, setOpen] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState(0);
  const [status, setStatus] = useState(true);
  const [buttonPos, setButtonPos] = useState(0);
  const [banReason, setBanReson ]= useState('');
  const { repairerId } = useParams();
  return (
    <div className="repairer-profile">
      <Sidebar />
      <div className="repairer-profile-container">
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
              <Typography sx={{ fontWeight: "bold", fontSize: "15px" }}>
                Ngày tạo tài khoản
              </Typography>
              <Typography>13/02/2020</Typography>
            </div>
          </div>
          <div className="category-information">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h4">Hồ Hoài Nam</Typography>
              {verifyStatus === 0 ? (
                <Typography sx={{ color: "orange" }}>Chưa xác nhận</Typography>
              ) : verifyStatus === 1 ? (
                <Typography sx={{ color: "green" }}>Đã xác nhận</Typography>
              ) : (
                <Typography sx={{ color: "red" }}>Đã hủy</Typography>
              )}
            </div>
            <Typography>0437893549</Typography>
            <div style={{ display: "flex" }}>
              <div
                className="info-button"
                style={{
                  marginRight: "30px",
                  borderBottom: buttonPos === 0 ? "1px solid black" : "none",
                }}
                onClick={() => setButtonPos(0)}
              >
                <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
                  Thông tin tài khoản
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
                  Thông tin khác
                </Typography>
              </div>
            </div>
            <div style={{ display: buttonPos === 0 ? "block" : "none" }}>
              <div className="row-field">
                <Typography
                  className="row-title"
                  sx={{ fontWeight: "bold", fontSize: "15px" }}
                >
                  Ngày sinh
                </Typography>
                <Typography>13/02/1992</Typography>
              </div>
              <div className="row-field">
                <Typography
                  className="row-title"
                  sx={{ fontWeight: "bold", fontSize: "15px" }}
                >
                  Giới tính
                </Typography>
                <Typography>Nam</Typography>
              </div>
              <div className="row-field">
                <Typography
                  className="row-title"
                  sx={{ fontWeight: "bold", fontSize: "15px" }}
                >
                  Email
                </Typography>
                <Typography>HoHoaiNam@gmail.com</Typography>
              </div>
              <div className="row-field">
                <Typography
                  className="row-title"
                  sx={{ fontWeight: "bold", fontSize: "15px" }}
                >
                  Địa chỉ
                </Typography>
                <Typography>Hà Tĩnh, Việt Nam</Typography>
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
                      onChange={(event) => {
                        setStatus(event.target.checked);
                        if (!event.target.checked) {
                          setOpen(true);
                        }
                      }}
                      checked={status}
                    />
                  }
                  label={status ? "Hoạt động" : "Vô hiệu hóa"}
                />
              </div>
            </div>
            <div style={{ display: buttonPos === 1 ? "block" : "none" }}>
              <div className="row-field">
                <Typography
                  className="row-title"
                  sx={{ fontWeight: "bold", fontSize: "15px" }}
                >
                  Năm kinh nghiệm
                </Typography>
                <Typography>2 năm</Typography>
              </div>
              <div style={{ width: "100%", marginTop: "10px" }}>
                <Typography sx={{ fontWeight: "bold", fontSize: "15px" }}>
                  Mô tả kinh nghiệm
                </Typography>
                <TextareaAutosize
                  minRows={5}
                  maxRows={7}
                  aria-label="maximum height"
                  placeholder="Mô tả kinh nghiệm"
                  style={{
                    width: "97%",
                    marginTop: "10px",
                    padding: "10px",
                    resize: "none",
                  }}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  marginTop: "20px",
                }}
              >
                <Typography sx={{ fontWeight: "bold", fontSize: "15px" }}>
                  Bằng cấp
                </Typography>
                <div className="file">
                  {listImage.map((image) => (
                    <div className="image-container">
                      <MapInteractionCSS scale={1}>
                        <img src={image} alt="Ảnh minh họa" />
                      </MapInteractionCSS>
                    </div>
                  ))}
                </div>
              </div>
              <div className="row-field">
                <Typography
                  className="row-title"
                  sx={{ fontWeight: "bold", fontSize: "15px" }}
                >
                  Số CMND/CCCD
                </Typography>
                <Typography>2 năm</Typography>
              </div>
              <div
                style={{
                  width: "100%",
                  marginTop: "20px",
                }}
              >
                <Typography sx={{ fontWeight: "bold", fontSize: "15px" }}>
                  Ảnh CMND/CCCD
                </Typography>
                <div className="file">
                  {listImage.map((image) => (
                    <div className="image-container">
                      <MapInteractionCSS scale={1}>
                        <img src={image} alt="Ảnh minh họa" />
                      </MapInteractionCSS>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div
              style={{
                width: "60%",
                display: "flex",
                margin: "auto",
                marginTop: "40px",
                justifyContent: "space-between",
              }}
            >
              {verifyStatus === 0 && (
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                  }}
                  color="success"
                  onClick={() => setVerifyStatus(1)}
                >
                  Chấp nhận
                </Button>
              )}
              {verifyStatus === 0 && (
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                  }}
                  onClick={() => setVerifyStatus(2)}
                  color="error"
                >
                  Từ chối
                </Button>
              )}
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                }}
              >
                Lưu
              </Button>
            </div>
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{ textAlign: "center" }}
                >
                  Bạn có chắc muốn chặn tài khoản này không?
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "20px",
                  }}
                >
                  <TextField
                    id="title"
                    label="Số điện thoại"
                    margin="normal"
                    error={false}
                    defaultValue="45985858"
                    variant="outlined"
                    sx={{
                      width: "40%",
                    }}
                    inputProps={{ readOnly: true }}
                  />
                  <TextField
                    id="title"
                    label="Loại khách hàng"
                    margin="normal"
                    error={false}
                    defaultValue="Thợ sửa chữa"
                    variant="outlined"
                    sx={{
                      width: "40%",
                    }}
                    inputProps={{ readOnly: true }}
                  />
                </div>
                <div style={{ width: "100%", marginTop: "10px" }}>
                  <Typography sx={{ fontSize: "14px" }}>Lí do</Typography>
                  <TextareaAutosize
                    minRows={5}
                    maxRows={7}
                    aria-label="maximum height"
                    placeholder="Nội dung"
                    onChange={(e)=>{setBanReson(e.target.value.trim())}}
                    style={{
                      width: "97%",
                      marginTop: "10px",
                      padding: "10px",
                      resize: "none",
                    }}
                  />
                </div>
                <div style={{width: "40%", display: 'flex', justifyContent:"space-around", marginLeft:'auto', marginTop:"40px"}}>
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                  }}
                  onClick={() => setOpen(false)}
                  color="error"
                >
                  Thoát
                </Button>
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "none",
                    }}
                    disabled={!banReason}
                  >
                    Lưu
                  </Button>
                </div>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepairerProfile;
