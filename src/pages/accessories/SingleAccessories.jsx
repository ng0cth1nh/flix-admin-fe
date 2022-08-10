import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import {
  Button,
  Typography,
  TextareaAutosize,
  Autocomplete,
  TextField,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import "./SingleAccessories.scss";
import MuiFormInput from "../../components/formInput/MuiFormInput";

const listField = [
  {
    id: "accessoryName",
    label: "Tên linh kiện",
    pattern: "^.{1,150}$",
    errorMessage: "Tên linh kiện có độ dài không quá 150 kí tự!",
    isRequired: true,
  },
  {
    id: "price",
    label: "Giá linh kiện(vnđ)",
    pattern: "^[1-9][0-9]{3,}$",
    errorMessage: "Giá linh kiện bao gồm số và phải lớn hơn 1,000 vnđ!",
    isRequired: true,
  },
  {
    id: "insurance",
    label: "Thời gian bảo hành(tháng)",
    pattern: "^[0-9]{0,}$",
    errorMessage: "Thời gian bảo hành chỉ bao gồm số!",
    isRequired: false,
  },
  {
    id: "manufacturer",
    label: "Nhà sản xuất",
    pattern: "^.{1,150}$",
    errorMessage: "Nhà sản xuất có độ dài không quas 150 kí tự!",
    isRequired: true,
  },
  {
    id: "country",
    label: "Nơi sản xuất",
    pattern: "^.{1,150}$",
    errorMessage: "Nơi sản xuất có độ dài không quá 150 kí tự!",
    isRequired: true,
  },
];

const options = [
  { label: "Option 1", value: "thang1" },
  { label: "Option 2", value: "thang2" },
];
const SingleAccessories = () => {
  const [isChanged, setIsChanged] = useState(false);
  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState("");
  const [values, setValues] = useState({
    accessoryName: {
      value: "",
      error: "",
    },
    price: {
      value: "",
      error: "",
    },
    insurance: {
      value: "",
      error: "",
    },
    manufacturer: {
      value: "",
      error: "",
    },
    country: {
      value: "",
      error: "",
    },
    description: {
      value: "",
      error: "",
    },
  });
  const { search } = useLocation();
  const id = new URLSearchParams(search).get("id");
  const onChange = (id, text, error) => {
    setValues({ ...values, [id]: { value: text, error } });
    if (!isChanged) setIsChanged(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) {
    } else {
      try {
        
      } catch (error) {

      }
    }
  };
  return (
    <div className="single-accessories">
      <Sidebar />
      <div className="single-accessories-container">
        <Navbar />
        <div className="body">
          <h1>Linh kiện</h1>
          <form className="accessories-information" onSubmit={handleSubmit}>
            {listField.map((input) => (
              <MuiFormInput
                key={input.id}
                {...input}
                onChange={onChange}
                item={values[input.id]}
              />
            ))}
            <Autocomplete
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue.label);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id="controllable-states-demo"
              options={options}
              sx={{ width: "40%" }}
              renderInput={(params) => (
                <TextField {...params} label="Dịch vụ" margin="normal" />
              )}
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
                type="submit"
                variant="contained"
                sx={{
                  textTransform: "none",
                  marginLeft: "auto",
                  marginRight: "20px",
                  marginTop: "40px",
                }}
                disabled={!isChanged}
              >
                {id ? "Cập nhật" : "Thêm mới"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingleAccessories;
