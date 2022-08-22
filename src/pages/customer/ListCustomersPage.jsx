import "./ListCustomers.scss";
import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import Config from "../../constants/Config";

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
import ApiContants from "../../constants/Api";
import { useEffect } from "react";
import Loading from "../../components/loading/Loading";
import Search from "../../components/search/Search";
const columns = [
  { id: "index", label: "#", width: "10%", align: "center" },
  {
    id: "avatar",
    label: "ẢNH ĐẠI DIỆN",
    width: "15%",
    align: "center",
    format: (value) => (
      <img alt="category" src={value} style={{ width: 50, height: 50 }} />
    ),
  },
  {
    id: "customerName",
    label: "TÊN KHÁCH HÀNG",
    width: "30%",
    align: "center",
  },
  {
    id: "customerPhone",
    label: "SỐ ĐIỆN THOẠI",
    width: "15%",
    align: "center",
  },
  {
    id: "status",
    label: "TRẠNG THÁI",
    width: "15%",
    align: "center",
    format: (value) =>
      value === "ACTIVE" ? (
        <Typography variant="p" sx={{ color: "green" }}>
          Hoạt động
        </Typography>
      ) : (
        <Typography variant="p" sx={{ color: "red" }}>
          Vô hiệu hóa
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
          to={`/customers/profile/${value}`}
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
const ListCustomersPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const customerAPI = useAxios();
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [totalRecord, setTotalRecord] = useState(0);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleChangeStatusFilter = (event) => {
    setStatusFilter(event.target.value);
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await customerAPI.get(
        ApiContants.FETCH_LIST_CUSTOMER + `?pageNumber=${page}`
      );
      setTotalRecord(response.data.totalRecord);
      setData(response.data.customerList);
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
    let searchUrl = ApiContants.SEARCH_CUSTOMER;
    let flag = false;
    if (search.trim()) {
      searchUrl += `?keyword=${search.trim()}`;
      flag = true;
    }
    if (statusFilter) {
      searchUrl += (flag ? "&" : "?") + `status=${statusFilter}`;
    }
    try {
      setPage(0);
      setLoading(true);
      setIsSearching(true);
      const response = await customerAPI.get(searchUrl);
      setData(response.data.customers);
      console.log(response.data.customers.length);
      setTotalRecord(response.data.customers.length);
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
  const handleChangePage = async (event, newPage) => {
    setPage(newPage);
  };
  return (
    <div className="list-customers">
      <Sidebar />
      <div className="list-customers-container">
        <Navbar />
        <div className="table-container" style={{ opacity: loading ? 0.5 : 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <h1>Khách hàng</h1>
          </div>
          <div className="filter">
            <FormControl
              sx={{
                width: "200px",
                marginRight: 5,
                backgroundColor: "white",
              }}
            >
              <InputLabel id="status-label">Trạng thái</InputLabel>
              <Select
                labelId="status-label"
                id="statusFilter"
                value={statusFilter}
                label="Trạng thái"
                onChange={handleChangeStatusFilter}
              >
                <MenuItem value="">Tất cả</MenuItem>
                <MenuItem value="ACTIVE">Hoạt động</MenuItem>
                <MenuItem value="BAN">Vô hiệu hóa</MenuItem>
              </Select>
            </FormControl>
            <Search
              placeholder="Số điện thoại"
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

export default ListCustomersPage;
