import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { TextField, Button } from "@mui/material";
import "./userProfile.scss";
import Pattern from "../../constants/Pattern";
import { getErrorImageSelect } from "../../utils/util";
import useAxios from "../../hooks/useAxios";
import ApiContants from "../../constants/Api";
import getErrorMessage from "../../utils/getErrorMessage";
import Loading from "../../components/loading/Loading";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const userAPI = useAxios();
  const navigate= useNavigate();
  const [avatar, setAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChanges, setIsChanges] = useState({
    avatar: false,
    profile: false,
    password: false,
  });
  const [values, setValues] = useState({
    phone: "",
    fullName: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    reNewPassword: "",
  });
  const [errors, setErrors] = useState({
    phone: "",
    fullName: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    reNewPassword: "",
  });
  const checkEmail = (e) => {
    let email = e !== null ? e.target.value : values.email;
    if (!email) {
      setErrors({ ...errors, email: "Vui lòng điền đủ thông tin!" });
    } else if (!email.trim().match(Pattern.EMAIL)) {
      setErrors({
        ...errors,
        email: "Định dạng email không đúng",
      });
    } else {
      setErrors({ ...errors, email: "" });
      return true;
    }
    return false;
  };
  const checkFullName = (e) => {
    let fullName = e !== null ? e.target.value : values.fullName;
    if (!fullName || !fullName.match(Pattern.FULL_NAME)) {
      setErrors({
        ...errors,
        fullName: "Họ và Tên từ 3-150 kí tự không bao gồm số và kí tự đặc biệt",
      });
      return false;
    } else {
      setErrors({ ...errors, fullName: "" });
      return true;
    }
  };
  const checkOldPassword = (e) => {
    let oldPassword = e !== null ? e.target.value : values.oldPassword;
    if (!oldPassword) {
      setErrors({ ...errors, oldPassword: "Vui lòng điền đủ thông tin!" });
    } else if (!oldPassword.trim().match(Pattern.PASSWORD)) {
      setErrors({
        ...errors,
        oldPassword:
          "Mật khẩu phải từ 6 đến 10 kí tự và bao gồm ít nhất 1 số hoặc 1 kí tự!",
      });
    } else {
      setErrors({ ...errors, oldPassword: "" });
      return true;
    }
    return false;
  };
  const checkNewPassword = (e) => {
    let newPassword = e !== null ? e.target.value : values.newPassword;
    if (!newPassword) {
      setErrors({ ...errors, newPassword: "Vui lòng điền đủ thông tin!" });
    } else if (!newPassword.trim().match(Pattern.PASSWORD)) {
      setErrors({
        ...errors,
        newPassword:
          "Mật khẩu phải từ 6 đến 10 kí tự và bao gồm ít nhất 1 số hoặc 1 kí tự!",
      });
    } else if (newPassword.trim() === values.oldPassword) {
      setErrors({
        ...errors,
        newPassword: "Mật khẩu mới phải khác so với mật khẩu cũ!",
      });
    } else {
      setErrors({ ...errors, newPassword: "" });
      return true;
    }
    return false;
  };
  const checkReNewPassword = (e) => {
    let reNewPassword = e !== null ? e.target.value : values.reNewPassword;
    if (!reNewPassword) {
      setErrors({ ...errors, reNewPassword: "Vui lòng điền đủ thông tin!" });
    } else if (reNewPassword.trim() !== values.newPassword) {
      setErrors({
        ...errors,
        reNewPassword: "Mật khẩu nhập lại không khớp!",
      });
    } else {
      setErrors({ ...errors, reNewPassword: "" });
      return true;
    }
    return false;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await userAPI.get(ApiContants.ADMIN_PROFILE);
        const profile = response.data;
        console.log(response.data);
        setValues({
          ...values,
          fullName: profile.fullName,
          phone: profile.phone,
          email: profile.email,
        });
        setAvatarUrl(profile.avatarUrl);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        navigate("/error");
      }
    };
    fetchData();
  }, []);
  const handleSaveProfile = async () => {
    if (isChanges.avatar && avatar) {
      try {
        const formData = new FormData();
        formData.append("avatar", avatar);
        await userAPI.put(ApiContants.UPDATE_AVATAR, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Cập nhật avatar thành công!");
      } catch (error) {
        alert("Cập nhật avatar không thành công!");
      }
    }
    if (isChanges.profile && checkFullName(null) && checkEmail(null)) {
      try {
        await userAPI.put(ApiContants.ADMIN_PROFILE, {
          fullName: values.fullName,
          email: values.email,
        });
        alert("Cập nhật thông tin cá nhân thành công!");
      } catch (error) {
        alert("Cập nhật thông tin cá nhân không thành công!");
      }
    }
  };
  const handleSavePassword = async () => {
    if (!isChanges.password) {
      setErrors({ ...errors, oldPassword: "Vui lòng điền đủ thông tin!" });
    } else if (
      isChanges.password &&
      checkOldPassword(null) &&
      checkNewPassword(null) &&
      checkReNewPassword(null)
    ) {
      try {
        await userAPI.put(ApiContants.UPDATE_PASSWORD, {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        });
        alert("Thay đổi mật khẩu thành công!");
      } catch (error) {
        alert("Thay đổi mật khẩu thất bại do: " + getErrorMessage(error));
      }
    }
  };
  return (
    <div className="user-profile">
      <Sidebar />
      <div className="user-profile-container">
        <Navbar />
        {loading ? (
          <Loading />
        ) : (
          <div className="body">
            <h2>Thay đổi thông tin</h2>
            <div className="avatar-container">
              <img src={avatarUrl} alt="" className="avatar" />
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
                        setAvatarUrl(URL.createObjectURL(e.target.files[0]));
                        setIsChanges({ ...isChanges, avatar: true });
                      }
                    }
                  }}
                  style={{ display: "none" }}
                />
              </div>
            </div>
            <div className="account-information">
              <h3>Thông tin tài khoản</h3>
              <div style={{ width: "40%" }}>
                <TextField
                  id="fullName"
                  label="Họ tên"
                  margin="normal"
                  error={errors.fullName ? true : false}
                  value={values.fullName}
                  onChange={(e) => {
                    setValues({ ...values, fullName: e.target.value });
                    setIsChanges({ ...isChanges, profile: true });
                    checkFullName(e);
                  }}
                  variant="outlined"
                  sx={{
                    width: "100%",
                  }}
                  required
                />
                {errors.fullName && <span>{errors.fullName}</span>}
              </div>

              <div style={{ width: "40%" }}>
                <TextField
                  id="phone"
                  label="Số điện thoại"
                  margin="normal"
                  value={values.phone}
                  inputProps={{ readOnly: true }}
                  variant="outlined"
                  sx={{
                    width: "100%",
                  }}
                  required
                />
                {errors.phone && <span>{errors.phone}</span>}
              </div>
              <div style={{ width: "40%" }}>
                <TextField
                  id="email"
                  label="Email"
                  margin="normal"
                  error={errors.email ? true : false}
                  value={values.email}
                  variant="outlined"
                  onChange={(e) => {
                    setValues({ ...values, email: e.target.value.trim() });
                    setIsChanges({ ...isChanges, profile: true });
                    checkEmail(e);
                  }}
                  sx={{
                    width: "100%",
                  }}
                  required
                />
                {errors.email && <span>{errors.email}</span>}
              </div>
              <div style={{ width: "100%", display: "flex" }}>
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    marginLeft: "auto",
                    marginRight: "20px",
                  }}
                  onClick={handleSaveProfile}
                >
                  Cập nhật thông tin
                </Button>
              </div>
            </div>
            <div className="account-information">
              <h3>Đổi mật khẩu</h3>
              <div style={{ width: "40%" }}>
                <TextField
                  id="oldPassword"
                  label="Mật khẩu cũ"
                  type="password"
                  error={errors.oldPassword ? true : false}
                  value={values.oldPassword}
                  variant="outlined"
                  margin="normal"
                  onChange={(e) => {
                    setValues({
                      ...values,
                      oldPassword: e.target.value.trim(),
                    });
                    setIsChanges({ ...isChanges, password: true });
                    checkOldPassword(e);
                  }}
                  sx={{
                    width: "100%",
                  }}
                  required
                />
                {errors.oldPassword && <span>{errors.oldPassword}</span>}
              </div>
              <div style={{ width: "40%" }}>
                <TextField
                  id="newPassword"
                  label="Mật khẩu mới"
                  type="password"
                  margin="normal"
                  error={errors.newPassword ? true : false}
                  value={values.newPassword}
                  variant="outlined"
                  onChange={(e) => {
                    setValues({
                      ...values,
                      newPassword: e.target.value.trim(),
                    });
                    setIsChanges({ ...isChanges, password: true });
                    checkNewPassword(e);
                  }}
                  sx={{
                    width: "100%",
                  }}
                  required
                />
                {errors.newPassword && <span>{errors.newPassword}</span>}
              </div>
              <div style={{ width: "40%" }}>
                <TextField
                  id="re_newPassword"
                  label="Nhập lại mật khẩu"
                  type="password"
                  margin="normal"
                  error={errors.reNewPassword ? true : false}
                  value={values.reNewPassword}
                  variant="outlined"
                  onChange={(e) => {
                    setIsChanges({ ...isChanges, password: true });
                    setValues({
                      ...values,
                      reNewPassword: e.target.value.trim(),
                    });
                    checkReNewPassword(e);
                  }}
                  sx={{
                    width: "100%",
                  }}
                  required
                />
                {errors.reNewPassword && <span>{errors.reNewPassword}</span>}
              </div>
              <div style={{ width: "100%", display: "flex" }}>
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    marginLeft: "auto",
                    marginRight: "20px",
                  }}
                  onClick={handleSavePassword}
                >
                  Thay đổi mật khẩu
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
