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
import Loading from "../../components/loading/Loading";
import { useNavigate } from "react-router-dom";
import { getAccountFormat } from "../../utils/util";

const RepairerChart = ({ aspect }) => {
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
          ApiContants.DASHBOARD_REPAIRER
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
        <h1>Th???ng k?? t??i kho???n th???</h1>
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
            <Line type="monotone" dataKey="totalNewAccount" stroke="#1890ff" />
            <Line type="monotone" dataKey="totalBanAccount" stroke="#ff7a45" />
            <Line
              type="monotone"
              dataKey="totalRejectedAccount"
              stroke="#cf1322"
            />
            <Line
              type="monotone"
              dataKey="totalApprovedAccount"
              stroke="#52c41a"
            />

            <XAxis dataKey="date" />
            <YAxis tickFormatter={getAccountFormat} />
            <Tooltip
              formatter={(value, b, chartPoint) => {
                switch (chartPoint.name) {
                  case "totalNewAccount":
                    return [getAccountFormat(value), "Th??? s???a m???i"];
                  case "totalBanAccount":
                    return [getAccountFormat(value), "Th??? s???a b??? ban"];
                  case "totalRejectedAccount":
                    return [getAccountFormat(value), "Th??? s???a b??? t??? ch???i"];
                  case "totalApprovedAccount":
                    return [getAccountFormat(value), "Th??? s???a ???????c x??c nh???n"];
                  default:
                    return "";
                }
              }}
            />
            <Legend
              wrapperStyle={{ position: "absolute" }}
              formatter={(value) => {
                switch (value) {
                  case "totalNewAccount":
                    return "Th??? s???a m???i";
                  case "totalBanAccount":
                    return "Th??? s???a b??? ban";
                  case "totalRejectedAccount":
                    return "Th??? s???a b??? t??? ch???i";
                  case "totalApprovedAccount":
                    return "Th??? s???a ???????c x??c nh???n";
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

export default RepairerChart;
