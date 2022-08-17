import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import {
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import "./UpdateFeedback.scss";
import MuiTextAreaInput from "../../components/formInput/MuiTextAreaInput";
import useAxios from "../../hooks/useAxios";
import ApiContants from "../../constants/Api";
import getErrorMessage from "../../utils/getErrorMessage";

const UpdateFeedback = () => {
  const { search } = useLocation();
  const feedbackId = new URLSearchParams(search).get("feedbackId");
  const statusId = new URLSearchParams(search).get("statusId");
  console.log("feedbackId", feedbackId, 'fjdjf',statusId);
  const navigate = useNavigate();
  const userAPI = useAxios();
  const [values, setValues] = useState({
    response: {
      value: "",
      error: "",
    },
    status: statusId,
  });
  const onChange = (id, text, error) => {
    setValues({ ...values, [id]: { value: text, error } });
  };
  const handleChange = (event) => {
    setValues({ ...values, status: event.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (values.response.error !== "") return;
    try {
      await userAPI.put(ApiContants.FEEDBACK_SINGLE, {
        id: feedbackId,
        status: values.status,
        response: values.response.value,
      });
      alert("Cập nhật phản hồi thành công!");
      navigate(`/feedbacks/feedback/view/${feedbackId}`);
    } catch (error) {
      alert("Cập nhật phản hồi thất bại do: " + getErrorMessage(error));
    }
  };

  return (
    <div className="update-feedback">
      <Sidebar />
      <div className="update-feedback-container">
        <Navbar />
        <div className="body">
          <h1>Phản hồi</h1>
          <form onSubmit={onSubmit}>
            <div className="feedback-information">
              <FormControl
                sx={{
                  width: "40%",
                }}
                margin="normal"
              >
                <InputLabel id="demo-simple-select-label">
                  Trạng thái
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="status-select"
                  value={values.status}
                  label="Trạng thái"
                  onChange={handleChange}
                >
                  <MenuItem value={"PENDING"}>Đang đợi</MenuItem>
                  <MenuItem value={"PROCESSING"}>Đang xử lí</MenuItem>
                  <MenuItem value={"DONE"}>Đã hoàn thành</MenuItem>
                  <MenuItem value={"REJECTED"}>Đã hủy</MenuItem>
                </Select>
              </FormControl>
              <MuiTextAreaInput
                label="Nội dung*"
                item={values.response}
                id="response"
                onChange={onChange}
                isRequired={true}
              />
              <div style={{ width: "100%", display: "flex" }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    marginLeft: "auto",
                    marginRight: "20px",
                    marginTop: "30px",
                  }}
                >
                  Cập nhật
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateFeedback;
