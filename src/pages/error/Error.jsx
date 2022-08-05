import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Error.scss";

const Error = () => {
  return (
    <div className="error">
      <Sidebar />
      <div className="error-container">
        <Navbar />
        <div
          className="body"
        >
          <img src="/error.png" alt="error" />
          <h2>Oops! Không tìm thấy dữ liệu...</h2>
        </div>
      </div>
    </div>
  );
};

export default Error;
