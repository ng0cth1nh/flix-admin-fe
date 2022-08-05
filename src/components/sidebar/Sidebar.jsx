import "./sidebar.scss";
import { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EngineeringIcon from "@mui/icons-material/Engineering";
import CategoryIcon from "@mui/icons-material/Category";
import SpatialAudioOffIcon from "@mui/icons-material/SpatialAudioOff";
import FeedbackIcon from "@mui/icons-material/Feedback";
import HandymanIcon from "@mui/icons-material/Handyman";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaidIcon from "@mui/icons-material/Paid";
import { Link } from "react-router-dom";
import ConfirmDialog from "../dialog/ConfirmDialog";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
const Sidebar = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleConfirm = () => {
    dispatch(logout());
  };
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/home" style={{ textDecoration: "none" }}>
          <span className="logo">Flix admin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">TRANG CHỦ</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">THÔNG TIN KHÁCH HÀNG</p>
          <Link to="/customers" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Khách hàng</span>
            </li>
          </Link>
          <Link to="/repairers" style={{ textDecoration: "none" }}>
            <li>
              <EngineeringIcon className="icon" />
              <span>Thợ sửa chữa</span>
            </li>
          </Link>
          <p className="title">QUẢN LÍ DỊCH VỤ</p>
          <Link to="/categories" style={{ textDecoration: "none" }}>
            <li>
              <CategoryIcon className="icon" />
              <span>Danh mục</span>
            </li>
          </Link>
          <Link to="/requests" style={{ textDecoration: "none" }}>
            <li>
              <SpatialAudioOffIcon className="icon" />
              <span>Yêu cầu</span>
            </li>
          </Link>
          <Link to="/feedbacks" style={{ textDecoration: "none" }}>
            <li>
              <FeedbackIcon className="icon" />
              <span>Phản hồi</span>
            </li>
          </Link>
          <Link to="/accessories" style={{ textDecoration: "none" }}>
            <li>
              <HandymanIcon className="icon" />
              <span>Linh kiện</span>
            </li>
          </Link>
          <li>
            <ConfirmationNumberIcon className="icon" />
            <span>Phiếu giảm giá</span>
          </li>
          <Link to="/transactions" style={{ textDecoration: "none" }}>
            <li>
              <PaidIcon className="icon" />
              <span>Giao dịch</span>
            </li>
          </Link>
          <Link to="/withdraws" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Yêu cầu rút tiền</span>
            </li>
          </Link>

          <p className="title">TÀI KHOẢN</p>
          <Link to="/userProfile" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Thông tin tài khoản</span>
            </li>
          </Link>
          <li onClick={() => setOpen(true)}>
            <ExitToAppIcon className="icon" />
            <span>Đăng xuất</span>
          </li>
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

export default Sidebar;
