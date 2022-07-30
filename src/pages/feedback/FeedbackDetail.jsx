import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { TextField, Button, Typography, TextareaAutosize } from "@mui/material";
import { MapInteractionCSS } from "react-map-interaction";
import { useParams, Link } from "react-router-dom";
import "./FeedbackDetail.scss";
const listImage = [
  "https://media.conglyxahoi.net/news/2022/07/01/H%E1%BB%93%20Ho%C3%A0i%20Anh%20-%20g%C6%B0%C6%A1ng%20m%E1%BA%B7t%20quen%20thu%E1%BB%99c%20v%E1%BB%9Bi%20kh%C3%A1n%20gi%E1%BA%A3%20Vi%E1%BB%87t.jpg",
  "https://image-us.24h.com.vn/upload/1-2022/images/2022-03-22/1647915882-6fc57fcee4a29bee3a77cc289c352bb5-width660height824.jpg",
  "https://www.invert.vn/media/ar/anh-ong-nano.jpeg",
  "https://www.invert.vn/media/ar/anh-ong-nano.jpeg",
  "https://www.invert.vn/media/ar/anh-ong-nano.jpeg",
  "https://www.invert.vn/media/ar/anh-ong-nano.jpeg",
];

const FeedbackDetail = () => {
  const { feedbackId } = useParams();
  return (
    <div className="single-feedback">
      <Sidebar />
      <div className="single-feedback-container">
        <Navbar />
        <div className="body">
          <h1>Phản hồi</h1>
          <div className="feedback-information">
            <TextField
              id="phone"
              label="Số điện thoại"
              margin="normal"
              error={false}
              defaultValue="50045898"
              variant="outlined"
              sx={{
                width: "40%",
              }}
              inputProps={{ readOnly: true }}
            />
            <TextField
              id="type"
              label="Loại yêu cầu"
              margin="normal"
              error={false}
              defaultValue="yêu cầu sửa chữa"
              variant="outlined"
              sx={{
                width: "40%",
              }}
              inputProps={{ readOnly: true }}
            />
            <TextField
              id="requestId"
              label="Mã đặt lịch"
              margin="normal"
              error={false}
              defaultValue="dfsdkfhjsd37"
              variant="outlined"
              sx={{
                width: "40%",
              }}
              inputProps={{ readOnly: true }}
            />
            <TextField
              id="title"
              label="Tiêu đề"
              margin="normal"
              error={false}
              defaultValue="sửa chữa bị hỏng"
              variant="outlined"
              sx={{
                width: "40%",
              }}
              inputProps={{ readOnly: true }}
            />
            <div style={{ width: "100%", marginTop: "10px" }}>
              <Typography sx={{ fontSize: "14px" }}>Nội dung</Typography>
              <TextareaAutosize
                minRows={5}
                maxRows={7}
                aria-label="maximum height"
                placeholder="Nội dung"
                defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
      ut labore et dolore magna aliqua."
                style={{
                  width: "97%",
                  marginTop: "10px",
                  padding: "10px",
                  resize: "none",
                }}
                disabled
              />
            </div>
            <div
              style={{
                width: "100%",
                marginTop: "20px",
              }}
            >
              <Typography sx={{ fontSize: "14px" }}>Tệp đính kèm</Typography>
              <div className="file">
                {listImage.map((image) => (
                  <div className="image-container">
                    <MapInteractionCSS>
                      <img src={image} alt="Ảnh minh họa" />
                    </MapInteractionCSS>
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                width: "40%",
                display: "flex",
                marginTop: "40px",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: "14px" }}>Trạng thái</Typography>
              <Typography style={{ color: "red", fontWeight: "bold" }}>
                Đang xử lí
              </Typography>
            </div>
            <div style={{ width: "100%", marginTop: "10px" }}>
              <Typography sx={{ fontSize: "14px" }}>Phản hồi</Typography>
              <TextareaAutosize
                minRows={5}
                maxRows={7}
                aria-label="maximum height"
                placeholder="Phản hồi"
                defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
      ut labore et dolore magna aliqua."
                style={{ width: "97%", marginTop: "10px", padding: "10px" }}
                disabled
              />
            </div>
            <div
              style={{
                width: "55%",
                marginTop: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: "14px" }}>
                Ngày tạo phản hồi
              </Typography>
              <Typography style={{ fontWeight: "bold" }}>20/10/2020</Typography>
            </div>
            <div
              style={{
                width: "55%",
                marginTop: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: "14px" }}>
                Ngày cập nhật gần nhất
              </Typography>
              <Typography style={{ fontWeight: "bold" }}>20/10/2020</Typography>
            </div>
            <div style={{ width: "100%", display: "flex", marginTop: "20px" }}>
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  marginLeft: "auto",
                  marginRight: "20px",
                }}
              >
                <Link
                  to={`/feedbacks/feedback/update/${feedbackId}`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Cập nhật
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackDetail;
