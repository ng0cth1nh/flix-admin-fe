import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import FolderIcon from "@mui/icons-material/Folder";
import {
  Button,
  Typography,
  FormControlLabel,
  TextareaAutosize,
  RadioGroup,
  Radio,
} from "@mui/material";
import { MapInteractionCSS } from "react-map-interaction";
import useAxios from "../../hooks/useAxios";
import ApiContants from "../../constants/Api";
import { useParams, useNavigate } from "react-router-dom";
import "./RepairerProfile.scss";
import BanModal from "../../components/modal/BanModal";
import Loading from "../../components/loading/Loading";
import { formatFromDate, formatFromDateTime } from "../../utils/getFormatDate";
import ConfirmDialog from "../../components/dialog/ConfirmDialog";
import getErrorMessage from "../../utils/getErrorMessage";
import MuiTextAreaInput from "../../components/formInput/MuiTextAreaInput";
const titleStyle = { fontWeight: "bold", fontSize: "15px" };
const RepairerProfile = () => {
  const { repairerId } = useParams();
  const repairerAPI = useAxios();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState(null);
  const [status, setStatus] = useState(true);
  const [buttonPos, setButtonPos] = useState(0);
  const [banReason, setBanReason] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(true);
  const [willCvUpdate, setWillCvUpdate] = useState("true");
  const [openRejectCv, setOpenRejectCv] = useState(false);
  const [repairer, setRepairer] = useState(null);
  const [values, setValues] = useState({
    rejectReason: {
      value: "",
      error: "",
    },
  });
  const handleSave = (e) => {
    e.preventDefault();
    banRepairer();
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleRejectCvClose = () => {
    setOpenRejectCv(false);
  };
  const handleRejectCvConfirm = () => {
    changeStatusCVRepairer("REJECT");
  };
  const handleBan = () => {
    if (status) {
      setOpen(true);
    } else {
      banRepairer();
    }
  };
  const onChange = (id, text, error) => {
    setValues({ ...values, [id]: { value: text, error } });
  };
  const banRepairer = async () => {
    if (banReason.error === "") {
      try {
        if (!status) {
          await repairerAPI.delete(
            ApiContants.BAN_USER + `?phone=${repairer.repairerPhone}`
          );
        } else {
          await repairerAPI.post(ApiContants.BAN_USER, {
            phone: repairer.repairerPhone,
            banReason: banReason.value,
          });
        }
        setOpen(false);
        alert("Cập nhật thông tin thành công!");
        navigate("/repairers");
      } catch (error) {
        setOpen(false);
        alert("Cập nhật thông tin không thành công.Vui lòng thử lại sau!");
      }
    }
  };
  const changeStatusCVRepairer = async (status) => {
    if (status === "REJECT") {
      if (values.rejectReason.error !== "") return;
      try {
        await repairerAPI.put(ApiContants.CV_REJECT, {
          repairerId,
          reason: values.rejectReason.value,
          rejectStatus: willCvUpdate === "true" ? "UPDATING" : "REJECTED",
        });
        setOpenRejectCv(false);
        alert("Từ chối thông tin Cv thợ thành công!");
        navigate("/repairers");
      } catch (error) {
        setOpenRejectCv(false);
        alert(
          "Từ chối thông tin Cv thợ thất bại do: " + getErrorMessage(error)
        );
      }
    } else if (status === "ACCEPTED") {
      try {
        await repairerAPI.put(ApiContants.CV_ACCEPT, {
          repairerId,
        });
        alert("Chấp nhận thông tin Cv thợ thành công!");
        navigate("/repairers");
      } catch (error) {
        alert(
          "Chấp nhận thông tin Cv thợ thất bại do: " + getErrorMessage(error)
        );
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
                  {verifyStatus === "PENDING" ? (
                    <Typography sx={{ color: "orange" }}>Đang đợi</Typography>
                  ) : verifyStatus === "UPDATING" ? (
                    <Typography sx={{ color: "blue" }}>Đang xử lí</Typography>
                  ) : verifyStatus === "ACCEPTED" ? (
                    <Typography sx={{ color: "green" }}>Đã xác thực</Typography>
                  ) : (
                    <Typography sx={{ color: "red" }}>Đã hủy</Typography>
                  )}
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
                {(verifyStatus === "PENDING" ||
                  verifyStatus === "UPDATING") && (
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "none",
                    }}
                    color="success"
                    onClick={() => {
                      changeStatusCVRepairer("ACCEPTED");
                    }}
                  >
                    Chấp nhận
                  </Button>
                )}
                {(verifyStatus === "PENDING" ||
                  verifyStatus === "UPDATING") && (
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "none",
                    }}
                    onClick={() => {
                      setOpenRejectCv(true);
                    }}
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
                  onClick={handleBan}
                >
                  {status ? "Vô hiệu hóa" : "Kích hoạt"}
                </Button>
              </div>
              <ConfirmDialog
                open={openRejectCv}
                title="Bạn có muốn từ chối cv của thợ rút tiền này không?"
                handleClose={handleRejectCvClose}
                handleConfirm={handleRejectCvConfirm}
              >
                <div
                  style={{
                    width: "85%",
                    margin: "auto",
                  }}
                >
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={willCvUpdate}
                    onChange={(e) => {
                      setWillCvUpdate(e.target.value);
                    }}
                    name="radio-buttons-group"
                    row
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Yêu cầu nhập lại Cv"
                      sx={{ width: "50%" }}
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="Từ chối nhận lại Cv"
                      sx={{
                        width: "45%",
                        marginLeft: "auto",
                        justifyContent: "flex-end",
                      }}
                    />
                  </RadioGroup>
                  <MuiTextAreaInput
                    label="Nội dung*"
                    item={values.rejectReason}
                    id="rejectReason"
                    onChange={onChange}
                    isRequired={true}
                  />
                </div>
              </ConfirmDialog>
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
