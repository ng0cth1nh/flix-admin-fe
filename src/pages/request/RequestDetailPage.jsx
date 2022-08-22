import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Typography, TextareaAutosize } from "@mui/material";
import useAxios from "../../hooks/useAxios";
import ApiContants from "../../constants/Api";
import Loading from "../../components/loading/Loading";
import { formatFromDateTime } from "../../utils/getFormatDate";

import { useParams, useNavigate } from "react-router-dom";
import "./RequestDetail.scss";
import { getMoneyFormat } from "../../utils/util";
const requestInfoField = [
  { id: "requestCode", label: "Mã yêu cầu", value: "" },
  { id: "customerName", label: "Tên khách hàng", value: "" },
  {
    id: "customerPhone",
    label: "Số điện thoại khách hàng",
    value: "",
  },
  { id: "repairerName", label: "Tên thợ sửa", value: "" },
  { id: "repairerPhone", label: "Số điện thoại thợ sửa", value: "" },
  { id: "customerAddress", label: "Địa chỉ", value: "" },
  {
    id: "status",
    label: "Trạng thái",
    value: "",
    format: (value) =>
      value === "PENDING" ? (
        <Typography variant="p" sx={{ color: "orange" }}>
          Đang đợi
        </Typography>
      ) : value === "APPROVED" ? (
        <Typography variant="p" sx={{ color: "blue" }}>
          Đã chấp nhận
        </Typography>
      ) : value === "FIXING" ? (
        <Typography variant="p" sx={{ color: "purple" }}>
          Đang sửa
        </Typography>
      ) : value === "PAYMENT_WAITING" ? (
        <Typography variant="p" sx={{ color: "teal" }}>
          Chờ thanh toán
        </Typography>
      ) : value === "DONE" ? (
        <Typography variant="p" sx={{ color: "green" }}>
          Hoàn thành
        </Typography>
      ) : (
        <Typography variant="p" sx={{ color: "red" }}>
          Đã hủy
        </Typography>
      ),
  },
  {
    id: "createdAt",
    label: "Ngày tạo yêu cầu",
    value: "",
    format: (value) => formatFromDateTime(value),
  },
  { id: "cancelReason", value: "" },
];
const extraRequestInfoField = [
  { id: "serviceName", label: "Dịch vụ", value: "" },
  { id: "paymentMethod", label: "Phương thức thanh toán", value: "" },

  {
    id: "expectedFixingTime",
    label: "Ngày sửa dự tính",
    value: "",
    format: (value) => formatFromDateTime(value),
  },
  { id: "voucherCode", label: "Phiếu khuyến mãi", value: "" },
  { id: "description", value: "" },
];

const listTotal = [
  { id: "inspectionPrice", label: "Phí kiểm tra", value: "" },
  { id: "totalService", label: "Tổng dịch vụ", value: "" },
  { id: "vatPrice", label: "Thuế VAT(5%)", value: "" },
  { id: "totalDiscount", label: "Phiếu khuyến mãi", value: "" },
  { id: "actualPrice", label: "Tổng thanh toán", value: "" },
];

const RequestDetailPage = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const userAPI = useAxios();
  const [subServices, setSubServices] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [extraServices, setExtraServices] = useState([]);
  const [totalSubServices, setTotalSubServices] = useState(0);
  const [totalAccessories, setTotalAccessories] = useState(0);
  const [totalExtraServices, setTotalExtraServices] = useState(0);
  const [requestInfo, setRequestInfo] = useState(requestInfoField);
  const [extraRequestInfo, setextraRequestInfo] = useState(
    extraRequestInfoField
  );
  const [total, setTotal] = useState(listTotal);
  const [buttonPos, setButtonPos] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userAPI.get(
          ApiContants.REQUEST_DETAIL + `?requestCode=${requestId}`
        );
        const data = response.data;
        console.log(response.data);
        setTotal(
          total.map((item) => ({
            ...item,
            value: item.format ? item.format(data[item.id]) : data[item.id],
          }))
        );
        setRequestInfo(
          requestInfo.map((item) => ({
            ...item,
            value: item.format ? item.format(data[item.id]) : data[item.id],
          }))
        );
        setextraRequestInfo(
          extraRequestInfo.map((item) => ({
            ...item,
            value: item.format ? item.format(data[item.id]) : data[item.id],
          }))
        );
        setSubServices(data.subServices);
        setAccessories(data.accessories);
        setExtraServices(data.extraServices);
        setTotalAccessories(data.totalAccessoryPrice);
        setTotalSubServices(data.totalSubServicePrice);
        setTotalExtraServices(data.totalExtraServicePrice);
      } catch (error) {
        setLoading(false);
        navigate("/error");
      }
    };
    fetchData();
  }, []);
  return (
    <div className="request-detail">
      <Sidebar />
      <div className="request-detail-container">
        <Navbar />
        {loading ? (
          <Loading />
        ) : (
          <div className="body">
            <Typography variant="h4">Yêu cầu</Typography>

            <div style={{ display: "flex", marginBottom: "40px" }}>
              <div
                className="info-button"
                style={{
                  marginRight: "30px",
                  borderBottom: buttonPos === 0 ? "1px solid black" : "none",
                }}
                onClick={() => setButtonPos(0)}
              >
                <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
                  Thông tin yêu cầu
                </Typography>
              </div>
              <div
                className="info-button"
                style={{
                  marginRight: "30px",
                  borderBottom: buttonPos === 1 ? "1px solid black" : "none",
                }}
                onClick={() => setButtonPos(1)}
              >
                <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
                  Thông tin chi tiết yêu cầu
                </Typography>
              </div>
            </div>
            <div style={{ display: buttonPos === 0 ? "block" : "none" }}>
              {requestInfo &&
                requestInfo
                  .filter((field) => field.id !== "cancelReason")
                  .map((field) => (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "15px",
                      }}
                      key={field.id}
                    >
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: "15px",
                          width: "30%",
                        }}
                      >
                        {field.label}
                      </Typography>
                      <Typography sx={{ width: "50%" }}>
                        {field.value ? field.value : "Không có"}
                      </Typography>
                    </div>
                  ))}
              <div style={{ width: "100%", marginTop: "20px" }}>
                <Typography sx={{ fontWeight: "bold", fontSize: "15px" }}>
                  Lý do hủy
                </Typography>
                <TextareaAutosize
                  minRows={5}
                  maxRows={7}
                  aria-label="maximum height"
                  value={
                    requestInfo.cancelReason
                      ? requestInfo.cancelReason
                      : "Không có"
                  }
                  style={{
                    width: "97%",
                    marginTop: "10px",
                    padding: "10px",
                    resize: "none",
                  }}
                  disabled
                />
              </div>
            </div>
            <div style={{ display: buttonPos === 1 ? "inline-block" : "none" }}>
              <div
                style={{
                  borderBottom: "1px solid #c2c0ba",
                  paddingBottom: "20px",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                {extraRequestInfo
                  .filter((field) => field.id !== "description")
                  .map((field, index) => (
                    <div
                      style={{
                        display: "flex",
                        width: "47%",
                        justifyContent: "space-between",
                        marginTop: "20px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: "15px",
                          width: " 50%",
                        }}
                      >
                        {field.label}
                      </Typography>
                      <Typography sx={{ width: " 45%" }}>
                        {field.value ? field.value : "Không có"}
                      </Typography>
                    </div>
                  ))}
                <div style={{ width: "100%", marginTop: "20px" }}>
                  <Typography sx={{ fontWeight: "bold", fontSize: "15px" }}>
                    Mô tả
                  </Typography>
                  <TextareaAutosize
                    minRows={5}
                    maxRows={7}
                    aria-label="maximum height"
                    value={
                      extraRequestInfo.description
                        ? extraRequestInfo.description
                        : "Không có"
                    }
                    style={{
                      width: "97%",
                      marginTop: "10px",
                      padding: "10px",
                      resize: "none",
                    }}
                  />
                </div>
              </div>
              {subServices.length > 0 &&
                accessories.length > 0 &&
                extraServices.length > 0 && (
                  <div>
                    <div
                      style={{
                        borderBottom: "1px solid #c2c0ba",
                        paddingBottom: "20px",
                        width: "100%",
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", marginTop: "30px" }}>
                          <Typography
                            sx={{
                              width: "200px",
                              marginRight: "100px",
                              fontWeight: "bold",
                            }}
                          >
                            Danh sách linh kiện
                          </Typography>
                          <Typography
                            sx={{
                              width: "200px",
                              textAlign: "end",
                              fontWeight: "bold",
                            }}
                          >
                            Giá
                          </Typography>
                        </div>
                        {accessories.map((service) => (
                          <div
                            key={service.id}
                            style={{ display: "flex", marginTop: "10px" }}
                          >
                            <Typography
                              sx={{ width: "200px", marginRight: "100px" }}
                            >
                              {service.name}
                            </Typography>
                            <Typography
                              sx={{ width: "200px", textAlign: "end" }}
                            >
                              {getMoneyFormat(service.price)}
                            </Typography>
                          </div>
                        ))}
                      </div>
                      <div>
                        <div style={{ display: "flex", marginTop: "30px" }}>
                          <Typography
                            sx={{
                              width: "200px",
                              marginRight: "100px",
                              fontWeight: "bold",
                            }}
                          >
                            Danh sách dịch vụ con
                          </Typography>
                          <Typography
                            sx={{
                              width: "200px",
                              textAlign: "end",
                              fontWeight: "bold",
                            }}
                          >
                            Giá
                          </Typography>
                        </div>
                        {subServices.map((service, index) => (
                          <div
                            key={index}
                            style={{ display: "flex", marginTop: "10px" }}
                          >
                            <Typography
                              sx={{ width: "200px", marginRight: "100px" }}
                            >
                              {service.name}
                            </Typography>
                            <Typography
                              sx={{ width: "200px", textAlign: "end" }}
                            >
                              {getMoneyFormat(service.price)}
                            </Typography>
                          </div>
                        ))}
                      </div>
                      <div>
                        <div style={{ display: "flex", marginTop: "30px" }}>
                          <Typography
                            sx={{
                              width: "200px",
                              marginRight: "100px",
                              fontWeight: "bold",
                            }}
                          >
                            Danh sách dịch vụ con
                          </Typography>
                          <Typography
                            sx={{
                              width: "200px",
                              textAlign: "end",
                              fontWeight: "bold",
                            }}
                          >
                            Giá
                          </Typography>
                        </div>
                        {extraServices.map((service, index) => (
                          <div
                            key={index}
                            style={{ display: "flex", marginTop: "10px" }}
                          >
                            <Typography
                              sx={{ width: "200px", marginRight: "100px" }}
                            >
                              {service.name}
                            </Typography>
                            <Typography
                              sx={{ width: "200px", textAlign: "end" }}
                            >
                              {getMoneyFormat(service.price)}
                            </Typography>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              <div style={{ width: "100%" }}>
                {total.map((field) => (
                  <div
                    key={field.id}
                    style={{ display: "flex", marginTop: "10px" }}
                  >
                    <Typography sx={{ width: "200px", marginRight: "100px" }}>
                      {field.label}
                    </Typography>
                    <Typography
                      sx={{
                        width: "200px",
                        textAlign: "end",
                        fontWeight:
                          field.id === "actualPrice" ? "bold" : "none",
                      }}
                    >
                      {field.id === "totalService"
                        ? getMoneyFormat(
                            totalAccessories +
                              totalExtraServices +
                              totalSubServices
                          )
                        : getMoneyFormat(field.value)}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestDetailPage;
