import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import ApiContants from "../../constants/Api";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import "./NewFeedback.scss";
import Pattern from "../../constants/Pattern";
import MuiFormInput from "../../components/formInput/MuiFormInput";
import MuiTextAreaInput from "../../components/formInput/MuiTextAreaInput";
import Config from "../../constants/Config";
import { getErrorImageSelect } from "../../utils/util";
import getErrorMessage from "../../utils/getErrorMessage";
const listField = [
  {
    id: "requestCode",
    label: "Mã đặt lịch",
    pattern: "^.{1,12}$",
    errorMessage: "Mã đặt lịch có độ dài không quá 12 kí tự!",
    isRequired: true,
  },
  {
    id: "phone",
    label: "Số điện thoại",
    pattern: Pattern.PHONE_NUMBER,
    errorMessage: "Số điện thoại không hợp lệ!",
    isRequired: true,
  },
  {
    id: "title",
    label: "Tiêu đề",
    pattern: ".{1,150}$",
    errorMessage: "Tiêu đề có độ dài không quá 150 kí tự!",
    isRequired: true,
  },
];
const NewFeedback = () => {
  const userAPI = useAxios();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    requestCode: {
      value: "",
      error: "",
    },
    phone: {
      value: "",
      error: "",
    },
    title: {
      value: "",
      error: "",
    },
    description: {
      value: "",
      error: "",
    },
  });
  const [listImage, setListImage] = useState([]);
  const [requestTypeId, setRequestTypeId] = useState("REQUEST");
  const handleChange = (event) => {
    setRequestTypeId(event.target.value);
  };
  const onChange = (id, text, error) => {
    setValues({ ...values, [id]: { value: text, error } });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    for (const key in values) {
      if (values[key].error !== "") return;
    }
    const formData = new FormData();
    formData.append("phone", values.phone.value);
    formData.append("requestCode", values.requestCode.value);
    formData.append("title", values.title.value);
    formData.append("description", values.description.value);
    formData.append("feedbackType", requestTypeId);
    listImage.forEach((image) => {
      formData.append("images[]", image);
    });
    try {
      await userAPI.post(ApiContants.FEEDBACK_SINGLE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Tạo phản hồi thành công!");
      navigate("/feedbacks");
    } catch (error) {
      alert("Tạo phản hồi thất bại do:" + getErrorMessage(error));
    }
  };
  return (
    <div className="new-feedback">
      <Sidebar />
      <div className="new-feedback-container">
        <Navbar />
        <div className="body">
          <h1>Phản hồi</h1>
          <form className="feedback-information" onSubmit={onSubmit}>
            {listField.map((input) => (
              <MuiFormInput
                key={input.id}
                {...input}
                onChange={onChange}
                item={values[input.id]}
              />
            ))}
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
                {Object.entries(Config.FEEDBACK_TYPE).map((item) => (
                  <MenuItem value={item[0]}>{item[1]}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <MuiTextAreaInput
              label="Nội dung*"
              item={values.description}
              id="description"
              onChange={onChange}
              isRequired={true}
            />
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
                      if (e.target.files[0]) {
                        const err = getErrorImageSelect(e.target.files[0]);
                        if (err !== "") {
                          alert(err);
                          return;
                        }
                        setListImage(listImage.concat([e.target.files[0]]));
                      }
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
                type="submit"
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewFeedback;
