import "./chart.scss";
import {
  LineChart,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  YAxis,
  Legend,
} from "recharts";
import { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import BasicDateRangePicker from "../dateRagePicker/BasicDateRangePicker";
import moment from "moment";
import useAxios from "../../hooks/useAxios";
import ApiContants from "../../constants/Api";
import Loading from "../loading/Loading";
import { useNavigate } from "react-router-dom";

const RequestChart = ({ aspect }) => {
  const userAPI = useAxios();
  const navigate= useNavigate();
  const [data, setData] = useState(null);
  const [statusFilter, setStatusFilter] = useState("DAY");

  const [selectedFromDate, setSelectedFromDate] = useState(
    moment().subtract(1, "month")
  );
  const [selectedToDate, setSelectedToDate] = useState(moment());
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await userAPI.get(
        `${
          ApiContants.DASHBOARD_REQUEST
        }?type=${statusFilter}&from=${selectedFromDate.format(
          statusFilter === "DAY"
            ? "DD/MM/yyyy"
            : statusFilter === "MONTH"
            ? "MM/yyyy"
            : "yyyy"
        )}&to=${selectedToDate.format(
          statusFilter === "DAY"
            ? "DD/MM/yyyy"
            : statusFilter === "MONTH"
            ? "MM/yyyy"
            : "yyyy"
        )}`
      );

      setData(response.data.data);
    } catch (error) {
      navigate("/error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangeStatusFilter = (event) => {
    setStatusFilter(event.target.value);
    if (event.target.value === "MONTH" || event.target.value === "DAY") {
      setSelectedFromDate(moment().subtract(1, "month"));
    } else {
      setSelectedFromDate(moment().subtract(1, "year"));
    }
    setSelectedToDate(moment());
  };

  const handleApplyClick = async (event) => {
    await fetchData();
  };

  return (
    <div className="chart">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <h1>Thống kê yêu cầu</h1>
      </div>
      <div className="filter">
        <BasicDateRangePicker
          label={statusFilter}
          selectedFromDate={selectedFromDate}
          setSelectedFromDate={setSelectedFromDate}
          selectedToDate={selectedToDate}
          setSelectedToDate={setSelectedToDate}
        />
        <FormControl
          sx={{
            width: "200px",
            marginRight: 5,
            backgroundColor: "white",
          }}
        >
          <InputLabel id="status-label">Thời gian</InputLabel>
          <Select
            labelId="status-label"
            id="statusFilter"
            value={statusFilter}
            label="Thời gian"
            onChange={handleChangeStatusFilter}
          >
            <MenuItem value="DAY">Ngày</MenuItem>
            <MenuItem value="MONTH">Tháng</MenuItem>
            <MenuItem value="YEAR">Năm</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          sx={{ textTransform: "none" }}
          size="big"
          onClick={handleApplyClick}
        >
          Áp dụng
        </Button>
      </div>

      <ResponsiveContainer width="100%" aspect={aspect}>
        {loading ? (
          <Loading />
        ) : (
          <LineChart
            width={720}
            height={360}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="10 10" />
            <Line
              type="monotone"
              dataKey="totalPendingRequest"
              stroke="#1461de"
            />
            <Line
              type="monotone"
              dataKey="totalCancelRequest"
              stroke="#de0b20"
            />
            <Line
              type="monotone"
              dataKey="totalApprovedRequest"
              stroke="#d6e007"
            />
            <Line
              type="monotone"
              dataKey="totalFixingRequest"
              stroke="#84a113"
            />
            <Line type="monotone" dataKey="totalDoneRequest" stroke="#07a323" />
            <Line
              type="monotone"
              dataKey="totalPaymentWaitingRequest"
              stroke="#a3078c"
            />

            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              formatter={(value, b, chartPoint) => {
                switch (chartPoint.name) {
                  case "totalPendingRequest":
                    return [value, "Yêu cầu chưa được chấp nhận"];
                  case "totalCancelRequest":
                    return [value, "Yêu cầu hủy"];
                  case "totalApprovedRequest":
                    return [value, "Yêu cầu đã được chấp nhận"];
                  case "totalFixingRequest":
                    return [value, "Yêu cầu đang được sửa"];
                  case "totalDoneRequest":
                    return [value, "Yêu cầu đã xong"];
                  case "totalPaymentWaitingRequest":
                    return [value, "Yêu cầu đang chờ thanh toán"];
                  default:
                    return "";
                }
              }}
            />
            <Legend
              wrapperStyle={{ position: "absolute" }}
              formatter={(value) => {
                switch (value) {
                  case "totalPendingRequest":
                    return "Yêu cầu chưa được chấp nhận";
                  case "totalCancelRequest":
                    return "Yêu cầu hủy";
                  case "totalApprovedRequest":
                    return "Yêu cầu đã được chấp nhận";
                  case "totalFixingRequest":
                    return "Yêu cầu đang được sửa";
                  case "totalDoneRequest":
                    return "Yêu cầu đã xong";
                  case "totalPaymentWaitingRequest":
                    return "Yêu cầu đang chờ thanh toán";
                  default:
                    return "";
                }
              }}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default RequestChart;
