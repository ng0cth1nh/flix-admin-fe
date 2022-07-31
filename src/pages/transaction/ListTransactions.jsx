import "./ListTransactions.scss";
import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";

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
    id: "txCode",
    label: "MÃ GIAO DỊCH HỆ THỐNG",
    width: "15%",
    align: "center",
  },
  {
    id: "name",
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
    id: "money",
    label: "SỐ TIỀN",
    width: "10%",
    align: "center",
  },
  {
    id: "txType",
    label: "LOẠI GIAO DỊCH",
    width: "10%",
    align: "center",
  },
  {
    id: "txDate",
    label: "NGÀY GIAO DỊCH",
    width: "10%",
    align: "center",
  },
  {
    id: "status",
    label: "TRẠNG THÁI",
    width: "10%",
    align: "center",
    format: (value) =>
    value ? (
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

function createData(
  id,
  txCode,
  name,
  phone,
  money,
  txType,
  txDate,
  status,
) {
  return {
    id,
    txCode,
    name,
    phone,
    money,
    txType,
    txDate,
    status,

  };
}

const rows = [
  createData("India", "fjdsklj375348","Hồ Hoài Nam", 1324171354 ,"Hồ Nhung", 60483973, "21/10/2022", true),
  createData("India", "fjdsklj3758","Nguyễn Văn Việt", 1324171354 ,"Ưng Hoàng Phúc", 60483973, "20/10/2022", true),
  createData("India", "tuiorutj375348","Hưng baba", 1324171354 ,"Hưng chòi", 60483973, "21/11/2022", false),
  createData("India", "t49579ert","Lâm bánh đa", 1324171354 ,"Hồ Nhung", 60483973, "21/10/2028", true),
  createData("India", "fksdjf3984","Hồ Hoài Nam", 1324171354 ,"Lâm bánh đa", 60483973, "21/10/2012", false),
  createData("India", "fdjfkle89r","Hưng baba", 1324171354 ,"Hồ Nhung", 60483973, "21/10/2022", false),
  createData("India", "fdskeur","Hồ Hoài Nam", 1324171354 ,"Hồ Nhung", 60483973, "21/10/2022", true),
  createData("India", "32589fdjf","Hồ Hoài Nam", 1324171354 ,"Hồ Nhung", 60483973, "21/10/2022", true),
  createData("India", "fjdsjfl5490","Hồ Hoài Nam", 1324171354 ,"Hồ Nhung", 60483973, "21/10/2022", false),
  createData("India", "sdjfklds3646","Hồ Hoài Nam", 1324171354 ,"Hồ Nhung", 60483973, "21/10/2022", true),
  createData("India", "jfdksfj475","Hồ Hoài Nam", 1324171354 ,"Hồ Nhung", 60483973, "21/10/2022", true),
  
];
const useStyles = makeStyles({
  root: {
    "& .MuiTableCell-head": {
      fontWeight: "bold",
    },
  },
});
const ListTransactions = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter]= useState("");

  const handleChangeTypeFilter = (event) => {
    setTypeFilter(event.target.value);
  };
  const handleChangeStatusFilter = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
                marginRight: "50px"
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
                <MenuItem value={10}>Dụng cụ gia dụng</MenuItem>
                <MenuItem value={20}>Điện lạnh</MenuItem>
                <MenuItem value={30}>Điện tử</MenuItem>
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
                        tabIndex={-1}
                        key={row.id}
                      >
                        {columns.map((column) => {
                          if (column.id === "index") {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {page * rowsPerPage + index + 1}
                              </TableCell>
                            );
                          } else {
                            const value =
                              column.id === "action"
                                ? row["id"]
                                : row[column.id];
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

export default ListTransactions;
