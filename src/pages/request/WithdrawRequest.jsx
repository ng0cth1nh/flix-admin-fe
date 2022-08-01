import "./WithdrawRequest.scss";
import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";

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
} from "@mui/material";
import { makeStyles } from "@mui/styles";
const columns = [
  { id: "index", label: "#", width: "5%", align: "center" },
  {
    id: "name",
    label: "TÊN THỢ SỬA",
    width: "20%",
    align: "center",
  },
  {
    id: "phone",
    label: "SỐ ĐIỆN THOẠI",
    width: "15%",
    align: "center",
  },
  {
    id: "type",
    label: "LOẠI RÚT TIỀN",
    width: "15%",
    align: "center",
  },
  {
    id: "txCode",
    label: "MÃ GIAO DỊCH",
    width: "15%",
    align: "center",
  },
  {
    id: "amount",
    label: "SỐ TIỀN",
    width: "10%",
    align: "center",
  },
  {
    id: "action",
    label: "THAO TÁC",
    width: "20%",
    align: "center",
    format: (value) => (
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Button
          variant="contained"
          sx={{ textTransform: "none" }}
          size="small"
          color="success"
        >
          <Link
            to={`/transactions/${value}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            Chấp nhận
          </Link>
        </Button>
        <Button
          variant="contained"
          sx={{ textTransform: "none" }}
          size="small"
          color="error"
        >
          <Link
            to={`/transactions/${value}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            Từ chối
          </Link>
        </Button>
      </div>
    ),
  },
];

function createData(id, name, phone, money, type, txCode, amount) {
  return {
    id,
    name,
    phone,
    money,
    type,
    txCode,
    amount,
  };
}

const rows = [
  createData(
    "India",
    "Hồ Hoài Nam",
    1324171354,
    "Hồ Nhung",
    60483973,
    "21/10/2022",
    359090
  ),
  createData(
    "India",
    "Nguyễn Văn Việt",
    1324171354,
    "Ưng Hoàng Phúc",
    60483973,
    "20/10/2022",
    359090
  ),
  createData(
    "India",
    "Hưng baba",
    1324171354,
    "Hưng chòi",
    60483973,
    "21/11/2022",
    359090
  ),
  createData(
    "India",
    "Lâm bánh đa",
    1324171354,
    "Hồ Nhung",
    60483973,
    "21/10/2028",
    359090
  ),
  createData(
    "India",
    "Hồ Hoài Nam",
    1324171354,
    "Lâm bánh đa",
    60483973,
    "21/10/2012",
    359090
  ),
  createData(
    "India",
    "Hưng baba",
    1324171354,
    "Hồ Nhung",
    60483973,
    "21/10/2022",
    359090
  ),
  createData(
    "India",
    "Hồ Hoài Nam",
    1324171354,
    "Hồ Nhung",
    60483973,
    "21/10/2022",
    359090
  ),
  createData(
    "India",
    "Hồ Hoài Nam",
    1324171354,
    "Hồ Nhung",
    60483973,
    "21/10/2022",
    359090
  ),
  createData(
    "India",
    "Hồ Hoài Nam",
    1324171354,
    "Hồ Nhung",
    60483973,
    "21/10/2022",
    359090
  ),
  createData(
    "India",
    "Hồ Hoài Nam",
    1324171354,
    "Hồ Nhung",
    60483973,
    "21/10/2022",
    359090
  ),
  createData(
    "India",
    "Hồ Hoài Nam",
    1324171354,
    "Hồ Nhung",
    60483973,
    "21/10/2022",
    359090
  ),
];
const useStyles = makeStyles({
  root: {
    "& .MuiTableCell-head": {
      fontWeight: "bold",
    },
  },
});
const WithdrawRequest = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [typeFilter, setTypeFilter] = useState("");
  const navigate = useNavigate();
  const handleRowClick = (id) => {
    navigate(`/repairers/profile/${id}`);
  };
  const handleChangeTypeFilter = (event) => {
    setTypeFilter(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
            <div className="search">
              <input type="text" placeholder="Tìm kiếm..." />
              <SearchOutlinedIcon />
            </div>
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
              <InputLabel id="status-label">Loại rút tiền</InputLabel>
              <Select
                labelId="status-label"
                id="typeFilter"
                value={typeFilter}
                label="Loại rút tiền"
                onChange={handleChangeTypeFilter}
              >
                <MenuItem value={10}>Dụng cụ gia dụng</MenuItem>
                <MenuItem value={20}>Điện lạnh</MenuItem>
                <MenuItem value={30}>Điện tử</MenuItem>
              </Select>
            </FormControl>
          </div>
          <TableContainer sx={{ minHeight: "600px" }}>
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
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                                  handleRowClick(row["id"]);
                                }}
                              >
                                {page * rowsPerPage + index + 1}
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
                                onClick={
                                  column.id !== "action"
                                    ? () => {
                                        handleRowClick(row["id"]);
                                      }
                                    : null
                                }
                              >
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
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default WithdrawRequest;
