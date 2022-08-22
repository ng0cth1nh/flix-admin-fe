import "./withdrawRequest.scss";
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import useAxios from "../../hooks/useAxios";
import ApiContants from "../../constants/Api";
import Config from "../../constants/Config";
import Loading from "../../components/loading/Loading";
import Search from "../../components/search/Search";
import { getMoneyFormat } from "../../utils/util";
const columns = [
  { id: "index", label: "#", width: "5%", align: "center" },
  {
    id: "repairerName",
    label: "TÊN THỢ SỬA",
    width: "20%",
    align: "center",
  },
  {
    id: "repairerPhone",
    label: "SỐ ĐIỆN THOẠI",
    width: "15%",
    align: "center",
  },
  {
    id: "withdrawType",
    label: "LOẠI RÚT TIỀN",
    width: "15%",
    align: "center",
    format: (value) =>
      value === "BANKING" ? (
        <Typography>Chuyển khoản</Typography>
      ) : (
        <Typography>Tiền mặt</Typography>
      ),
  },
  {
    id: "transactionCode",
    label: "MÃ GIAO DỊCH",
    width: "15%",
    align: "center",
  },
  {
    id: "amount",
    label: "SỐ TIỀN",
    width: "10%",
    align: "center",
    format: (value) => getMoneyFormat(value),
  },
  {
    id: "action",
    label: "THAO TÁC",
    width: "20%",
    align: "center",
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
const WithdrawRequestPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const userAPI = useAxios();
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [totalRecord, setTotalRecord] = useState(0);
  const [typeFilter, setTypeFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const handleRowClick = (id) => {
    navigate(`/repairers/profile/${id}`);
  };

  const handleChangeTypeFilter = (event) => {
    setTypeFilter(event.target.value);
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await userAPI.get(
        ApiContants.FETCH_LIST_WITHDRAW + `?pageNumber=${page}`
      );
      setTotalRecord(response.data.totalRecord);
      console.log(response.data.withdrawList);
      setData(response.data.withdrawList);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      navigate("/error");
    }
  };
  const searchData = async () => {
    // case both search text and status is null then fetch data by paging
    if (!search.trim() && !typeFilter) {
      setIsSearching(false);
      setPage(0);
      fetchData();
      return;
    }
    let searchUrl = ApiContants.SEARCH_WITHDRAW;
    let flag = false;
    if (search.trim()) {
      searchUrl += `?keyword=${search.trim()}`;
      flag = true;
    }
    if (typeFilter) {
      searchUrl += (flag ? "&" : "?") + `withdrawType=${typeFilter}`;
    }
    console.log(searchUrl);
    try {
      setPage(0);
      setLoading(true);
      setIsSearching(true);
      const response = await userAPI.get(searchUrl);
      setData(response.data.withdrawList);
      setTotalRecord(response.data.withdrawList.length);
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
    <div className="withdraw-request">
      <Sidebar />
      <div className="withdraw-request-container">
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
            <h1>Yêu cầu rút tiền</h1>
          </div>
          <div className="filter">
            <FormControl
              sx={{
                width: "200px",
                marginRight: 5,
                backgroundColor: "white",
              }}
            >
              <InputLabel id="status-label">Loại rút tiền</InputLabel>
              <Select
                labelId="status-label"
                id="typeFilter"
                value={typeFilter}
                label="Loại rút tiền"
                onChange={handleChangeTypeFilter}
              >
                <MenuItem value={""}>Tất cả</MenuItem>
                <MenuItem value={"CASH"}>Tiền mặt</MenuItem>
                <MenuItem value={"BANKING"}>Chuyển khoản</MenuItem>
              </Select>
            </FormControl>
            <Search
              placeholder="Mã giao dịch"
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
                            sx={{
                              cursor: "pointer",
                            }}
                            tabIndex={-1}
                            key={row.id}
                          >
                            {columns.map((column) => {
                              if (column.id === "index") {
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                    onClick={() => {
                                      handleRowClick(row["repairerId"]);
                                    }}
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
                                    <Button
                                      variant="contained"
                                      sx={{ textTransform: "none" }}
                                      size="small"
                                      onClick={() =>
                                        navigate(
                                          `/withdraws/${row.transactionId}`
                                        )
                                      }
                                    >
                                      Xem chi tiết
                                    </Button>
                                  </TableCell>
                                );
                              } else {
                                const value = row[column.id];
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                    onClick={() => {
                                      handleRowClick(row["repairerId"]);
                                    }}
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
          ) : (
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

export default WithdrawRequestPage;
