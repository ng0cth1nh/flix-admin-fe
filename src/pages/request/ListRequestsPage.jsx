import "./listRequests.scss";
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import Config from "../../constants/Config";
import Loading from "../../components/loading/Loading";
import Search from "../../components/search/Search";
import ApiContants from "../../constants/Api";
import { formatFromDateTime } from "../../utils/getFormatDate";

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
const columns = [
  { id: "index", label: "#", width: "10%", align: "center" },
  {
    id: "requestCode",
    label: "MÃ YÊU CẦU",
    width: "10%",
    align: "center",
  },
  {
    id: "customerName",
    label: "TÊN KHÁCH HÀNG",
    width: "10%",
    align: "center",
  },
  {
    id: "customerPhone",
    label: "SỐ ĐIỆN THOẠI KHÁCH",
    width: "15%",
    align: "center",
  },
  {
    id: "repairerName",
    label: "TÊN THỢ",
    width: "10%",
    align: "center",
  },
  {
    id: "repairerPhone",
    label: "SỐ ĐIỆN THOẠI THỢ",
    width: "10%",
    align: "center",
  },
  {
    id: "createdAt",
    label: "NGÀY TẠO",
    width: "10%",
    align: "center",
    format: (value) => formatFromDateTime(value),
  },
  {
    id: "status",
    label: "TRẠNG THÁI",
    width: "10%",
    align: "center",
    format: (value) =>
      value === "PENDING" ? (
        <Typography variant="p" sx={{ color: "orange" }}>
          Đang đợi
        </Typography>
      ) : value === "APPROVED" ? (
        <Typography variant="p" sx={{ color: "blue" }}>
          Đã chấp nhận
        </Typography>
      ) : value === "FIXING" ? (
        <Typography variant="p" sx={{ color: "purple" }}>
          Đang sửa
        </Typography>
      ) : value === "PAYMENT_WAITING" ? (
        <Typography variant="p" sx={{ color: "teal" }}>
          Chờ thanh toán
        </Typography>
      ) : value === "DONE" ? (
        <Typography variant="p" sx={{ color: "green" }}>
          Hoàn thành
        </Typography>
      ) : (
        <Typography variant="p" sx={{ color: "red" }}>
          Đã hủy
        </Typography>
      ),
  },
  {
    id: "action",
    label: "THAO TÁC",
    width: "15%",
    align: "center",
    format: (value) => (
      <Button variant="contained" sx={{ textTransform: "none" }} size="small">
        <Link
          to={`/requests/${value}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          Xem chi tiết
        </Link>
      </Button>
    ),
  },
];

const useStyles = makeStyles({
  root: {
    "& .MuiTableCell-head": {
      fontWeight: "bold",
      backgroundColor: "#edeff0",
    },
  },
});
const ListRequestsPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const userAPI = useAxios();
  const [page, setPage] = useState(0);
  const [statusFilter, setStatusFilter] = useState("");
  const [data, setData] = useState([]);
  const [totalRecord, setTotalRecord] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleChangeStatusFilter = (event) => {
    setStatusFilter(event.target.value);
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await userAPI.get(
        ApiContants.REQUEST_LIST + `?pageNumber=${page}`
      );
      setTotalRecord(response.data.totalRecord);
      setData(response.data.requestList);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      navigate("/error");
    }
  };
  const searchData = async () => {
    // case both search text and status is null then fetch data by paging
    if (!search.trim() && !statusFilter) {
      setIsSearching(false);
      setPage(0);
      fetchData();
      return;
    }
    let searchUrl = ApiContants.REQUEST_SEARCH;
    let flag = false;
    if (search.trim()) {
      searchUrl += `?keyword=${search.trim()}`;
      flag = true;
    }
    if (statusFilter) {
      searchUrl += (flag ? "&" : "?") + `status=${statusFilter}`;
    }
    console.log(searchUrl);
    try {
      setPage(0);
      setLoading(true);
      setIsSearching(true);
      const response = await userAPI.get(searchUrl);
      console.log(response.data);
      setData(response.data.requestList);
      setTotalRecord(response.data.requestList.length);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      navigate("/error");
    }
  };

  useEffect(() => {
    if (!isSearching) {
      fetchData();
    }
  }, [page]);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  return (
    <div className="list-requests">
      <Sidebar />
      <div className="list-requests-container">
        <Navbar />
        <div className="table-container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <h1>Yêu cầu</h1>
          
          </div>
          <div className="filter">
            <FormControl
              sx={{
                width: "200px",
                marginRight:5,
                backgroundColor:'white'
              }}
            >
              {/* // PENDING,APPROVED,FIXING,CANCEL,PAYMENT_WAITING,DONE */}
              <InputLabel id="status-label">Trạng thái</InputLabel>
              <Select
                labelId="status-label"
                id="statusFilter"
                value={statusFilter}
                label="Trạng thái"
                onChange={handleChangeStatusFilter}
              >
                <MenuItem value={""}>Tất cả</MenuItem>
                <MenuItem value={"PENDING"}>Đang đợi</MenuItem>
                <MenuItem value={"APPROVED"}>Đã chấp nhận</MenuItem>
                <MenuItem value={"FIXING"}>Đang sửa</MenuItem>
                <MenuItem value={"CANCELLED"}>Đã hủy</MenuItem>
                <MenuItem value={"PAYMENT_WAITING"}>Chờ thanh toán</MenuItem>
                <MenuItem value={"DONE"}>Hoàn thành</MenuItem>
              </Select>
            </FormControl>
            <Search
              placeholder="Mã yêu cầu"
              handleSearch={searchData}
              search={search}
              setSearch={setSearch}
            />
          </div>
          {data.length !== 0 ? (
            <div>
              <TableContainer sx={{ minHeight: "600px", marginTop: "20px" }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow className={classes.root}>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ width: column.width }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ borderWidth: 1 }}>
                    {data
                      .slice(
                        data.length <= Config.ROW_PER_PAGE
                          ? 0
                          : page * Config.ROW_PER_PAGE,
                        data.length <= Config.ROW_PER_PAGE
                          ? Config.ROW_PER_PAGE
                          : page * Config.ROW_PER_PAGE + Config.ROW_PER_PAGE
                      )
                      .map((row, index) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.id}
                          >
                            {columns.map((column) => {
                              if (column.id === "index") {
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {page * Config.ROW_PER_PAGE + index + 1}
                                  </TableCell>
                                );
                              } else if (column.id === "action") {
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {column.format(row["requestCode"])}
                                  </TableCell>
                                );
                              } else {
                                const value = row[column.id];
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {value
                                      ? column.format
                                        ? column.format(value)
                                        : value
                                      : "Không có"}
                                  </TableCell>
                                );
                              }
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10]}
                component="div"
                count={totalRecord}
                rowsPerPage={Config.ROW_PER_PAGE}
                page={page}
                onPageChange={handleChangePage}
              />
            </div>
          ) : loading ? null : (
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src="/nodata.png"
                alt="nodata"
                style={{ width: "60%", aspectRatio: 1.5, margin: "auto" }}
              />
            </div>
          )}
          {loading && <Loading />}
        </div>
      </div>
    </div>
  );
};

export default ListRequestsPage;
