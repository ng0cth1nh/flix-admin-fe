import { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { TextField, Button } from "@mui/material";
import "./userProfile.scss";

const UserProfile = () => {
  const [avatar, setAvatar] = useState(null);
  // const theme = useTheme();
  return (
    <div className="user-profile">
      <Sidebar />
      <div className="user-profile-container">
        <Navbar />
        <div className="body">
          <h2>Thay đổi thông tin</h2>
          <div className="avatar-container">
            <img
              src={
                avatar
                  ? URL.createObjectURL(avatar)
                  : "https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              }
              alt=""
              className="avatar"
            />
            <div>
              <label htmlFor="file" className="file-button">
                Chọn ảnh
              </label>
              <input
                type="file"
                id="file"
                onChange={(e) => setAvatar(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div className="account-information">
            <h3>Thông tin tài khoản</h3>
            <TextField
              id="fullName"
              label="Họ tên"
              margin="normal"
              error={false}
              defaultValue="thang"
              variant="outlined"
              sx={{
                width: "40%",
              }}
              required
            />
            <TextField
              id="phone"
              label="Số điện thoại"
              margin="normal"
              error={false}
              defaultValue="thang"
              variant="outlined"
              sx={{
                width: "40%",
              }}
              required
            />
            <TextField
              id="email"
              label="Email"
              margin="normal"
              error={false}
              defaultValue="thang@gmail.com"
              variant="outlined"
              sx={{
                width: "40%",
              }}
              required
            />
            {/* <div style={{ width: "100%", backgroundColor: "red" }}> */}
              {/* <Button variant="contained" >Medium</Button> */}
            {/* </div> */}
          </div>
          <div className="account-information">
            <h3>Đổi mật khẩu</h3>
            <TextField
              id="oldPassword"
              label="Mật khẩu cũ"
              type="password"
              error={false}
              defaultValue="thang"
              variant="outlined"
              margin="normal"
              sx={{
                width: "40%",
              }}
              required
            />
            <TextField
              id="newPassword"
              label="Mật khẩu mới"
              type="password"
              margin="normal"
              error={false}
              defaultValue="thang"
              variant="outlined"
              sx={{
                width: "40%",
              }}
              required
            />
            <TextField
              id="re_newPassword"
              label="Nhập lại mật khẩu"
              type="password"
              margin="normal"
              error={false}
              defaultValue="thangpro"
              variant="outlined"
              sx={{
                width: "40%",
              }}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
