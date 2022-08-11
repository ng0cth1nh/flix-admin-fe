import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Button, Switch, Typography, FormControlLabel } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import MuiTextAreaInput from "../../components/formInput/MuiTextAreaInput";
import MuiFormInput from "../../components/formInput/MuiFormInput";
import ApiContants from "../../constants/Api";
import useAxios from "../../hooks/useAxios";
import { getErrorImageSelect } from "../../utils/util";
import getErrorMessage from "../../utils/getErrorMessage";
import "./SingleCategory.scss";
const input = {
  id: "categoryName",
  label: "Tên danh mục",
  pattern: "^.{1,150}$",
  errorMessage: "Tên danh mục có độ dài không quá 150 kí tự!",
  isRequired: true,
};
const SingleCategory = () => {
  const userAPI = useAxios();
  const navigate = useNavigate();
  const [isEdited, setIsEdited] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [status, setStatus] = useState(false);
  const [values, setValues] = useState({
    description: {
      value: "",
      error: "",
    },
    categoryName: {
      value: "",
      error: "",
    },
  });
  const { search } = useLocation();
  const id = new URLSearchParams(search).get("id");
  const onChange = (id, text, error) => {
    setValues({ ...values, [id]: { value: text, error } });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    for (const key in values) {
      if (values[key].error !== "") return;
    }
    const formData = new FormData();
    formData.append("categoryName", values.categoryName.value);
    formData.append("description", values.description.value);
    formData.append("isActive", status);
    if(isEdited){
      formData.append("image", avatar);
    }
    if (!id) {
      if(!avatar){
        alert("Vui lòng chọn ảnh trước khi tạo!");
        return;
      }
      try {
        await userAPI.post(ApiContants.CATEGORY_SINGLE, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Tạo danh mục thành công!");
      } catch (error) {
        alert("Tạo danh mục thất bại do: " + getErrorMessage(error));
      }
    } else {
      try {
        formData.append("id", id);
        await userAPI.put(ApiContants.CATEGORY_SINGLE, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Cập nhật danh mục thành công!");
        navigate("/categories");
      } catch (error) {
        console.log(error);
        alert("Cập nhật danh mục thất bại do: " + getErrorMessage(error));
      }
    }
  };

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const res = await userAPI.get(
            ApiContants.CATEGORY_SINGLE + `?categoryId=${id}`
          );
          const data = res.data;
          for (const key in values) {
            values[key].value = data[key];
          }
          setAvatar(data.image);
          setStatus(data.active);
          console.log(data);
        } catch (error) {
          navigate("/error");
        }
      };
      fetchData();
    }
  }, []);
  return (
    <div className="single-category">
      <Sidebar />
      <div className="single-category-container">
        <Navbar />
        <div className="body">
          <form onSubmit={onSubmit}>
            <h1>Danh mục</h1>
            <div className="avatar-container">
              <img
                src={!isEdited ? avatar : URL.createObjectURL(avatar)}
                alt="Ảnh danh mục"
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
            <div className="category-information">
              <MuiFormInput
                key={input.id}
                {...input}
                onChange={onChange}
                item={values[input.id]}
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
      </div>
    </div>
  );
};

export default SingleCategory;
