import "./ListFeedbacks.scss";
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
  { id: "index", label: "#", width: "5%", align: "center" },
  {
    id: "phone",
    label: "SỐ ĐIỆN THOẠI",
    width: "20%",
    align: "center",
  },
  {
    id: "feedbackType",
    label: "LOẠI YÊU CẦU",
    width: "15%",
    align: "center",
    format: (val) =>
      val === "REQUEST"
        ? "Yêu cầu"
        : val === "VOUCHER"
        ? "Phiếu giảm giá"
        : val === "INSURANCE"
        ? "Bảo hành"
        : val === "INVOICE"
        ? "Hóa đơn"
        : val === "COMMENT"
        ? "Bình luận"
        : "Tài khoản",
  },
  {
    id: "title",
    label: "TIÊU ĐỀ",
    width: "20%",
    align: "center",
  },
  {
    id: "createdAt",
    label: "NGÀY TẠO",
    width: "`10%",
    align: "center",
    format: (val) => formatFromDateTime(val),
  },
  {
    id: "status",
    label: "TRẠNG THÁI",
    width: "15%",
    align: "center",
    format: (value) =>
      value === "PENDING" ? (
        <Typography variant="p" sx={{ color: "green" }}>
          Đang đợi
        </Typography>
      ) : value === "PROCESSING" ? (
        <Typography variant="p" sx={{ color: "blue" }}>
          Đang xử lí
        </Typography>
      ) : value === "DONE" ? (
        <Typography variant="p" sx={{ color: "green" }}>
          Đã hoàn thành
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
          to={`/feedbacks/feedback/view/${value}`}
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
const ListFeedbacks = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const userAPI = useAxios();
  const [page, setPage] = useState(0);
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [data, setData] = useState([]);
  const [totalRecord, setTotalRecord] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleChangeStatusFilter = (event) => {
    setStatusFilter(event.target.value);
    searchData(event.target.value, null);
  };
  const handleChangeTypeFilter = (event) => {
    setTypeFilter(event.target.value);
    searchData(null, event.target.value);
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await userAPI.get(
        ApiContants.FEEDBACK_LIST + `?pageNumber=${page}`
      );
      setTotalRecord(response.data.totalRecord);
      setData(response.data.feedbackList);
      console.log(response.data.feedbackList);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      navigate("/error");
    }
  };
  const handleSearch = () => {
    searchData(null, null);
  };
  const searchData = async (statusChange, typeChange) => {
    let status = statusChange !== null ? statusChange : statusFilter;
    let type = typeChange !== null ? typeChange : typeFilter;
    // case both search text and status is null then fetch data by paging
    if (!search.trim() && !status && !type) {
      setIsSearching(false);
      setPage(0);
      fetchData();
      return;
    }
    let searchUrl = ApiContants.FEEDBACK_SEARCH;
    let flag = false;
    if (search.trim()) {
      searchUrl += `?keyword=${search.trim()}`;
      flag = true;
    }
    if (status) {
      searchUrl += (flag ? "&" : "?") + `status=${status}`;
      flag = true;
    }
    if (type) {
      searchUrl += (flag ? "&" : "?") + `feedbackType=${type}`;
    }
    console.log(searchUrl);
    try {
      setPage(0);
      setLoading(true);
      setIsSearching(true);
      const response = await userAPI.get(searchUrl);
      setData(response.data.feedbackList);
      console.log(response.data);
      setTotalRecord(response.data.feedbackList.length);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div className="list-feedbacks">
      <Sidebar />
      <div className="list-feedbacks-container">
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
            <h1>Phản hồi</h1>
            <div style={{ display: "flex" }}>
              <Search
                placeholder="Số điện thoại"
                handleSearch={handleSearch}
                search={search}
                setSearch={setSearch}
              />
              <Button variant="contained" color="success">
                <Link
                  to={"/feedbacks/feedback/new"}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Thêm
                </Link>
              </Button>
            </div>
          </div>
          <div className="filter">
            <h2>Lọc theo</h2>
            <FormControl
              sx={{
                width: "200px",
                marginRight: "30px",
              }}
              margin="normal"
            >
              <InputLabel id="type-label">Loại yêu cầu</InputLabel>
              <Select
                labelId="type-label"
                id="typeFilter"
                value={typeFilter}
                label="Loại yêu cầu"
                onChange={handleChangeTypeFilter}
              >
                <MenuItem value={""}>Tất cả</MenuItem>
                <MenuItem value={"REQUEST"}>Yêu cầu</MenuItem>
                <MenuItem value={"VOUCHER"}>Phiếu giảm giá</MenuItem>
                <MenuItem value={"INSURANCE"}>Bảo hành</MenuItem>
                <MenuItem value={"INVOICE"}>Hóa đơn</MenuItem>
                <MenuItem value={"COMMENT"}>Bình luận</MenuItem>
                <MenuItem value={"ACCOUNT"}>Tài khoản</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              sx={{
                width: "200px",
              }}
              margin="normal"
            >
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
                <MenuItem value={"PROCESSING"}>Đang xử lí</MenuItem>
                <MenuItem value={"DONE"}>Đã hoàn thành</MenuItem>
                <MenuItem value={"REJECTED"}>Đã hủy</MenuItem>
              </Select>
            </FormControl>
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
                              } else {
                                const value =
                                  column.id === "action"
                                    ? row["id"]
                                    : row[column.id];
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {column.format
                                      ? column.format(value)
                                      : value}
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
          ) : loading? null: (
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

export default ListFeedbacks;
