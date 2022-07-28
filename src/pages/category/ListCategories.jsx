import "./ListCategories.scss";
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
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
const columns = [
  { id: "index", label: "#", width: "10%", align: "center" },
  {
    id: "image",
    label: "ẢNH MINH HỌA",
    width: "15%",
    align: "center",
    format: (value) => (
      <img alt="category" src={value} style={{ width: 50, height: 50 }} />
    ),
  },
  {
    id: "name",
    label: "TÊN DANH MỤC",
    width: "20%",
    align: "center",
  },
  {
    id: "description",
    label: "MÔ TẢ",
    width: "25%",
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
          to={`/categories/category?id=${value}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          Cập nhật
        </Link>
      </Button>
    ),
  },
];

function createData(id, image, name, description, status) {
  return { id, image, name, description, status };
}

const rows = [
  createData(
    "India",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNTq7wk2LDj7jNigWK_QF1nT8pacd9TlLu9g&usqp=CAU",
    1324171354,
    60483973,
    true
  ),
  createData(
    "China",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNTq7wk2LDj7jNigWK_QF1nT8pacd9TlLu9g&usqp=CAU",
    1403500365,
    60483973,
    false
  ),
  createData(
    "Italy",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNTq7wk2LDj7jNigWK_QF1nT8pacd9TlLu9g&usqp=CAU",
    60483973,
    60483973,
    true
  ),
  createData(
    "United States",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNTq7wk2LDj7jNigWK_QF1nT8pacd9TlLu9g&usqp=CAU",
    327167434,
    60483973,
    true
  ),
  createData(
    "Canada",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNTq7wk2LDj7jNigWK_QF1nT8pacd9TlLu9g&usqp=CAU",
    37602103,
    37602103,
    true
  ),
  createData(
    "Australia",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNTq7wk2LDj7jNigWK_QF1nT8pacd9TlLu9g&usqp=CAU",
    25475400,
    60483973,
    false
  ),
  createData(
    "Germany",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNTq7wk2LDj7jNigWK_QF1nT8pacd9TlLu9g&usqp=CAU",
    83019200,
    60483973,
    true
  ),
  createData(
    "Ireland",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNTq7wk2LDj7jNigWK_QF1nT8pacd9TlLu9g&usqp=CAU",
    4857000,
    60483973,
    false
  ),
  createData(
    "Mexico",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNTq7wk2LDj7jNigWK_QF1nT8pacd9TlLu9g&usqp=CAU",
    "fjadskjfkl;jjjjjjjjjjjjjjjjjjjjjjjljljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
    "fjadskjfkl;jjjjjjjjjjjjjjjjjjjjjjjljljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj fdjsfjsdklfj fjdsjfklsdjf fkdlsjklsdfjkljadsfkjklsad",
    true
  ),
  createData(
    "Japan",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNTq7wk2LDj7jNigWK_QF1nT8pacd9TlLu9g&usqp=CAU",
    126317000,
    60483973,
    true
  ),
  createData(
    "France",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNTq7wk2LDj7jNigWK_QF1nT8pacd9TlLu9g&usqp=CAU",
    67022000,
    60483973,
    false
  ),
  createData(
    "United Kingdom",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNTq7wk2LDj7jNigWK_QF1nT8pacd9TlLu9g&usqp=CAU",
    67545757,
    60483973,
    true
  ),
  createData(
    "Russia",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNTq7wk2LDj7jNigWK_QF1nT8pacd9TlLu9g&usqp=CAU",
    146793744,
    60483973,
    true
  ),
  createData(
    "Nigeria",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNTq7wk2LDj7jNigWK_QF1nT8pacd9TlLu9g&usqp=CAU",
    200962417,
    60483973,
    true
  ),
  createData(
    "Brazil",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNTq7wk2LDj7jNigWK_QF1nT8pacd9TlLu9g&usqp=CAU",
    210147125,
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
const ListCategories = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();
  const handleRowClick = (id) => {
    navigate(`/categories/${id}/services`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div className="list-categories">
      <Sidebar />
      <div className="list-categories-container">
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
            <h1>Danh mục</h1>
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

export default ListCategories;
