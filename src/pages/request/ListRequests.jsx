import "./ListRequests.scss";
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
  { id: "index", label: "#", width: "10%", align: "center" },
  {
    id: "requestId",
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
    id: "createdDate",
    label: "NGÀY TẠO",
    width: "10%",
    align: "center",
  },
  {
    id: "status",
    label: "TRẠNG THÁI",
    width: "10%",
    align: "center",
    format: (value) =>
      value === 0 ? (
        <Typography variant="p" sx={{ color: "orange" }}>
          Đang đợi
        </Typography>
      ) : value === 1 ? (
        <Typography variant="p" sx={{ color: "blue" }}>
          Đang xử lí
        </Typography>
      ) : value === 2 ? (
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

function createData(
  id,
  requestId,
  customerName,
  customerPhone,
  repairerName,
  repairerPhone,
  createdDate,
  status
) {
  return {
    id,
    requestId,
    customerName,
    customerPhone,
    repairerName,
    repairerPhone,
    createdDate,
    status,
  };
}

const rows = [
  createData("India", "fjdsklj375348","Hồ Hoài Nam", 1324171354 ,"Hồ Nhung", 60483973, "21/10/2022", 0),
  createData("India", "fjdsklj3758","Nguyễn Văn Việt", 1324171354 ,"Ưng Hoàng Phúc", 60483973, "20/10/2022", 3),
  createData("India", "tuiorutj375348","Hưng baba", 1324171354 ,"Hưng chòi", 60483973, "21/11/2022", 2),
  createData("India", "t49579ert","Lâm bánh đa", 1324171354 ,"Hồ Nhung", 60483973, "21/10/2028", 1),
  createData("India", "fksdjf3984","Hồ Hoài Nam", 1324171354 ,"Lâm bánh đa", 60483973, "21/10/2012", 1),
  createData("India", "fdjfkle89r","Hưng baba", 1324171354 ,"Hồ Nhung", 60483973, "21/10/2022", 4),
  createData("India", "fdskeur","Hồ Hoài Nam", 1324171354 ,"Hồ Nhung", 60483973, "21/10/2022", 3),
  createData("India", "32589fdjf","Hồ Hoài Nam", 1324171354 ,"Hồ Nhung", 60483973, "21/10/2022", 1),
  createData("India", "fjdsjfl5490","Hồ Hoài Nam", 1324171354 ,"Hồ Nhung", 60483973, "21/10/2022", 0),
  createData("India", "sdjfklds3646","Hồ Hoài Nam", 1324171354 ,"Hồ Nhung", 60483973, "21/10/2022", 4),
  createData("India", "jfdksfj475","Hồ Hoài Nam", 1324171354 ,"Hồ Nhung", 60483973, "21/10/2022", 2),
  
];
const useStyles = makeStyles({
  root: {
    "& .MuiTableCell-head": {
      fontWeight: "bold",
    },
  },
});
const ListRequests = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState("");

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

export default ListRequests;
