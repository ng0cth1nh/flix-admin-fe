import "./ListAccessories.scss";
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
    label: "TÊN LINH KIỆN",
    width: "20%",
    align: "center",
  },
  {
    id: "price",
    label: "GIÁ LINH KIỆN",
    width: "10%",
    align: "center",
  },
  {
    id: "warrenty",
    label: "BẢO HÀNH",
    width: "10%",
    align: "center",
  },
  {
    id: "company",
    label: "NHÀ SẢN XUẤT",
    width: "10%",
    align: "center",
  },
  {
    id: "address",
    label: "NƠI SẢN XUẤT",
    width: "15%",
    align: "center",
  },
  {
    id: "description",
    label: "MÔ TẢ",
    width: "20%",
    align: "center",
  },
  {
    id: "action",
    label: "THAO TÁC",
    width: "10%",
    align: "center",
    format: (value) => (
      <Button
        variant="contained"
        sx={{ textTransform: "none" }}
        size="small"
      >
        <Link
          to={`/transactions/${value}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          Cập nhật
        </Link>
      </Button>
    ),
  },
];

function createData(id, name, price, warrenty, company, address, description) {
  return {
    id,
    name,
    price,
    warrenty,
    company,
    address,
    description,
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
const ListAccessories = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [typeFilter, setTypeFilter] = useState("");
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
            <h1>Linh kiện</h1>
            <div style={{ display: "flex" }}>
              <div className="search">
                <input type="text" placeholder="Tìm kiếm..." />
                <SearchOutlinedIcon />
              </div>
              <Button variant="contained" color="success">
                <Link
                  to={`/categories/category`}
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

export default ListAccessories;
