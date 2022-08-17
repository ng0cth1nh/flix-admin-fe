import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import {
  TextField,
  Button,
  Switch,
  Typography,
  FormControlLabel,
} from "@mui/material";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import MuiTextAreaInput from "../../components/formInput/MuiTextAreaInput";
import MuiFormInput from "../../components/formInput/MuiFormInput";
import ApiContants from "../../constants/Api";
import useAxios from "../../hooks/useAxios";
import { getErrorImageSelect } from "../../utils/util";
import getErrorMessage from "../../utils/getErrorMessage";
import "./SingleService.scss";
import Loading from "../../components/loading/Loading";

const listField = [
  {
    id: "serviceName",
    label: "Tên dịch vụ",
    pattern: "^.{1,150}$",
    errorMessage: "Tên dịch vụ có độ dài không quá 150 kí tự!",
    isRequired: true,
  },
  {
    id: "inspectionPrice",
    label: "Phí kiểm tra(vnđ)",
    pattern: "^[1-9][0-9]{3,}$",
    errorMessage: "Phí kiểm tra bao gồm số và phải lớn hơn 1,000 vnđ!",
    isRequired: true,
  },
];
const SingleService = () => {
  const { search, state } = useLocation();
  const id = new URLSearchParams(search).get("id");
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const userAPI = useAxios();
  const [isEdited, setIsEdited] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    description: {
      value: "",
      error: "",
    },
    serviceName: {
      value: "",
      error: "",
    },
    inspectionPrice: {
      value: "",
      error: "",
    },
  });
  const onChange = (id, text, error) => {
    setValues({ ...values, [id]: { value: text, error } });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    for (const key in values) {
      if (values[key].error !== "") return;
    }
    const formData = new FormData();
    formData.append("serviceName", values.serviceName.value);
    formData.append("description", values.description.value);
    formData.append("inspectionPrice", values.inspectionPrice.value);
    formData.append("categoryId", categoryId);
    formData.append("isActive", status);
    if (isEdited) {
      formData.append("image", avatar);
    }
    if (!id) {
      if (!avatar) {
        alert("Vui lòng chọn ảnh trước khi tạo!");
        return;
      }
      try {
        await userAPI.post(ApiContants.SERVICE_SINGLE, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Tạo dịch vụ thành công!");
        navigate(`/categories/${categoryId}/services`, { state });
      } catch (error) {
        alert("Tạo dịch vụ thất bại do: " + getErrorMessage(error));
      }
    } else {
      try {
        formData.append("serviceId", id);
        await userAPI.put(ApiContants.SERVICE_SINGLE, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Cập nhật dịch vụ thành công!");
        navigate(`/categories/${categoryId}/services`, { state });
      } catch (error) {
        console.log(error);
        alert("Cập nhật dịch vụ thất bại do: " + getErrorMessage(error));
      }
    }
  };

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const res = await userAPI.get(
            ApiContants.SERVICE_SINGLE + `?serviceId=${id}`
          );
          const data = res.data;
          for (const key in values) {
            values[key].value = data[key];
          }
          setAvatar(data.image);
          setStatus(data.active);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          navigate("/error");
        }
      };
      fetchData();
    }
  }, []);

  return (
    <div className="single-service">
      <Sidebar />
      <div className="single-service-container">
        <Navbar />
        {loading ? (
          <Loading />
        ) : (
          <div className="body">
            <h1>Dịch vụ</h1>
            <form onSubmit={onSubmit}>
              <div className="avatar-container">
                <img
                  src={!isEdited ? avatar : URL.createObjectURL(avatar)}
                  alt="Ảnh dịch vụ"
                  className="avatar"
                />
                <div>
                  <Button variant="outlined" sx={{ textTransform: "none" }}>
                    <label htmlFor="file">Chọn ảnh</label>
                  </Button>
                  <input
                    type="file"
                    id="file"
                    onChange={(e) => {
                      if (e.target.files.length > 0) {
                        const err = getErrorImageSelect(e.target.files[0]);
                        if (err) {
                          alert(err);
                        } else {
                          setAvatar(e.target.files[0]);
                          setIsEdited(true);
                        }
                      }
                    }}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
              <div className="service-information">
                {listField.map((input) => (
                  <MuiFormInput
                    key={input.id}
                    {...input}
                    onChange={onChange}
                    item={values[input.id]}
                  />
                ))}
                <div
                  style={{
                    width: "40%",
                  }}
                >
                  <TextField
                    label="Danh mục"
                    margin="normal"
                    value={state.categoryName}
                    sx={{ width: "100%" }}
                    variant="outlined"
                    disabled
                  />
                </div>
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
                        checked={status}
                        onChange={(event) => {
                          setStatus(event.target.checked);
                        }}
                      />
                    }
                    label={status ? "Hoạt động" : "Vô hiệu hóa"}
                  />
                </div>
                <MuiTextAreaInput
                  label="Mô tả"
                  item={values.description}
                  id="description"
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
                    {id ? "Cập nhật" : "Thêm mới"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleService;
