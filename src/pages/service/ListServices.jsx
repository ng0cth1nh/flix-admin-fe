import "./ListServices.scss";
import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate, useParams } from "react-router-dom";

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
import { getMoneyFormat } from "../../utils/util";
const columns = [
  { id: "index", label: "#", width: "5%", align: "center" },
  {
    id: "image",
    label: "ẢNH MINH HỌA",
    width: "15%",
    align: "center",
    format: (value) => (
      <img alt="service" src={value} style={{ width: 50, height: 50 }} />
    ),
  },
  {
    id: "name",
    label: "TÊN DỊCH VỤ",
    width: "15%",
    align: "center",
  },
  {
    id: "price",
    label: "PHÍ KIỂM TRA",
    width: "15%",
    align: "center",
    format: (value) => getMoneyFormat(value),
  },
  {
    id: "description",
    label: "MÔ TẢ",
    width: "20%",
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
          to={`/categories/${value.categoryId}/services/service?id=${value.id}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          Cập nhật
        </Link>
      </Button>
    ),
  },
];

function createData(id, image, name, price, description, status) {
  return { id, image, name, price, description, status };
}

const rows = [
  createData(
    "India",
    "https://ss-images.saostar.vn/wp700/pc/1656656545169/saostar-lsn58axg5w0uq4au.jpg",
    1324171354,
    120000,
    60483973,
    true
  ),
  createData(
    "China",
    "https://ss-images.saostar.vn/wp700/pc/1656656545169/saostar-lsn58axg5w0uq4au.jpg",
    1403500365,
    120000,
    60483973,
    false
  ),
  createData(
    "Italy",
    "https://ss-images.saostar.vn/wp700/pc/1656656545169/saostar-lsn58axg5w0uq4au.jpg",
    60483973,
    120000,
    60483973,
    true
  ),
  createData(
    "United States",
    "https://ss-images.saostar.vn/wp700/pc/1656656545169/saostar-lsn58axg5w0uq4au.jpg",
    327167434,
    120000,
    60483973,
    true
  ),
  createData(
    "Canada",
    "https://ss-images.saostar.vn/wp700/pc/1656656545169/saostar-lsn58axg5w0uq4au.jpg",
    37602103,
    120000,
    37602103,
    true
  ),
  createData(
    "Australia",
    "https://ss-images.saostar.vn/wp700/pc/1656656545169/saostar-lsn58axg5w0uq4au.jpg",
    25475400,
    120000,
    60483973,
    false
  ),
  createData(
    "Germany",
    "https://ss-images.saostar.vn/wp700/pc/1656656545169/saostar-lsn58axg5w0uq4au.jpg",
    83019200,
    120000,
    60483973,
    true
  ),
  createData(
    "Ireland",
    "https://ss-images.saostar.vn/wp700/pc/1656656545169/saostar-lsn58axg5w0uq4au.jpg",
    4857000,
    120000,
    60483973,
    false
  ),
  createData(
    "Mexico",
    "https://ss-images.saostar.vn/wp700/pc/1656656545169/saostar-lsn58axg5w0uq4au.jpg",
    "fjadskjfkl;jjjjjjjjjjjjjjjjjjjjjjjljljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
    120000,
    "fjadskjfkl;jjjjjjjjjjjjjjjjjjjjjjjljljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj fdjsfjsdklfj fjdsjfklsdjf fkdlsjklsdfjkljadsfkjklsad",
    true
  ),
  createData(
    "Japan",
    "https://ss-images.saostar.vn/wp700/pc/1656656545169/saostar-lsn58axg5w0uq4au.jpg",
    126317000,
    120000,
    60483973,
    true
  ),
  createData(
    "France",
    "https://ss-images.saostar.vn/wp700/pc/1656656545169/saostar-lsn58axg5w0uq4au.jpg",
    67022000,
    120000,
    60483973,
    false
  ),
  createData(
    "United Kingdom",
    "https://ss-images.saostar.vn/wp700/pc/1656656545169/saostar-lsn58axg5w0uq4au.jpg",
    67545757,
    120000,
    60483973,
    true
  ),
  createData(
    "Russia",
    "https://ss-images.saostar.vn/wp700/pc/1656656545169/saostar-lsn58axg5w0uq4au.jpg",
    146793744,
    120000,
    60483973,
    true
  ),
  createData(
    "Nigeria",
    "https://ss-images.saostar.vn/wp700/pc/1656656545169/saostar-lsn58axg5w0uq4au.jpg",
    200962417,
    120000,
    60483973,
    true
  ),
  createData(
    "Brazil",
    "https://ss-images.saostar.vn/wp700/pc/1656656545169/saostar-lsn58axg5w0uq4au.jpg",
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
const ListServices = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const handleCellClick = (id) => {
    navigate(`/categories/${categoryId}/services/${id}/subservices`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div className="list-services">
      <Sidebar />
      <div className="list-services-container">
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
            <h1>Dịch vụ</h1>
            <div style={{ display: "flex" }}>
              <div className="search">
                <input type="text" placeholder="Tìm kiếm..." />
                <SearchOutlinedIcon />
              </div>
              <Button variant="contained" color="success">
                <Link
                  to={`/categories/${categoryId}/services/service`}
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
                                  handleCellClick(row["id"]);
                                }}
                              >
                                {page * rowsPerPage + index + 1}
                              </TableCell>
                            );
                          } else {
                            const value =
                              column.id === "action"
                                ? { categoryId, id: row["id"] }
                                : row[column.id];
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                onClick={(e) => {
                                  if (column.id === "action") {
                                    console.log("go to action");
                                    e.preventDefault();
                                  } else handleCellClick(row.id);
                                }}
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

export default ListServices;
