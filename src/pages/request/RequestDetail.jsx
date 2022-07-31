import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Typography, TextareaAutosize } from "@mui/material";

import { useParams } from "react-router-dom";
import "./RequestDetail.scss";
const requestInfoField = [
  { id: "requestId", label: "Mã yêu cầu", value: "fjdkjlfk838" },
  { id: "customerName", label: "Tên khách hàng", value: "Lâm đá banh" },
  {
    id: "customerPhone",
    label: "Số điện thoại khách hàng",
    value: "0000000000",
  },
  { id: "repairerName", label: "Tên thợ sửa", value: "Hưng baba" },
  { id: "repairerPhone", label: "Số điện thoại thợ sửa", value: "1111111111" },
  { id: "address", label: "Địa chỉ", value: "Tỉnh Hải Phòng, Việt Nam" },
  { id: "status", label: "Trạng thái", value: "Đã hoàn thành" },
  { id: "createdDate", label: "Ngày tạo yêu cầu", value: "20/10/2022" },
];
const listService = [
  { id: "repairerName", label: "Tên thợ sửa", value: "Hưng baba" },
  { id: "repairerPhone", label: "Số điện thoại thợ sửa", value: "1111111111" },
  { id: "address", label: "Địa chỉ", value: "Tỉnh Hải Phòng, Việt Nam" },
  { id: "status", label: "Trạng thái", value: "Đã hoàn thành" },
  { id: "createdDate", label: "Ngày tạo yêu cầu", value: "20/10/2022" },
];
const RequestDetail = () => {
  const [buttonPos, setButtonPos] = useState(0);
  const { requestId } = useParams();
  return (
    <div className="request-detail">
      <Sidebar />
      <div className="request-detail-container">
        <Navbar />
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
            {requestInfoField &&
              requestInfoField.map((field) => (
                <div className="row-field" key={field.id}>
                  <Typography
                    className="row-title"
                    sx={{ fontWeight: "bold", fontSize: "15px" }}
                  >
                    {field.label}
                  </Typography>
                  <Typography>{field.value}</Typography>
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
                placeholder="Lý do hủy"
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
          <div style={{ display: buttonPos === 1 ? "block" : "none" }}>
            <div
              style={{
                borderBottom: "1px solid #c2c0ba",
                paddingBottom: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "45%",
                  }}
                >
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: "15px", width: " 50%" }}
                  >
                    Dịch vụ
                  </Typography>
                  <Typography sx={{ width: "45%", marginLeft: "auto" }}>
                    2 năm
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "45%",
                  }}
                >
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: "15px", width: " 50%" }}
                  >
                    Phương thức thanh toán
                  </Typography>
                  <Typography sx={{ width: "45%", marginLeft: "auto" }}>
                    2 năm
                  </Typography>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "45%",
                  }}
                >
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: "15px", width: " 50%" }}
                  >
                    Ngày sửa dự tính
                  </Typography>
                  <Typography sx={{ width: "45%", marginLeft: "auto" }}>
                    2 năm
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "45%",
                  }}
                >
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: "15px", width: " 50%" }}
                  >
                    Phiếu khuyến mãi
                  </Typography>
                  <Typography sx={{ width: "45%", marginLeft: "auto" }}>
                    2 năm fksdfjsdklf lfsdf sdflk fldskfjklsdfj lf sdfksdfl l
                    fdskljfklsdfj fksdfjklsdf
                  </Typography>
                </div>
              </div>
              <div style={{ width: "100%", marginTop: "20px" }}>
                <Typography sx={{ fontWeight: "bold", fontSize: "15px" }}>
                  Mô tả
                </Typography>
                <TextareaAutosize
                  minRows={5}
                  maxRows={7}
                  aria-label="maximum height"
                  placeholder="Mô tả"
                  style={{
                    width: "97%",
                    marginTop: "10px",
                    padding: "10px",
                    resize: "none",
                  }}
                />
              </div>
            </div>
            <div
              style={{
                borderBottom: "1px solid #c2c0ba",
                paddingBottom: "20px",
              }}
            >
              <div>
                <Typography sx={{ fontWeight: "bold", marginTop: "20px" }}>
                  Danh sách linh kiện
                </Typography>
                {listService.map((service) => (
                  <div
                    key={service.id}
                    style={{ display: "flex", marginTop: "10px" }}
                  >
                    <Typography sx={{ width: "200px", marginRight: "100px" }}>
                      {service.label}
                    </Typography>
                    <Typography sx={{ maxWidth: "400px" }}>
                      {service.value}{" "}
                    </Typography>
                  </div>
                ))}
              </div>
              <div>
                <Typography sx={{ fontWeight: "bold", marginTop: "20px" }}>
                  Danh sách dịch vụ con
                </Typography>
                {listService.map((service) => (
                  <div
                    key={service.id}
                    style={{ display: "flex", marginTop: "10px" }}
                  >
                    <Typography sx={{ width: "200px", marginRight: "100px" }}>
                      {service.label}
                    </Typography>
                    <Typography sx={{ maxWidth: "400px" }}>
                      {service.value}{" "}
                    </Typography>
                  </div>
                ))}
              </div>
              <div>
                <Typography sx={{ fontWeight: "bold", marginTop: "20px" }}>
                  Danh sách dịch vụ ngoài
                </Typography>
                {listService.map((service) => (
                  <div
                    key={service.id}
                    style={{ display: "flex", marginTop: "10px" }}
                  >
                    <Typography sx={{ width: "200px", marginRight: "100px" }}>
                      {service.label}
                    </Typography>
                    <Typography sx={{ maxWidth: "400px" }}>
                      {service.value}{" "}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", marginTop: "10px" }}>
              <Typography sx={{ width: "200px", marginRight: "100px" }}>
                Phí kiểm tra
              </Typography>
              <Typography sx={{ maxWidth: "400px" }}>4578943759 vnđ</Typography>
            </div>
            <div style={{ display: "flex", marginTop: "10px" }}>
              <Typography sx={{ width: "200px", marginRight: "100px" }}>
                Tổng dịch vụ
              </Typography>
              <Typography sx={{ maxWidth: "400px" }}>4578943759 vnđ</Typography>
            </div>
            <div style={{ display: "flex", marginTop: "10px" }}>
              <Typography sx={{ width: "200px", marginRight: "100px" }}>
                Thuế VAT(5%)
              </Typography>
              <Typography sx={{ maxWidth: "400px" }}>4578943759 vnđ</Typography>
            </div>
            <div style={{ display: "flex", marginTop: "10px" }}>
              <Typography sx={{ width: "200px", marginRight: "100px" }}>
                Phiếu khuyến mãi
              </Typography>
              <Typography sx={{ maxWidth: "400px" }}>4578943759 vnđ</Typography>
            </div>
            <div style={{ display: "flex", marginTop: "10px" }}>
              <Typography sx={{ width: "200px", marginRight: "100px", color: 'red', fontWeight: 'bold' }}>
                Tổng thanh toán
              </Typography>
              <Typography sx={{ maxWidth: "400px" }}>4578943759 vnđ</Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetail;
