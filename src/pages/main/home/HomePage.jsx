import { useEffect } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import CustomerChart from "../../../components/chart/CustomerChart";
import RepairerChart from "../../../components/chart/RepairerChart";
import RequestChart from "../../../components/chart/RequestChart";
import TransactionChart from "../../../components/chart/TransactionChart";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "../../../features/auth/authSlice";
import useAxios from "../../../hooks/useAxios";
import "./home.scss";

const HomePage = () => {
  const userAPI = useAxios();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserProfile({ userAPI }));
  }, [dispatch]);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="charts">
          <CustomerChart aspect={2 / 1} />
          <RepairerChart aspect={2 / 1} />
          <RequestChart aspect={2 / 1} />
          <TransactionChart aspect={2 / 1} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
