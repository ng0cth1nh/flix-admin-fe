import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import ClearIcon from "@mui/icons-material/Clear";
import {
  TextField,
  Button,
  Typography,
  TextareaAutosize,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import "./NewFeedback.scss";

const NewFeedback = () => {
  const [listImage, setListImage] = useState([]);
  const [requestTypeId, setRequestTypeId] = useState("");
  const handleChange = (event) => {
    setRequestTypeId(event.target.value);
  };

  return (
    <div className="new-feedback">
      <Sidebar />
      <div className="new-feedback-container">
        <Navbar />
        <div className="body">
          <h1>Phản hồi</h1>
          <div className="feedback-information">
            <TextField
              id="phone"
              label="Số điện thoại"
              margin="normal"
              error={false}
              variant="outlined"
              sx={{
                width: "40%",
              }}
            />
            <FormControl
              sx={{
                width: "40%",
              }}
              margin="normal"
            >
              <InputLabel id="request-type">Loại yêu cầu</InputLabel>
              <Select
                labelId="request-type"
                id="request-type-select"
                value={requestTypeId}
                label="Loại yêu cầu"
                onChange={handleChange}
              >
                <MenuItem value={10}>Dụng cụ gia dụng</MenuItem>
                <MenuItem value={20}>Điện lạnh</MenuItem>
                <MenuItem value={30}>Điện tử</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="requestId"
              label="Mã đặt lịch"
              margin="normal"
              error={false}
              variant="outlined"
              sx={{
                width: "40%",
              }}
            />
            <TextField
              id="title"
              label="Tiêu đề"
              margin="normal"
              error={false}
              variant="outlined"
              sx={{
                width: "40%",
              }}
            />
            <div style={{ width: "100%", marginTop: "10px" }}>
              <Typography sx={{ fontSize: "14px" }}>Nội dung</Typography>
              <TextareaAutosize
                minRows={5}
                maxRows={7}
                aria-label="maximum height"
                placeholder="Nội dung"
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
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ fontSize: "14px", marginRight: "30px" }}>
                  Tệp đính kèm
                </Typography>
                <div>
                  <Button variant="outlined" sx={{ textTransform: "none" }}>
                    <label htmlFor="file">Chọn tệp</label>
                  </Button>
                  <input
                    type="file"
                    id="file"
                    onChange={(e) => {
                      if (e.target.files[0])
                        setListImage(listImage.concat([e.target.files[0]]));
                    }}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
              <div className="file">
                {listImage.map((image, index) => (
                  <div className="image-container" key={index}>
                    <div
                      style={{
                        position: "absolute",
                        top: "-20px",
                        right: "12%",
                        width: "40px",
                        height: "40px",
                        borderRadius: "20px",
                        backgroundColor: "#2596be",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <ClearIcon
                        sx={{
                          fontSize: "30px",
                          color: "white",
                        }}
                        onClick={() =>
                          setListImage(listImage.filter((img) => img !== image))
                        }
                      />
                    </div>

                    <img src={URL.createObjectURL(image)} alt="Ảnh minh họa" />
                  </div>
                ))}
              </div>
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
                Thêm mới
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewFeedback;
