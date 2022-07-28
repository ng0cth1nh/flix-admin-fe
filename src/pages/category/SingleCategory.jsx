import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import {
  TextField,
  Button,
  Switch,
  Typography,
  FormControlLabel,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import "./SingleCategory.scss";

const SingleCategory = () => {
  const [avatar, setAvatar] = useState(null);
  const [status, setStatus] = useState(false);
  const { search } = useLocation();
  const id = new URLSearchParams(search).get("id");
  return (
    <div className="single-category">
      <Sidebar />
      <div className="single-category-container">
        <Navbar />
        <div className="body">
          <h1>Danh mục</h1>
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
          <div className="category-information">
            <TextField
              id="name"
              label="Tên danh mục"
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

export default SingleCategory;
