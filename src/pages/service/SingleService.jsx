import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import {
  TextField,
  Button,
  Switch,
  Typography,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import "./SingleService.scss";

const SingleService = () => {
  const [avatar, setAvatar] = useState(null);
  const [status, setStatus] = useState(false);
  const { search } = useLocation();
  const [cateId, setCateId] = useState("");
  const id = new URLSearchParams(search).get("id");
  const handleChange = (event) => {
    setCateId(event.target.value);
  };

  return (
    <div className="single-service">
      <Sidebar />
      <div className="single-service-container">
        <Navbar />
        <div className="body">
          <h1>Dịch vụ</h1>
          <div className="avatar-container">
            <img
              src={
                avatar
                  ? URL.createObjectURL(avatar)
                  : "https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              }
              alt=""
              className="avatar"
            />
            <div>
              <Button variant="outlined" sx={{ textTransform: "none" }}>
                <label htmlFor="file">Chọn ảnh</label>
              </Button>
              <input
                type="file"
                id="file"
                onChange={(e) => setAvatar(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div className="service-information">
            <TextField
              id="name"
              label="Tên dịch vụ"
              margin="normal"
              error={false}
              defaultValue="thang"
              variant="outlined"
              sx={{
                width: "40%",
              }}
              required
            />
            <TextField
              id="description"
              label="Mô tả"
              margin="normal"
              error={false}
              defaultValue="thang"
              variant="outlined"
              sx={{
                width: "40%",
              }}
              required
            />
            <FormControl  sx={{
                width: "40%",
              }}
              margin="normal"
              >
              <InputLabel id="demo-simple-select-label">Danh mục</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={cateId}
                label="Danh mục"
                onChange={handleChange}
              >
                <MenuItem value={10}>Dụng cụ gia dụng</MenuItem>
                <MenuItem value={20}>Điện lạnh</MenuItem>
                <MenuItem value={30}>Điện tử</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="price"
              label="Phí kiểm tra"
              margin="normal"
              error={false}
              defaultValue="20000"
              variant="outlined"
              sx={{
                width: "40%",
              }}
              required
            />
            <div
              style={{
                width: "40%",
                display: "flex",
                marginTop: "20px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography>Trạng thái: </Typography>
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
                  marginLeft: "auto",
                  marginRight: "20px",
                }}
              >
                {id ? "Cập nhật" : "Thêm mới"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleService;
