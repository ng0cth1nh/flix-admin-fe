import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import {
  Button,
  TextField,
  Typography,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import ApiContants from "../../constants/Api";
import Loading from "../../components/loading/Loading";
import getErrorMessage from "../../utils/getErrorMessage";
import MuiFormInput from "../../components/formInput/MuiFormInput";
import MuiTextAreaInput from "../../components/formInput/MuiTextAreaInput";
import "./singleSubService.scss";
const listField = [
  {
    id: "subServiceName",
    label: "Tên dịch vụ con",
    pattern: "^.{1,150}$",
    errorMessage: "Tên dịch vụ con có độ dài không quá 150 kí tự!",
    isRequired: true,
  },
  {
    id: "price",
    label: "Giá dịch sửa chữa(vnđ)",
    pattern: "^[1-9][0-9]{3,}$",
    errorMessage: "Giá dịch sửa chữa bao gồm số và phải lớn hơn 1,000 vnđ!",
    isRequired: true,
  },
];

const SingleSubServicePage = () => {
  const { search, state } = useLocation();
  const id = new URLSearchParams(search).get("id");
  const { categoryId, serviceId } = useParams();
  const userAPI = useAxios();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [values, setValues] = useState({
    subServiceName: {
      value: "",
      error: "",
    },
    price: {
      value: "",
      error: "",
    },
    description: {
      value: "",
      error: "",
    },
  });
  const onChange = (id, text, error) => {
    setValues({ ...values, [id]: { value: text, error } });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const key in values) {
      if (values[key].error !== "") return;
    }
    if (!id) {
      try {
        await userAPI.post(ApiContants.SUBSERVICE_SINGLE, {
          subServiceName: values.subServiceName.value,
          price: values.price.value,
          serviceId,
          description: values.description.value,
          isActive: status,
        });
        alert("Tạo dịch vụ con thành công!");
        navigate(
          `/categories/${categoryId}/services/${serviceId}/subservices`,
          { state }
        );
      } catch (error) {
        alert("Tạo dịch vụ con thất bại do: " + getErrorMessage(error));
      }
    } else {
      try {
        await userAPI.put(ApiContants.SUBSERVICE_SINGLE, {
          subServiceId: id,
          subServiceName: values.subServiceName.value,
          price: values.price.value,
          serviceId,
          description: values.description.value,
          isActive: status,
        });
        alert("Cập nhật dịch vụ con thành công!");
        navigate(
          `/categories/${categoryId}/services/${serviceId}/subservices`,
          { state }
        );
      } catch (error) {
        alert("Cập nhật dịch vụ con thất bại do: " + getErrorMessage(error));
      }
    }
  };
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const res = await userAPI.get(
            ApiContants.SUBSERVICE_SINGLE + `?subServiceId=${id}`
          );
          const data = res.data;
          console.log("data", data);
          for (const key in values) {
            values[key].value = data[key];
          }
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
    <div className="single-subservice">
      <Sidebar />
      <div className="single-subservice-container">
        <Navbar />
        {loading ? (
          <Loading />
        ) : (
          <div className="body">
            <h1>Dịch vụ con</h1>
            <form className="subservice-information" onSubmit={handleSubmit}>
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
                }}
              >
                <TextField
                  label="Dịch vụ"
                  margin="normal"
                  value={state.serviceName}
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
                label="Nội dung*"
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
                  }}
                >
                  {id ? "Cập nhật" : "Thêm mới"}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleSubServicePage;
