import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import {
  Button,
  Typography,
  TextareaAutosize,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useParams } from "react-router-dom";
import "./UpdateFeedback.scss";

const UpdateFeedback = () => {
  const [status, setStatus] = useState("");
  const { feedbackId } = useParams();

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <div className="update-feedback">
      <Sidebar />
      <div className="update-feedback-container">
        <Navbar />
        <div className="body">
          <h1>Phản hồi</h1>
          <div className="feedback-information">
            <FormControl
              sx={{
                width: "40%",
              }}
              margin="normal"
            >
              <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="status-select"
                value={status}
                label="Trạng thái"
                onChange={handleChange}
              >
                <MenuItem value={10}>Dụng cụ gia dụng</MenuItem>
                <MenuItem value={20}>Điện lạnh</MenuItem>
                <MenuItem value={30}>Điện tử</MenuItem>
              </Select>
            </FormControl>
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
              />
            </div>

            <div style={{ width: "100%", display: "flex" }}>
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  marginLeft: "auto",
                  marginRight: "20px",
                  marginTop: '30px'
                }}
              >
                Cập nhật
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateFeedback;
