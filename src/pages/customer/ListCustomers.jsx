import "./ListCustomers.scss";
import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
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
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import ApiContants from "../../constants/Api";
import { useEffect } from "react";
import Loading from "../../components/loading/Loading";
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
const ListCustomers = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const customerAPI = useAxios();
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [totalRecord, setTotalRecord] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
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
        navigate("/error");
        setLoading(false);
      }
    };
    fetchData();
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
            <div className="search">
              <input type="text" placeholder="Tìm kiếm..." />
              <SearchOutlinedIcon />
            </div>
          </div>
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
                {data.map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        if (column.id === "index") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {page * Config.ROW_PER_PAGE + index + 1}
                            </TableCell>
                          );
                        } else {
                          const value =
                            column.id === "action" ? row["id"] : row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format ? column.format(value) : value}
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
          {loading && <Loading />}
        </div>
      </div>
    </div>
  );
};

export default ListCustomers;
