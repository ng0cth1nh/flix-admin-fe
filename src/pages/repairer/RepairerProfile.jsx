import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import FolderIcon from "@mui/icons-material/Folder";
import {
  Button,
  Switch,
  Typography,
  FormControlLabel,
  TextareaAutosize,
} from "@mui/material";
import { MapInteractionCSS } from "react-map-interaction";
import useAxios from "../../hooks/useAxios";
import ApiContants from "../../constants/Api";
import { useParams, useNavigate } from "react-router-dom";
import "./RepairerProfile.scss";
import BanModal from "../../components/modal/BanModal";
import Loading from "../../components/loading/Loading";
import { formatFromDate, formatFromDateTime } from "../../utils/getFormatDate";
const titleStyle = { fontWeight: "bold", fontSize: "15px" };
const RepairerProfile = () => {
  const { repairerId } = useParams();
  const repairerAPI = useAxios();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState(null);
  const [status, setStatus] = useState(true);
  const [buttonPos, setButtonPos] = useState(0);
  const [banReason, setBanReason] = useState("");
  const [loading, setLoading] = useState(true);
  const [repairer, setRepairer] = useState(null);
  const [isEdited, setIsEdited] = useState(false);
  const handleSave = () => {
    setStatus(!status);
    setOpen(false);
  };
  const handleClose = () => {
    setIsEdited(false);
    setOpen(false);
  };
  const handleSwitchChange = (event) => {
    if (!isEdited) {
      if (!event.target.checked) {
        setOpen(true);
      } else {
        setStatus(event.target.checked);
      }
      setIsEdited(true);
    }
  };
  const handleSaveRepairer = async () => {
    if (isEdited) {
      try {
        if (status) {
          await repairerAPI.delete(
            ApiContants.BAN_USER + `?phone=${repairer.repairerPhone}`
          );
        } else {
          await repairerAPI.post(ApiContants.BAN_USER, {
            phone: repairer.repairerPhone,
            banReason,
          });
        }
        alert("Cập nhật thông tin thành công!");
      } catch (error) {
        alert("Cập nhật thông tin không thành công.Vui lòng thử lại sau!");
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isNaN(repairerId)) throw new Error();
        setLoading(true);
        const response = await repairerAPI.get(
          ApiContants.VIEW_REPAIRER_INFO + `?repairerId=${repairerId}`
        );
        setRepairer(response.data);
        setStatus(response.data.status === "ACTIVE");
        setVerifyStatus(response.data.cvStatus);
        setLoading(false);
      } catch (error) {
        navigate("/error");
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="repairer-profile">
      <Sidebar />
      <div className="repairer-profile-container">
        <Navbar />
        {loading ? (
          <Loading />
        ) : (
          <div className="body" style={{ flexWrap: "wrap" }}>
            <div className="avatar-container">
              <img src={repairer.avatar} alt="" className="avatar" />
              <div
                style={{
                  display: "flex",
                  width: "300px",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={titleStyle}>Ngày tạo tài khoản</Typography>
                <Typography>
                  {formatFromDateTime(repairer.createdAt)}
                </Typography>
              </div>
            </div>
            <div className="category-information">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h4">{repairer.repairerName}</Typography>
                {verifyStatus === "PENDING" ? (
                  <Typography sx={{ color: "orange" }}>
                    Chưa xác thực
                  </Typography>
                ) : verifyStatus === "UPDATE" ? (
                  <Typography sx={{ color: "green" }}>Đang cập nhật</Typography>
                ) : verifyStatus === "ACCEPTED" ? (
                  <Typography sx={{ color: "green" }}>Đã xác thực</Typography>
                ) : (
                  <Typography sx={{ color: "red" }}>Đã hủy</Typography>
                )}
              </div>
              <Typography>{repairer.repairerPhone}</Typography>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  className="info-button"
                  style={{
                    marginRight: "30px",
                    borderBottom: buttonPos === 0 ? "1px solid black" : "none",
                  }}
                  onClick={() => setButtonPos(0)}
                >
                  <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
                    Thông tin tài khoản
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
                    Thông tin khác
                  </Typography>
                </div>
                <div
                  className="info-button"
                  style={{
                    borderBottom: buttonPos === 2 ? "1px solid black" : "none",
                  }}
                  onClick={() => setButtonPos(2)}
                >
                  <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
                    Dịch vụ đã đăng kí
                  </Typography>
                </div>
              </div>
              <div style={{ display: buttonPos === 0 ? "block" : "none" }}>
                <div className="row-field">
                  <Typography className="row-title" sx={titleStyle}>
                    Ngày sinh
                  </Typography>
                  <Typography className="row-content">
                    {repairer.dateOfBirth
                      ? formatFromDate(repairer.dateOfBirth)
                      : "Không có"}
                  </Typography>
                </div>
                <div className="row-field">
                  <Typography className="row-title" sx={titleStyle}>
                    Giới tính
                  </Typography>
                  <Typography className="row-content">
                    {repairer.gender ? "Nam" : "Nữ"}
                  </Typography>
                </div>
                <div className="row-field">
                  <Typography className="row-title" sx={titleStyle}>
                    Email
                  </Typography>
                  <Typography className="row-content">
                    {repairer.email ? repairer.email : "Không có"}
                  </Typography>
                </div>
                <div className="row-field">
                  <Typography className="row-title" sx={titleStyle}>
                    Địa chỉ
                  </Typography>
                  <Typography className="row-content">
                    {repairer.address}
                  </Typography>
                </div>

                <div className="row-field">
                  <Typography
                    sx={{
                      alignSelf: "center",
                      fontWeight: "bold",
                      fontSize: "15px",
                    }}
                    className="row-title"
                  >
                    Trạng thái:{" "}
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch onChange={handleSwitchChange} checked={status} />
                    }
                    label={status ? "Hoạt động" : "Vô hiệu hóa"}
                  />
                </div>
              </div>
              <div style={{ display: buttonPos === 1 ? "block" : "none" }}>
                <div className="row-field">
                  <Typography className="row-title" sx={titleStyle}>
                    Năm kinh nghiệm
                  </Typography>
                  <Typography className="row-content">
                    {`${repairer.experienceYear} năm`}
                  </Typography>
                </div>
                <div style={{ width: "100%", marginTop: "10px" }}>
                  <Typography sx={titleStyle}>Mô tả kinh nghiệm</Typography>
                  <TextareaAutosize
                    minRows={5}
                    maxRows={7}
                    aria-label="maximum height"
                    placeholder="Mô tả kinh nghiệm"
                    value={repairer.experienceDescription}
                    style={{
                      width: "97%",
                      marginTop: "10px",
                      padding: "10px",
                      resize: "none",
                    }}
                    disabled
                  />
                </div>
                <div className="row-field">
                  <Typography className="row-title" sx={titleStyle}>
                    {`Số ${repairer.identityCardType}`}
                  </Typography>
                  <Typography className="row-content">
                    {repairer.identityCardNumber}
                  </Typography>
                </div>
                <div
                  style={{
                    width: "100%",
                    marginTop: "20px",
                    display:
                      repairer.certificates.length !== 0 ? "block" : "flex",
                  }}
                >
                  <Typography sx={[titleStyle, { width: "40%" }]}>
                    Bằng cấp
                  </Typography>
                  {repairer.certificates.length !== 0 ? (
                    <div className="file-download">
                      {repairer.certificates.map((image, index) => {
                        return (
                          <a
                            href={image}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <div className="file-container" key={index}>
                              <FolderIcon sx={{ marginRight: "10px" }} />
                              <Typography>{`File ${index + 1}`}</Typography>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  ) : (
                    <Typography style={{ width: "55%" }}>Không có</Typography>
                  )}
                </div>

                <div
                  style={{
                    width: "100%",
                    marginTop: "20px",
                  }}
                >
                  <Typography sx={titleStyle}>Ảnh CMND/CCCD</Typography>
                  <div className="file">
                    <div className="image-container">
                      <MapInteractionCSS scale={1}>
                        <img src={repairer.frontImage} alt="Ảnh minh họa" />
                      </MapInteractionCSS>
                    </div>
                    <div className="image-container">
                      <MapInteractionCSS scale={1}>
                        <img src={repairer.backSideImage} alt="Ảnh minh họa" />
                      </MapInteractionCSS>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: buttonPos === 2 ? "block" : "none",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "30px",
                  }}
                >
                  <Typography sx={{ width: "25%", fontWeight: "bold" }}>
                    Hình ảnh
                  </Typography>
                  <Typography sx={{ width: "65%", fontWeight: "bold" }}>
                    Tên dịch vụ
                  </Typography>
                </div>
                {repairer.registerServices.map((service) => (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "20px",
                      alignItems: "center",
                    }}
                    key={service.serviceId}
                  >
                    <img
                      src={service.serviceImage}
                      alt="service"
                      style={{
                        width: "25%",
                        aspectRatio: 1.5,
                        objectFit: "cover",
                      }}
                    />
                    <Typography sx={{ width: "65%" }}>
                      {service.serviceName}
                    </Typography>
                  </div>
                ))}
              </div>
              <div
                style={{
                  width: "60%",
                  display: "flex",
                  margin: "auto",
                  marginTop: "50px",
                  justifyContent: "space-between",
                }}
              >
                {(verifyStatus === "PENDING" || verifyStatus === "UPDATE") && (
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "none",
                    }}
                    color="success"
                    onClick={() => setVerifyStatus("ACCEPTED")}
                  >
                    Chấp nhận
                  </Button>
                )}
                {(verifyStatus === "PENDING" || verifyStatus === "UPDATE") && (
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "none",
                    }}
                    onClick={() => setVerifyStatus("REJECT")}
                    color="error"
                  >
                    Từ chối
                  </Button>
                )}
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                  }}
                  onClick={handleSaveRepairer}
                >
                  Lưu
                </Button>
              </div>
              <BanModal
                open={open}
                handleClose={handleClose}
                banReason={banReason}
                setBanReason={setBanReason}
                handleSave={handleSave}
                phone={repairer.repairerPhone}
                userType="Thợ sửa chữa"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RepairerProfile;
