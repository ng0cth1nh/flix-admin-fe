import "./navbar.scss";
import { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { Badge } from "@mui/material";

const Navbar = () => {
  const [showProfile, setShowProfile] = useState(false);
  return (
    <div className="navbarContainer">
      <div className="navbar">
        <div className="wrapper">
          <div className="search">
            <input type="text" placeholder="Search..." />
            <SearchOutlinedIcon />
          </div>
          <div className="items">
            <div className="item">
              <LanguageOutlinedIcon className="icon" />
              English
            </div>
            <div className="item">
              <DarkModeOutlinedIcon
                className="icon"
                // onClick={() => dispatch({ type: "TOGGLE" })}
              />
            </div>
            <div className="item">
              <FullscreenExitOutlinedIcon className="icon" />
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
          <li>Tài khoản</li>
          <li>Đăng xuất</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
