import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import {
  TextField,
  Button,
  Typography,
  TextareaAutosize,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import "./SingleAccessories.scss";

const SingleAccessories = () => {
  const { search } = useLocation();
  const id = new URLSearchParams(search).get("id");
  return (
    <div className="single-accessories">
      <Sidebar />
      <div className="single-accessories-container">
        <Navbar />
        <div className="body">
          <h1>Linh kiện</h1>
          <div className="accessories-information">
            <TextField
              id="name"
              label="Tên linh kiện"
              margin="normal"
              error={false}
              defaultValue="link kiện"
              variant="outlined"
              sx={{
                width: "40%",
              }}
              required
            />
            <TextField
              id="price"
              label="Giá linh kiện"
              margin="normal"
              error={false}
              defaultValue="5 củ"
              variant="outlined"
              sx={{
                width: "40%",
              }}
              required
            />
            <TextField
              id="company"
              label="Nhà sản xuất"
              margin="normal"
              error={false}
              defaultValue="Fsoft"
              variant="outlined"
              sx={{
                width: "40%",
              }}
              required
            />
             <TextField
              id="address"
              label="Nơi sản xuất"
              margin="normal"
              error={false}
              defaultValue="Fsoft"
              variant="outlined"
              sx={{
                width: "40%",
              }}
              required
            />
             <TextField
              id="warranty"
              label="Thời gian bảo hành(tháng)"
              margin="normal"
              error={false}
              defaultValue="Fsoft"
              variant="outlined"
              sx={{
                width: "40%",
              }}
              required
            />
            <div style={{ width: "100%", marginTop: "10px" }}>
                <Typography sx={{ fontSize: "14px" }}>Mô tả</Typography>
                <TextareaAutosize
                  minRows={5}
                  maxRows={7}
                  aria-label="maximum height"
                  placeholder="..."
                  style={{
                    width: "97%",
                    marginTop: "10px",
                    padding: "10px",
                    resize: "none",
                  }}
                />
              </div>
            <div style={{ width: "100%", display: "flex" }}>
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  marginLeft: "auto",
                  marginRight: "20px",
                  marginTop: "40px"
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

export default SingleAccessories;
