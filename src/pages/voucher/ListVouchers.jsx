import "./ListVoucher.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
const ListVouchers = () => {
  return (
    <div className="list-vouchers">
      <Sidebar />
      <div className="list-vouchers-container">
        <Navbar />
        <h2>Tính năng này hiện đang trong quá trình phát triển!</h2>
      </div>
    </div>
  );
};

export default ListVouchers;
