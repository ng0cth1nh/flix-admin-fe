import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Button, Autocomplete, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import "./singleAccessories.scss";
import MuiFormInput from "../../components/formInput/MuiFormInput";
import useAxios from "../../hooks/useAxios";
import ApiContants from "../../constants/Api";
import Loading from "../../components/loading/Loading";
import getErrorMessage from "../../utils/getErrorMessage";
import MuiTextAreaInput from "../../components/formInput/MuiTextAreaInput";

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

const SingleAccessoriesPage = () => {
  const userAPI = useAxios();
  const navigate = useNavigate();
  const { search } = useLocation();
  const id = new URLSearchParams(search).get("id");
  const [serviceLabel, setServiceLabel] = useState("");
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
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
    serviceId: {
      value: null,
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
    if (!values.serviceId.value) return;
    if (!id) {
      try {
        await userAPI.post(ApiContants.ACCESSORY_SINGLE, {
          accessoryName: values.accessoryName.value,
          price: values.price.value,
          insurance: values.insurance.value,
          manufacturer: values.manufacturer.value,
          country: values.country.value,
          description: values.description.value,
          serviceId: values.serviceId.value,
        });
        alert("Tạo linh kiện thành công!");
        navigate("/accessories");
      } catch (error) {
        alert("Tạo linh kiện thất bại do: " + getErrorMessage(error));
      }
    } else {
      try {
        await userAPI.put(ApiContants.ACCESSORY_SINGLE, {
          id,
          accessoryName: values.accessoryName.value,
          price: values.price.value,
          insurance: values.insurance.value,
          manufacturer: values.manufacturer.value,
          country: values.country.value,
          description: values.description.value,
          serviceId: values.serviceId.value,
        });
        alert("Cập nhật linh kiện thành công!");
        navigate("/accessories");
      } catch (error) {
        alert("Cập nhật linh kiện thất bại do: " + getErrorMessage(error));
      }
    }
  };
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const res = await userAPI.get(ApiContants.SERVICE_SELECT_ALL);
        setServices(res.data.services);
        console.log("service", res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchServices();
    if (id) {
      const fetchData = async () => {
        try {
          const res = await userAPI.get(
            ApiContants.ACCESSORY_SINGLE + `?accessoryId=${id}`
          );
          const data = res.data;
          console.log("data", data);
          for (const key in values) {
            values[key].value = data[key];
          }
        } catch (error) {
          navigate("/error");
        }
      };
      fetchData();
    }
  }, []);
  return (
    <div className="single-accessories">
      <Sidebar />
      <div className="single-accessories-container">
        <Navbar />
        {loading ? (
          <Loading />
        ) : (
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
                value={
                  serviceLabel !== ""
                    ? serviceLabel
                    : id
                    ? services.filter(
                        (item) => item.id === values.serviceId.value
                      )[0].serviceName
                    : services[0].serviceName
                }
                onChange={(event, newValue) => {
                  setValues({
                    ...values,
                    serviceId: { value: newValue.id, error: "" },
                  });
                  setServiceLabel(newValue.serviceName);
                }}
                id="controllable-states-demo"
                options={services.map((item) => ({
                  ...item,
                  label: item.serviceName,
                }))}
                sx={{ width: "40%" }}
                renderInput={(params) => {
                  console.log("param", params);
                  return (
                    <TextField {...params} label="Dịch vụ" margin="normal" />
                  );
                }}
              />
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
                    marginTop: "40px",
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

export default SingleAccessoriesPage;
