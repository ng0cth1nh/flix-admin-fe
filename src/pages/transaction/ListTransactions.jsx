import "./ListTransactions.scss";
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import Config from "../../constants/Config";
import Loading from "../../components/loading/Loading";
import Search from "../../components/search/Search";
import ApiContants from "../../constants/Api";
import { formatFromDate } from "../../utils/getFormatDate";

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
    id: "transactionCode",
    label: "MÃ GIAO DỊCH HỆ THỐNG",
    width: "15%",
    align: "center",
  },
  {
    id: "fullName",
    label: "HỌ VÀ TÊN",
    width: "15%",
    align: "center",
  },
  {
    id: "phone",
    label: "SỐ ĐIỆN THOẠI",
    width: "10%",
    align: "center",
  },
  {
    id: "amount",
    label: "SỐ TIỀN",
    width: "10%",
    align: "center",
  },
  {
    id: "transactionType",
    label: "LOẠI GIAO DỊCH",
    width: "10%",
    align: "center",
    format: (value) => Config.TX_TYPE[value],
  },
  {
    id: "payDate",
    label: "NGÀY GIAO DỊCH",
    width: "10%",
    align: "center",
    format: (value) => formatFromDate(value),
  },
  {
    id: "status",
    label: "TRẠNG THÁI",
    width: "10%",
    align: "center",
    format: (value) =>
      value === "PENDING" ? (
        <Typography variant="p" sx={{ color: "orange" }}>
          Đang xử lí
        </Typography>
      ) : value === "SUCCESS" ? (
        <Typography variant="p" sx={{ color: "green" }}>
          Thành công
        </Typography>
      ) : (
        <Typography variant="p" sx={{ color: "red" }}>
          Thất bại
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
          to={`/transactions/${value}`}
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
const ListTransactions = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const userAPI = useAxios();
  const [page, setPage] = useState(0);
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [data, setData] = useState([]);
  const [totalRecord, setTotalRecord] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  //before
  const handleChangeTypeFilter = (event) => {
    setTypeFilter(event.target.value);
    searchData(null, event.target.value);
  };
  const handleChangeStatusFilter = (event) => {
    setStatusFilter(event.target.value);
    searchData(event.target.value, null);
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await userAPI.get(
        ApiContants.TRANSACTION_LIST + `?pageNumber=${page}`
      );
      setTotalRecord(response.data.totalRecord);
      setData(response.data.transactions);
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
    console.log(status, type);
    // case both search text and status is null then fetch data by paging
    if (!search.trim() && !status && !type) {
      setIsSearching(false);
      setPage(0);
      fetchData();
      return;
    }
    let searchUrl = ApiContants.TRANSACTION_SEARCH;
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
      searchUrl += (flag ? "&" : "?") + `transactionType=${type}`;
    }
    console.log(searchUrl);
    try {
      setPage(0);
      setLoading(true);
      setIsSearching(true);
      const response = await userAPI.get(searchUrl);
      setData(response.data.transactions);
      setTotalRecord(response.data.transactions.length);
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
    <div className="list-transactions">
      <Sidebar />
      <div className="list-transactions-container">
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
            <h1>Giao dịch</h1>
            <Search
              placeholder="Mã giao dịch"
              handleSearch={handleSearch}
              search={search}
              setSearch={setSearch}
            />
          </div>
          <div className="filter">
            <h2>Lọc theo</h2>

            <FormControl
              sx={{
                width: "200px",
                marginRight: "50px",
              }}
              margin="normal"
            >
              <InputLabel id="status-label">Loại giao dịch</InputLabel>
              <Select
                labelId="status-label"
                id="typeFilter"
                value={typeFilter}
                label="Loại giao dịch"
                onChange={handleChangeTypeFilter}
              >
                <MenuItem value={""}>Tất cả</MenuItem>
                <MenuItem value={"WITHDRAW"}>Rút tiền</MenuItem>
                <MenuItem value={"DEPOSIT"}>Nạp tiền</MenuItem>
                <MenuItem value={"PAY_COMMISSIONS"}>Trả tiền hoa hồng</MenuItem>
                <MenuItem value={"REFUNDS"}>Hoàn lại tiền</MenuItem>
                <MenuItem value={"FINED"}>Nộp phạt</MenuItem>
                <MenuItem value={"CUSTOMER_PAYMENT"}>
                  Khách hàng thanh toán
                </MenuItem>
                <MenuItem value={"RECEIVE_INVOICE_MONEY"}>
                  Tiền hóa đơn
                </MenuItem>
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
                <MenuItem value={"PENDING"}>Đang xử lí</MenuItem>
                <MenuItem value={"SUCCESS"}>Thành công</MenuItem>
                <MenuItem value={"FAIL"}>Thất bại</MenuItem>
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

export default ListTransactions;
