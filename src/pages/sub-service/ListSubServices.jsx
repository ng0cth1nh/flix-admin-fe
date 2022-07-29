import "./ListSubServices.scss";
import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useParams } from "react-router-dom";

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
const columns = [
  { id: "index", label: "#", width: "5%", align: "center" },
  {
    id: "name",
    label: "TÊN DỊCH VỤ CON",
    width: "15%",
    align: "center",
  },
  {
    id: "price",
    label: "PHÍ KIỂM TRA",
    width: "15%",
    align: "center",
    format: (value) =>
      typeof value === "number" ? value.toLocaleString("en-US") + " vnđ" : value,
  },
  {
    id: "description",
    label: "MÔ TẢ",
    width: "35%",
    align: "center",
  },
  {
    id: "status",
    label: "TRẠNG THÁI",
    width: "15%",
    align: "center",
    format: (value) =>
      value ? (
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
          to={`/categories/${value.categoryId}/services/${value.serviceId}/subservices/subservice?id=${value.id}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          Cập nhật
        </Link>
      </Button>
    ),
  },
];

function createData(id, name, price, description, status) {
  return { id, name, price, description, status };
}

const rows = [
  createData(
    "India",
    1324171354,
    120000,
    60483973,
    true
  ),
  createData(
    "China",
    1403500365,
    12000000,
    60483973,
    false
  ),
  createData(
    "Italy",
    60483973,
    120000,
    60483973,
    true
  ),
  createData(
    "United States",
    327167434,
    120000,
    60483973,
    true
  ),
  createData(
    "Canada",
    37602103,
    120000,
    37602103,
    true
  ),
  createData(
    "Australia",
    25475400,
    120000,
    60483973,
    false
  ),
  createData(
    "Germany",
    83019200,
    120000,
    60483973,
    true
  ),
  createData(
    "Ireland",
    4857000,
    120000,
    60483973,
    false
  ),
  createData(
    "Mexico",
    "fjadskjfkl;jjjjjjjjjjjjjjjjjjjjjjjljljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
    120000,
    "fjadskjfkl;jjjjjjjjjjjjjjjjjjjjjjjljljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj fdjsfjsdklfj fjdsjfklsdjf fkdlsjklsdfjkljadsfkjklsad",
    true
  ),
  createData(
    "Japan",
    126317000,
    120000,
    60483973,
    true
  ),
  createData(
    "France",
    67022000,
    120000,
    60483973,
    false
  ),
  createData(
    "United Kingdom",
    67545757,
    120000,
    60483973,
    true
  ),
  createData(
    "Russia",
    146793744,
    120000,
    60483973,
    true
  ),
  createData(
    "Nigeria",
    200962417,
    120000,
    60483973,
    true
  ),
  createData(
    "Brazil",
    210147125,
    120000,
    60483973,
    false
  ),
];
const useStyles = makeStyles({
  root: {
    "& .MuiTableCell-head": {
      fontWeight: "bold",
    },
  },
});
const ListSubServices = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { categoryId, serviceId } = useParams();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div className="list-subservices">
      <Sidebar />
      <div className="list-subservices-container">
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
            <h1>Dịch vụ con</h1>
            <div style={{ display: "flex" }}>
              <div className="search">
                <input type="text" placeholder="Tìm kiếm..." />
                <SearchOutlinedIcon />
              </div>
              <Button variant="contained" color="success">
                <Link
                  to={`/categories/${categoryId}/services/${serviceId}/subservices/subservice`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Thêm
                </Link>
              </Button>
            </div>
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
                              <TableCell
                                key={column.id}
                                align={column.align}
                              >
                                {page * rowsPerPage + index + 1}
                              </TableCell>
                            );
                          } else {
                            const value =
                              column.id === "action"
                                ? { categoryId, serviceId, id: row["id"] }
                                : row[column.id];
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
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

export default ListSubServices;
