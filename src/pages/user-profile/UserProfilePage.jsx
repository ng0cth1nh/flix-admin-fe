import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Button } from "@mui/material";
import "./userProfile.scss";
import Pattern from "../../constants/Pattern";
import { getErrorImageSelect } from "../../utils/util";
import useAxios from "../../hooks/useAxios";
import ApiContants from "../../constants/Api";
import getErrorMessage from "../../utils/getErrorMessage";
import Loading from "../../components/loading/Loading";
import { fetchUserProfile } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import MuiFormInput from "../../components/formInput/MuiFormInput";
const listProfileInput = [
  {
    id: "fullName",
    label: "Họ tên",
    pattern: Pattern.FULL_NAME,
    errorMessage: "Họ và Tên từ 3-150 kí tự không bao gồm số và kí tự đặc biệt",
    isRequired: true,
  },
  {
    id: "phone",
    label: "Số điện thoại",
    pattern: Pattern.PHONE_NUMBER,
    errorMessage: "Số điện thoại không hợp lệ!",
    isRequired: true,
    disabled: true,
  },
  {
    id: "email",
    label: "Email",
    pattern: Pattern.EMAIL,
    errorMessage: "Email không đúng định dạng!",
    isRequired: false,
  },
];
const listPasswordInput = [
  {
    id: "oldPassword",
    label: "Mật khẩu cũ",
    pattern: Pattern.PASSWORD,
    errorMessage: "Độ dài từ 6 đến 10 ký tự, bao gồm chữ và số!",
    isRequired: true,
    type: "password",
  },
  {
    id: "newPassword",
    label: "Mật khẩu mới",
    pattern: Pattern.PASSWORD,
    errorMessage: "Độ dài từ 6 đến 10 ký tự, bao gồm chữ và số!",
    isRequired: true,
    type: "password",
  },
  {
    id: "reNewPassword",
    label: "Nhập lại mật khẩu",
    pattern: null,
    errorMessage: "Mật khẩu không khớp!",
    isRequired: true,
    type: "password",
  },
];

const UserProfilePage = () => {
  const userAPI = useAxios();
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [profileValues, setProfileValues] = useState({
    fullName: {
      value: "",
      error: "",
    },
    phone: {
      value: "",
      error: "",
    },
    email: {
      value: "",
      error: "",
    },
  });
  const [passwordValues, setPasswordValues] = useState({
    oldPassword: {
      value: "",
      error: "",
    },
    newPassword: {
      value: "",
      error: "",
    },
    reNewPassword: {
      value: "",
      error: "",
    },
  });
  const [isAvatarEdited, setIsAvatarEdited] = useState(false);
  const onChangeProfile = (id, text, error) => {
    setProfileValues({ ...profileValues, [id]: { value: text, error } });
  };
  const onChangePassword = (id, text, error) => {
    setPasswordValues({ ...passwordValues, [id]: { value: text, error } });
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await userAPI.get(ApiContants.ADMIN_PROFILE);
      const data = response.data;
      for (const key in profileValues) {
        profileValues[key].value = data[key];
      }
      setAvatarUrl(data.avatarUrl);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    for (const key in profileValues) {
      if (profileValues[key].error !== "") return;
    }
    if (isAvatarEdited && avatar) {
      try {
        const formData = new FormData();
        formData.append("avatar", avatar);
        await userAPI.put(ApiContants.UPDATE_AVATAR, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        alert("Cập nhật avatar thất bại do: " + getErrorMessage(error));
      }
    }
    try {
      await userAPI.put(ApiContants.ADMIN_PROFILE, {
        fullName: profileValues.fullName.value,
        email: profileValues.email.value,
      });
      alert("Cập nhật thông tin cá nhân thành công!");
      fetchData();
      dispatch(fetchUserProfile({ userAPI }));
    } catch (error) {
      alert("Cập nhật thông tin cá nhân thất bại do: ", getErrorMessage(error));
    }
  };
  const handleSavePassword = async (e) => {
    e.preventDefault();
    for (const key in passwordValues) {
      if (passwordValues[key].error !== "") return;
    }
    try {
      await userAPI.put(ApiContants.UPDATE_PASSWORD, {
        oldPassword: passwordValues.oldPassword.value,
        newPassword: passwordValues.newPassword.value,
      });
      alert("Đổi mật khẩu thành công!");
    } catch (error) {
      alert("Đổi mật khẩu thất bại do: " + getErrorMessage(error));
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
                        setIsAvatarEdited(true);
                      }
                    }
                  }}
                  style={{ display: "none" }}
                />
              </div>
            </div>
            <form className="account-information" onSubmit={handleSaveProfile}>
              <h3>Thông tin tài khoản</h3>
              {listProfileInput.map((input) => (
                <MuiFormInput
                  key={input.id}
                  {...input}
                  onChange={onChangeProfile}
                  item={profileValues[input.id]}
                />
              ))}
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
                  Cập nhật thông tin
                </Button>
              </div>
            </form>
            <form className="account-information" onSubmit={handleSavePassword}>
              <h3>Đổi mật khẩu</h3>
              {listPasswordInput.map((input) => (
                <MuiFormInput
                  key={input.id}
                  {...input}
                  pattern={
                    input.pattern
                      ? input.pattern
                      : passwordValues.newPassword.value
                  }
                  onChange={onChangePassword}
                  item={passwordValues[input.id]}
                />
              ))}
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
                  Thay đổi mật khẩu
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
