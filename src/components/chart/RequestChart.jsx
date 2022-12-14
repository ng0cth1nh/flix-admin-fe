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
import { getRequestFormat } from "../../utils/util";

const RequestChart = ({ aspect }) => {
  const userAPI = useAxios();
  const navigate = useNavigate();
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
        <h1>Th???ng k?? y??u c???u</h1>
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
          <InputLabel id="status-label">Th???i gian</InputLabel>
          <Select
            labelId="status-label"
            id="statusFilter"
            value={statusFilter}
            label="Th???i gian"
            onChange={handleChangeStatusFilter}
          >
            <MenuItem value="DAY">Ng??y</MenuItem>
            <MenuItem value="MONTH">Th??ng</MenuItem>
            <MenuItem value="YEAR">N??m</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          sx={{ textTransform: "none" }}
          size="big"
          onClick={handleApplyClick}
        >
          ??p d???ng
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
            margin={{ top: 20, right: 30, left: 30, bottom: 0 }}
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
            <YAxis tickFormatter={getRequestFormat} />
            <Tooltip
              formatter={(value, b, chartPoint) => {
                switch (chartPoint.name) {
                  case "totalPendingRequest":
                    return [
                      getRequestFormat(value),
                      "Y??u c???u ch??a ???????c ch???p nh???n",
                    ];
                  case "totalCancelRequest":
                    return [getRequestFormat(value), "Y??u c???u h???y"];
                  case "totalApprovedRequest":
                    return [
                      getRequestFormat(value),
                      "Y??u c???u ???? ???????c ch???p nh???n",
                    ];
                  case "totalFixingRequest":
                    return [getRequestFormat(value), "Y??u c???u ??ang ???????c s???a"];
                  case "totalDoneRequest":
                    return [getRequestFormat(value), "Y??u c???u ???? xong"];
                  case "totalPaymentWaitingRequest":
                    return [
                      getRequestFormat(value),
                      "Y??u c???u ??ang ch??? thanh to??n",
                    ];
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
                    return "Y??u c???u ch??a ???????c ch???p nh???n";
                  case "totalCancelRequest":
                    return "Y??u c???u h???y";
                  case "totalApprovedRequest":
                    return "Y??u c???u ???? ???????c ch???p nh???n";
                  case "totalFixingRequest":
                    return "Y??u c???u ??ang ???????c s???a";
                  case "totalDoneRequest":
                    return "Y??u c???u ???? xong";
                  case "totalPaymentWaitingRequest":
                    return "Y??u c???u ??ang ch??? thanh to??n";
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
