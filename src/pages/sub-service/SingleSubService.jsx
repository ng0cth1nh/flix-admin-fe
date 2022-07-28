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
import "./SingleSubService.scss";

const SingleSubService = () => {
  const [status, setStatus] = useState(false);
  const { search } = useLocation();
  const [cateId, setCateId] = useState("");
  const id = new URLSearchParams(search).get("id");
  const handleChange = (event) => {
    setCateId(event.target.value);
  };

  return (
    <div className="single-subservice">
      <Sidebar />
      <div className="single-subservice-container">
        <Navbar />
        <div className="body">
          <h1>Dịch vụ con</h1>
          <div className="subservice-information">
            <TextField
              id="name"
              label="Tên dịch vụ con"
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
              <InputLabel id="demo-simple-select-label">Dịch vụ</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={cateId}
                label="Dịch vụ"
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

export default SingleSubService;
