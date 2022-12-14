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
const RepairerProfilePage = () => {
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
        alert("C???p nh???t th??ng tin th??nh c??ng!");
        navigate("/repairers");
      } catch (error) {
        setOpen(false);
        alert("C???p nh???t th??ng tin kh??ng th??nh c??ng.Vui l??ng th??? l???i sau!");
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
        alert("T??? ch???i th??ng tin Cv th??? th??nh c??ng!");
        navigate("/repairers");
      } catch (error) {
        setOpenRejectCv(false);
        alert(
          "T??? ch???i th??ng tin Cv th??? th???t b???i do: " + getErrorMessage(error)
        );
      }
    } else if (status === "ACCEPTED") {
      try {
        await repairerAPI.put(ApiContants.CV_ACCEPT, {
          repairerId,
        });
        alert("Ch???p nh???n th??ng tin Cv th??? th??nh c??ng!");
        navigate("/repairers");
      } catch (error) {
        alert(
          "Ch???p nh???n th??ng tin Cv th??? th???t b???i do: " + getErrorMessage(error)
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
                <Typography sx={titleStyle}>Ng??y t???o t??i kho???n</Typography>
                <Typography>
                  {formatFromDateTime(repairer.createdAt)}
                </Typography>
              </div>
              {repairer.acceptedAccountAt && (
                <div
                  style={{
                    display: "flex",
                    width: "300px",
                    marginTop:"10px",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography sx={titleStyle}>
                    Ng??y x??c th???c t??i kho???n
                  </Typography>
                  <Typography>
                    {formatFromDateTime(repairer.acceptedAccountAt)}
                  </Typography>
                </div>
              )}
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
                    Th??ng tin t??i kho???n
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
                    Th??ng tin kh??c
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
                    D???ch v??? ???? ????ng k??
                  </Typography>
                </div>
              </div>
              <div style={{ display: buttonPos === 0 ? "block" : "none" }}>
                <div className="row-field">
                  <Typography className="row-title" sx={titleStyle}>
                    Ng??y sinh
                  </Typography>
                  <Typography className="row-content">
                    {repairer.dateOfBirth
                      ? formatFromDate(repairer.dateOfBirth)
                      : "Kh??ng c??"}
                  </Typography>
                </div>
                <div className="row-field">
                  <Typography className="row-title" sx={titleStyle}>
                    Gi???i t??nh
                  </Typography>
                  <Typography className="row-content">
                    {repairer.gender ? "Nam" : "N???"}
                  </Typography>
                </div>
                <div className="row-field">
                  <Typography className="row-title" sx={titleStyle}>
                    Email
                  </Typography>
                  <Typography className="row-content">
                    {repairer.email ? repairer.email : "Kh??ng c??"}
                  </Typography>
                </div>
                <div className="row-field">
                  <Typography className="row-title" sx={titleStyle}>
                    ?????a ch???
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
                    Tr???ng th??i:{" "}
                  </Typography>
                  {verifyStatus === "PENDING" ? (
                    <Typography sx={{ color: "orange" }}>??ang ?????i</Typography>
                  ) : verifyStatus === "UPDATING" ? (
                    <Typography sx={{ color: "blue" }}>??ang x??? l??</Typography>
                  ) : verifyStatus === "ACCEPTED" ? (
                    <Typography sx={{ color: "green" }}>???? x??c th???c</Typography>
                  ) : (
                    <Typography sx={{ color: "red" }}>???? h???y</Typography>
                  )}
                </div>
              </div>
              <div style={{ display: buttonPos === 1 ? "block" : "none" }}>
                <div className="row-field">
                  <Typography className="row-title" sx={titleStyle}>
                    N??m kinh nghi???m
                  </Typography>
                  <Typography className="row-content">
                    {`${repairer.experienceYear} n??m`}
                  </Typography>
                </div>
                <div style={{ width: "100%", marginTop: "10px" }}>
                  <Typography sx={titleStyle}>M?? t??? kinh nghi???m</Typography>
                  <TextareaAutosize
                    minRows={5}
                    maxRows={7}
                    aria-label="maximum height"
                    placeholder="M?? t??? kinh nghi???m"
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
                    {`S??? ${repairer.identityCardType}`}
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
                    B???ng c???p
                  </Typography>
                  {repairer.certificates.length !== 0 ? (
                    <div className="file-download">
                      {repairer.certificates.map((image, index) => {
                        return (
                          <a
                            href={image}
                            style={{ textDecoration: "none", color: "inherit",marginRight:"10px" }}
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
                    <Typography style={{ width: "55%" }}>Kh??ng c??</Typography>
                  )}
                </div>

                <div
                  style={{
                    width: "100%",
                    marginTop: "20px",
                  }}
                >
                  <Typography sx={titleStyle}>???nh CMND/CCCD</Typography>
                  <div className="file">
                    <div className="image-container">
                      <MapInteractionCSS scale={1}>
                        <img src={repairer.frontImage} alt="???nh minh h???a" />
                      </MapInteractionCSS>
                    </div>
                    <div className="image-container">
                      <MapInteractionCSS scale={1}>
                        <img src={repairer.backSideImage} alt="???nh minh h???a" />
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
                    H??nh ???nh
                  </Typography>
                  <Typography sx={{ width: "65%", fontWeight: "bold" }}>
                    T??n d???ch v???
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
                    Ch???p nh???n
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
                    T??? ch???i
                  </Button>
                )}
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                  }}
                  onClick={handleBan}
                >
                  {status ? "V?? hi???u h??a" : "K??ch ho???t"}
                </Button>
              </div>
              <ConfirmDialog
                open={openRejectCv}
                title="B???n c?? mu???n t??? ch???i cv c???a th??? r??t ti???n n??y kh??ng?"
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
                      label="Y??u c???u nh???p l???i Cv"
                      sx={{ width: "50%" }}
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="T??? ch???i nh???n l???i Cv"
                      sx={{
                        width: "45%",
                        marginLeft: "auto",
                        justifyContent: "flex-end",
                      }}
                    />
                  </RadioGroup>
                  <MuiTextAreaInput
                    label="N???i dung*"
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
                userType="Th??? s???a ch???a"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RepairerProfilePage;
