import "./navbar.scss";
import { useState } from "react";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { Badge } from "@mui/material";
import ConfirmDialog from "../dialog/ConfirmDialog";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showProfile, setShowProfile] = useState(false);
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
            <div className="item">
              <Badge
                badgeContent={900}
                color="error"
                sx={{
                  "& .MuiBadge-badge": {
                    fontSize: 10,
                    height: 15,
                    minWidth: 15,
                  },
                }}
              >
                <NotificationsNoneOutlinedIcon className="icon" />
              </Badge>
            </div>
            <div className="item">
              <Badge
                badgeContent={900}
                color="error"
                sx={{
                  "& .MuiBadge-badge": {
                    fontSize: 10,
                    height: 15,
                    minWidth: 15,
                  },
                }}
              >
                <ChatBubbleOutlineOutlinedIcon className="icon" />
              </Badge>
            </div>
            <div className="item">
              <ListOutlinedIcon className="icon" />
            </div>
            <div className="item">
              <img
                src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="avatar"
                onClick={() => {
                  setShowProfile(!showProfile);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={`profileMenu ${!showProfile&&'notShow'}`}>
        <ul>
          <li onClick={()=> navigate("/userProfile")}>Tài khoản</li>
          <li onClick={() => setOpen(true)}>Đăng xuất</li>
        </ul>
      </div>
       <ConfirmDialog
        open={open}
        title="Bạn có muốn đăng xuất không?"
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      />
    </div>
  );
};

export default Navbar;
