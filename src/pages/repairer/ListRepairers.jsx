import "./ListRepairers.scss";
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import Config from "../../constants/Config";
import Loading from "../../components/loading/Loading";
import Search from "../../components/search/Search";
import ApiContants from "../../constants/Api";
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
    id: "avatar",
    label: "ẢNH ĐẠI DIỆN",
    width: "15%",
    align: "center",
    format: (value) => (
      <img alt="category" src={value} style={{ width: 50, height: 50 }} />
    ),
  },
  {
    id: "repairerName",
    label: "TÊN THỢ",
    width: "20%",
    align: "center",
  },
  {
    id: "repairerPhone",
    label: "SỐ ĐIỆN THOẠI",
    width: "10%",
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
    id: "cvStatus",
    label: "XÁC THỰC",
    width: "15%",
    align: "center",
    format: (value) =>
      value === "PENDING" ? (
        <Typography variant="p" sx={{ color: "orange" }}>
          Đang đợi
        </Typography>
      ) : value === "UPDATING" ? (
        <Typography variant="p" sx={{ color: "blue" }}>
          Đang xử lí
        </Typography>
      ) : value === "ACCEPTED" ? (
        <Typography variant="p" sx={{ color: "green" }}>
          Đã xác thực
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
          to={`/repairers/profile/${value}`}
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
const ListRepairers = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const repairerAPI = useAxios();

  const [page, setPage] = useState(0);
  const [statusFilter, setStatusFilter] = useState("");
  const [verifyTypeFilter, setVerifyTypeFilter] = useState("");
  const [data, setData] = useState([]);
  const [totalRecord, setTotalRecord] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleChangeStatusFilter = (event) => {
    setStatusFilter(event.target.value);
    searchData(event.target.value, null);
  };
  const handleChangeVerifyFilter = (event) => {
    setVerifyTypeFilter(event.target.value);
    searchData(null, event.target.value);
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await repairerAPI.get(
        ApiContants.FETCH_LIST_REPAIRER + `?pageNumber=${page}`
      );
      setTotalRecord(response.data.totalRecord);
      setData(response.data.repairerList);
      console.log("status", response.data.repairerList[0].cvStatus);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      navigate("/error");
    }
  };
  const handleSearch = () => {
    searchData(null, null);
  };
  const searchData = async (statusChange, verifyChange) => {
    let status = statusChange !== null ? statusChange : statusFilter;
    let verify = verifyChange !== null ? verifyChange : verifyTypeFilter;
    console.log(status, verify);
    // case both search text and status is null then fetch data by paging
    if (!search.trim() && !status && !verify) {
      setIsSearching(false);
      setPage(0);
      fetchData();
      return;
    }
    let searchUrl = ApiContants.SEARCH_REPAIRER;
    let flag = false;
    if (search.trim()) {
      searchUrl += `?keyword=${search.trim()}`;
      flag = true;
    }
    if (status) {
      searchUrl += (flag ? "&" : "?") + `accountState=${status}`;
      flag = true;
    }
    if (verify) {
      searchUrl += (flag ? "&" : "?") + `cvStatus=${verify}`;
    }
    console.log(searchUrl);
    try {
      setPage(0);
      setLoading(true);
      setIsSearching(true);
      const response = await repairerAPI.get(searchUrl);
      setData(response.data.repairers);
      setTotalRecord(response.data.repairers.length);
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
    <div className="list-repairers">
      <Sidebar />
      <div className="list-repairers-container">
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
            <h1>Thợ sửa chữa</h1>
            <Search
              placeholder="Số điện thoại"
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
                <MenuItem value="">Tất cả</MenuItem>
                <MenuItem value="ACTIVE">Hoạt động</MenuItem>
                <MenuItem value="BAN">Vô hiệu hóa</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              sx={{
                width: "200px",
                marginLeft: "30px",
              }}
              margin="normal"
            >
              <InputLabel id="verify-label">Xác thực</InputLabel>
              <Select
                labelId="verify-label"
                id="verifyFilter"
                value={verifyTypeFilter}
                label="Xác thực"
                onChange={handleChangeVerifyFilter}
              >
                <MenuItem value="">Tất cả</MenuItem>
                <MenuItem value="PENDING">Đang đợi</MenuItem>
                <MenuItem value="UPDATING">Đang xử lí</MenuItem>
                <MenuItem value="ACCEPTED">Đã xác thực</MenuItem>
                <MenuItem value="REJECTED">Đã hủy</MenuItem>
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

export default ListRepairers;
