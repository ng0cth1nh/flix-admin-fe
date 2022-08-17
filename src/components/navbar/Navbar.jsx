import "./navbar.scss";
import { useState, useEffect } from "react";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { Badge, MenuItem, Menu } from "@mui/material";
import FeedbackIcon from "@mui/icons-material/Feedback";
import ConfirmDialog from "../dialog/ConfirmDialog";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import ApiContants from "../../constants/Api";

const Navbar = () => {
  const userAPI = useAxios();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [feedback, setFeedback] = useState(0);
  const [withdraw, setWithdraw] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await userAPI.get(ApiContants.COUNT_FEEDBACK);
        setFeedback(res1.data.count);
        const res2 = await userAPI.get(ApiContants.COUNT_WITHDRAW);
        setWithdraw(res2.data.count);
        const response = await userAPI.get(ApiContants.ADMIN_PROFILE);
        const data = response.data;
        setAvatarUrl(data.avatarUrl);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleConfirm = () => {
    dispatch(logout());
  };
  return (
    <div className="navbarContainer">
      <div className="navbar">
        <div className="wrapper">
          <div className="items">
            <div className="item" onClick={() => navigate("/withdraws")}>
              <Badge
                badgeContent={withdraw}
                color="error"
                sx={{
                  "& .MuiBadge-badge": {
                    fontSize: 10,
                    height: 15,
                    minWidth: 15,
                  },
                }}
              >
                <CreditCardIcon className="icon" />
              </Badge>
            </div>
            <div className="item" onClick={() => navigate("/feedbacks")}>
              <Badge
                badgeContent={feedback}
                color="error"
                sx={{
                  "& .MuiBadge-badge": {
                    fontSize: 10,
                    height: 15,
                    minWidth: 15,
                  },
                }}
              >
                <FeedbackIcon className="icon" />
              </Badge>
            </div>
            <div className="item">
              <img
                src={avatarUrl}
                alt=""
                className="avatar"
                onClick={(e) => {
                  if (!showProfile) {
                    setAnchorEl(e.currentTarget);
                  } else {
                    setAnchorEl(null);
                  }
                  setShowProfile(!showProfile);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{ marginTop: "20px", width: "200px" }}
        open={showProfile}
        onClose={() => setShowProfile(false)}
      >
        <MenuItem onClick={() => navigate("/userProfile")}>Tài khoản</MenuItem>
        <MenuItem onClick={() => setOpen(true)}>Đăng xuất</MenuItem>
      </Menu>
      <ConfirmDialog
        open={open}
        title="Bạn có chắc chắn muốn đăng xuất tài khoản này không?"
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      />
    </div>
  );
};

export default Navbar;
